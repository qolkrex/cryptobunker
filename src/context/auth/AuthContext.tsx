import { createContext } from 'react';
import { AUTH_STATUS } from './AuthProvider';
import { User } from '@prisma/client';
// import { User } from '@/utils/models/user.model';

interface ContextProps {
    user: User | null;
    isLogged: boolean;
    status: AUTH_STATUS,
    handleSignup: (name: string, email: string, password: string) => void;
    handleLogin: (email: string, password: string) => void;
    handleGoogleSignIn: () => void;
    handleGoogleSignUp: () => void;
    handleLogOut: () => void;
}

export const AuthContext = createContext({} as ContextProps)
