"use client"
import { createContext } from "react";


export interface IUserLoggedContextProps {
    userLogged: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      address: string;
      country: string;
      phone: string;
      verified: string;
      createdAt: Date;
      role: [];
    }
    setUserLogged: (userLogged: boolean) => void;
}

export const UserLoggedContext = createContext<IUserLoggedContextProps | undefined>(undefined);