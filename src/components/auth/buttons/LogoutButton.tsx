"use client";
import ButtonBase from "@/components/common/buttons/ButtonBase";
import { signOut, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  if (status === "loading") {
    return (
      <ButtonBase variant="alert" disabled>
        <span className="flex items-center justify-center gap-2">
          <i className="pi pi-replay animate-spin"></i>
          Cargando...
        </span>
      </ButtonBase>
    );
  }

  if (status === "authenticated" && session) {
    return (
      <ButtonBase variant="primary" onClick={logout}>
        <span className="flex items-center justify-center gap-2">
          <i className="pi pi-sign-out"></i>
          Salir
        </span>
      </ButtonBase>
    );
  }

  return (
    <ButtonBase variant="alert" onClick={() => signIn()}>
      <span className="flex items-center justify-center gap-2">
        <i className="pi pi-sign-in"></i>
        Ingresar
      </span>
    </ButtonBase>
  );
};
