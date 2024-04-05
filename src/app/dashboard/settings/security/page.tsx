import { getUser } from "@/server";
import { authOptions } from "@/server/helpers/auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { KYCFormSecurity } from "./components/KYCFormSecurity";

export default async function SecurityPage() {
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.id as string);
  if (user?.verified === "unverified") {
    redirect("/dashboard/settings/kyc");
  }
  return (
    <div
      className={`flex flex-col items-center bg-[#414141]   rounded-xl p-4 py-10 w-11/12 md:max-w-[780px] mx-auto mt-28 relative ${
        0 === 0 ? "pt-16" : "pt-10"
      }`}
    >
      <img
        src="/img/cascos/casco_s_2.png"
        alt="Maquinaria KYC"
        className="w-96 h-auto -top-[190px] mx-auto absolute"
      />
      <KYCFormSecurity />
    </div>
  );
}
