import prisma from "@/lib/prisma/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const take = Number(searchParams.get("take")) || 10;
  const skip = Number(searchParams.get("skip")) || 0;

  if (isNaN(Number(+take)) || isNaN(Number(+skip))) {
    return NextResponse.json(
      {
        mesage: "Invalid query parameters",
      },
      {
        status: 400,
      }
    );
  }

  const users = await prisma.user.findMany({
    take: +take,
    skip: +skip,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(users);
}

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export async function POST(request: Request) {
  try {
    const body = await userSchema.validate(await request.json());

    const userCreate = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: userCreate.id,
          name: userCreate.name,
          email: userCreate.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json(
      {
        ok: false,
        messages: error.errors,
      },
      {
        status: 400,
      }
    );
  }
}
