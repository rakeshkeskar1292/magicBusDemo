# Magic Bus Frontend

Modern responsive admin dashboard built with **Vite**, **React**, **TypeScript**, and **Material-UI (MUI)**.

## Features

✅ **Responsive Design** - Mobile, tablet, and desktop optimized  
✅ **Component-Based Architecture** - Modular, reusable components  
✅ **Material-UI Integration** - Professional UI components  
✅ **TypeScript** - Type-safe development  
✅ **Vite** - Fast build tool and development server  
✅ **React Router** - Client-side routing  

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (buttons, cards, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   └── layout/         # Layout components (header, sidebar)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── utils/              # Utility functions
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component
```

## Prerequisites

- Node.js v16 or higher
- npm, yarn, or pnpm

## Installation

```bash
cd frontend
npm install
# or
pnpm install
# or
yarn install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Technologies

- **Vite** - Next generation frontend tooling
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI v5** - Component library
- **Emotion** - CSS-in-JS
- **React Router v6** - Routing
- **Axios** - HTTP client

## Connecting to Backend

The API is configured to proxy requests to `http://localhost:8080/api`. Update the `API_BASE_URL` in [src/services/api.ts](src/services/api.ts) if your backend runs on a different port.

## Component Development Guidelines

1. **Create modular components** - Each component should be in its own folder with `index.tsx`
2. **Use TypeScript** - Define prop types with interfaces
3. **Responsive design** - Use MUI's responsive utilities
4. **Styling** - Use MUI's `sx` prop or Emotion for styling

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
VITE_API_URL=http://localhost:8080/api
```

## License

MIT
