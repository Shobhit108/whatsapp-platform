# AI-Powered WhatsApp CRM Platform

An AI-powered business messaging platform that enables businesses to manage WhatsApp customer conversations, organize contacts, and automate responses using AI.

## Live Demo

**Frontend:**
https://whatsapp-platform-nine.vercel.app

**Backend API:**
https://whatsapp-platform-7ofm.onrender.com

## GitHub Repository

https://github.com/Shobhit108/whatsapp-platform

---

## Features

### WhatsApp Cloud API Integration

* Integrated Meta WhatsApp Cloud API
* Send and receive WhatsApp messages
* Webhook configuration and verification
* Incoming and outgoing messages stored in MongoDB
* Real-time WhatsApp communication

### Contact Management

* Add contacts
* Edit contacts
* Delete contacts
* Search contacts
* Contact tags support

### Shared Inbox

* View conversations
* Open chats
* Send messages
* View complete message history

### AI Auto Reply

* AI-generated responses using OpenAI API
* Fallback automated response when quota is unavailable
* AI responses displayed inside conversations
* WhatsApp auto reply support

### Dashboard

* Total Contacts
* Total Conversations
* Total Messages
* Total AI Responses

---

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Framer Motion
* Material UI
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* OpenAI API
* Axios

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Shobhit108/whatsapp-platform.git
cd whatsapp-platform
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
WHATSAPP_ACCESS_TOKEN=your_meta_access_token
PHONE_NUMBER_ID=your_phone_number_id
WEBHOOK_VERIFY_TOKEN=your_custom_token
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

Run frontend:

```bash
npm run dev
```

---

## Architecture Overview

```text
WhatsApp User
      ↓
Meta Webhook
      ↓
Express Backend
      ↓
MongoDB Database
      ↓
AI Response Service (OpenAI)
      ↓
WhatsApp Cloud API
      ↓
CRM Frontend Dashboard
```

---

## Database Design

### Contact Model

* name
* phone
* tags

### Conversation Model

* contact
* lastMessage
* lastMessageAt

### Message Model

* conversation
* contact
* direction
* type
* body
* status
* timestamps

---

## AI Tools Used

* ChatGPT (Development assistance & debugging)
* OpenAI API (AI auto responses)

---

## Key Technical Decisions

1. Used WhatsApp Cloud API instead of unofficial libraries for reliability.

2. Used Redux Toolkit for centralized state management.

3. Added fallback AI response handling when OpenAI quota is exceeded.

4. Used MongoDB for flexible schema management and conversation storage.

5. Deployed frontend and backend separately for scalability.

---

## Challenges Faced

* Webhook routing issues with Meta dashboard
* WhatsApp Business Account configuration
* Real-time webhook debugging
* React Router refresh issue on deployment
* OpenAI quota handling
