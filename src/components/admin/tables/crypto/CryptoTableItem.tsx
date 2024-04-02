import { ICrypto } from "@/app/dashboard/page";
import ButtonBase from "@/components/common/buttons/ButtonBase";
import { Menu } from "primereact/menu";
import { FC } from "react";
import { CryptoMenu } from "./CryptoMenu";

interface UserTableProps {
  crypto: ICrypto;
  onToggleStatus?: (
    id: string,
    data: {
      name?: string;
      status?: string;
    }
  ) => void;
  deleteUser?: (id: string) => void;
}

export const CryptoTableItem: FC<UserTableProps> = ({
  crypto,
  onToggleStatus,
  deleteUser,
}) => {
  return (
    <tr
      className="bg-white border-t text-white dark:bg-[#414141] dark:border-white"
      key={crypto?.id}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          src={crypto?.image}
          alt={crypto?.name}
          className="w-6 h-6 rounded-full mr-2 inline-block"
        />
        {crypto?.name}
      </th>
      <td className="px-6 py-4 hidden xs:flex" colSpan={3}>
        {crypto?.price}
      </td>
      <td className="px-6 py-4 flex-col">
        <p className="flex items-center gap-1">
          {crypto?.balance} <img src={crypto?.image} className="w-4 h-4" />
        </p>
        <p>{crypto?.balanceInUsd}</p>
      </td>
      <td className="px-6 py-4 hidden sm:flex">{crypto && <CryptoMenu crypto={crypto} />}</td>
    </tr>
  );
};
