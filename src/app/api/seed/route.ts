import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.user.deleteMany({});

  const user = await prisma.user.createMany({
    data: [
      {
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345678", 10),
        name: "admin",
        roles: ["admin"],
      },
      {
        email: "alex@gmail.com",
        password: bcrypt.hashSync("12345678", 10),
        name: "alex",
        roles: ["user"],
      },
      {
        email: "user@gmail.com",
        password: bcrypt.hashSync("12345678", 10),
        name: "user",
        roles: ["user"],
      },
    ],
  });

  return NextResponse.json({ message: "Hello World" });
}

export const dynamic = 'force-dynamic';