export interface IProps {
	children: JSX.Element | JSX.Element[] 
}

export interface IPreloader {
	preloader: boolean,
}

export interface PreloaderContextProps {
	preloader: IPreloader;
	handlePreloader: (value: boolean) => void;
};
