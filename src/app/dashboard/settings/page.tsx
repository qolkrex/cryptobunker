// import { auth } from "@/server/helpers/auth/auth";
import { getUser } from "@/server";
import { authOptions } from "@/server/helpers/auth/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ButtonNotification from "./components/ButtonNotification";

export default async function SettingsPage() {
  // const session = await auth()
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.id as string);

  // console.log({ session });
  // console.log({ user });

  // const userRoles = session?.user?.roles || ["user"];

  return (
    <div className="flex w-full justify-center items-start h-screen max-w-[95%] mx-auto">
      <div className="w-full flex flex-col items-center max-w-5xl bg-gray-600 shadow-lg rounded-lg py-10 mt-20 px-2">
        <h2 className="text-2xl font-bold pb-4">Página de configuración</h2>
        <p className="text-lg font-bold p-6">
          {/* Aquí se configurará la cuenta del usuario
                    Añada aquí los campos que considere necesarios */}
          Escoja una de las opciones para configurar su cuenta
        </p>

        <div className="w-full flex flex-col flex-wrap items-center gap-3 ">
          {user?.verified === "unverified" && (
            <Link
              href={"/dashboard/settings/kyc"}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-6 px-8 rounded flex justify-between items-center gap-3 max-w-3xl"
            >
              <span className="flex justify-center items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-cog"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
                  <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M19.001 15.5v1.5" />
                  <path d="M19.001 21v1.5" />
                  <path d="M22.032 17.25l-1.299 .75" />
                  <path d="M17.27 20l-1.3 .75" />
                  <path d="M15.97 17.25l1.3 .75" />
                  <path d="M20.733 20l1.3 .75" />
                </svg>
                Identificación KYC
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevrons-right"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7l5 5l-5 5" />
                <path d="M13 7l5 5l-5 5" />
              </svg>
            </Link>
          )}
          <ButtonNotification />
          <Link
            href={"/dashboard/settings/security"}
            className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-6 px-8 rounded flex justify-between items-center gap-3 max-w-3xl"
          >
            <span className="flex justify-center items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shield-lock-filled"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z"
                  strokeWidth="0"
                  fill="currentColor"
                />
              </svg>{" "}
              KYC
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevrons-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7l5 5l-5 5" />
              <path d="M13 7l5 5l-5 5" />
            </svg>
          </Link>
        </div>

        {/* <div className="flex items-center bg-blue-500 rounded-lg p-6">
                    <img
                        className="w-24 h-24 rounded-full mr-4"
                        src={session?.user?.image || 'https://media.discordapp.net/attachments/839620709517230081/1194761836961206382/avatar-placeholder.jpg?ex=65b187ab&is=659f12ab&hm=e998348060ee59fcadaee6fc4cb58353a4e9017a6a8e6cc733bd8b82cb81e71e&=&format=webp'}
                        alt="Profile"
                    />
                    </div>
                <div className="p-6 text-black">
                    <h1 className="text-2xl font-bold ">Profile Page</h1>
                    <h2 className="text-lg font-bold">
                        {session?.user?.name}
                    </h2>
                    <p className="text-gray-500">
                        {
                            session?.user?.email
                        }
                    </p>
                    <p>
                        {
                            userRoles.map((role, index) => (
                                <span key={index} className="text-gray-500 capitalize">
                                    {role}
                                </span>
                            ))
                        }
                    </p>
                </div> */}
      </div>
    </div>
  );
}
