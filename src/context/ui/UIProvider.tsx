'use client'
import { FC, useReducer } from 'react'
import { UIContext, UIReducer } from '../'

export interface UIContextProps {
    children: React.ReactNode
}

export interface UIState {
    sideBarOpen: boolean
}

export const UI_INITIAL_STATE: UIState = {
    sideBarOpen: false
}

export const UIProvider: FC<UIContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

    const toggleSideBar = (sideBarOpen: boolean) => {
        dispatch({ type: '[UI] - Toggle SideBar', payload: sideBarOpen })
    }

    return (
        <UIContext.Provider
            value={{
                ...state,
                toggleSideBar
            }}
        >
            {children}
        </UIContext.Provider>
    );
};
