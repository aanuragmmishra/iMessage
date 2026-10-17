# 💬 iMessage

> A real-time chat application with media sharing and a customizable, desktop-inspired interface.

<div align="center">

## 🚀 Live Demo

### **[👉 Try iMessage Now](https://imessage-1rgs.onrender.com)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20iMessage-2ea44f?style=for-the-badge&logo=render)](https://imessage-1rgs.onrender.com)

</div>

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio)](https://socket.io/)

## 📌 Overview

**iMessage** is a full-stack messaging web app where authenticated users can find people, exchange messages, and share images or videos. It uses React for the interface, Express for the API, MongoDB for persistent data, Clerk for authentication, Socket.IO for real-time updates, and ImageKit for media storage.

## ✨ Features

- **Real-time messaging** — receive new messages through Socket.IO.
- **User authentication** — sign-in and identity management with Clerk.
- **Conversation history** — messages are stored in MongoDB.
- **Image and video sharing** — uploads are handled by ImageKit (25 MB maximum per file).
- **Online presence** — connected users are tracked through Socket.IO.
- **Custom appearance** — light/dark mode, accent themes, and selectable wallpapers.
- **Responsive chat layout** — conversation sidebar and chat panel.
- **Docker support** — build a production image with the included Dockerfile.

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router, Tailwind CSS, HeroUI |
| State and requests | Zustand, Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | Clerk |
| Real-time | Socket.IO |
| Media storage | ImageKit |
| Deployment | Docker, Render |

## 🖼️ Application Flow

```text
React + Vite
    │ REST API / Socket.IO
    ▼
Node.js + Express ─── Clerk Authentication
    │
    ├── MongoDB (users and messages)
    ├── Socket.IO (live messages and online users)
    └── ImageKit (uploaded images and videos)
```

## 📁 Project Structure

```text
iMessage/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Auth and message handlers
│   │   ├── lib/            # Database, Socket.IO, ImageKit, cron
│   │   ├── middleware/     # Authentication and uploads
│   │   ├── models/         # User and Message schemas
│   │   ├── routes/         # API routes
│   │   ├── webhooks/       # Clerk user sync
│   │   └── index.js        # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Chat and auth UI
│   │   ├── context/        # Theme and wallpaper settings
│   │   ├── pages/          # Main pages
│   │   ├── store/          # Zustand state stores
│   │   └── lib/            # API client
│   └── package.json
├── Dockerfile
└── README.md
```

## ⚙️ Run Locally

### Requirements

- Node.js 22 or later
- npm
- MongoDB database (local or Atlas)
- Clerk account and application
- ImageKit account for image/video uploads

### 1. Clone the repository

```bash
git clone https://github.com/aanuragmmishra/iMessage.git
cd iMessage
```

### 2. Install dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure environment variables

Create **`backend/.env`**:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Create **`frontend/.env`**:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**Keep secrets private.** Never commit environment files or expose Clerk secret keys, webhook secrets, MongoDB credentials, or the ImageKit private key in frontend code.

In Clerk, configure a webhook pointing to:

```text
https://your-domain/api/webhooks/clerk
```

Subscribe to user creation, update, and deletion events so the MongoDB user profile stays synchronized. For local development, use a webhook-forwarding URL provided by your webhook tool.

### 4. Start the backend

In terminal 1:

```bash
cd backend
npm run dev
```

The backend runs at `http://localhost:3000`. Check the health endpoint:

```text
http://localhost:3000/health
```

Expected response:

```json
{"ok":true}
```

### 5. Start the frontend

In terminal 2, from the project root:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## 🔐 Environment Variables

| Variable | Used by | Purpose |
|---|---|---|
| `PORT` | Backend | HTTP and Socket.IO server port |
| `MONGO_URI` | Backend | MongoDB connection string |
| `FRONTEND_URL` | Backend | Allowed frontend origin and health-check target |
| `CLERK_PUBLISHABLE_KEY` | Backend | Clerk configuration |
| `CLERK_SECRET_KEY` | Backend | Clerk server-side secret |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Backend | Verifies Clerk webhook requests |
| `IMAGEKIT_PRIVATE_KEY` | Backend | Authorizes media uploads |
| `VITE_CLERK_PUBLISHABLE_KEY` | Frontend | Clerk client configuration |

The frontend's current Axios and Socket.IO configuration uses `http://localhost:3000` in development and same-origin paths in production. `VITE_API_URL` is not currently used by the Axios client.

## 🔌 API Overview

All message endpoints require an authenticated Clerk user.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check server status |
| `GET` | `/api/auth/check` | Check the current user |
| `GET` | `/api/messages/users` | List other users |
| `GET` | `/api/messages/conversations` | List conversation partners by recent activity |
| `GET` | `/api/messages/:id` | Fetch messages with a user |
| `POST` | `/api/messages/send/:id` | Send a text message or media file |

For media messages, send multipart form data using the field name `media`. Only image and video MIME types are accepted; the upload limit is 25 MB.

## 🗃️ Data Models

- **User:** Clerk ID, email, name, profile picture, and timestamps.
- **Message:** sender ID, receiver ID, optional text/image/video URL, and timestamps.

## 🐳 Docker

Build the production image from the repository root:

```bash
docker build -t imessage .
```

Run it with your backend environment values supplied securely:

```bash
docker run --env-file backend/.env -p 3001:3001 imessage
```

The Docker image builds the frontend and backend, then serves the frontend static files and API from the same Express server. The container defaults to port `3001`; configure the required environment variables for your deployment.

## 🛠️ Troubleshooting

- **MongoDB won't connect:** check `MONGO_URI`, network access, and database credentials.
- **401 or user profile missing:** verify Clerk configuration and ensure the user webhook has synchronized the profile.
- **Media upload fails:** confirm `IMAGEKIT_PRIVATE_KEY` is set and the file is an image/video under 25 MB.
- **Frontend cannot reach the API:** ensure the backend uses port `3000` locally and `FRONTEND_URL` matches the Vite origin.
- **No live messages:** check that the Socket.IO connection is established and the user is authenticated.

## 🚀 Deployment

The repository includes a multi-stage Dockerfile suitable for deployment platforms such as Render. Configure the required environment variables in the hosting dashboard, set the service to build from the repository root, and make sure the configured port and frontend origin match your deployment setup.

**Live application:** [https://imessage-1rgs.onrender.com](https://imessage-1rgs.onrender.com)

## 🔮 Possible Improvements

Ideas for future versions:
- Read receipts and typing indicators
- Group conversations
- Message search and deletion
- Automated tests and CI checks

## 👨‍💻 Author

**Anurag Mishra**  
GitHub: [@aanuragmmishra](https://github.com/aanuragmmishra) · [Project Repository](https://github.com/aanuragmmishra/iMessage)

---

<div align="center">

**iMessage — Connect • Converse • Customize**

Built with ❤️ using React, Node.js, Express, MongoDB, Clerk, Socket.IO, and ImageKit.

</div>
