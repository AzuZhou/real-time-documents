# Real-Time Document Management

A document management app with real-time WebSocket notifications. Built with vanilla TypeScript (no frameworks) as per challenge requirements.

## Features

- View documents in list or grid layout
- Real-time notifications when others create documents
- Create new documents (saved to localStorage)
- Sort by name, version, or creation date
- Auto-hide notification badge after 10s of inactivity

## Tech Stack

- **TypeScript** - Type safety without a framework
- **Vite** - Build tool and dev server only (not a framework)
- **WebSockets** - Real-time notifications
- **Vitest** - Fast unit testing
- **Plain CSS** - Modern CSS with variables, no preprocessor needed

## Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Go runtime** (for running the backend server)

### Setup

```bash
# Install dependencies
npm install
```

### Run the App

```bash
# Terminal 1: Start backend server
cd server
go run server.go

# Terminal 2: Start frontend
npm run dev

# Open http://localhost:3000 in your browser
```

### Run Tests

```bash
npm test
```

## Architecture

### File Structure

```
src/
├── main.ts              # Entry point
├── documents.ts         # List rendering
├── documentsControls.ts # Sort/view toggle
├── createDocument.ts    # Form handling
├── api/                 # HTTP calls
├── state/               # State management
├── ui/                  # Reusable components
├── websocket/           # WebSocket connection
└── styles/              # CSS files
```

### Key Decisions

**No Framework**: Challenge requirement. Used module pattern for components and simple state management. Vite is only used as a build tool, not as a framework.

**State Management**: Module-level state with controlled mutations. Simple and testable without library overhead.

```typescript
let documents: Document[] = [];
export const getDocuments = () => documents;
export const addDocument = (document) => { ... };
```

**Data Attributes for UI State**: Used `data-*` attributes (dataset API) for managing UI state like view modes and loading states. This keeps visual state in the DOM where CSS can react to it directly.

```typescript
// JavaScript updates state
main.dataset.activeSection = "documents-container";
documentsList.dataset.viewMode = "grid";
container.dataset.state = "loaded";

// CSS responds to state
#documents[data-active-section="documents-container"] { display: block; }
[data-view="grid"] { display: grid; }
[data-state="loaded"] #loading { display: none; }
```

**Benefits**: Instant visual updates without re-rendering, clear separation between data state (JavaScript) and visual state (DOM/CSS).

**Data Normalization**: API returns PascalCase (Go convention), normalized to camelCase at the boundary for idiomatic JavaScript.

**WebSocket Handling**:

- Filters heartbeat messages (`{"type":"ping"}`)
- Auto-reconnects on disconnect (3s delay)
- Prevents duplicate connections

**Notification UX**: Badge accumulates count and auto-hides 10s after last notification. Prevents visual clutter with frequent notifications.

**Sorting**:

- Semantic version sort (`1.9.0` < `1.10.0`) using `localeCompare` with numeric option
- Default: newest first (`createdAt-desc`)
- Re-applies sort after adding documents

**CSS-Only View Toggle**: Switching list/grid just changes a data attribute. CSS handles the rest—instant, no re-render.

**Testing**: Unit tests for business logic (API, state, WebSocket). DOM rendering tested manually.

## Libraries Used

Only two testing libraries:

- **Vitest**: Faster than Jest, works seamlessly with Vite
- **Happy-DOM**: Lightweight DOM for tests (vs heavier jsdom)

Everything else is vanilla TypeScript. Vite is only used for bundling and dev server.

## Known Limitations

- WebSocket only works locally (server runs on localhost)
- No document editing (per requirements)
- No authentication
- localStorage limit ~5-10MB (~1000-5000 documents)

---

Built as a frontend engineering challenge. Demonstrates vanilla TypeScript architecture, state management, WebSocket handling, and testing practices without framework dependencies.
