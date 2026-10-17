# 💬 iMessage

> A real-time, full-stack messaging application with a polished, desktop-inspired interface, live chat updates, media sharing, and customizable themes and wallpapers.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge)](https://clerk.com/)

## 📌 Overview

**iMessage** is a full-stack, real-time messaging web application. It provides authenticated users with a chat interface for finding other users, opening conversations, viewing message history, and exchanging text, images, and videos.

The application combines a **React + Vite** frontend with a **Node.js + Express** backend. MongoDB stores user profiles and messages, Clerk handles identity and authentication, Socket.IO delivers new messages and online-user updates in real time, and ImageKit stores uploaded media.

The interface includes a set of appearance controls—light and dark mode, accent-theme presets, wallpapers, and optional keyboard sounds—to make the chat experience configurable.

> **Repository:** [aanuragmmishra/iMessage](https://github.com/aanuragmmishra/iMessage)

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🧠 Application Architecture](#-application-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [▶️ Running the Application](#️-running-the-application)
- [🐳 Docker Deployment](#-docker-deployment)
- [🔐 Authentication and User Synchronization](#-authentication-and-user-synchronization)
- [💬 Real-Time Messaging Flow](#-real-time-messaging-flow)
- [🖼️ Media Upload Flow](#️-media-upload-flow)
- [🗄️ Database Models](#️-database-models)
- [🔌 API Routes](#-api-routes)
- [🎨 Themes, Wallpapers, and Sound](#-themes-wallpapers-and-sound)
- [🧯 Troubleshooting](#-troubleshooting)
- [🎯 Key Learning Outcomes](#-key-learning-outcomes)
- [🔮 Future Improvements](#-future-improvements)
- [👨‍💻 Author](#-author)

---

## ✨ Features

### Messaging and conversations
- 💬 One-to-one conversations between authenticated users
- 🕘 Fetch and display message history in chronological order
- 🗂️ Conversation sidebar ordered by the latest message activity
- 👥 User list for starting conversations
- ⚡ Real-time message delivery using Socket.IO
- 🟢 Online-user presence updates while clients connect or disconnect
- 📝 Text messages
- 🖼️ Image messages
- 🎥 Video messages
- 🔔 Toast notifications for relevant request failures
- 📱 Responsive chat layout with a sidebar and conversation panel

### Authentication and user profiles
- 🔐 Clerk-powered authentication
- 🛡️ Protected backend routes
- 👤 User profiles synchronized from Clerk into MongoDB using a webhook
- 🧾 Store a user's Clerk identifier, email, display name, and profile picture
- 🔏 Webhook signature verification before processing Clerk events

### Media and appearance
- ☁️ ImageKit integration for hosted chat media
- 📦 Upload images and videos up to 25 MB per file
- 🌗 Light and dark appearance modes
- 🎨 Accent-theme presets, including Default, Sky, Lavender, Mint, Netflix, Uber, Spotify, Coinbase, Airbnb, Discord, and Rabbit
- 🏞️ Built-in desktop and abstract wallpapers
- 💾 Store appearance preferences in browser local storage
- ⌨️ Keyboard typing-sound support with a user preference
- 🧩 Reusable React components for the chat, authentication, theme, and wallpaper UI

---

## 🧠 Application Architecture

The project is organized into a frontend SPA and an Express backend. During local development, Vite runs the frontend and the backend runs separately. The backend uses the same HTTP server for Express endpoints and Socket.IO. In the provided Docker setup, the frontend is built as static files and served by Express from the backend's `public` directory.

```text
                         ┌────────────────────────┐
                         │       Web Browser      │
                         │ React + Vite frontend  │
                         └───────────┬────────────┘
                                     │ HTTP / JSON
                                     │ Socket.IO
                                     ▼
                         ┌────────────────────────┐
                         │ Express + Node.js API  │
                         │   REST routes + CORS   │
                         └──────┬─────────┬───────┘
                                │         │
                    ┌───────────┘         └─────────────┐
                    ▼                                   ▼
        ┌─────────────────────┐              ┌─────────────────────┐
        │ Clerk Authentication│              │     Socket.IO        │
        │ Auth middleware     │              │ Live message events  │
        │ Verified webhooks   │              │ Online-user presence │
        └───────────┬─────────┘              └─────────────────────┘
                    │
                    ▼
        ┌─────────────────────┐       ┌─────────────────────┐
        │      MongoDB        │       │      ImageKit       │
        │ User profiles       │       │ Image/video hosting │
        │ Message history     │       │ Media URLs          │
        └─────────────────────┘       └─────────────────────┘
```

### Main responsibilities

| Component | Responsibility |
|---|---|
| React + Vite | Renders authentication and chat pages and builds the client application |
| Zustand | Manages client-side authentication and chat state |
| Axios | Sends API requests to the backend |
| Clerk | Authenticates users and provides user identity |
| Express | Exposes the REST API and serves the built frontend in the Docker configuration |
| Authentication middleware | Resolves the Clerk identity to a MongoDB user and protects chat endpoints |
| MongoDB + Mongoose | Stores local user profiles and messages |
| Socket.IO | Sends real-time new-message events and broadcasts online-user lists |
| Multer | Validates and temporarily receives image/video uploads in memory |
| ImageKit | Hosts uploaded media and returns URLs stored with messages |
| Cron | In production, periodically requests the configured `/health` endpoint |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — component-based UI
- **Vite** — development server and production build
- **React Router** — client-side navigation
- **Tailwind CSS 4** — utility-first styling
- **HeroUI** — UI components and theme styling
- **Zustand** — lightweight application state management
- **Axios** — HTTP client for the API
- **Socket.IO Client** — real-time events
- **Clerk React** — client-side authentication integration
- **Lucide React** — icons
- **React Hot Toast** — notifications

### Backend
- **Node.js** — JavaScript runtime
- **Express 5** — HTTP server and REST endpoints
- **Socket.IO** — bidirectional real-time communication
- **Mongoose** — MongoDB object modeling
- **Clerk Express** — server-side authentication integration
- **Multer** — multipart file handling
- **ImageKit Node SDK** — media uploads
- **CORS** — frontend origin configuration
- **dotenv** — environment-variable loading
- **cron** — scheduled health requests in production

### Infrastructure and services
- **MongoDB / MongoDB Atlas** — persistent data store
- **Clerk** — identity and user-management service
- **ImageKit** — image and video hosting
- **Docker** — multi-stage container build
- **GitHub** — source-code hosting

---

## 📂 Project Structure

```text
iMessage/
├── .dockerignore
├── .gitignore
├── Dockerfile
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── build.js
│   └── src/
│       ├── index.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── message.controller.js
│       ├── lib/
│       │   ├── cron.js
│       │   ├── db.js
│       │   ├── imagekit.js
│       │   └── socket.js
│       ├── middleware/
│       │   ├── auth.middleware.js
│       │   └── upload.middleware.js
│       ├── models/
│       │   ├── message.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   └── message.route.js
│       ├── seeds/
│       │   └── user.seed.js
│       └── webhooks/
│           └── clerk.webhook.js
│
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    ├── public/
    │   ├── auth.png
    │   ├── logo.png
    │   ├── sounds/
    │   └── wallpapers/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── components/
        │   ├── auth/
        │   │   └── Authentication UI components
        │   ├── chat/
        │   │   └── Chat UI components
        │   ├── AppLogo.jsx
        │   ├── PageLoader.jsx
        │   ├── ThemePresetPicker.jsx
        │   ├── ThemeToggle.jsx
        │   └── WallpaperPicker.jsx
        ├── context/
        │   ├── ThemeContext.jsx
        │   ├── WallpaperContext.jsx
        │   ├── theme.js
        │   └── wallpaper.js
        ├── data/
        │   ├── herouiThemePresets.js
        │   └── wallpapers.js
        ├── hooks/
        ├── lib/
        │   ├── axios.js
        │   ├── imagekit.js
        │   └── utils.js
        ├── pages/
        │   ├── AuthPage.jsx
        │   └── ChatPage.jsx
        └── store/
            ├── useAuthStore.js
            └── useChatStore.js
```

*The tree highlights the main application files; some component and hook subfolders contain additional files.*

---

## ⚙️ Prerequisites

Before running the project locally, install or prepare the following:

1. **Node.js 22 or later** — the repository's Dockerfile uses Node 22.
2. **npm** — included with Node.js.
3. **MongoDB** — either a local MongoDB server or a MongoDB Atlas connection string.
4. **Clerk application** — obtain the publishable key and configure the application for the frontend and backend.
5. **Clerk webhook** — configure a webhook that sends user lifecycle events to `/api/webhooks/clerk`.
6. **ImageKit account** — required for image/video messages; configure the private key on the backend.
7. **Git** — to clone the repository.

The chat media upload flow requires valid ImageKit backend credentials. MongoDB and Clerk must be configured for authenticated chat functionality.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aanuragmmishra/iMessage.git
cd iMessage
```

### 2. Install backend dependencies

Open a terminal at the repository root:

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open a second terminal at the repository root, or return to the root in your current terminal:

```bash
cd frontend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend/` directory and add the required backend settings. Create a `frontend/.env` file for the public client-side settings.

Use the templates below and replace each placeholder with the credentials and URLs from your own services.

---

## 🔑 Environment Variables

### `backend/.env`

```env
# HTTP server
PORT=3000
NODE_ENV=development

# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>

# Frontend origin allowed by CORS
FRONTEND_URL=http://localhost:5173

# Clerk server-side authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk webhook signing secret
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret

# ImageKit media uploads
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### `frontend/.env`

```env
# Public Clerk key used by the frontend
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Optional API base override.
# Leave unset for the frontend's development default (http://localhost:3000/api).
# In production, an empty value lets the app call /api on the same host.
VITE_API_URL=
```

**Important configuration notes**

- `PORT=3000` matches the frontend's current development API and Socket.IO target (`http://localhost:3000`).
- `FRONTEND_URL=http://localhost:5173` allows Vite's local origin through backend CORS.
- The frontend key uses the `VITE_` prefix because Vite exposes prefixed variables to client-side code. Treat it as a public publishable key; **never put private secrets in frontend environment variables**.
- Keep Clerk's secret key, webhook signing secret, database credentials, and ImageKit private key on the backend only.
- The Clerk webhook endpoint is `/api/webhooks/clerk`. Configure the webhook in Clerk and copy its signing secret into `CLERK_WEBHOOK_SIGNING_SECRET`.
- Do not commit `.env` files or paste real credentials into issues, screenshots, or documentation.

> **Note:** The backend imports Clerk's Express middleware and the webhook verifier. Use the Clerk keys and webhook configuration appropriate for the Clerk SDKs installed in this repository.

---

## ▶️ Running the Application

Run the frontend and backend in separate terminals during local development.

### Terminal 1 — Start the backend

```bash
cd backend
npm run dev
```

The backend uses Node's watch mode and starts the HTTP/Socket.IO server on the `PORT` configured in `backend/.env` (for the setup above, `http://localhost:3000`).

You can verify that the server responds with:

```text
http://localhost:3000/health
```

A successful health response looks like:

```json
{
  "ok": true
}
```

### Terminal 2 — Start the frontend

```bash
cd frontend
npm run dev
```

Vite prints its local address in the terminal. With its default configuration, the development site is generally available at:

```text
http://localhost:5173
```

Open the URL printed by Vite in your browser.

### Production build checks

Build the frontend:

```bash
cd frontend
npm run build
```

Run the frontend linter:

```bash
npm run lint
```

The backend includes a build script that copies the source directory to `backend/dist`:

```bash
cd backend
npm run build
```

For an ordinary local development session, use the two development servers rather than the production build scripts.

---

## 🐳 Docker Deployment

The repository includes a multi-stage `Dockerfile` that builds the Vite frontend, prepares the backend source, and produces a runtime image. At runtime, Express serves the built frontend from `public/` and exposes the API and Socket.IO from the same server.

The Dockerfile sets the container port to `3001` and accepts the frontend's public Clerk key as a build argument.

### Build the image

From the repository root:

```bash
docker build \
  --build-arg VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key \
  -t imessage .
```

### Run the container

Pass backend secrets as runtime environment variables:

```bash
docker run --rm -p 3001:3001 \
  -e PORT=3001 \
  -e NODE_ENV=production \
  -e FRONTEND_URL=https://your-public-app-domain.example \
  -e MONGO_URI='your_mongodb_connection_string' \
  -e CLERK_PUBLISHABLE_KEY='your_clerk_publishable_key' \
  -e CLERK_SECRET_KEY='your_clerk_secret_key' \
  -e CLERK_WEBHOOK_SIGNING_SECRET='your_clerk_webhook_signing_secret' \
  -e IMAGEKIT_PRIVATE_KEY='your_imagekit_private_key' \
  imessage
```

Then open `http://localhost:3001` for the app and `http://localhost:3001/health` to test the server.

Replace the example public domain and every placeholder before deploying. For hosting platforms, configure the same variables through their secret/environment-variable settings rather than hard-coding them into the image.

---

## 🔐 Authentication and User Synchronization

iMessage uses **Clerk** for identity and authentication. The backend's `protectRoute` middleware reads the authenticated Clerk `userId`, looks up the matching local MongoDB user by `clerkId`, and attaches that user to `req.user` before allowing a protected chat request to proceed.

### User synchronization lifecycle

1. A user signs up or updates their profile through Clerk.
2. Clerk sends a webhook event to `/api/webhooks/clerk`.
3. The backend verifies the webhook signature using `CLERK_WEBHOOK_SIGNING_SECRET`.
4. For `user.created` and `user.updated`, the backend upserts the user's Clerk ID, email, full name, and profile image in MongoDB.
5. For `user.deleted`, the local user profile is removed.
6. Protected chat endpoints can then resolve the Clerk identity to a local MongoDB profile.

If a request arrives before a local profile has been synchronized, the authentication middleware returns an error indicating that the user profile is not yet available. Confirm the webhook URL and signing secret if new users cannot access chat.

### Security practices
- Keep all private service keys in backend environment variables.
- Keep chat APIs behind the authentication middleware.
- The webhook verifier validates the event signature before the backend trusts its contents.
- Configure CORS for the actual frontend origin.
- Use HTTPS and correctly configured production secrets in a deployed environment.

---

## 💬 Real-Time Messaging Flow

```text
User opens iMessage
        │
        ▼
Clerk authenticates the session
        │
        ▼
Backend maps Clerk user ID to MongoDB User
        │
        ▼
Frontend loads users and conversations
        │
        ▼
User opens a conversation
        │
        ▼
Frontend requests message history
        │
        ▼
User sends text or media
        │
        ▼
Express validates authentication and handles request
        │
        ├── Media attached? ──► ImageKit upload
        │
        ▼
Message saved to MongoDB
        │
        ▼
Socket.IO emits "newMessage" to online recipient
        │
        ▼
Recipient's chat view updates
```

### How the real-time layer works

- The backend creates an HTTP server and attaches a Socket.IO server to it.
- A connected frontend supplies its local user ID in the Socket.IO connection query.
- The backend tracks the socket ID for each connected user and broadcasts the `getOnlineUsers` event when users connect or disconnect.
- When a message is saved, the message controller checks whether the receiver has a connected socket.
- If the receiver is online, the backend emits `newMessage` to that socket.
- The frontend subscribes to `newMessage` for the selected conversation and refreshes conversation data when messages arrive.

The current socket map stores one socket ID per user in server memory. This is a straightforward single-process presence implementation; multi-instance deployments generally need a shared Socket.IO adapter and a presence design that accounts for multiple connections per user.

---

## 🖼️ Media Upload Flow

iMessage supports image and video attachments through **Multer** and **ImageKit**.

```text
User selects an image or video
             │
             ▼
Frontend sends multipart/form-data
             │
             ▼
Multer checks MIME type and file size
             │
             ▼
Backend uploads the file to ImageKit
             │
             ▼
ImageKit returns a hosted media URL
             │
             ▼
Message record stores image/video URL
             │
             ▼
Message is returned and emitted in real time
```

### Upload rules in the current code

- Upload field name: `media`
- Accepted file MIME categories: `image/*` and `video/*`
- Maximum file size: **25 MB**
- Files are temporarily held in memory by Multer before being uploaded.
- Image URLs are saved in the message's `image` field.
- Video URLs are saved in the message's `video` field.
- The upload endpoint responds with a server error if an attachment is submitted without an ImageKit private key configured.

Configure `IMAGEKIT_PRIVATE_KEY` in the backend before testing media messages. The application stores the resulting media URL in MongoDB; the media itself is hosted by ImageKit.

---

## 🗄️ Database Models

The backend defines two principal Mongoose models.

### User model

```text
User
├── clerkId      String  (required, unique)
├── email        String  (required, unique)
├── fullName     String  (required)
├── profilePic   String
├── createdAt    Date    (Mongoose timestamp)
└── updatedAt    Date    (Mongoose timestamp)
```

`clerkId` links the local record to the identity managed by Clerk. Email is unique, while `fullName` and `profilePic` provide the information displayed in the chat interface.

### Message model

```text
Message
├── senderId     ObjectId → User (required)
├── receiverId   ObjectId → User (required)
├── text         String
├── image        String
├── video        String
├── createdAt    Date    (Mongoose timestamp)
└── updatedAt    Date    (Mongoose timestamp)
```

A message stores the sender and receiver IDs, optional text, and optional image/video URLs. Mongoose timestamps allow the UI and conversation aggregation to order activity chronologically.

### Conversation representation

The current backend does not define a separate Conversation collection. Instead, the conversation sidebar is derived from messages:

1. Find messages sent or received by the logged-in user.
2. Group by the other participant.
3. Calculate each participant's latest message time.
4. Sort conversations by latest activity.
5. Look up the participant's user profile.

This reduces duplicated conversation metadata, while the stored messages remain the source of truth for conversation history.

---

## 🔌 API Routes

The backend mounts authentication routes at `/api/auth` and message routes at `/api/messages`. Message routes use the authentication middleware.

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| `GET` | `/health` | Health check returning `{ "ok": true }` | No route-level auth |
| `GET` | `/api/auth/check` | Return the authenticated local user | Required |
| `GET` | `/api/messages/users` | List other users for the sidebar | Required |
| `GET` | `/api/messages/conversations` | Return conversation participants ordered by recent activity | Required |
| `GET` | `/api/messages/:id` | Fetch the message history with the user whose ID is `id` | Required |
| `POST` | `/api/messages/send/:id` | Send text and/or media to the user whose ID is `id` | Required |
| `POST` | `/api/webhooks/clerk` | Process verified Clerk user lifecycle events | Clerk signature |

### Sending a text message

The backend expects a JSON request body with a `text` field. The recipient's MongoDB user ID is included in the URL.

Example request shape:

```http
POST /api/messages/send/RECIPIENT_MONGODB_USER_ID
Content-Type: application/json
```

```json
{
  "text": "Hello! How are you?"
}
```

### Sending media

The media endpoint accepts `multipart/form-data` with the `media` field. The frontend's chat store sends a `FormData` payload for image/video attachments.

> These examples document the routes and payloads visible in the current source. They are not an API guarantee for future versions.

---

## 🎨 Themes, Wallpapers, and Sound

Appearance preferences are managed on the frontend.

### Light and dark mode
Users can switch between light and dark mode. The current choice is saved in browser local storage and applied to the document's theme attributes.

### Accent presets
The repository defines the following accent presets:

- Default
- Sky
- Lavender
- Mint
- Netflix
- Uber
- Spotify
- Coinbase
- Airbnb
- Discord
- Rabbit

The chosen preset is applied to the page and stored separately from the light/dark setting.

### Wallpapers
The application includes desktop-inspired and abstract background options, including Sonoma Horizon, Redwoods, Utah Evening, San Francisco Bay, Iceland Coast, New York Midtown, Ventura variants, and radial-color wallpapers. The selected wallpaper is stored under the browser's `chat-wallpaper-id` preference.

### Keyboard sounds
The project contains several local keystroke audio files. The chat store exposes a sound preference and persists it locally, so the user can keep the preference between sessions.

These theme, wallpaper, and sound preferences are client-side settings; they do not require a database write.

---

## 🧯 Troubleshooting

### 1. Backend cannot connect to MongoDB
- Confirm `MONGO_URI` is set in `backend/.env`.
- Check the URI's username, password, cluster, and database name.
- For MongoDB Atlas, ensure your current IP address is permitted in the project's network access settings.
- Restart the backend after changing environment variables.

### 2. The frontend loads but API requests fail
- Confirm the backend is running on port `3000` in local development.
- Confirm `FRONTEND_URL=http://localhost:5173` in the backend environment.
- Check the browser's Network tab for the failing request and inspect the backend terminal.
- The frontend uses `http://localhost:3000/api` as its development API base unless overridden.

### 3. Clerk sign-in works but chat says the profile is missing
- Check the Clerk webhook configuration.
- Ensure its destination is `/api/webhooks/clerk` on the backend host.
- Confirm `CLERK_WEBHOOK_SIGNING_SECRET` matches the webhook's signing secret.
- Check backend logs for webhook verification or database errors.
- Verify that MongoDB is reachable and that the webhook's user event has been processed.

### 4. Images or videos fail to send
- Check that `IMAGEKIT_PRIVATE_KEY` is present in the backend environment.
- Use an image or video file smaller than 25 MB.
- Ensure the selected file's MIME type is an image or video.
- Review the backend terminal for ImageKit upload errors.

### 5. Messages do not arrive in real time
- Confirm both clients are connected to the same backend instance.
- Check the browser console for Socket.IO connection errors.
- Verify that the backend's `FRONTEND_URL` and Socket.IO origin match the actual site origin.
- Confirm the recipient has the chat open and is connected.

### 6. Docker container starts but the app or API is unavailable
- Confirm the container port is published, for example `-p 3001:3001`.
- Confirm runtime variables such as `MONGO_URI`, Clerk secrets, and `IMAGEKIT_PRIVATE_KEY` are passed to the container.
- Check logs using `docker logs <container-id>`.
- Test the health endpoint at `/health`.

### 7. Environment changes do not take effect
Stop and restart the relevant development server after changing `.env` files. Vite variables beginning with `VITE_` are read at frontend build/start time and are included in the client bundle, so they must never contain private keys.

---

## 🎯 Key Learning Outcomes

This project demonstrates practical work with:

- Building a full-stack application with React and Express
- Organizing the codebase into frontend, routes, controllers, models, middleware, and service modules
- Creating and consuming REST APIs
- Integrating Clerk for authentication and identity
- Synchronizing external identity records through signed webhooks
- Protecting backend routes with authentication middleware
- Designing MongoDB models with Mongoose
- Fetching and sorting messages and conversation activity
- Implementing real-time messaging and online-user events with Socket.IO
- Handling multipart uploads with Multer
- Uploading media to a hosted storage service
- Managing client state with Zustand
- Using local storage for UI preferences
- Building configurable interfaces with theme and wallpaper controls
- Creating a multi-stage Docker build for frontend and backend deployment
- Configuring environment variables for local and production environments

---

## 🔮 Future Improvements

Potential next steps for the project include:

- ✅ Read receipts and delivery status
- ⌨️ Typing indicators
- 🔎 Search within messages and conversations
- 🧵 Group conversations
- 📎 More attachment types and upload progress
- 🗑️ Edit and delete message support
- 🔔 Browser notifications for incoming messages
- 📱 Further mobile UI refinements
- 🧪 Automated tests for APIs, authentication, and chat flows
- 🔒 Rate limiting and additional request validation
- 🧭 Pagination or cursor-based loading for long message histories
- 🔁 Redis-backed Socket.IO adapter for horizontal scaling
- 📈 Production observability, structured logging, and metrics
- 🚀 CI/CD workflow for linting, builds, and deployment

*These are suggestions for future development, not claims that these capabilities are already implemented.*

---

## 👨‍💻 Author

### Anurag Mishra

Computer Science Engineering Student  
Full-Stack Web Developer | Software Developer in the Making

- GitHub: [@aanuragmmishra](https://github.com/aanuragmmishra)
- Project repository: [iMessage](https://github.com/aanuragmmishra/iMessage)

---

<div align="center">

## 💬 iMessage

**Connect • Converse • Customize**

Built with ❤️ using React, Node.js, Express, MongoDB, Clerk, Socket.IO, and ImageKit.

</div>