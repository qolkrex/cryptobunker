// import prisma from "@/lib/prisma/prisma";
import { signIn } from "next-auth/react";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await signIn("credentials", {
    //   redirect: false,
    //   email: formData.get("email") as string,
    //   password: formData.get("password") as string,
    // });
    console.log({ formData });
    const signin = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
      // redirect: true,
      // callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/admin`,
    });

    console.log({ prevState });
    console.log({ signin });

    if (signin?.error === "CredentialsSignin") return "CredentialsSignin";
    if (signin?.error === "UserUnconfirmed") return "UserUnconfirmed";
    if (signin?.error === "UserInactive") return "UserInactive";

    // si el estado del usuario es unconfirmed
    // const user = prisma.user.findUnique({
    //   where: {
    //     email: formData.get("email") as string,
    //   },
    // });

    // console.log({ user });

    // if ((await user)?.status === "unconfirmed") return "Unconfirmed";

    return "Success";
  } catch (error) {
    console.log({ error });
    // if ((error as any).type === "CredentialsSignin") return "CredentialsSignin";
    // if ((error as Error).message === "Usuario inactivo") {
    // }
    // return {
    //   ok: false,
    //   msg: (error as Error).message,
    // };
    // return "UnkownError";
    return "CredentialsSignin";
  }
}

// export const login = async (email: string, password: string) => {
//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     return { ok: true };
//   } catch (error) {
//     console.log(error);
//     return {
//       ok: false,
//       message: "No se pudo iniciar sesión",
//     };
//   }
// };
