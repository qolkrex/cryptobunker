"use client"
import Web3 from "web3";
import { FC, useCallback, useEffect, useMemo, useReducer } from "react";
import { Web3Context } from "./Web3Context";
import { Web3Reducer } from "./Web3Reducer";

interface ProviderProps {
    children: React.ReactNode;
    // handleWeb3: (provider: any, providerString: string | null) => void;
}

export interface Web3State {
    // web3: Web3 | null;
    web3: any;
    account: string;
    network: Web3;
    wallet: any;
    provider: any;
    providerString: string;
    chainId: any;
    authToken: string;
    authTimeOut: string;
}

export const web3InitialState: Web3State = {
    web3: null,
    account: "",
    network: new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545")),
    // network: new Web3(new Web3.providers.HttpProvider("https://testnet.bscscan.com/")),
    wallet: null,
    provider: null,
    providerString: "",
    chainId: null,
    authToken: "",
    authTimeOut: "",
};


export const Web3Provider: FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(Web3Reducer, web3InitialState);

    // console.log(state)

    const handleWeb3 = useCallback((provider: any, providerString: any) => {
        dispatch({
            type: "[Web3] - provider",
            payload: {
                web3: provider === null ? null : new Web3(provider),
                provider,
                providerString,
            },
        });
    }, []);

    const handleAccount = useCallback((account: any) => {
        dispatch({
            type: "[Web3] - account",
            payload: account,
        });
    }, []);

    const handleChainId = useCallback((chainId: any) => {
        dispatch({
            type: "[Web3] - chainId",
            payload: chainId,
        });
    }, []);

    const handleToken = useCallback(
        (authToken: any, authTimeOut: any) => {
            dispatch({
                type: "[Web3] - token",
                payload: {
                    authToken,
                    authTimeOut,
                },
            });
        },
        []
    );

    useEffect(() => {
        try {
            const getAccounts = async () => await state.wallet?.eth.getAccounts();
            if (state.wallet !== null) {
                getAccounts().then((accounts) => handleAccount(accounts[0]));
            }

        } catch (error) {
            console.log(error);
        }
    }, [state.wallet, handleAccount]);

    useEffect(() => {
        try {
            if (state.account !== "" && state.account !== undefined) {
                const getChainId = async () => await state.wallet?.eth?.getChainId();
                getChainId().then((chainId) => {
                    console.log("chainId", chainId);
                    handleChainId(`0x${ Number(chainId).toString(16) }`);
                });
            }

        } catch (error) {
            console.log(error);
        }
    }, [state.wallet, state.account, handleChainId]);

    const web3 = useMemo(() => state, [state]);
    return (
        <Web3Context.Provider
            value={{ web3, handleWeb3, handleAccount, handleChainId, handleToken }}
        >
            {children}
        </Web3Context.Provider>
    );
};
