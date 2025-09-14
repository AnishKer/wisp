# Wisp Chat App

A full-stack real-time chat application with authentication, user profiles, and image support. Built with React, Node.js, Express, MongoDB, and Socket.io.

---

## Features

- **User Authentication:** JWT-based signup/login, protected routes
- **Profile Management:** Update profile info and avatar (Cloudinary upload)
- **Real-Time Chat:** Instant messaging with Socket.io
- **Unseen Message Badges:** See unread message counts per user
- **Online Status:** See which users are online
- **Responsive UI:** Mobile-friendly, modern design
- **Image Support:** Send and receive images in chat
- **Notifications:** Toast notifications for actions and errors

---

## Tech Stack

### Frontend (client)
- React (Vite, functional components, hooks)
- React Router
- react-hot-toast
- CSS (custom/Tailwind-like classes)

### Backend (server)
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Cloudinary (image uploads)
- Socket.io

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/AnishKer/wisp.git
cd wisp
```

### 2. Setup the server

```bash
cd server
npm install
# Create a .env file with your MongoDB URI, JWT secret, and Cloudinary credentials
npm start
```

### 3. Setup the client

```bash
cd ../client
npm install
npm run dev
```

### 4. Open the app

- Client: [http://localhost:5173](http://localhost:5173)
- Server: [http://localhost:5000](http://localhost:5000) (API)

---

## Environment Variables

Create a `.env` file in the `server` directory with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Project Structure

```
root/
  client/    # React frontend
  server/    # Node/Express backend
```

---

## Repository

- GitHub: [https://github.com/AnishKer/wisp](https://github.com/AnishKer/wisp)

---

## Credits

Developed by [AnishKer](https://github.com/AnishKer)

---

