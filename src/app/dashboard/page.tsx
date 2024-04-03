import { AdminContent } from "@/components/admin/AdminContent";
import prisma from "@/lib/prisma/prisma";
import { authOptions } from "@/server/helpers/auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export interface ICrypto {
  id: number;
  name: string;
  token: string;
  image: string;
  price: string;
  balance: string;
  balanceInUsd?: string;
}

export interface IAdminPageProps {
  cryptos: ICrypto[];
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  // console.log(session);
  if(session?.user?.verified === "unverified"){
    return redirect('/dashboard/settings/kyc');
  } 

  if(session?.user?.verified === "pending"){
    return redirect('/dashboard/profile');
  }

  if(session?.user?.verified === "rejected"){
    return redirect('/dashboard/settings/kyc');
  }
  const cryptos: ICrypto[] = [
    {
      id: 1,
      name: "DGSOL",
      token: "DIGISOL",
      image: "/img/crypto/dgsol-token-2.webp",

      price: "$00.00",
      balance: "$0.00",
      balanceInUsd: "$0.00",
    },
    {
      id: 2,
      name: "USDC",
      token: "Usdc",
      image: "/img/crypto/USDC.png",

      price: "$1.00",
      balance: "$0.00",
      balanceInUsd: "$0.00",
    },
    {
      id: 3,
      name: "USDT",
      token: "Tether USD",
      image: "/img/crypto/TETHER.png",
      price: "$00.00",
      balance: "$0.00",
      balanceInUsd: "$0.00",
    },
    {
      id: 4,
      name: "BNB",
      token: "BNB",
      image: "/img/crypto/BNB.png",
      price: "$00.00",
      balance: "$0.00",
      balanceInUsd: "$0.00",
    },
  ];

  return <AdminContent cryptos={cryptos} />;
}
