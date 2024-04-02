"use server";

import prisma from "@/lib/prisma/prisma";
import { Role, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Kyc } from "../../../app/dashboard/verify-users/page";
import {
  changeUserRole,
  removeValidator,
} from "@/app/dashboard/rounds/Web3Client";

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserWithKYC = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        KYC: true,
      },
    });
    const kyc = await prisma.kYC.findMany({
      where: {
        userId: id,
      },
    });
    console.log(kyc);
    console.log(user)
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
};

export const getUsersInProgress = async (): Promise<any[] | null> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        verified: "pending",
      },
      include: {
        KYC: true,
      },
    });

    return users.map((user) => {
      return {
        address: user.address,
        country: user.country,
        createdAt: user.createdAt,
        documentImageBack: user.documentImageBack,
        documentImageFront: user.documentImageFront,
        documentNumber: user.documentNumber,
        documentType: user.documentType,
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        image: user.image,
        isActive: user.isActive,
        lastName: user.lastName,
        name: user.name,
        nationality: user.nationality,
        phone: user.phone,
        roles: user.roles,
        status: user.status,
        updatedAt: user.updatedAt,
        verified: user.verified,
        KYC: user.KYC.filter((kyc) => kyc.verificationStatus === "pending"),
      };
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getKYCByUserId = async (id: string): Promise<Kyc | null> => {
  try {
    const kyc = await prisma.kYC.findMany({
      where: {
        userId: id,
      },
    });
    // return last kyc
    console.log(kyc);
    return kyc[kyc.length - 1] as Kyc | null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserKYC = async (
  id: string,
  data: any
): Promise<User | null> => {
  try {
    const findUser = await getUser(id);

    if (!findUser) {
      throw new Error(`User with id ${id} not found`);
    }

    if (findUser.roles.includes("admin")) {
      throw new Error(`User with id ${id} is admin`);
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        documentNumber: data.documentNumber,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserRoles = async (
  id: string,
  roles: Role[]
): Promise<User | null> => {
  try {
    const findUser = await getUser(id);

    if (!findUser) {
      throw new Error(`User with id ${id} not found`);
    }

    if (findUser.roles.includes("admin")) {
      throw new Error(`User with id ${id} is admin`);
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        // push validator
        roles: {
          push: roles,
        }
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    status?: string;
  }
): Promise<User | null> => {
  try {
    const findUser = await getUser(id);

    if (!findUser) {
      throw new Error(`User with id ${id} not found`);
    }

    // shoud be admin or self

    if (findUser.roles.includes("admin") || findUser.id !== id) {
      throw new Error(`User with id ${id} is admin or not self`);
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        status: data.status,
      },
    });

    revalidatePath("/admin/user");

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async (user: User): Promise<User | null> => {
  try {
    console.log(user);

    const findUser = await getUser(user.id);

    if (findUser) {
      throw new Error(`User with id ${user.id} already exists`);
    }

    const userCreated = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    revalidatePath("/admin/user");

    return userCreated;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<User | null> => {
  try {
    const findUser = await getUser(id);

    if (!findUser) {
      throw new Error(`User with id ${id} not found`);
    }

    if (findUser.roles.includes("admin")) {
      throw new Error(`User with id ${id} is admin`);
    }

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/user");

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserFromKYC = async (
  id: string,
  data: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    documentNumber: string;
  }
): Promise<User | null> => {
  try {
    const findUser = await getUser(id);

    if (!findUser) {
      throw new Error(`User with id ${id} not found`);
    }

    if (findUser.roles.includes("admin")) {
      throw new Error(`User with id ${id} is admin`);
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        documentNumber: data.documentNumber,
      },
    });

    revalidatePath("/admin/user");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if(!user) throw new Error("User not found");
  return user;
}