import { useState } from "react";
import { IProps, IPreloader } from "./interfaces";
import { PreloaderContext } from "./PreloaderContext";

const INIT_STATE: IPreloader = {
	preloader: false,
};

export const PreloaderProvider = ({ children }: IProps) => {
	const [preloader, setPreloader] = useState(INIT_STATE);

	const handlePreloader = (value: boolean):void => {
		setPreloader({
			preloader: value,
		});
	};

	return (
		<PreloaderContext.Provider value={{ preloader, handlePreloader }}>
			{children}
		</PreloaderContext.Provider>
	);
};
