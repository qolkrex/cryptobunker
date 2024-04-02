"use client";

import { getUserWithKYC } from "@/server";
import { updateKYC, uploadImage } from "@/server/actions/kyc/kyc-action";
import { useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export interface APIFetch {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  nationality: null;
  country: null;
  password: null;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  status: string;
  emailVerified: null;
  isActive: boolean;
  image: string;
  documentImageBack: null;
  documentImageFront: null;
  documentType: null;
  documentNumber: string;
  address: string;
  isMetamask: boolean;
  verified: string;
  KYC: Kyc[];
}

export interface Kyc {
  id: string;
  userId: string;
  documentType: string;
  documentNumber: string;
  documentFrontUrl: string;
  documentBackUrl: string;
  country: string;
  address: string;
  passwordHashPrivateKey: string;
  verificationStatus: string;
  verificationDate: Date;
  reason: string;
  badFields: string[];
  createdAt: Date;
}

enum ReasonRejects {
  name = "ReasonName",
  lastName = "LastNameReason",
  // phone = "PhoneReason",
  documentNumber = "DocumentNumberReason",
  image = "ImageReason",
}

interface FormInputs {
  name: string;
  lastName: string;
  phone: string;
  documentNumber: string;
  email: string;
}

export const KYCFormSecurity = () => {
  const { data } = useSession();
  const [userWithKYC, setUserWithKYC] = useState<APIFetch>({} as any);
  const [image1URL, setImage1URL] = useState("");
  const [image2URL, setImage2URL] = useState("");
  const [userStatus, setUserStatus] = useState("unverified");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const file2InputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (number: number) => {
    if (number === 1) {
      fileInputRef.current?.click();
    } else {
      file2InputRef.current?.click();
    }
  };

  const { setValue, watch, handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      documentNumber: "",
      email: "",
    },
  });
  const uuid = crypto.randomUUID();

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    try {
      setIsLoading(true);
      if (
        data.name === userWithKYC.name &&
        data.lastName === userWithKYC.lastName &&
        data.documentNumber === userWithKYC.documentNumber
      )
        return;
      let image1 = "";
      let image2 = "";
      if (userWithKYC.KYC[0].badFields.includes(ReasonRejects.image)) {
        console.log("entro");
        const img1 = await uploadImage(image1URL);
        const img2 = await uploadImage(image2URL);
        image1 = img1.secure_url;
        image2 = img2.secure_url;
      }
      image1 = image1 || userWithKYC.KYC[0].documentFrontUrl;
      image2 = image2 || userWithKYC.KYC[0].documentBackUrl;
      await updateKYC(userWithKYC.KYC[0].id, data, image1, image2);
      Swal.fire({
        title: "KYC actualizado",
        text: "Se ha actualizado el KYC",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setIsLoading(false);
      getUser();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error, intentelo de nuevo",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  const getUser = async () => {
    if (!data?.user?.id) return;
    try {
      const res = await getUserWithKYC(data?.user?.id as string);
      if (res) {
        setUserWithKYC(res as any);
        setValue("name", res.name || "");
        setValue("lastName", res.lastName || "");
        setValue("phone", res.phone || "");
        setValue("documentNumber", res.documentNumber || "");
        setValue("email", res.email || "");
        setUserStatus(res.verified);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [data]);

  return (
    <form
      className="flex flex-col w-full px-2 py-2 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="flex items-center gap-2 text-white mb-5">
        KYC -{" "}
        <Tag severity={getKYCStatus(userStatus || "")}>
          {getKYCMessage(userStatus || "")}
        </Tag>
      </h2>
      <div className="w-full flex flex-col md:flex-row items-center gap-5 md:gap-2 text-white md:min-h-[300px]">
        {/* <div className="flex items-center gap-2 text-black"> */}
        <div className="flex flex-col w-full gap-4 h-full justify-between">
          <div className="flex flex-col md:flex-row gap-4 ">
            <h3 className="min-w-[75px]">Nombre:</h3>
            <span className="p-input-icon-right w-full md:max-w-[400px] ">
              <InputText
                className={`w-full md:max-w-[400px] py-1 px-3 shadow-none outline-2 ${
                  userWithKYC.KYC &&
                  userWithKYC.KYC[0].badFields.includes(ReasonRejects.name)
                    ? "outline-red-500"
                    : "outline-green-500"
                } outline-double bg-[#333333] text-white`}
                {...register("name", { required: true })}
                value={watch("name")}
                readOnly={
                  !(
                    userWithKYC.KYC &&
                    userWithKYC.KYC[0].badFields.includes(ReasonRejects.name)
                  )
                }
                onChange={(e) => setValue("name", e.target.value)}
              />
              {userWithKYC.KYC &&
                userWithKYC.KYC[0].badFields.includes(ReasonRejects.name) && (
                  <i className="pi pi-exclamation-circle text-red-500 text-lg"></i>
                )}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 ">
            <h3 className="min-w-[75px]">Apellido: </h3>
            <span className="p-input-icon-right w-full md:max-w-[400px]">
              <InputText
                className={`w-full md:max-w-[400px] py-1 px-3 outline-2 ${
                  userWithKYC.KYC &&
                  userWithKYC.KYC[0].badFields.includes(ReasonRejects.lastName)
                    ? "outline-red-500"
                    : "outline-green-500"
                } outline-double bg-[#333333] text-white shadow-none`}
                {...register("lastName", { required: true })}
                value={watch("lastName")}
                readOnly={
                  !(
                    userWithKYC.KYC &&
                    userWithKYC.KYC[0].badFields.includes(
                      ReasonRejects.lastName
                    )
                  )
                }
                onChange={(e) => setValue("lastName", e.target.value)}
              />
              {userWithKYC.KYC &&
                userWithKYC.KYC[0].badFields.includes(
                  ReasonRejects.lastName
                ) && (
                  <i className="pi pi-exclamation-circle text-red-500 text-lg"></i>
                )}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 ">
            <h3 className="min-w-[75px]">Telefono: </h3>
            <InputText
              className={`w-full md:max-w-[400px] py-1 px-3 outline-2 outline-green-500 outline-double bg-[#333333] text-white shadow-none`}
              value={watch("phone")}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 ">
            <h3 className="min-w-[75px]">N° Doc: </h3>
            <span className="p-input-icon-right w-full md:max-w-[400px]">
              <InputText
                className={`w-full md:max-w-[400px] py-1 px-3 outline-2 ${
                  userWithKYC.KYC &&
                  userWithKYC.KYC[0].badFields.includes(
                    ReasonRejects.documentNumber
                  )
                    ? "outline-red-500"
                    : "outline-green-500"
                } outline-double bg-[#333333] text-white shadow-none`}
                {...register("documentNumber", { required: true })}
                onChange={(e) => setValue("documentNumber", e.target.value)}
                value={watch("documentNumber")}
                readOnly={
                  !(
                    userWithKYC.KYC &&
                    userWithKYC.KYC[0].badFields.includes(
                      ReasonRejects.documentNumber
                    )
                  )
                }
              />
              {userWithKYC.KYC &&
                userWithKYC.KYC[0].badFields.includes(
                  ReasonRejects.documentNumber
                ) && (
                  <i className="pi pi-exclamation-circle text-red-500 text-lg"></i>
                )}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 ">
            <h3 className="min-w-[75px]">Correo: </h3>
            <InputText
              className={`w-full md:max-w-[400px] py-1 px-3 outline-2 outline-green-500 outline-double bg-[#333333] text-white shadow-none`}
              readOnly={true}
              value={watch("email")}
            />
          </div>
        </div>
        {userWithKYC && userWithKYC.KYC && userWithKYC.KYC.length > 0 && (
          <div className="flex md:flex-col items-center gap-2 justify-between ">
            <div
              className={`flex max-w-[179.25px] max-h-[117.55px] ${
                userWithKYC.KYC[0].badFields.includes(ReasonRejects.image)
                  ? "cursor-pointer hover:opacity-65"
                  : "cursor-default"
              } `}
              onClick={() =>
                userWithKYC.KYC[0].badFields.includes(ReasonRejects.image) &&
                handleButtonClick(1)
              }
            >
              <img
                src={image1URL || userWithKYC?.KYC[0]?.documentFrontUrl}
                alt="documentFrontUrl"
                className="block w-full h-full object-cover max-w-[179.25px] max-h-[117.55px] "
              />
              <input
                className="hidden"
                type="file"
                name="file"
                id="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage1URL(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div
              className={` max-w-[179.25px] max-h-[117.55px] ${
                userWithKYC.KYC[0].badFields.includes(ReasonRejects.image)
                  ? "cursor-pointer hover:opacity-65"
                  : "cursor-default"
              } `}
              onClick={() =>
                userWithKYC.KYC[0].badFields.includes(ReasonRejects.image) &&
                handleButtonClick(2)
              }
            >
              <img
                src={image2URL || userWithKYC?.KYC[0]?.documentBackUrl}
                alt="documentBackUrl"
                className="block w-full h-full object-cover max-w-[179.25px] max-h-[117.55px]"
              />
              <input
                className="hidden"
                type="file"
                name="file"
                id="file"
                ref={file2InputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage2URL(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
      {userStatus === "pending" && (
        <div className="flex flex-col pt-10 pb-5 px-10 mb-8 mt-14 mx-auto w-11/12 md:max-w-[780px] bg-[#F7A813] rounded-3xl text-black relative">
          <img
            src="/img/icons/notificate.svg"
            className="w-[70px] absolute left-[35px] -top-[35px]"
            alt=""
          />
          <h2 className="text-lg font-bold">Tu KYC está siendo verificado</h2>
          <ul>
            <li className="text-[13px] tracking-tight">
              No tardaremos en verificar su validación
            </li>
          </ul>
        </div>
      )}
      <Button
        loading={isLoading}
        className="bg-primary px-5 py-2 mt-5 mx-auto"
        type="submit"
        disabled={userStatus === "rejected" ? false : true}
      >
        Enviar
      </Button>
    </form>
  );
};

const getKYCStatus = (status: string) => {
  switch (status) {
    case "unverified":
      return "danger";
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "danger";
    default:
      return "info";
  }
};
const getKYCMessage = (status: string) => {
  switch (status) {
    case "unverified":
      return "No verificado";
    case "pending":
      return "Pendiente";
    case "approved":
      return "Aprobado";
    case "rejected":
      return "Rechazado";
    default:
      return "Info";
  }
};
