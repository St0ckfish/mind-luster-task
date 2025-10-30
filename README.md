# Kanban Task Board - Mind Luster

A beautiful, feature-rich Kanban-style task management dashboard built with Next.js, TypeScript, Material UI, Zustand, and React Query.

## ✨ Features

### Kanban Board

- **4 Columns**: Backlog, In Progress, Review, and Done
- **Drag & Drop**: Smooth animations when moving tasks between columns
- **CRUD Operations**: Create, Read, Update, and Delete tasks
- **Search**: Search tasks by title or description
- **Pagination**: Load more functionality for better performance
- **React Query Caching**: Efficient data fetching and caching

### Dynamic List (Bonus)

- Add items to a dynamic list
- Validation with error messages that fade out after 2 seconds
- Delete items with smooth fade-out animations

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: @tanstack/react-query (React Query)
- **UI Library**: Material UI (@mui/material)
- **Icons**: lucide-react
- **Drag & Drop**: @hello-pangea/dnd
- **API**: json-server (local mock API)
- **Package Manager**: pnpm

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mind-luster-task
```

2. Install dependencies:

```bash
pnpm install
```

## 🚀 Running the Application

Run both the Next.js dev server and json-server concurrently:

```bash
pnpm dev
```

This will start:

- Next.js app on http://localhost:3000
- JSON Server API on http://localhost:4000

Alternatively, you can run them separately:

```bash
# Terminal 1 - Next.js
pnpm dev:next

# Terminal 2 - JSON Server
pnpm dev:api
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page with Kanban board
├── components/
│   ├── DynamicList.tsx      # Bonus: Dynamic list component
│   ├── KanbanBoard.tsx      # Main Kanban board with drag & drop
│   ├── KanbanColumn.tsx     # Individual column component
│   ├── SearchBar.tsx        # Search functionality
│   ├── TaskCard.tsx         # Individual task card
│   ├── TaskModal.tsx        # Create/Edit task modal
│   └── providers/
│       ├── MuiProvider.tsx  # Material UI theme provider
│       └── QueryProvider.tsx # React Query provider
├── hooks/
│   └── useTasks.ts          # React Query hooks for tasks
├── lib/
│   └── api/
│       └── taskApi.ts       # API functions
├── store/
│   ├── modalStore.ts        # Zustand store for modal state
│   └── searchStore.ts       # Zustand store for search state
├── types/
│   └── task.ts              # TypeScript types
└── styles/
    └── globals.css          # Global styles
```

## 🎯 Features Implementation

### Task Schema

```typescript
{
  id: string;
  title: string;
  description: string;
  column: "backlog" | "in-progress" | "review" | "done";
}
```

### API Endpoints (json-server)

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## 📝 Available Scripts

- `pnpm dev` - Run both Next.js and json-server
- `pnpm dev:next` - Run only Next.js
- `pnpm dev:api` - Run only json-server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:check` - Check code formatting
- `pnpm format:write` - Format code
