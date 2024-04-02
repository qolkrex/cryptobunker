"use server";
import prisma from "@/lib/prisma/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/helpers/auth/auth";
import { signIn } from "next-auth/react";
// import { sendMail } from "@/mail/config/mail.config";
import { sendLoginMail, sendRegisterMail } from "../mail/mail-action";
import { generatePassword } from "../../helpers/auth/password";
import generateJWT from "@/utils/auth/jwt";
import { expirationTimeJwt } from "@/utils/auth/expireIn";

interface RegisterUser {
  name: string;
  lastName: string;
  phone: string;
  email: string;
}

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  // buscar el correo
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  // if no exist user, create user
  if (!user) {
    return null;
    // const dbUser = await createUser(email, password);
    // return dbUser;
  }

  // comparamos las contraseñas
  if (!bcrypt.compareSync(password, user.password ?? "")) return null;

  const { password: _, ...rest } = user;

  console.log(rest);

  // regresar el usuario
  return rest;
};

export const signInEmail = async (email: string) => {
  if (!email) return null;

  // buscar el correo
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  // if no exist user, create user
  if (!user) {
    return null;
    // const dbUser = await createUser(email, password);
    // return dbUser;
  }

  const { password: _, ...rest } = user;

  console.log(rest);

  // regresar el usuario
  return rest;
};

export const signInWithMetamask = async (address: string) => {
  console.log(address);
  if (!address) return null;
  // buscar el correo
  const user = await prisma.user.findFirst({
    where: {
      address: address.toLowerCase(),
    },
  });

  if (!user) return null;
  const { password: _, ...rest } = user;

  return rest;
};

const createUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const userCreated = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      name: email.split("@")[0],
    },
  });

  return userCreated;
};

export const registerUserWithAddress = async ({
  address,
}: {
  address: string;
}) => {
  try {
    const gPass = generatePassword();
    const uuid = crypto.randomUUID();
    const randomEmail = `${
      "email-temp" + uuid.split("-")[0] + uuid.split("-")[4]
    }@temp.com`.toLowerCase();

    const userCreated = await prisma.user.create({
      data: {
        name: "user",
        lastName: "user",
        email: randomEmail,
        password: bcrypt.hashSync(gPass, 10),
        address: address.toLowerCase(),
        isMetamask: true,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        address: true,
      },
    });
    return userCreated;
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "No se pudo registrar el usuario",
    };
  }
};

export const registerUser = async ({
  name,
  lastName,
  phone,
  email,
}: RegisterUser) => {
  try {
    console.log({ name, lastName, phone, email });

    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser?.status === "unconfirmed") {
      return {
        ok: false,
        message: "El usuario no ha confirmado su correo",
      };
    }

    if (findUser?.status === "inactive") {
      return {
        ok: false,
        message: "El usuario está inactivo",
      };
    }

    if (findUser) {
      return {
        ok: false,
        message: "El correo ya está registrado",
      };
    }

    const gPass = generatePassword();

    const userCreated = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        phone,
        password: bcrypt.hashSync(gPass, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    });

    const token = generateJWT(
      {
        id: userCreated.id,
        password: gPass,
      },
      process.env.JWT_SECRET as string,
      "30d"
    );

    // console.log({ token });

    await sendRegisterMail({
      email: userCreated.email!,
      name: userCreated.name ?? "",
      expires: "30 días",
      link: `${"https://goldmak.io"}/confirmar-cuenta?token=${token}`,
      password: gPass,
    });

    return {
      ok: true,
      message: "Usuario registrado",
      user: userCreated,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "No se pudo registrar el usuario",
    };
  }
};

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const signInEmailAndMessage = async (
  email: string,
  metamask = false
) => {
  if (!email) return null;

  // buscar el correo
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) {
    return {
      ok: false,
      status: "no-registered",
      message: "El correo no está registrado",
    };
  }

  // if (user?.status === "unconfirmed") {
  //   return {
  //     ok: false,
  //     status: "unconfirmed",
  //     message: "El usuario no ha confirmado su correo",
  //   };
  // }

  if (user?.status === "inactive") {
    return {
      ok: false,
      status: "inactive",
      message: "El usuario está inactivo",
    };
  }

  // send mail

  const gPass = generatePassword();

  const userUpdated = await prisma.user.update({
    where: {
      email: email.toLowerCase(),
    },
    data: {
      password: bcrypt.hashSync(gPass, 10),
    },
  });

  const token = generateJWT(
    {
      id: userUpdated.id,
      password: gPass,
    },
    process.env.JWT_SECRET as string,
    "30d"
  );

  // console.log({ token });

  await sendLoginMail({
    email: userUpdated.email!,
    name: userUpdated.name ?? "",
    expires: "30 días",
    link: `${"https://goldmak.io"}/confirmar-cuenta?token=${token}`,
    password: gPass,
  });

  if (metamask) {
    return {
      ok: true,
      status: "success",
      message: `/confirmar-cuenta?token=${token}`,
      user: {
        name: userUpdated.name ?? "",
        email: userUpdated.email,
      },
    };
  }

  // regresar el usuario
  return {
    ok: true,
    status: "success",
    message: "Usuario registrado",
    user: {
      name: user.name ?? "",
      email,
    },
  };
};

export const signMetamask = async (address: string) => {
  if (!address) return null;

  // buscar el correo
  const user = await prisma.user.findFirst({
    where: {
      address: address.toLowerCase(),
    },
  });

  if (!user) {
    return {
      ok: false,
      status: "no-registered",
      message: "El Address no está registrado",
    };
  }

  // send mail

  const gPass = generatePassword();

  const userUpdated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: bcrypt.hashSync(gPass, 10),
    },
  });

  if (!userUpdated) {
    return {
      ok: false,
      status: "no-updated",
      message: "No se pudo actualizar el usuario",
    };
  }

  const token = generateJWT(
    {
      id: userUpdated.id,
      email: userUpdated.email,
      address: userUpdated.address,
      password: gPass,
    },
    process.env.JWT_SECRET as string,
    "30d"
  );

  console.log({ token });

  return {
    ok: true,
    status: "success",
    message: `/confirmar-cuenta?token=${token}`,
    user: {
      name: userUpdated.name ?? "",
      address: userUpdated.address,
    },
  };
};
