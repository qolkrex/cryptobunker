"use client";

import { Board } from "@/components/common/swap/Board";
import { useReserves } from "@/hooks/useReserves";
import { useState } from "react";
import { testTokens } from "../rounds/Web3Client";
import { useSession } from "next-auth/react";

//TODO: Antes de la transaccion comprobar que este en  la whitelist

export default function PageSwap() {
  const [slipage, setSlipage] = useState(10);
  const [open, setOpen] = useState(false);
  const { reserves, handleReserves } = useReserves();
  const { data } = useSession();

  return (
    <div className="px-12 py-14 flex justify-center">
      <div className="flex flex-col bg-[#414141] px-8 py-5 relative rounded-lg">
        {data?.user?.isMetamask && (
          <div className="-top-16 right-0 absolute">
            <button
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => testTokens()}
            >
              <i className="pi pi-plus"></i> Add GMK
            </button>
          </div>
        )}
        <Board slipage={slipage} setOpen={setOpen} reserves={reserves} />
      </div>
    </div>
  );
}
