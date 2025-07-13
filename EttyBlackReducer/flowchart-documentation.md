# Application Flow Documentation

## User Flow Diagram

```
┌─────────────────┐
│   Application   │
│    Startup      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Layout        │
│   Component     │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐      ┌─────────────────┐
│   User Check    │ No   │   Login         │
│   Authenticated?├─────▶│   Component     │
└─────────┬───────┘      └─────────┬───────┘
          │ Yes                    │
          ▼                        │ Login Success
┌─────────────────┐                │
│   Main App      │◀───────────────┘
│   Navigation    │
└─────────┬───────┘
          │
          ▼
    ┌─────────┐    ┌─────────────┐    ┌─────────────┐
    │ All     │    │ Add Recipe  │    │ Update User │
    │ Recipes │    │             │    │             │
    └─────────┘    └─────────────┘    └─────────────┘
```

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────────┐  │
│  │    Redux    │    │   Context    │    │  Local State   │  │
│  │   (Recipes) │    │   (User)     │    │  (Components)  │  │
│  └─────────────┘    └──────────────┘    └────────────────┘  │
│          │                   │                    │         │
│          ▼                   ▼                    ▼         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                Components Layer                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │ HTTP Requests (fetch/axios)
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                   Backend (Node.js/Express)                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────────┐  │
│  │  Auth       │    │   Recipe     │    │  Middleware    │  │
│  │  Routes     │    │   Routes     │    │  (CORS, etc.)  │  │
│  └─────────────┘    └──────────────┘    └────────────────┘  │
│          │                   │                    │         │
│          ▼                   ▼                    ▼         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │               JSON File Storage                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Component Interaction Flow

### 1. Authentication Flow
```
Login Component → UserContext → User Reducer → API Call → Update State
                                                    ↓
UserProfile ← User Component ← Context State Update
```

### 2. Recipe Management Flow
```
AddRecipe Form → Yup Validation → Redux Action → API Call → Store Update
                                                      ↓
AllRecipes Component ← Redux State Subscription ← Store Update
```

### 3. Navigation Flow
```
Router → Layout → NavBar → Route Selection → Component Rendering
              ↓
         UserContext Provider → Child Components
```

## Error Handling Flow

```
┌─────────────────┐
│   API Call      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐      ┌─────────────────┐
│   Try/Catch     │ Err  │   Error State   │
│   Block         ├─────▶│   Update        │
└─────────┬───────┘      └─────────┬───────┘
          │ Success                │
          ▼                        ▼
┌─────────────────┐      ┌─────────────────┐
│   Success       │      │   User          │
│   State Update  │      │   Notification  │
└─────────────────┘      └─────────────────┘
```

## Form Validation Flow

```
User Input → React Hook Form → Yup Schema → Validation Result
                                               ↓
                                          Error Display
                                               ↓
                                          Form Submission (if valid)
```

## Key Features Implementation

### React Hooks Used
- `useState`: Local component state
- `useEffect`: Side effects, API calls
- `useContext`: User authentication state
- `useReducer`: Complex state management (user data)
- `useRef`: Direct DOM access (legacy form fields)

### TypeScript Features
- Strict mode enabled
- Interface definitions for all data types
- Generic type parameters
- Proper type inference
- Error handling with typed catch blocks

### Material-UI Integration
- Theme-consistent styling
- Responsive design patterns
- Accessibility features
- Icon integration
- Modal dialogs for forms

### State Management Patterns
- Redux for global state (recipes)
- Context for authentication
- Local state for UI components
- Form state with React Hook Form