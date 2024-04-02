import ButtonBase from '@/components/common/buttons/ButtonBase';
import { User } from '@prisma/client';
import { FC } from 'react';

interface UserTableProps {
    user: User;
    onToggleStatus?: (id: string, data: {
        name?: string;
        status?: string;
    }) => void
    deleteUser?: (id: string) => void
}

export const UserTableItem: FC<UserTableProps> = ({
    user,
    onToggleStatus,
    deleteUser
}) => {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={user.id}
        >
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
            </th>
            <td className="px-6 py-4" colSpan={5}>
                {user.email}
            </td>
            <td className="px-6 py-4" colSpan={3}>
                {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4" colSpan={3}>
                {new Date(user.updatedAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                {user.roles}
            </td>
            <td className="px-6 py-4">
                <div className='flex items-center w-24'>
                    {
                        user.status === 'active' ?
                            (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  bg-green-500 text-white">
                                    active
                                </span>
                            )
                            :
                            (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  bg-red-500 text-white">
                                    inactive
                                </span>
                            )
                    }
                    <button
                        className="ml-2 "
                        onClick={() => {
                            onToggleStatus?.(user.id, {
                                status: user.status === 'active' ? 'inactive' : 'active'
                            })
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>

                    </button>
                </div>
            </td>
            <td className="px-6 py-4 flex gap-1.5">
                <ButtonBase
                    variant="info"
                    size="small"
                >
                    Edit
                </ButtonBase>
                <ButtonBase
                    variant="danger"
                    size="small"
                    onClick={() => {
                        deleteUser?.(user.id)
                    }}
                // className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete
                </ButtonBase>
            </td>
        </tr>
    )
}
