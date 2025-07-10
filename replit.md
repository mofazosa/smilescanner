# SmileScan - Dental Health Education App

## Overview

SmileScan is a full-stack web application designed to promote dental health education through image analysis and comprehensive educational resources. The application allows users to upload dental photos for educational analysis and provides extensive dental care tips organized by categories.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dental-themed design system
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **File Uploads**: Multer middleware for handling image uploads
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Development**: tsx for TypeScript execution in development

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **File Storage**: Local filesystem storage for uploaded images
- **In-Memory Fallback**: MemStorage class for development/testing

## Key Components

### Database Schema
```typescript
// Users table for authentication
users: {
  id: serial primary key
  username: text unique not null
  password: text not null
}

// File uploads tracking
uploads: {
  id: serial primary key
  filename: text not null
  originalName: text not null
  size: integer not null
  mimeType: text not null
  uploadedAt: timestamp default now()
}

// Dental care tips content
tips: {
  id: serial primary key
  title: text not null
  category: text not null
  description: text not null
  content: text[] not null (array)
  color: text not null
}
```

### Core Features
1. **Image Upload System**: File upload with validation for image types (10MB limit)
2. **Educational Content**: Categorized dental tips with search functionality
3. **Mock Analysis**: Educational analysis results for uploaded images
4. **Responsive Design**: Mobile-first approach with adaptive layouts
5. **Component Library**: Comprehensive UI component system

### API Endpoints
- `GET /api/tips` - Retrieve dental tips (with optional category/search filters)
- `POST /api/upload` - Handle image upload with file validation

## Data Flow

1. **File Upload Process**:
   - User selects image → Frontend validation → Multer processing → File storage → Database record → Analysis simulation

2. **Tips System**:
   - Category selection → API request → Database query → Filtered results → Component rendering

3. **Search Flow**:
   - Search input → Debounced query → API request → Full-text search → Results display

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **drizzle-orm**: Type-safe ORM
- **express**: Web server framework
- **multer**: File upload handling
- **wouter**: Lightweight routing

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development plugins
- **tsx**: TypeScript execution
- **tailwindcss**: Utility-first CSS framework
- **vite**: Build tool and dev server

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push`

### Environment Configuration
- **Development**: NODE_ENV=development with tsx execution
- **Production**: NODE_ENV=production with compiled JavaScript
- **Database**: DATABASE_URL environment variable required

### File Structure
```
├── client/           # Frontend React application
├── server/           # Backend Express server
├── shared/           # Shared TypeScript types and schemas
├── uploads/          # File upload directory
├── migrations/       # Database migration files
└── dist/            # Production build output
```

## Changelog
- July 08, 2025. Initial setup
- January 08, 2025. Added safety features: professional consultation warning after 3 uploads, restored original logo design
- January 08, 2025. User needs permanent hosting solution for Instagram sharing

## User Preferences

Preferred communication style: Simple, everyday language.
User Goal: Share SmileScan app on Instagram with permanent link that works 24/7.