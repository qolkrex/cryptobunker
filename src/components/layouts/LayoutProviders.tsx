"use client";
import {
  NextAuthProvider,
  PreloaderProvider,
  UIProvider,
  CoinProvider,
  Web3Provider,
} from "@/context";
import { UserLoggedProvider } from "@/context/userLogged/UserLoggedProvider";
import { WalletProvider } from "@/context/wallet/WalletProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
}

export function LayoutProviders({ children }: Props) {
  return (
    <NextAuthProvider>
      <Web3Provider>
        <UIProvider>
          <PreloaderProvider>
            <CoinProvider>
              <WalletProvider>
                <UserLoggedProvider>
                  <>
                    <ToastContainer />
                    {children}
                  </>
                </UserLoggedProvider>
              </WalletProvider>
            </CoinProvider>
          </PreloaderProvider>
        </UIProvider>
      </Web3Provider>
    </NextAuthProvider>
  );
}
