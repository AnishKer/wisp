// get all users expect logged in users

import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap } from "../server.js";

export const getUsersForSidebar = async(req,res) =>{
    try {
        const userId = req.user._id ? req.user._id.toString() : "";
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        //count messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const senderIdStr = user._id ? user._id.toString() : "";
            const messages = await Message.find({senderId : senderIdStr , receiverId : userId, seen: false})
            if(messages.length > 0 ){
                unseenMessages[senderIdStr] = messages.length;
            }
        })

        await Promise.all(promises);
        res.json({success : true , users: filteredUsers, unseenMessages})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false , users: [], unseenMessages: {}, message: error.message})
        return;
    }
}

//get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const {id : selectedUserIdRaw} = req.params;
        const selectedUserId = selectedUserIdRaw ? selectedUserIdRaw.toString() : "";
        const myId = req.user._id ? req.user._id.toString() : "";

        const messages = await Message.find({
            $or: [
                {senderId: myId , receiverId : selectedUserId},
                {senderId: selectedUserId , receiverId : myId},
            ]
        })

        await Message.updateMany({senderId : selectedUserId , receiverId : myId}, {seen: true});

        res.json({success: true , messages})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false , messages: [], message: error.message})
        return;
    }
}

// api to mark messages as seen

export const markMessageAsSeen = async (req, res) => {
    try {
        const {id: rawId} = req.params;
        const id = rawId ? rawId.toString() : "";
        await Message.findByIdAndUpdate(id , {seen:true})
        res.json({success : true})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false , message: error.message})
        return;
    }
}

//send message

export const sendMessage = async(req,res) =>{
    try {
        const {text , image} = req.body;
        const receiverId = req.params.id ? req.params.id.toString() : "";
        const senderId = req.user._id ? req.user._id.toString() : "";

        let imageUrl;
        if(image){
            try {
                const uploadResponse = await cloudinary.uploader.upload(image)
                imageUrl = uploadResponse.secure_url;
            } catch (imgErr) {
                console.log('Image upload error:', imgErr.message);
                res.status(500).json({success: false, message: 'Image upload failed: ' + imgErr.message});
                return;
            }
        }
        console.log('receiverId type:', typeof receiverId, 'value:', receiverId);
        const newMessage = await Message.create({
            senderId: String(senderId),
            receiverId: String(receiverId),
            text,
            image: imageUrl
        })

        //emit new message to the receivers socket

        const receiverSocketId = userSocketMap[String(receiverId)];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({success:true , newMessage})
        return;

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false , message: error.message})
        return;
    }
}