import { FC, createContext, useRef } from "react";

interface InputProviderProps {
    children: React.ReactNode;
}

interface InputContextProps {
    inputRef: any;
}

export const InputContext = createContext({} as InputContextProps);

export const InputProvider: FC<InputProviderProps> = ({ children }) => {
    const inputRef = useRef(null);

    return (
        <InputContext.Provider value={{ inputRef }}>
            {children}
        </InputContext.Provider>
    );
};
