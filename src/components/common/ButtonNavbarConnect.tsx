"use client";
import { TypeOptions, toast } from "react-toastify";
import { ButtonSimple } from "./ButtonSimple";
// import { Web3Provider } from "@/context/web3/Web3Provider";
import { Web3Context } from "@/context/web3/Web3Context";
import { useUserLogged } from "@/hooks/useUserLogged";
import { useWallet } from "@/hooks/useWalletContext";
import { web3Provider } from "@/utils/web3";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { FC, useContext, useEffect, useRef, useState } from "react";
import DefaultModal from "./DefaultModal";
import ButtonBase from "./buttons/ButtonBase";

interface Props {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

export const ButtonNavbarConnect: FC<Props> = ({ openModal, setOpenModal }) => {
  const { web3, handleAccount, handleWeb3 } = useContext(Web3Context);
  const { address, setAddress } = useWallet();
  const router = useRouter();
  const { data } = useSession();
  const { user } = useUserLogged((data?.user?.id as string) || "");
  const [addressConnected, setAddressConnected] = useState("");
  // const { message } = useToast();
  const menuLeft = useRef<any>(null);
  const message = (
    type: TypeOptions,
    message: string,
    autoClose: number | false
  ) => {
    toast(message, {
      type,
      autoClose,
      position: "bottom-right",
    });
  };
  const logout = async () => {
    localStorage.removeItem("addressConnected");
    setAddressConnected("");
    setAddress("");
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
    navigator.clipboard.writeText(data?.user?.address || "");
    message("info", "Se copio la dirección correctamente", 1000);
  };
  const validate = (providerString: string) => {
    web3Provider(handleWeb3 as any, providerString);
    setOpenModal(false);
  };

  const items: MenuItem[] = data?.user?.isMetamask
    ? [
        {
          label: "Cuenta",
          className: "flex md:hidden",
          items: [
            {
              label: "Mi Perfil",
              icon: "pi pi-fw pi-user",
              className: "flex md:hidden",
              command: () => {
                router.push("/dashboard/profile");
              },
            },
            {
              label: "Configuración",
              icon: "pi pi-fw pi-cog",
              className: "flex md:hidden",
              command: () => {
                router.push("/dashboard/settings");
              },
            },
          ],
        },
        {
          label: "Opciones",
          items: [
            {
              label: "Copiar Address",
              icon: "pi pi-fw pi-copy",
              command: () => {
                copy();
              },
            },
            // {
            //   label: "Configuración",
            //   icon: "pi pi-fw pi-cog",
            //   command: () => {
            //     console.log("configuracion");
            //   },
            // },
            {
              label: "Desconectar",
              icon: "pi pi-sign-out",
              command: () => {
                logout();
                signOut()
              },
            },
          ],
        },
      ]
    : [
        // {
        //   label: "Cuenta",
        //   items: [
        //     // {
        //     //   label: "Conectar Metamask",
        //     //   icon: "pi pi-fw pi-plus",
        //     //   command: () => {
        //     //     validate("metamask");
        //     //   },
        //     // },
        //     // {
        //     //   label: "Conectar WalletConnect",
        //     //   icon: "pi pi-fw pi-plus",
        //     //   command: () => {
        //     //     validate("walletconnect");
        //     //   },
        //     // },
        //   ],
        // },
        {
          label: "Opciones",
          items: [
            {
              label: "Copiar Address",
              icon: "pi pi-fw pi-copy",
              command: () => {
                copy();
              },
            },
            // {
            //   label: "Configuración",
            //   icon: "pi pi-fw pi-cog",
            //   command: () => {
            //     console.log("configuracion");
            //   },
            // },
          ],
        },
      ];

  useEffect(() => {
    if (data?.user?.isMetamask) {
      if (localStorage.getItem("addressConnected")) {
        const handleAccountsChanged = (accounts: string[]) => {
          setAddressConnected(accounts[0]);
          setAddress(accounts[0]);
          localStorage.setItem("addressConnected", accounts[0]);
        };

        const checkAndSetAddress: any = async () => {
          try {
            const accounts = await (window as any).ethereum.request({
              method: "eth_accounts",
            });

            if (accounts.length > 0) {
              setAddressConnected(accounts[0]);
              setAddress(accounts[0]);
              localStorage.setItem("addressConnected", accounts[0]);
            }
          } catch (error) {
            console.error("Error fetching accounts:", error);
          }
        };
        checkAndSetAddress();
        // Add event listener for accountsChanged
        if ((window as any).ethereum)
          (window as any).ethereum.on("accountsChanged", handleAccountsChanged);
        // Cleanup function
        return () => {
          // Remove event listener when the component is unmounted
          if ((window as any).ethereum)
            (window as any).ethereum.off(
              "accountsChanged",
              handleAccountsChanged
            );
        };
      }
    }
  }, [data]); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (!(window as any).ethereum) {
      if (data?.user?.address) {
        setAddress(data.user.address);
      }
    }
  }, [data]);

  // if change address in metamask logout
  useEffect(() => {
    if (
      address &&
      user.address &&
      user.address.toLowerCase() !== address.toLowerCase()
    ) {
      console.log(user.address !== address);
      console.log(user.address);
      console.log(address);
      logout();
      signOut();
      console.log("logout");
    }
  }, [address]);

  return (
    <>
      {openModal && web3?.account && (
        <DefaultModal setOpenModal={setOpenModal}>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Wallet Connect</h1>
            <ButtonSimple handleProp={logout} content={"Disconnect Wallet"} />
            <ButtonSimple handleProp={copy} content={"Direction Copy"} />
          </div>
        </DefaultModal>
      )}
      {
        <>
          {data?.user?.isMetamask ? (
            <ButtonBase
              variant={"alert"}
              onClick={async (event) => {
                address ? menuLeft.current.toggle(event) : validate("metamask");
                if ((window as any).ethereum) {
                  const accounts = await (window as any).ethereum.request({
                    method: "eth_accounts",
                  });

                  if (accounts.length > 0) {
                    setAddressConnected(accounts[0]);
                    setAddress(accounts[0]);
                    localStorage.setItem("addressConnected", accounts[0]);
                  }
                }
              }}
              className="rounded-full bg-white flex items-center gap-2 px-3 py-0 text-black hover:text-white h-[52px]"
            >
              <Image
                src="/img/metamask.png"
                alt="metamask"
                width={30}
                height={30}
                className="size-7"
              />
              <span className="ml-2">
                {data?.user?.address ? `${data.user.address.substring(0, 10)}...` : "Connect Wallet"}
              </span>
            </ButtonBase>
          ) : (
            <ButtonBase
              variant={"alert"}
              onClick={async (event) => {
                menuLeft.current.toggle(event);
              }}
              className="rounded-full bg-white flex items-center gap-2 px-3 py-0 text-black hover:text-white"
            >
              <span className="ml-2">
                {data?.user?.address ? `${data.user.address.substring(0, 10)}...` : "Connect Wallet"}
              </span>
            </ButtonBase>
          )}

          <Menu
            model={items}
            popup
            ref={menuLeft}
            id="popup_menu_left"
            className="mt-2"
          />
        </>
      }
    </>
  );
};
