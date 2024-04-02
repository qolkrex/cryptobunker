import { User } from "@prisma/client";

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    status?: string;
  }
): Promise<User | null> => {
  try {
    console.log({ id, data });
    const body = {
      name: data.name,
      status: data.status,
    };
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async (data: {
  user: User;
}): Promise<User | null> => {
  try {
    console.log({ data });
    // const body = {
    //   ...user
    // };
    const res = await fetch(`/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<User | null> => {
  try {
    console.log({ id });

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
