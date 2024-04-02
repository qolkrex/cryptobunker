
import { useContext, useEffect } from "react";
import { CONTRACTS } from "../../../config";
import { CHAIN_ID_BSC_TESTNET, CHAIN_ID_MAINNET_BNB } from '../../../config/constants/networks';
import { CoinContext, PreloaderContext, Web3Context } from "../../../context";


import { getBalance } from "../../../utils/balance";
import { chainIdValidate } from "../../../utils/connectionValidate";
import { allowance } from "../../../utils/er20";
import { swapMethod } from "../../../utils/swapRouter";
import { changeNetwork } from "../../../utils/wallet";

import { useDeadline } from "@/hooks/useDearline";
import { useEventsProvider } from "@/hooks/useEventsProvider";
import { toast } from "react-toastify";
import { getChainId } from "@/utils/contract/contractInteraction";
import { useWallet } from "@/hooks/useWalletContext";

interface SwapButtonProps {
    coinValue: any;
    approvate: number;
    balance: number;
    values: any;
    slipage: number;
    route: any;
    reset: () => void;
    setApprovate: (value: number) => void;
    handleApprove: (
        wallet: any,
        account: string,
        token: string,
        contract: string
    ) => void;
}

//TODO: GMK 8 decimals in recieve token

export const SwapButton: React.FC<SwapButtonProps> = ({
    coinValue,
    approvate,
    balance,
    values,
    slipage,
    route,
    reset,
    setApprovate,
    handleApprove,
}) => {
    const { web3, handleChainId, handleAccount } = useContext(Web3Context);
    const { handlePreloader } = useContext(PreloaderContext);
    const { coins, handlePrice } = useContext(CoinContext);
    const { address } = useWallet();
    console.log(address)
    const { deadline } = useDeadline();
    const { accountsChanged, chainChanged } = useEventsProvider(
        handleAccount,
        handleChainId
    );

    const handleSwap = () => {
        // swapMethod(web3.wallet, route, values, web3.account, slipage)
        swapMethod(web3.wallet, coins, values, web3.account, slipage, deadline)
            .then((resolve) => {
                if (resolve.transactionHash !== undefined) {
                    reset();
                    // getBalance(web3.wallet, web3.chainId, coinValue.id, web3.account);
                    getBalance(web3.networkMorv, web3.chainId, coinValue.id, web3.account);
                    toast("success", resolve.transactionHash.substring(0, 25));
                }
                handlePreloader(false);
            })
            .catch((e) => {
                console.log(e);
                // handlePreloader(false);
                toast("Se rechazo  la transacción");
            });
    };

    useEffect(() => {
        getChainId().then((res: bigint) => {
            console.log(chainIdValidate(res, CHAIN_ID_BSC_TESTNET))
        })
        console.log(chainIdValidate(web3.chainId, CHAIN_ID_BSC_TESTNET))
        web3.account != "" &&
            web3.wallet !== null &&
            chainIdValidate(web3.chainId, CHAIN_ID_MAINNET_BNB) &&
            // chainIdValidate(web3.chainId, CHAIN_ID) &&
            allowance(web3.wallet, web3.account, coinValue.id, CONTRACTS.swap)
                .then((resolve) => {
                    resolve > 0 ? setApprovate(resolve) : setApprovate(0);
                })
                .catch((e) => console.log(e));
    }, [coinValue.id, web3.account, web3.wallet, web3.chainId, setApprovate]);

    useEffect(() => {
        handlePrice();
        web3.provider?.on("accountsChanged", accountsChanged);
        return () =>
            web3.provider?.removeListener("accountsChanged", accountsChanged);
    }, [handleAccount, web3.provider, accountsChanged]);

    useEffect(() => {
        handlePrice();
        web3.provider?.on("chainChanged", chainChanged);
        return () => web3.provider?.removeListener("chainChanged", chainChanged);
    }, [handleChainId, web3.provider, chainChanged]);

    return (
        <div className="flex flex-col gap-2 text-xl">
            {!web3.account && (
                <button className="bg-primary py-4 px-10 rounded-xl" >
                    <p>
                        Conectate
                    </p>
                </button>
            )}

            {web3.account && !chainIdValidate(web3.chainId, CHAIN_ID_MAINNET_BNB) && (
                // {web3.account && !chainIdValidate(web3.chainId, CHAIN_ID) && (
                <button
                    className="bg-primary py-4 px-10 rounded-xl"
                    onClick={() =>
                        // changeNetwork(web3.wallet, handleChainId, NETWORK_MAINNET)
                        changeNetwork(web3.wallet, handleChainId, "bsctestnet")
                    }
                >
                    <p>
                        Cambiar de red
                    </p>
                </button>
            )}

            {web3.account &&
                values.token0 === "" &&
                chainIdValidate(web3.chainId, CHAIN_ID_MAINNET_BNB) && (
                    // chainIdValidate(web3.chainId, CHAIN_ID) && (
                    <button className="bg-primary py-4 px-10 rounded-xl"
                    >
                        <p>
                            Ingresa un monto
                        </p>
                    </button>
                )}

            {web3.account &&
                values.token0 !== "" &&
                balance < parseInt(values.token0) &&
                // chainIdValidate(web3.chainId, CHAIN_ID) && (
                chainIdValidate(web3.chainId, CHAIN_ID_MAINNET_BNB) && (
                    <button className="py-4 px-10 rounded-xl bg-red-500">
                        <p>
                            Saldo insuficiente {coinValue.id}
                        </p>
                    </button>
                )}

            {web3.account &&
                values.token0 !== "" &&
                balance >= parseInt(values.token0) &&
                approvate === 0 &&
                chainIdValidate(web3.chainId, CHAIN_ID_MAINNET_BNB) && (
                    // chainIdValidate(web3.chainId, CHAIN_ID) && (
                    <button
                        className="bg-primary py-4 px-10 rounded-xl"
                        onClick={() =>
                            handleApprove(
                                // web3.networkMorv,
                                web3.wallet,
                                web3.account,
                                coinValue.id,
                                CONTRACTS.swap
                            )
                        }
                    >
                        <p>
                            Aprobar
                        </p>
                    </button>
                )}

            {web3.account &&
                values.token0 !== "" &&
                balance >= parseInt(values.token0) &&
                approvate > 0 &&
                chainIdValidate(web3.chainId, CHAIN_ID_MAINNET_BNB) && (
                    // chainIdValidate(web3.chainId, CHAIN_ID) && (
                    <button
                        className="bg-primary py-4 px-10 rounded-xl"
                        onClick={handleSwap}>
                        <p>Swap</p>
                    </button>
                )}
        </div>
    );
};
