import { createContext } from 'react';
import Web3 from 'web3';
import { Web3State } from './Web3Provider';

interface ContextProps {
    web3: any;
    handleWeb3: (provider: any, providerString: string | null) => void;
    handleAccount: (account: string) => void;
    handleChainId: (chainId: number) => void;
    handleToken: (authToken: string, authTimeOut: string) => void;
}

export const Web3Context = createContext({} as ContextProps)