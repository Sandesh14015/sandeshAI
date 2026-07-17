# 🗄️ Database Design

> Database architecture for Sandesh AI

---

# Overview

Sandesh AI uses **Cloud Firestore** as its primary database.

Firestore was selected because it provides:

- Real-time synchronization
- Automatic scaling
- Tight integration with Firebase Authentication
- Flexible NoSQL document model
- Offline support (future)
- Secure access control through Firestore Security Rules

The database is designed to support:

- User management
- AI conversations
- Personality configuration
- Long-term memory
- Knowledge management
- User preferences
- Future AI features

---

# Database Philosophy

The database should follow these principles:

- Keep documents small
- Avoid duplicate data
- Use subcollections where appropriate
- Store metadata instead of large files
- Make reads predictable
- Optimize for scalability

---

# Root Collections

```
users/
```

Currently, the application uses a single root collection.

Future versions may introduce:

```
analytics/

models/

workflows/

agents/

system/
```

---

# Users Collection

```
users/

    {uid}
```

Every authenticated user has exactly one document.

Example

```json
{
  "displayName": "Sandesh",
  "email": "sandesh@example.com",
  "avatar": "/avatar.png",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

# User Document Structure

```
users/

    {uid}

        profile

        settings

        personality

        conversations

        memories

        knowledge
```

Each section has a single responsibility.

---

# Profile

Stores user identity.

```
users/

    uid/

        profile
```

Fields

| Field | Type |
|--------|------|
| displayName | string |
| email | string |
| avatar | string |
| createdAt | timestamp |
| updatedAt | timestamp |

---

# Settings

Stores application preferences.

```
settings
```

Fields

| Field | Type |
|--------|------|
| theme | string |
| model | string |
| temperature | number |
| responseLength | string |
| memoryEnabled | boolean |

---

# Personality

Stores AI personality traits.

The personality engine loads this document before generating responses.

Fields

| Field | Type |
|--------|------|
| name | string |
| communicationStyle | string |
| confidence | number |
| humor | number |
| sarcasm | number |
| friendliness | number |
| curiosity | number |
| emojiUsage | boolean |
| swearingLevel | string |
| technicalDepth | number |
| interests | array |

Example

```json
{
  "name": "Sandesh AI",
  "communicationStyle": "Casual",
  "confidence": 9,
  "humor": 7,
  "sarcasm": 4,
  "friendliness": 9,
  "curiosity": 10,
  "emojiUsage": true,
  "swearingLevel": "Low",
  "technicalDepth": 10,
  "interests": [
    "Cybersecurity",
    "Artificial Intelligence",
    "Programming",
    "Startups"
  ]
}
```

---

# Conversations

```
users/

    uid/

        conversations/

            conversationId
```

Fields

| Field | Type |
|--------|------|
| title | string |
| createdAt | timestamp |
| updatedAt | timestamp |

---

# Messages

Each conversation contains a messages subcollection.

```
messages/

    messageId
```

Fields

| Field | Type |
|--------|------|
| role | string |
| content | string |
| timestamp | timestamp |
| model | string |
| tokens | number (future) |

Example

```json
{
  "role": "assistant",
  "content": "Hello! How can I help you today?",
  "timestamp": "...",
  "model": "gemini-2.5-pro"
}
```

---

# Memories

Long-term memory is independent from conversations.

```
users/

    uid/

        memories/

            memoryId
```

Fields

| Field | Type |
|--------|------|
| title | string |
| summary | string |
| category | string |
| importance | number |
| createdAt | timestamp |
| updatedAt | timestamp |

Example

```json
{
  "title": "Favorite Programming Language",
  "summary": "The user prefers TypeScript for frontend development.",
  "category": "Preference",
  "importance": 8
}
```

---

# Knowledge

Stores metadata for uploaded files.

```
users/

    uid/

        knowledge/

            documentId
```

Fields

| Field | Type |
|--------|------|
| title | string |
| fileName | string |
| fileType | string |
| storagePath | string |
| uploadedAt | timestamp |

Actual files are stored in Firebase Storage.

---

# Firebase Storage Structure

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

        avatar/profile.png

        knowledge/resume.pdf

        knowledge/project.md
```

---

# Relationships

```
User
│
├── Profile
├── Settings
├── Personality
├── Conversations
│     └── Messages
├── Memories
└── Knowledge
```

---

# Read Flow

```
User

↓

Authentication

↓

Profile

↓

Settings

↓

Personality

↓

Conversation

↓

Messages

↓

Render UI
```

---

# Write Flow

```
User Message

↓

Conversation Service

↓

Firestore

↓

AI Response

↓

Firestore

↓

UI
```

---

# Query Strategy

Optimize queries by:

- Reading only required documents
- Using subcollections
- Ordering by timestamps
- Limiting conversation history
- Paginating long conversations

Avoid downloading unnecessary data.

---

# Indexing

Recommended composite indexes:

### Conversations

```
updatedAt DESC
```

### Messages

```
timestamp ASC
```

### Memories

```
importance DESC
```

### Knowledge

```
uploadedAt DESC
```

---

# Naming Conventions

Collections

```
camelCase
```

Documents

```
Auto-generated IDs
```

Fields

```
camelCase
```

Example

```
createdAt

updatedAt

communicationStyle
```

---

# Security

Every user should only access their own documents.

Firestore Rules should ensure:

```
users/{uid}
```

is only accessible when

```
request.auth.uid == uid
```

No user should ever read another user's data.

---

# Future Database Expansion

## Version 2

```
embeddings/

chunks/

retrieval/
```

---

## Version 3

```
voiceProfiles/

audioHistory/

voiceSettings/
```

---

## Version 4

```
agents/

tasks/

toolCalls/

browserSessions/
```

---

## Version 5

```
calendar/

emails/

github/

integrations/

mcp/
```

---

# Database Principles

Always:

- Normalize data where practical
- Keep documents lightweight
- Store files in Storage, not Firestore
- Separate UI logic from data access
- Use service classes for all database operations
- Prefer timestamps over strings for dates
- Design for future scalability

---

# Final Database Overview

```
users/
│
├── profile
├── settings
├── personality
├── conversations
│     └── messages
├── memories
└── knowledge

Firebase Storage
│
└── users/
      └── uid/
            ├── avatar/
            ├── knowledge/
            └── documents/
```

---

# Version

Database Version: **1.0**

Database Engine: **Cloud Firestore**

Storage Engine: **Firebase Storage**

Status: **Production Design**