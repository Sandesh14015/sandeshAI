# AI Layer

The AI layer is designed around a **Provider Abstraction Pattern**.

The frontend and business logic should never communicate directly with a specific LLM provider.

Instead, all AI requests pass through a common interface, making it easy to switch providers or support multiple models without changing the rest of the application.

## AI Architecture

```
                 User
                   │
                   ▼
              Chat Window
                   │
                   ▼
             Chat Service
                   │
                   ▼
        AI Provider Interface
          ├── OpenAIProvider
          ├── GeminiProvider
          └── ClaudeProvider
                   │
                   ▼
           AI Generated Response
                   │
                   ▼
             Conversation Service
                   │
                   ▼
               Cloud Firestore
```

---

## Why this architecture?

The application should **never depend on a single AI provider**.

Benefits include:

- Easy switching between AI providers
- Support for multiple models
- Reduced vendor lock-in
- Easier testing and mocking
- Cleaner codebase
- Future-proof architecture

---

## AI Provider Interface

Every provider should implement the same interface.

Example:

```typescript
interface AIProvider {
  generateResponse(request: ChatRequest): Promise<ChatResponse>;
}
```

This ensures that every provider behaves consistently regardless of the underlying API.

---

## Provider Implementations

### OpenAI Provider

Responsible for communicating with the OpenAI API.

Responsibilities:

- Build API request
- Handle streaming responses
- Parse response
- Return standardized output

---

### Gemini Provider

Responsible for communicating with Google's Gemini API.

Responsibilities:

- Generate responses
- Handle streaming
- Return standardized output

---

### Claude Provider

Responsible for communicating with Anthropic Claude.

Responsibilities:

- Generate responses
- Handle streaming
- Return standardized output

---

## Chat Flow

```
User

↓

Chat Window

↓

Chat Service

↓

Load Personality

↓

Load Memories

↓

Load Conversation History

↓

Build Final System Prompt

↓

AI Provider Interface

↓

Selected Provider
(OpenAI / Gemini / Claude)

↓

LLM Response

↓

Conversation Service

↓

Cloud Firestore

↓

Display Response
```

---

## Future Providers

The architecture should make it easy to add additional providers.

Example:

```
AI Provider Interface

├── OpenAIProvider
├── GeminiProvider
├── ClaudeProvider
├── OllamaProvider
├── LMStudioProvider
├── AzureOpenAIProvider
└── GroqProvider
```

No other part of the application should require modification when adding a new provider.

---

## Recommended Folder Structure

```
services/
│
├── ai/
│   ├── provider.interface.ts
│   ├── provider.factory.ts
│   ├── openai.provider.ts
│   ├── gemini.provider.ts
│   ├── claude.provider.ts
│   └── index.ts
│
├── chat.service.ts
├── conversation.service.ts
├── memory.service.ts
├── knowledge.service.ts
└── personality.service.ts
```

---

## Design Principle

> **Depend on abstractions, not implementations.**

The rest of the application communicates only with the `AIProvider` interface, never directly with OpenAI, Gemini, Claude, or any future model.

This ensures Sandesh AI remains scalable, maintainable, and adaptable as the AI ecosystem evolves.


                   User
                     │
                     ▼
            Next.js Frontend
                     │
                     ▼
              Firebase Auth
                     │
                     ▼
              Chat Service
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
 Personality    Memory Service   Knowledge Service
     │               │               │
     └───────┬───────┴───────┬───────┘
             ▼               ▼
      Prompt Builder   Cloud Firestore
             │
             ▼
     AI Provider Interface
     ├── OpenAI
     ├── Gemini
     └── Claude
             │
             ▼
        AI Response
             │
             ▼
    Conversation Service
             │
             ▼
      Cloud Firestore
             │
             ▼
        Render in UI