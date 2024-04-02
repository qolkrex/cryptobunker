export const dynamic = "auto";
export const revalidate = 0;
import { UserModal } from '@/components/admin/modals/UserModal';
import { UserTable } from '@/components/admin/tables/user/UserTable';
// import ButtonBase from '@/components/common/buttons/ButtonBase';
import prisma from '@/lib/prisma/prisma';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
import React from 'react';

export default async function TransactionPage() {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className='w-full px-12 py-14'>

            <div className="flex mb-2">
                <h1>Dashboard Admin Transaction</h1>
                <div className="ml-auto">
                    {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Agregar Usuario
                    </button> */}
                    <UserModal />
                </div>
            </div>
            {/* Add your content here */}

            {/* table users */}

            <UserTable users={users} />


        </div>
    );
};
