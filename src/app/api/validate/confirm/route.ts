// import verifyToken from "@/utils/auth/verifyToken";
import { type NextRequest, type NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma/prisma";
import bcrypt from "bcryptjs";

// mail status -> unconfirmed, active, inactive

export async function GET(request: NextRequest, response: NextResponse) {
  // const headerList = headers();
  // const token = headerList.get("Authorization") || "";

  const rawParama = request.url.split("?")[1];
  const params = new URLSearchParams(rawParama);
  const token = params.get("token") || "";

  console.log({ token });

  try {
    // Validate the token using your JWT library
    // const decoded = verifyToken(token, process.env.JWT_SECRET as string);
    const payload = verify(token, process.env.JWT_SECRET as string);
    console.log({ payload });
    const { password, id } = payload as { password: string; id: string };
    // console.log({ payload });
    console.log({ id });

    // if user is not found, return a 404 error
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          error: "Usuario no encontrado",
          status: "invalid",
        }),
        {
          status: 404,
        }
      );
    }

    // if  user is inactive, return a 403 error

    if (user.status === "inactive") {
      return new Response(
        JSON.stringify({
          error: "Usuario inactivo",
          status: "invalid",
        }),
        {
          status: 403,
        }
      );
    }

    // if user is already active, return a 403 error

    // if (user.status === "active") {
    //   return new Response(
    //     JSON.stringify({
    //       error: "Usuario ya activo",
    //       status: "confirmed",
    //     }),
    //     {
    //       status: 403,
    //     }
    //   );
    // }

    if (user.status === "unconfirmed") {
      // update user status and delete token
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          status: "active",
        },
      });
    }

    // decrypt password

    // const passwordDecrypt = bcrypt.compareSync(
    //   process.env.JWT_SECRET as string,
    //   user?.password || ""
    // );

    // If successful, send a success response with user data
    return new Response(
      JSON.stringify({
        message: "Validado",
        status: "valid",
        email: user.email,
        password: password,
        address: user.address,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Error al validar",
        status: "invalid",
      }),
      {
        status: 403,
      }
    );
  }
}
