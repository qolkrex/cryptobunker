'use client';
import { createContext } from 'react';

interface UIContextProps {
    sideBarOpen: boolean;
    toggleSideBar: (sideBarOpen: boolean) => void;
}

export const UIContext = createContext({} as UIContextProps)