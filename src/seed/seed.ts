import bcrypt from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  name: string;
  roles: ["admin" | "user" | "roundadmin" | "validator" | "userWhitelist"];
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
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
    {
      email: "round@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
      name: "Round Admin",
      roles: ["roundadmin"],
    },
    {
      email: "validator@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
      name: "Validator",
      roles: ["validator"],
    },
  ],
};
