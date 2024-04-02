import prisma from "@/lib/prisma/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export async function GET(request: Request, { params }: Segments) {
  const id = params.id;

  const user = await getTodo(id);

  if (!user) {
    return NextResponse.json(
      {
        message: `User with id ${id} not found`,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    user,
  });
}

const putSchema = yup.object({
  name: yup.string().optional(),
});

// put
export async function PUT(request: Request, { params }: Segments) {
  try {
    const id = params.id;

    const user = await getTodo(id);

    if (!user) {
      return NextResponse.json(
        {
          message: `User with id ${id} not found`,
        },
        {
          status: 404,
        }
      );
    }

    const { name, ...rest } = await putSchema.validate(await request.json());

    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({
      user: {
        id: userUpdate.id,
        name: userUpdate.name,
        email: userUpdate.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.errors,
      },
      {
        status: 400,
      }
    );
  }
}
