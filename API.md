# 🌐 API Reference

> Internal API specification for Sandesh AI

---

# Overview

Sandesh AI follows a service-oriented architecture.

The frontend never communicates directly with Firebase or an AI provider.

Instead, every request flows through an API layer that is responsible for:

- Authentication
- Validation
- Authorization
- Business Logic
- AI Communication
- Database Operations

---

# Architecture

```
                User
                  │
                  ▼
         Next.js Frontend
                  │
                  ▼
          API Route Layer
                  │
        ┌─────────┼──────────┐
        ▼         ▼          ▼
 Chat Service  Memory Service  Knowledge Service
        │         │          │
        └─────────┼──────────┘
                  ▼
        AI Provider Interface
                  │
                  ▼
      OpenAI / Gemini / Claude
                  │
                  ▼
            Cloud Firestore
                  │
                  ▼
         Firebase Storage
```

---

# API Philosophy

Every endpoint should:

- Return consistent responses
- Validate incoming data
- Authenticate users
- Never expose secrets
- Be provider-independent
- Be easy to extend

---

# Base URL

Development

```
http://localhost:3000/api
```

Production

```
https://your-domain.com/api
```

---

# Standard Response Format

## Success

```json
{
    "success": true,
    "data": {},
    "message": "Operation completed successfully."
}
```

---

## Error

```json
{
    "success": false,
    "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
    }
}
```

---

# Authentication APIs

## POST /api/auth/login

Authenticate a user.

Request

```json
{
    "provider": "google"
}
```

---

## POST /api/auth/logout

Ends the current session.

---

## GET /api/auth/profile

Returns the authenticated user's profile.

Response

```json
{
    "displayName": "Sandesh",
    "email": "user@example.com",
    "avatar": "/avatar.png"
}
```

---

# Chat APIs

## POST /api/chat

Generate an AI response.

Request

```json
{
    "conversationId": "abc123",
    "message": "Explain Zero Trust Architecture."
}
```

---

### Internal Flow

```
Request

↓

Authentication

↓

Load Personality

↓

Load Memories

↓

Load Conversation

↓

Build Prompt

↓

AI Provider

↓

Save Response

↓

Return Stream
```

---

Response

```json
{
    "response": "Zero Trust is..."
}
```

---

## POST /api/chat/regenerate

Regenerate the previous AI response.

---

## DELETE /api/chat/{conversationId}

Delete an entire conversation.

---

# Conversation APIs

## GET /api/conversations

Returns all conversations.

---

Response

```json
[
    {
        "id":"abc123",
        "title":"Cybersecurity",
        "updatedAt":"..."
    }
]
```

---

## POST /api/conversations

Create a new conversation.

---

## PATCH /api/conversations/{id}

Rename conversation.

---

## DELETE /api/conversations/{id}

Delete conversation.

---

# Message APIs

## GET /api/conversations/{id}/messages

Returns every message.

---

## POST /api/conversations/{id}/messages

Adds a message.

---

# Personality APIs

## GET /api/personality

Returns the AI personality.

---

Example

```json
{
    "communicationStyle":"Casual",
    "confidence":9,
    "humor":8
}
```

---

## PATCH /api/personality

Update personality.

---

Request

```json
{
    "humor":10,
    "emojiUsage":true
}
```

---

# Memory APIs

## GET /api/memories

Returns all memories.

---

## POST /api/memories

Create memory.

Request

```json
{
    "title":"Favorite Framework",
    "summary":"Prefers Next.js",
    "category":"Preference",
    "importance":9
}
```

---

## PATCH /api/memories/{id}

Update memory.

---

## DELETE /api/memories/{id}

Delete memory.

---

# Knowledge APIs

## GET /api/knowledge

Returns uploaded files.

---

## POST /api/knowledge/upload

Upload file.

Supported

- PDF
- TXT
- DOCX
- Markdown

---

Request

```
multipart/form-data
```

---

Internal Flow

```
Upload

↓

Storage

↓

Firestore Metadata

↓

Return Document
```

---

## DELETE /api/knowledge/{id}

Delete document.

---

# Settings APIs

## GET /api/settings

Returns user settings.

---

## PATCH /api/settings

Update settings.

Request

```json
{
    "theme":"dark",
    "model":"gemini-2.5-pro",
    "temperature":0.7
}
```

---

# AI Provider APIs

These APIs are internal only.

The frontend should never call OpenAI or Gemini directly.

```
Chat Service

↓

AI Provider Interface

↓

OpenAI

Gemini

Claude
```

---

# Internal Service Layer

```
API Route

↓

Validation

↓

Business Service

↓

Firebase

↓

AI Provider
```

---

# Validation

Every request should validate:

- Authentication
- Required fields
- Input length
- File type
- File size
- Permissions

Reject invalid requests before reaching Firebase.

---

# Error Codes

| Code | Description |
|-------|-------------|
| UNAUTHORIZED | User not logged in |
| FORBIDDEN | Access denied |
| INVALID_REQUEST | Invalid payload |
| NOT_FOUND | Resource missing |
| INTERNAL_ERROR | Unexpected server error |
| AI_PROVIDER_ERROR | LLM failed |
| STORAGE_ERROR | Upload failed |
| FIRESTORE_ERROR | Database failure |

---

# Streaming Responses

The chat endpoint should support streaming.

```
User

↓

POST /chat

↓

AI Provider Stream

↓

Frontend

↓

Render Tokens
```

This provides a ChatGPT-like experience.

---

# API Versioning

Current

```
v1
```

Future

```
/api/v2
```

Major changes should introduce a new version instead of breaking existing APIs.

---

# Security

Every API should:

- Verify Firebase Authentication
- Validate ownership of requested resources
- Never expose API keys
- Never trust client-provided user IDs
- Sanitize all input

---

# Future APIs

These endpoints are planned for later versions.

## Voice

```
POST /api/voice/transcribe

POST /api/voice/synthesize
```

---

## Avatar

```
POST /api/avatar/animate

POST /api/avatar/render
```

---

## Browser Automation

```
POST /api/browser/run
```

---

## GitHub

```
GET /api/github/repos

POST /api/github/commit
```

---

## Calendar

```
GET /api/calendar/events

POST /api/calendar/event
```

---

## Email

```
GET /api/email

POST /api/email/send
```

---

## MCP

```
POST /api/mcp/connect

POST /api/mcp/tool
```

---

# API Design Principles

Every endpoint should:

- Be RESTful
- Return typed responses
- Be provider-independent
- Use consistent naming
- Remain stateless
- Be modular
- Support future scalability

---

# Final API Flow

```
User
 │
 ▼
Next.js UI
 │
 ▼
API Route
 │
 ▼
Authentication
 │
 ▼
Business Service
 │
 ├───────────────┐
 ▼               ▼
Firestore     Storage
 │               │
 └──────┬────────┘
        ▼
Prompt Builder
        │
        ▼
AI Provider Interface
 ├── OpenAIProvider
 ├── GeminiProvider
 └── ClaudeProvider
        │
        ▼
LLM Response
        │
        ▼
Firestore
        │
        ▼
Return Response
```

---

# Version

API Version: **v1.0**

Status: **Active Development**

Framework: **Next.js Route Handlers**

Backend: **Firebase**

Language: **TypeScript**