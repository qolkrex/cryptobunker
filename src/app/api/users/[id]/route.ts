import prisma from "@/lib/prisma/prisma";
import { User } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
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

  console.log({ id });

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
  status: yup.string().optional(),
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

    const { name, status, ...rest } = await putSchema.validate(
      await request.json()
    );

    console.log({ name, status });

    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        status: status,
        // status: user.roles.includes("admin") ? status : user.status,
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

// delete

export async function DELETE(request: Request, { params }: Segments) {
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

    const userDelete = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      user: {
        id: userDelete.id,
        name: userDelete.name,
        email: userDelete.email,
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
