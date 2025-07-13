# Component Structure Documentation

## Component Table

| Component Name | Location | Lines | Purpose | Key Features |
|---------------|----------|-------|---------|-------------|
| App | src/App.tsx | 14 | Main application component | Redux Provider, Router setup |
| Router | src/Router.tsx | 27 | Route configuration | React Router v7, Layout structure |
| Layout | src/component/center/Layout.tsx | 37 | Main layout wrapper | UserContext Provider, NavBar, User management |
| NavBar | src/component/NavBar.tsx | 34 | Navigation component | Menu items, routing |
| AllRecipes | src/component/center/AllRecipes.tsx | 162 | Recipe listing and display | Redux state, recipe selection, MUI cards |
| AddRecipe | src/component/center/AddRecipe.tsx | 125 | Recipe creation form | React Hook Form, Yup validation, Redux dispatch |
| Login | src/component/user/Login.tsx | 155 | User authentication | Context integration, API calls, MUI modal |
| User | src/component/user/User.tsx | 19 | User state management | Context consumer, conditional rendering |
| UserData | src/component/user/UserData.tsx | 56 | User information display | Context integration |
| UserProfile | src/component/user/UserProfile.tsx | 120 | User profile component | Context integration, user info display |
| UpdateUser | src/component/user/UpdateUser.tsx | 122 | User profile editing | Axios HTTP calls, form handling, MUI modal |
| userReducer | src/component/user/userReducer.tsx | 68 | User state management | useReducer, TypeScript types, Context creation |

## Technology Stack

### Frontend Technologies
- **React**: ^18.3.1 (with peer dependency support for React 19)
- **TypeScript**: ~5.6.2 (strict mode enabled)
- **Material-UI**: ^6.2.1 (@mui/material, @mui/icons-material)
- **React Router**: ^7.1.1 (latest version)
- **Redux Toolkit**: ^2.8.2 (for recipe state management)
- **React Hook Form**: ^7.60.0 (with Yup validation)
- **Yup**: ^1.6.1 (schema validation)
- **Axios**: ^1.7.9 (HTTP client)
- **Vite**: ^6.0.1 (build tool)

### State Management
- **User Authentication**: Context + useReducer pattern
- **Recipe Management**: Redux Toolkit with async thunks
- **Form Validation**: React Hook Form + Yup schema validation

### Backend Technologies
- **Node.js**: Express.js server
- **CORS**: Cross-origin resource sharing
- **JSON**: File-based data storage

## Architecture Notes

### Component Organization
- **center/**: Main content components (recipes, layout)
- **user/**: User-related components (auth, profile)
- **store/**: Redux store configuration and slices

### State Management Strategy
- **Local UI State**: useState for component-specific state
- **User State**: Context + useReducer for authentication
- **Recipe State**: Redux Toolkit for global recipe management
- **Form State**: React Hook Form for complex form validation

### Error Handling
- API error handling with try-catch blocks
- Form validation with Yup schemas
- Redux error state management
- User feedback through MUI Alert components