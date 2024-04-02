export interface ISwap {
	slipage: number;
	setOpen: (open: boolean) => void;
	reserves:any;
}

export interface ISwapValues {
	token0: string;
	token1: string;
}
