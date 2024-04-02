"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { updateUserRoles } from "@/server";
import { Role } from "@prisma/client";
import { changeUserRole, removeValidator } from "../rounds/Web3Client";
import { generateAddress } from "@/server/actions/kyc/kyc-action";
import { createAddress } from "@/utils/wallet";
import { CUSTODYCONTRACT } from "@/data/coinsData";
import CUSTODYABI from "@/utils/contract/abi/custodyContractABI.json";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Button } from "primereact/button";

interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  address: string;
  status: string;
}

// type IROLE = "user" | "admin" | "roundadmin" | "validator" | "userWhitelist";
const roles: Role[] = [
  // "roundadmin",
  "validator",
];

const RolesUser = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [userSelected, setUserSelected] = useState<IUser>();
  const [tableLoading, setTableLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [passwordTransaction, setPasswordTransaction] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txInfo, setTxInfo] = useState({
    address: "",
    privateKey: "",
  });
  const generateAddressToTransactions = async () => {
    try {
      setIsLoading(true);
      const { address, privateKey } = await createAddress();
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await (window as any).ethereum.enable();

      const signer = provider.getSigner();
      const custodyContract = new ethers.Contract(
        CUSTODYCONTRACT,
        CUSTODYABI,
        signer
      );
      const tx = await custodyContract.setTransactionPrivateKey(
        privateKey,
        passwordTransaction,
        address
      );
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
      console.log({ address, privateKey });
      setTxInfo({ address, privateKey });
      setOpenDialog(false);
      setIsLoading(false);
      Swal.fire(
        "Caja de validadores creada",
        "La caja de validadores ha sido creada con éxito",
        "success"
      );
    } catch (error: any) {
      console.log(error);
      if (error.code === "ACTION_REJECTED") {
        setOpenDialog(false);
        Swal.fire("Error", "Se rechazó la transacción", "error");
      }
      setIsLoading(false);
      setOpenDialog(false);
    }
  };
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex justify-around">
        <button
          className="btn btn-primary p-2 bg-transparent hover:bg-slate-300/50 flex items-center  gap-2"
          onClick={() => {
            setIsEdit(true);
            setUserSelected(rowData);
          }}
        >
          <i className="pi pi-pencil"></i>
        </button>
        <button className="btn btn-danger text-red-600  p-2 bg-transparent hover:bg-slate-300/50 rounded-full flex items-center  gap-2">
          <i className="pi pi-trash"></i>
        </button>
      </div>
    );
  };
  const getAddressAndPrivateKey = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await (window as any).ethereum.enable();
      const signer = provider.getSigner();
      const custodyContract = new ethers.Contract(
        CUSTODYCONTRACT,
        CUSTODYABI,
        signer
      );
      const txPass = await custodyContract.getTransactionPassword();
      const resp = await custodyContract.getTransactionPrivateKeyAndAddress(
        txPass
      );
      setTxInfo({
        address: resp[1],
        privateKey: resp[0],
      });
    }
  };
  useEffect(() => {
    getAddressAndPrivateKey();

    return () => {};
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setUsers(data);
        setTableLoading(false);
      });
  }, []);

  useEffect(() => {
    !isEdit && setUserSelected(undefined);
  }, [isEdit]);

  const getSeverity = (user: IUser) => {
    switch (user.status) {
      case "active":
        return "success";
      case "unconfirmed":
        return "danger";
      default:
        return null;
    }
  };
  return (
    <div className="px-5">
      <h2 className="text-2xl mb-4">Gestion de roles de los usuarios</h2>
      <DataTable
        value={users}
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        editMode="row"
      >
        {/* Actions */}
        <Column
          body={actionBodyTemplate}
          header="Actions"
          style={{ textAlign: "center", width: "8em" }}
        ></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="email" header="Email"></Column>
        <Column
          field="roles"
          header="Rol"
          body={(column) => <p>{column.roles.join(", ")}</p>}
        ></Column>
        <Column
          field="address"
          header="Address"
          body={(data) => (data.address ? data.address : "-")}
        ></Column>
        <Column
          field="status"
          header="Estado"
          body={(user: IUser) => (
            <Tag
              value={user.status === "active" ? "Activo" : "Sin confirmar"}
              severity={getSeverity(user)}
            ></Tag>
          )}
        ></Column>
        {/* <Column field="quantity" header="Quantity"></Column> */}
      </DataTable>
      <Dialog
        header="Editar Usuario"
        visible={isEdit}
        style={{ width: "50vw" }}
        onHide={() => setIsEdit(false)}
        draggable={false}
        resizable={false}
        footer={
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEdit(false)}
              className="bg-danger p-2 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                if (userSelected && userSelected.address) {
                  try {
                    const res = await updateUserRoles(
                      userSelected?.id!,
                      userSelected?.roles as Role[]
                    );
                    if (userSelected.roles.includes("validator")) {
                      await changeUserRole(userSelected.address!, "validator");
                    }
                    const findUser = users.find(
                      (user) => user.id === userSelected.id
                    );

                    if (
                      findUser &&
                      findUser.roles.includes("validator") &&
                      !roles.includes("validator")
                    ) {
                      await removeValidator(userSelected.address);
                    }
                    setIsEdit(false);
                    setTableLoading(true);
                    const data = await fetch("/api/users").then((res) =>
                      res.json()
                    );
                    setUsers(data);
                    setTableLoading(false);
                  } catch (err) {
                    console.log(err);
                  }
                }
              }}
              className="bg-primary p-2 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        }
      >
        <div>
          <div className="flex flex-col justify-between">
            <div>
              <h3>Nombre: {userSelected?.name}</h3>
              <h3>Email: {userSelected?.email}</h3>
            </div>
            <div className="flex items-center">
              <h3>Rol: </h3>
              <MultiSelect
                value={userSelected?.roles}
                options={roles}
                onChange={(e) => {
                  setUserSelected((prev: any) => ({
                    ...prev,
                    roles: e.target.value,
                  }));
                }}
              />
            </div>
            <h3>Estado: {userSelected?.status}</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <h3>Address: {userSelected?.address}</h3>
            </div>
          </div>
        </div>
      </Dialog>
      {txInfo.address !== "0x0000000000000000000000000000000000000000" && (
        <div className="my-10 bg-[#414141] py-5 px-4 rounded-2xl ">
          <h2>Address de transacciones</h2>
          <div className="flex gap-4">
            <div>
              <h3>Address: {txInfo.address}</h3>
            </div>
            <div>
              <h3>PrivateKey: {txInfo.privateKey}</h3>
            </div>
          </div>
        </div>
      )}
      <div className="my-10 bg-[#414141] py-5 px-4 rounded-2xl ">
        <h2 className="font-bold text-lg mb-3">Caja de validadores</h2>
        <p className="">
          La "Caja de Validadores" es una dirección de Ethereum EVM especial
          utilizada para gestionar los fondos destinados al pago de tarifas de
          transacción en nombre de los validadores. Solo el owner tiene el
          privilegio de crear esta caja desde su dashboard de administrador. A
          continuación, puedes crear la "Caja de Validadores" para garantizar
          que haya suficientes fondos disponibles para cubrir las tarifas de
          transacción:
        </p>
        <ul className="flex flex-col list-decimal gap-2 py-3 pl-4">
          <li>
            Haz clic en el botón "Crear Caja de Validadores" a continuación.
          </li>
          <li>
            Se generará una nueva dirección de Ethereum específica para la "Caja
            de Validadores".
          </li>
          <li>
            Se ingresará una contraseña para proteger la "Caja de Validadores".
          </li>
          <li>Deposita una cantidad adecuada de ETH en esta dirección</li>
        </ul>
        <button
          className="bg-primary py-2 px-4 mt-5 text-white rounded-lg hover:bg-primary/70 transition-colors"
          onClick={() => setOpenDialog(true)}
        >
          Crear Address
        </button>
        <Dialog
          onHide={() => setOpenDialog(false)}
          visible={openDialog}
          header="Contraseña de transacción"
        >
          <div className="flex flex-col gap-4">
            <span className="p-input-icon-right border border-gray-300 rounded-lg flex items-center">
              {
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`pi ${
                    showPassword ? "pi-eye-slash" : "pi-eye"
                  } cursor-pointer`}
                ></i>
              }
              <input
                type={showPassword ? "text" : "password"}
                className="p-2 rounded-lg border-none outline-none"
                placeholder="Contraseña"
                value={passwordTransaction}
                onChange={(e) => setPasswordTransaction(e.target.value)}
              />
            </span>
            <Button
              loading={isLoading}
              onClick={generateAddressToTransactions}
              className="bg-primary p-2 text-white rounded-lg flex gap-2 justify-center items-center"
            >
              Guardar
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default RolesUser;
