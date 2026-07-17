# 🔥 Firebase Architecture

> Backend infrastructure for Sandesh AI

---

# Overview

Firebase is the primary backend platform for **Sandesh AI Version 1**.

It provides:

- Authentication
- Database
- File Storage
- Security
- Hosting (Optional)
- Cloud Functions (Future)

The goal is to build a scalable backend while minimizing server management.

---

# Firebase Services

| Service | Purpose | Status |
|----------|----------|--------|
| Authentication | User Login | ✅ Version 1 |
| Cloud Firestore | Database | ✅ Version 1 |
| Cloud Storage | File Storage | ✅ Version 1 |
| Cloud Functions | Server Logic | 🔜 Version 2 |
| Firebase Hosting | Optional Deployment | 🔜 Future |
| App Check | Security | 🔜 Future |
| Analytics | Usage Metrics | 🔜 Future |

---

# Firebase Project

```
Project Name

sandesh-ai
```

---

# Firebase SDK

The application uses the official Firebase JavaScript SDK.

Installed packages:

```bash
npm install firebase
```

---

# Environment Variables

Create:

```
.env.local
```

Example:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=
```

Never commit these values.

---

# Project Structure

```
src/

firebase/

    firebase.ts

    auth.ts

    firestore.ts

    storage.ts

services/

    auth.service.ts

    conversation.service.ts

    memory.service.ts

    knowledge.service.ts

    personality.service.ts
```

Firebase initialization should exist **only once** inside `firebase.ts`.

---

# Firebase Responsibilities

## Authentication

Responsible for:

- Google Sign In
- Email & Password Login
- Logout
- Session Persistence
- User Authentication State

Authentication should never contain business logic.

---

## Firestore

Firestore stores structured application data.

Collections include:

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

Firestore should never store binary files.

---

## Storage

Firebase Storage stores uploaded files.

Supported file types:

- PDF
- TXT
- Markdown
- DOCX
- Images

Examples:

```
resume.pdf

notes.md

research.pdf

avatar.png
```

Firestore stores only metadata.

---

# Firestore Data Model

## users

```
users/

    uid
```

---

## profile

```
profile

{
    displayName
    email
    avatar
    createdAt
}
```

---

## settings

```
settings

{
    theme
    model
    temperature
    responseLength
    memoryEnabled
}
```

---

## personality

```
personality

{
    communicationStyle
    confidence
    humor
    sarcasm
    emojiUsage
    swearingLevel
    friendliness
    curiosity
    technicalDepth
    interests
}
```

---

## conversations

```
conversations/

    conversationId
```

Example

```
title

createdAt

updatedAt
```

---

## messages

```
messages/

    messageId
```

Example

```
role

content

timestamp
```

---

## memories

```
memories/

    memoryId
```

Example

```
title

summary

category

importance

timestamp
```

---

## knowledge

```
knowledge/

    documentId
```

Example

```
title

fileName

fileType

storagePath

uploadedAt
```

---

# Authentication Flow

```
User

↓

Login Screen

↓

Firebase Authentication

↓

User Session

↓

Firestore Profile

↓

Dashboard
```

---

# Conversation Flow

```
User Message

↓

Chat Service

↓

Firestore

Load Conversation

↓

Load Personality

↓

Load Memory

↓

Prompt Builder

↓

AI Provider

↓

Response

↓

Firestore

↓

UI
```

---

# Knowledge Upload Flow

```
Upload File

↓

Firebase Storage

↓

Receive Storage Path

↓

Save Metadata

↓

Firestore

↓

Knowledge Collection
```

Future versions will process uploaded documents for semantic retrieval.

---

# Memory Flow

```
Conversation

↓

Memory Extraction

↓

Memory Service

↓

Firestore

↓

Memory Collection
```

Future versions may automate memory extraction using the AI.

---

# Firebase Security Rules

## Firestore

Every authenticated user can access only their own data.

```
users/{uid}
```

must only be readable and writable by:

```
request.auth.uid == uid
```

---

## Storage

Users should only access files inside their own folder.

Example

```
users/{uid}/documents/

users/{uid}/avatars/
```

Public access should be disabled.

---

# Folder Organization

Recommended Storage layout:

```
users/

    uid/

        avatar/

        knowledge/

        documents/
```

Example

```
users/

    abc123/

        avatar/avatar.png

        knowledge/resume.pdf

        knowledge/project.md
```

---

# Backend Services

Business logic should never be written directly inside UI components.

Instead:

```
UI

↓

Service

↓

Firebase
```

Example

```
ChatWindow

↓

chat.service.ts

↓

conversation.service.ts

↓

Firestore
```

---

# Future Cloud Functions

Cloud Functions will be introduced when needed.

Possible use cases:

- AI request proxy
- Secure API keys
- Automatic memory generation
- Document processing
- Notifications
- Scheduled jobs
- Usage tracking

Version 1 intentionally avoids unnecessary backend complexity.

---

# Performance Strategy

Use:

- Lazy loading
- Firestore pagination
- Optimized queries
- Indexed collections
- Cached user profile
- Batched writes when appropriate

Avoid:

- Large document reads
- Nested document fetches
- Duplicate data
- Excessive listeners

---

# Offline Support

Future enhancement:

- Firestore Offline Persistence
- Cached conversations
- Cached profile
- Cached settings

---

# Error Handling

Every Firebase service should return a standardized response.

Example:

```typescript
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

Avoid exposing raw Firebase errors directly to the UI.

---

# Version 1 Scope

Included:

- Authentication
- Firestore
- Storage
- User Profiles
- Conversations
- Personality
- Memories
- Knowledge Metadata

Excluded:

- Cloud Functions
- Vector Database
- Embeddings
- Voice
- Analytics
- Notifications
- Background Jobs

---

# Future Firebase Roadmap

## Version 2

- Cloud Functions
- AI API Proxy
- Automatic Memory Creation
- Document Processing

---

## Version 3

- Push Notifications
- Usage Tracking
- Analytics
- App Check

---

## Version 4

- Scheduled Workflows
- Background Agents
- Multi-device Synchronization

---

# Engineering Principles

The Firebase layer should remain:

- Modular
- Secure
- Reusable
- Scalable
- Type Safe
- Easy to Test

Firebase should provide infrastructure only.

Business logic belongs inside the service layer.

---

# Final Architecture

```
                Next.js UI
                     │
                     ▼
             React Contexts
                     │
                     ▼
              Business Services
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
 Authentication   Firestore    Storage
        │            │            │
        └────────────┴────────────┘
                     │
                     ▼
                Firebase SDK
                     │
                     ▼
              Google Firebase
```

---

# Status

Version: **1.0**

Backend: **Firebase**

Deployment: **Next.js + Firebase Backend**

Architecture Status: **Active**

One architectural improvement I strongly recommend

Next.js UI
      │
      ▼
Chat Service
      │
      ▼
Cloud Function (Future)
      │
      ▼
AI Provider Interface
      │
      ▼
OpenAI / Gemini / Claude