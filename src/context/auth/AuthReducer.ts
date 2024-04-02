import { User } from "@prisma/client";
import { AUTH_STATUS, AuthState } from "../";

type AuthActionType =
  | { type: "[Auth] - Checking" }
  | { type: "[Auth] - Login"; payload: { username: string; password: string } }
  | { type: "[Auth] - Logout" }
  | {
      type: "[Auth] - Is Login";
      payload: { isLogged: boolean; user: User | null };
    }
  | {
      type: "[Auth] - Register";
      payload: { username: string; password: string };
    };

export const AuthReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Checking":
      return {
        ...state,
        status: AUTH_STATUS.CHECKING,
      };
    case "[Auth] - Login":
      return {
        ...state,
      };
    case "[Auth] - Logout":
      return {
        ...state,
        user: null,
        status: AUTH_STATUS.NOT_AUTHENTICATED,
      };
    case "[Auth] - Register":
      return {
        ...state,
        // user:action.payload
      };
    case "[Auth] - Is Login":
      return {
        ...state,
        isLogged: action.payload.isLogged,
        user: action.payload.user,
        status: AUTH_STATUS.AUTHENTICATED,
      };

    default:
      return state;
  }
};
