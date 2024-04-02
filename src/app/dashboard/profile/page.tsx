// import { auth } from "@/server/helpers/auth/auth";
import { getUser } from "@/server";
import { authOptions } from "@/server/helpers/auth/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

// TODO: Si el usuario se loguea con metamask pedir email en KYC
// TODO: Si el usuario se loguea con email le creamos un address y luego puede cambiar el address por el de una billetera
// TODO: Un usuario puede guardar un address de su pertenencia

export default async function ProfilePage() {
  // const session = await auth()
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.id as string);

  const userRoles = session?.user?.roles || ["user"];

  const getSeverity = (status: string) => {
    switch (status) {
      case "unconfirmed":
        return "danger";
      case "confirmed":
        return "success";
      case "active":
        return "success";
      case "inactive":
        return "warning";
      default:
        return "info";
    }
  };

  const getKYCStatus = (status: string) => {
    switch (status) {
      case "unverified":
        return "danger";
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "info";
    }
  };

  const getKYCMessage = (status: string) => {
    switch (status) {
      case "unverified":
        return "No verificado";
      case "pending":
        return "Pendiente";
      case "approved":
        return "Aprobado";
      case "rejected":
        return "Rechazado";
      default:
        return "Info";
    }
  };

  const getLimitMessage = (status: string) => {
    switch (status) {
      case "unverified":
        return "0";
      case "pending":
        return "0";
      case "approved":
        return "Sin Limite";
      case "rejected":
        return "0";
      default:
        return "-";
    }
  };

  return (
    <div className="flex flex-col w-full justify-start items-center h-screen px-4 gap-5">
      <div className="flex items-center">
        {user?.image ? (
          <img
            className="w-24 h-24 rounded-full mr-4"
            src={user?.image}
            alt="Profile"
          />
        ) : (
          <div className="bg-[#F7A813] p-3 mr-5 rounded-full">
            <img src="/img/avatar_default.png" alt="profile default" />
          </div>
        )}
        <div className="flex flex-col justify-around h-full">
          <h2 className="text-3xl">{user?.name}{" "}{user?.lastName}</h2>
          <div className="flex gap-2">
            {/* <Tag
              value={user?.status || ""}
              severity={getSeverity(user?.status || "")}
            ></Tag> */}
            <Tag
              value={getKYCMessage(user?.verified as string) || "No verificado"}
              severity={getKYCStatus((user?.verified as string) || "")}
            ></Tag>
            {user?.verified === "unverified" && (
              <Link href="/dashboard/settings/kyc">
                Click Aquí para verificarse
              </Link>
            )}
            {user?.verified === "rejected" && (
              <Link href="/dashboard/settings/kyc">
                Click Aquí. Vuelve a intentarlo
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-10 bg-[#414141] px-8 py-6 rounded-lg max-w-[650px]">
        <div className="flex flex-col max-w-[650px] gap-3">
          <h3 className="text-2xl">Limites de la cuenta</h3>
          <div className="flex justify-between mt-4">
            <p>Limite de depósito de criptomonedas</p>
            <p>{getLimitMessage(user?.verified || "")}</p>
          </div>
          <div className="flex justify-between">
            <p>Limite de retiro de criptomonedas</p>
            <p>{getLimitMessage(user?.verified || "")}</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 bg-[#414141] px-8 py-6 rounded-lg max-w-[650px]">
        <div className="flex flex-col max-w-[650px] gap-3">
          <h3 className="text-2xl">Información personal</h3>
          <div className="flex justify-between mt-4">
            <p>Nombre:</p>
            <p>{user?.name || "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Apellido</p>
            <p>{user?.lastName || "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Teléfono</p>
            <p>{user?.phone || "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Correo electrónico:</p>
            <p>{user?.email?.startsWith("email-temp") ? "-" : user?.email }</p>
          </div>
          <div className="flex justify-between">
            <p>Roles:</p>
            <p>{user?.roles.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
