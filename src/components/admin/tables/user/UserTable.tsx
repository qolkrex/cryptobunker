"use client"
import React, { FC } from 'react';
import { User } from '@prisma/client';
import { UserTableItem } from './UserTableItem';
// import * as userApi from '@/server';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteUser, updateUser } from '@/server';

interface UserTableProps {
    users?: User[];
}

export const UserTable: FC<UserTableProps> = ({
    users
}) => {

    const router = useRouter();

    // const toggleStatus = async (id: string, data: {
    //     name?: string;
    //     status?: string;
    // }) => {
    //     const updateUser = await userApi.updateUser(id, data);
    //     console.log(updateUser);
    //     router.refresh();
    // }

    // const deleteUser = async (id: string) => {
    //     try {
    //         const deleteUser = await userApi.deleteUser(id);
    //         console.log(deleteUser);
    //         router.refresh();
    //         toast.success('Usuario eliminado correctamente')
    //     } catch (error) {
    //         toast.error('Error al eliminar el usuario')
    //     };
    // }

    return (
        <div className="relative overflow-x-auto max-w-5xl lg:max-w-6xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" colSpan={5} className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" colSpan={3} className="px-6 py-3">
                            Creado
                        </th>
                        <th scope="col" colSpan={3} className="px-6 py-3">
                            Actualizado en
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Roles
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users?.map((user) => {
                            return (
                                <UserTableItem
                                    key={user.id}
                                    user={user}
                                    onToggleStatus={
                                        updateUser
                                    }
                                    deleteUser={
                                        deleteUser
                                    }
                                />
                            )
                        }
                        )
                    }

                </tbody>
            </table>
        </div>
    );
}