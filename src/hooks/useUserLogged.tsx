"use client";
import { getUser } from "@/server";
import { useEffect, useState } from "react";

export const useUserLogged = (id: string) => {
  const [userLogged, setUserLogged] = useState(false);
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
    if (id) {
      getUser(id).then((user) => {
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
  }, [id]);

  return { userLogged, user: { ...user, role: [] } };
};
