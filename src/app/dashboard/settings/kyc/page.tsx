import KYCForm from "./components/KYCForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/helpers/auth/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/server";

export default async function KycPage() {
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.id as string);
  if (user?.verified === "pending" || user?.verified === "approved") {
    redirect("/dashboard/profile");
  }

  if (user?.verified === "rejected") {
    redirect("/dashboard/settings/security");
  }

  return (
    <>
      <KYCForm />
    </>
  );
}
