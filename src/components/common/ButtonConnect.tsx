'use client';
import { TypeOptions, toast } from "react-toastify";
import { ButtonSimple } from "./ButtonSimple";
// import { Web3Provider } from "@/context/web3/Web3Provider";
import { FC, useContext, useRef } from "react";
import { Web3Context } from "@/context/web3/Web3Context";
import DefaultModal from "./DefaultModal";
import { web3Provider } from "@/utils/web3";
import ButtonBase from "./buttons/ButtonBase";
import Image from "next/image";

interface Props {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
}

export const ButtonConnect: FC<Props> = ({ openModal, setOpenModal }) => {
    const { web3, handleAccount, handleWeb3 } = useContext(Web3Context);
    // const { message } = useToast();
    const menuLeft = useRef<any>(null);
    const message = (type: TypeOptions, message: string, autoClose: number | false) => {
        toast(message, {
            type,
            autoClose,
            position: "bottom-right"
        });
    }
    const logout = async () => {
        try {
            if (web3?.providerString === "walletconnect") {
                await web3?.provider.disconnect();
            }
            handleWeb3(null, null);
            handleAccount("");
            setOpenModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(web3?.account ?? "");
        message("info", "Se copio la dirección correctamente", 1000);
    };
    const validate = (providerString: string) => {
        web3Provider(handleWeb3 as any, providerString);
        setOpenModal(false);
    }

    return (
        <>
            {
                openModal && web3?.account &&
                <DefaultModal setOpenModal={setOpenModal}>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Wallet Connect</h1>
                        <ButtonSimple handleProp={logout} content={"Disconnect Wallet"} />
                        <ButtonSimple handleProp={copy} content={"Direction Copy"} />
                    </div>
                </DefaultModal>
            }
            {
                <>
                    {/* <ButtonBase
                        variant={"alert"}
                        onClick={() => {
                            web3?.account ? setOpenModal(true) : validate("metamask")
                        }}
                        className="rounded-full bg-white justify-center items-center flex gap-2 px-4 py-2 text-black"
                    >
                        <Image
                            src="/img/metamask.png"
                            alt="metamask"
                            width={30}
                            height={30}
                        />
                        {
                            web3?.account && `${ web3?.account.substring(0, 10) }...`
                        }
                    </ButtonBase> */}
                </>
            }
        </>
    )
}
