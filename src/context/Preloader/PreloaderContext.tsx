import { createContext } from "react";
import { PreloaderContextProps } from "./interfaces";

export const PreloaderContext = createContext<PreloaderContextProps>(
	{} as PreloaderContextProps
);
