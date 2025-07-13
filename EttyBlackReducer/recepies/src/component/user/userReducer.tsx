import { createContext, Dispatch } from "react";

export type UserType = {
    avatarUrl: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
  };
// Action type definition
type Action =
  | {
      type: 'SIGNUP';
      data: Pick<UserType, 'id' | 'email' | 'password'>;
    }
  | {
      type: 'LOGIN';
      data: UserType;
    }
  | {
      type: 'LOGOUT';
    }
  | {
      type: 'UPDATE';
      data: Partial<UserType>;
    };

// Reducer function
const userReducer = (state: UserType, action: Action): UserType => {
  switch (action.type) {
    case 'SIGNUP':
      return { ...state, ...action.data };
    case 'LOGIN':
      return { ...state, ...action.data };
    case 'LOGOUT':
      return {} as UserType;
    case 'UPDATE':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default userReducer;

// Initial state
export const initialState: UserType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    avatarUrl: ""
};

// Context creation
export const UserContext = createContext<{
  state: UserType;
  dispatch: Dispatch<Action>;
 
}>({
  state: initialState,
  dispatch: () => null,
});