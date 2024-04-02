import NextAuth, { NextAuthOptions } from "next-auth";
// github
// credentials
import CredentialsProvider from "next-auth/providers/credentials";
// google
import GoogleProvider from "next-auth/providers/google";
// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma/prisma";
import {
  signInEmail,
  signInWithMetamask,
} from "@/server/actions/auth/register-actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { z } from "zod";

// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET || "",
    }),
    // GitHubProvider({
    //   clientId: process.env.AUTH_GITHUB_ID || "",
    //   clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo Electrónico",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********",
        },
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x000",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email && credentials?.password) {
          console.log("Metamask");
          const user = await signInWithMetamask(credentials.address);
          console.log(user);
          if (!user) return null;
          return user;
        }
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            // password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        // const { email, password } = parsedCredentials.data;
        const { email } = parsedCredentials.data;

        // const user = await signInEmailPassword(email, password);
        const user = await signInEmail(email);

        if (user?.status === "unconfirmed") throw new Error("UserUnconfirmed");
        // throw new Error("Usuario no confirmado");

        if (user?.isActive === false) throw new Error("UserInactive");

        if (!user) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log({ token, user, account, profile, isNewUser });

      const dbUser = await prisma.user.findUnique({
        where: {
          email: user?.email ?? token?.email ?? "",
        },
      });

      // if (dbUser?.status === "unconfirmed")
      //   throw new Error("Usuario no confirmado");

      if (dbUser?.isActive === false) throw new Error("UserInactive");

      if (dbUser) {
        token.roles = dbUser.roles ?? ["no-roles"];
        token.id = dbUser.id ?? "no-id";
        token.address = dbUser.address ?? "";
        token.status = dbUser.status ?? "unconfirmed";
        token.verified = dbUser.verified ?? "unverified";
        token.isMetamask = dbUser.isMetamask ?? false;
      }

      // console.log({ token });

      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user });

      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
        session.user.address = token.address;
        session.user.status = token.status;
        session.user.verified = token.verified;
        session.user.isMetamask = token.isMetamask;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const handlers = NextAuth(authOptions);
