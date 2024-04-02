"use client";
import { useEffect, useState } from "react";
import { UserLoggedContext } from "./UserLogged.context";
import { useSession } from "next-auth/react";
import { getUser } from "@/server";

export const UserLoggedProvider = ({ children }: any) => {
  const [userLogged, setUserLogged] = useState(false);
  const { data, status } = useSession();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    country: "",
    phone: "",
    verified: "",
    createdAt: new Date(),
    role: [],
  });

  useEffect(() => {
    if (data) {
      getUser(data?.user?.id as string).then((user) => {
        setUser({
          id: user?.id as string,
          name: user?.name as string,
          email: user?.email as string,
          address: user?.address as string,
          country: user?.country as string,
          phone: user?.phone as string,
          verified: user?.verified as string,
          createdAt: user?.createdAt as Date,
          role: user?.roles as [],
        });
        setUserLogged(true);
      });
    }
  }, [data]);

  return (
    <UserLoggedContext.Provider
      value={{ userLogged, user: { ...user, role: [] }, setUserLogged }}
    >
      {children}
    </UserLoggedContext.Provider>
  );
};
