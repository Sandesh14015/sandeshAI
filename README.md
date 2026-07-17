# 🧠 Sandesh AI

> **A Personal AI Digital Twin built with Next.js, Firebase, and Large Language Models.**

Sandesh AI is an intelligent digital twin that represents my knowledge, personality, communication style, and reasoning through natural conversations.

Unlike traditional AI chatbots, Sandesh AI is designed to evolve over time by learning from conversations, remembering important information, and using a growing knowledge base to provide contextual and personalized responses.

**Version 1** focuses on a powerful text-based AI assistant with long-term memory, configurable personality, and scalable architecture.

Future versions will introduce voice interaction, avatar animation, autonomous agents, and real-time collaboration.

---

## ✨ Features

### 🤖 AI Chat
- ChatGPT-style interface
- Streaming AI responses
- Markdown support
- Syntax-highlighted code blocks
- Regenerate responses
- Copy responses
- Conversation history

### 🧠 Personality Engine
- Dynamic personality loaded from Firestore
- Configurable communication style
- Humor and sarcasm levels
- Technical depth
- Emoji usage
- Response customization
- Personalized system prompts

### 💾 Long-Term Memory
- Persistent memories
- Editable memory entries
- Memory importance scoring
- Context-aware conversations
- Conversation summaries

### 📚 Knowledge Base
- Upload PDFs
- Upload Markdown
- Upload TXT files
- Upload DOCX files
- Firebase Storage integration
- Future-ready Retrieval-Augmented Generation (RAG)

### 🔐 Authentication
- Google Sign-In
- Email & Password Authentication
- Protected Routes
- User Profiles

### ⚙ Settings
- Theme customization
- AI model selection
- Temperature adjustment
- Memory toggle
- Personality editor
- Response length preferences

---

# 🏗 Architecture

```
                 User
                   │
                   ▼
          Next.js Frontend
                   │
                   ▼
      Firebase Authentication
                   │
                   ▼
          Cloud Firestore
          Firebase Storage
                   │
                   ▼
           API / AI Service
                   │
                   ▼
          Large Language Model
                   │
                   ▼
             AI Response
```

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Backend

- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Cloud Functions (Future)

## AI

- Configurable LLM Provider
- Prompt-based Personality Engine
- Long-Term Memory
- Knowledge Retrieval (Future)

---

# 📁 Project Structure

```
sandesh-ai/

├── app/
│
├── components/
│   ├── chat/
│   ├── dashboard/
│   ├── layout/
│   ├── personality/
│   ├── memory/
│   ├── settings/
│   └── ui/
│
├── contexts/
│
├── firebase/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── types/
│
├── utils/
│
├── prompts/
│
├── public/
│
├── docs/
│
└── README.md
```

---

# 🗂 Firestore Structure

```
users/

    {uid}

        profile/

        settings/

        personality/

        conversations/

            {conversationId}

                messages/

        memories/

        knowledge/
```

---

# 🚀 Roadmap

## ✅ Version 1

- Authentication
- AI Chat
- Conversation History
- Personality Engine
- Knowledge Upload
- Memory System
- Settings
- Modern Dashboard

---

## 🔄 Version 2

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Better Memory Ranking
- AI Modes
- Multiple Model Support

---

## 🎙 Version 3

- Voice Input
- Voice Output
- Voice Cloning
- Real-Time Conversations

---

## 👤 Version 4

- Animated Avatar
- Facial Expressions
- Lip Sync
- Webcam Interaction

---

## 🤖 Version 5

- Autonomous AI Agents
- Browser Automation
- GitHub Integration
- Calendar
- Email
- MCP Integration
- Tool Calling

---

# 🎯 Vision

Sandesh AI is more than a chatbot.

It is an evolving digital twin capable of representing my communication style, technical knowledge, memories, and decision-making process.

The long-term goal is to build an AI companion that continuously learns, grows, and collaborates while remaining transparent that it is an AI representation.

---

# 📌 Current Status

🚧 In Development

Version: **v1.0.0-alpha**

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Sandesh**

Cybersecurity Student • AI Enthusiast • Full Stack Developer

Building AI systems, cybersecurity solutions, and products that solve real-world problems.

---

> *"Build something people actually use. Improve it every day."*