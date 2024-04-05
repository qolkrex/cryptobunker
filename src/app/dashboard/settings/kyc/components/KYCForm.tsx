"use client";
import ButtonBase from "@/components/common/buttons/ButtonBase";
import { updateUserFromKYC, getUser } from "@/server";
import {
  comprobeEmailExist,
  createKyc,
  findUserBYDocumentNumber,
  uploadImage,
} from "@/server/actions/kyc/kyc-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import PasswordComponent from "./PasswordComponent";

const KYCForm = () => {
  const [step, setStep] = useState(0);
  const [image1, setimage1] = useState<File>();
  const [image2, setimage2] = useState();
  const [image1URL, setImage1URL] = useState("");
  const [image2URL, setImage2URL] = useState("");
  const [emailExist, setEmailExist] = useState(false);
  const [messageEmailExist, setmessageEmailExist] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [documentNumberExist, setDocumentNumberExist] = useState(false);
  const [loadinForm, setLoadinForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const router = useRouter();

  const { data: userSession } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      country: "",
      typeDocument: "",
      numberDocument: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      hasAddress: "",
      userAddress: "",
      passwordToSign: "",
    },
  });

  const validForm = () => {
    return (
      (step === 1 &&
        !!errors &&
        (!!errors.name ||
          !!errors.lastName ||
          !!errors.email ||
          !!errors.phone ||
          !!emailExist ||
          !watch("name") ||
          !watch("lastName") ||
          !watch("phone") ||
          !watch("email"))) ||
      (step === 2 && otp.join("").replace(/,/g, "").length !== 6) ||
      (step === 3 &&
        (!watch("country") ||
          !watch("typeDocument") ||
          !watch("numberDocument"))) ||
      (step === 5 && (!image1URL || !image2URL)) ||
      false
    );
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    try {
      // const valid = validForm();
      // if (valid) return;
      setLoadinForm(true);
      const img1 = await uploadImage(image1URL);
      const img2 = await uploadImage(image2URL);
      if (img1 && img2) {
        console.log("entro");
        const kyc = await createKyc({
          userId: userSession?.user?.id || "",
          documentType: (data.typeDocument as string).toLowerCase(),
          documentFrontUrl: img1.secure_url,
          documentBackUrl: img2.secure_url,
          createdAt: new Date(),
          documentNumber: data.numberDocument.toLowerCase(),
          country: data.country.toLowerCase(),
          address: data.hasAddress === "yes" ? data.userAddress : "",
          verificationStatus: "pending",
          verificationDate: new Date(),
          passwordHashPrivateKey: otp.join("").replace(",", "") || "",
          id: "",
        });
        console.log(kyc);
        const userUpdated = await updateUserFromKYC(
          userSession?.user?.id as string,
          {
            email: data.email,
            lastName: data.lastName,
            name: data.name,
            phone: data.phone,
            documentNumber: data.numberDocument,
          }
        );
        console.log(userUpdated);
      }
      setLoadinForm(false);
      setStep(step + 1);
    } catch (error) {
      setLoadinForm(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, por favor intenta de nuevo",
      });
    }
  };

  useEffect(() => {
    if (userSession?.user?.isMetamask) {
      setValue("hasAddress", "yes");
    }
  }, [userSession]);

  const selectedCountryTemplate = (option: any, props: any) => {
    // console.log(option, props);
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src={option.image}
            className={`mr-3 `}
            style={{ width: "25px" }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={option.image}
          className={`mr-2 `}
          style={{ width: "25px" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  useEffect(() => {
    if (userSession?.user?.id) {
      getUser(userSession?.user?.id as string)
        .then((data) => {
          if (data) {
            setValue(
              "email",
              data.email?.startsWith("email-temp") ? "" : data.email || ""
            );
            setValue("userAddress", data.address || "");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userSession?.user?.id]);

  const checkEmailExist = async (email: string) => {
    console.log(email);
    if (email) {
      const findUser = await comprobeEmailExist(email);
      console.log(findUser);
      if (findUser) {
        if (userSession?.user?.id !== findUser.id) {
          console.log("entro");
          setEmailExist(true);
          setmessageEmailExist("Email ya existe");
          return;
        } else {
          console.log("entro");
          setEmailExist(false);
          setmessageEmailExist("");
          return;
        }
      } else {
        console.log("entro");
        setEmailExist(false);
        setmessageEmailExist("");
      }
      return;
    }
  };

  const checkDocumentNumberExist = async (documentNumber: string) => {
    console.log(documentNumber);
    if (documentNumber) {
      const findUser = await findUserBYDocumentNumber(documentNumber);
      console.log(findUser);
      if (findUser) {
        if (userSession?.user?.id !== findUser.id) {
          setDocumentNumberExist(true);
          return;
        } else {
          setDocumentNumberExist(false);
          return;
        }
      } else {
        setDocumentNumberExist(false);
      }
    } else {
      setDocumentNumberExist(false);
    }
  };
  console.log(otp);
  console.log(otp.join("").replace(",", ""));
  console.log(otp.join("").replace(/,/g, "").length);

  return (
    <div className="pb-10">
      {/* <h1 className="pl-3 md:pl-10 text-2xl font-semibold">
        Configuración Kyc
      </h1> */}
      <div className={`flex flex-col gap-10 ${step === 0 ? "pt-28" : "pt-2"}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col items-center bg-[#D0CECD]  rounded-xl p-4 py-10 w-11/12 md:max-w-[780px] mx-auto mt-3 relative ${
            step === 0 ? "pt-16" : "pt-10"
          }`}
        >
          {step === 0 && (
            <img
              src="/img/cascos/casco_s_1.png"
              alt="Maquinaria KYC"
              className="w-96 h-auto -top-[190px] mx-auto absolute"
            />
          )}
          <>
            {step === 0 && (
              <>
                <h1 className="text-3xl text-start font-bold mb-4 text-black">
                  Bienvenido al KYC
                </h1>
                <div className="flex flex-col gap-4 px-10">
                  <p className="text-slate-800 text-center ">
                    Este es el primer paso para poder realizar transacciones en
                    nuestra plataforma. Por favor, completa el siguiente
                    formulario para continuar.
                  </p>
                </div>
              </>
            )}
            {step === 1 && (
              <div className="flex flex-col px-4 w-full gap-2">
                <h2 className="text-black text-start text-2xl font-bold ml-5">
                  Información Personal
                </h2>
                <div className="flex flex-col gap-2 w-full text-black">
                  <div>
                    <input
                      type="text"
                      className={`w-full px-5 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none ${
                        errors.name && "border-red-500"
                      }`}
                      {...register("name", {
                        required: "Nombre es requerido",
                      })}
                      value={watch("name")}
                      placeholder="Nombre"
                    />
                    {errors.name?.message && (
                      <span className="text-red-500 text-sm bottom-2 left-2 relative">
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`w-full px-5 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none ${
                        errors.lastName && "border-red-500"
                      }`}
                      {...register("lastName", {
                        required: "Apellidos es requerido",
                      })}
                      value={watch("lastName")}
                      placeholder="Apellidos"
                    />
                    {errors.lastName?.message && (
                      <span className="text-red-500 text-sm bottom-2 left-2 relative">
                        {errors.lastName?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`w-full px-5 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none ${
                        errors.phone && "border-red-500"
                      }`}
                      {...register("phone", {
                        required: "Teléfono es requerido",
                      })}
                      placeholder="Teléfono"
                    />
                    {errors.phone?.message && (
                      <span className="text-red-500 text-sm bottom-2 left-2 relative">
                        {errors.phone?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`w-full px-5 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none ${
                        errors.email && "border-red-500"
                      }`}
                      {...register("email", {
                        required: "Email es requerido",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: "Email no válido",
                        },
                        onBlur: (e) => checkEmailExist(e.target.value),
                      })}
                      placeholder="Email"
                    />
                    {errors.email?.message && (
                      <span className="text-red-500 text-sm bottom-2 left-2 relative">
                        {errors.email?.message} <br />
                      </span>
                    )}
                    {emailExist && (
                      <span className="text-red-500 text-sm bottom-2 left-2 relative">
                        Email ya existe
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="w-full px-4 text-black">
                <PasswordComponent initialState={otp} setState={setOtp} />
              </div>
            )}
            {step === 3 && (
              <div className="w-full px-4 text-black">
                <h2 className="text-2xl text-black font-bold">
                  Verificación de documentos
                </h2>
                <div className="mt-2">
                  <label htmlFor="country" className="font-bold">
                    País/región de emisión del documento
                  </label>
                  <div>
                    <Dropdown
                      options={countries}
                      optionLabel="name"
                      placeholder="Seleccione un país"
                      onChange={(e: DropdownChangeEvent) =>
                        setValue("country", e.value)
                      }
                      value={watch("country")}
                      valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate}
                      className="w-full px-5 py-1 my-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.country && (
                      <span className="text-red-500 text-sm bottom-2 left-2 relative">
                        {errors.country?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="" className="font-bold">
                    Tipo de documento
                  </label>
                  {typeDocuments.map((type, i) => (
                    <div className="flex items-center mb-3 mt-1" key={i}>
                      <input
                        type="radio"
                        placeholder="Documento"
                        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-xl peer hidden"
                        {...register("typeDocument", {
                          required: "Tipo de documento es requerido",
                        })}
                        value={type.value}
                        id={type.value}
                      />
                      <label
                        htmlFor={type.value}
                        className="flex flex-row items-center gap-4 w-full peer-checked:bg-primary/90 py-2 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 px-3 rounded-lg transition-colors"
                      >
                        <img
                          src={type.image}
                          alt={type.name}
                          width={50}
                          height={50}
                        />
                        <span>{type.name}</span>
                      </label>
                    </div>
                  ))}
                  <label htmlFor="numberOfDocument" className="font-bold">
                    N° Documento
                  </label>
                  <input
                    type="text"
                    className={`w-full px-5 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none ${
                      errors.numberDocument && "border-red-500"
                    }`}
                    {...register("numberDocument", {
                      required: "Número de documento es requerido",
                      onBlur: (e) => checkDocumentNumberExist(e.target.value),
                    })}
                    placeholder="Número de documento"
                  />
                  {errors.numberDocument && (
                    <span className="text-red-500 text-sm bottom-2 left-2 relative">
                      {errors.numberDocument?.message}
                    </span>
                  )}
                  {documentNumberExist && (
                    <span className="text-red-500 text-sm bottom-2 left-2 relative">
                      El N° de documento ya existe
                    </span>
                  )}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="py-4 px-4 flex flex-col gap-5 justify-start text-black">
                <h2 className="text-2xl font-bold">
                  Verificación de documentos
                </h2>
                <h3 className="font-semibold opacity-75">
                  Haz fotos a ambas de tu documento de identidad por el Gobierno
                </h3>
                <img
                  src="/img/kyc/document.png"
                  className="w-80 h-w-80 mx-auto"
                  alt=""
                />
                <div>
                  <ul className="text-slate-700 l marker:text-primary font-semibold opacity-75 ">
                    <li className="list-disc">
                      Sube una imagen completa de tu documento de identidad.
                    </li>
                    <li className="list-disc">
                      Asegúrate de que, en la imagen que subas, se puedan leer
                      todos los datos.
                    </li>
                    <li className="list-disc">
                      Asegúrate de que el documento sea el original y no haya
                      caducado.
                    </li>
                    <li className="list-disc">
                      Coloca los documentos sobre un fondo de un color sólido.
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="flex flex-col w-full px-4 text-black">
                <h1 className="text-3xl text-start font-bold mb-4 text-black">
                  Subir fotos
                </h1>
                <div className="flex flex-col gap-4">
                  <p className="font-semibold">
                    Sube tu documento de identidad
                  </p>

                  <div className="flex gap-5 flex-wrap justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-semibold">
                        Anverso del doc. de identidad
                      </h3>
                      <div
                        className={`flex flex-col justify-center items-center bg-stone-800 rounded-xl ${
                          image1URL ? "py-4" : "py-10 px-8 gap-3"
                        } `}
                      >
                        {image1URL ? (
                          <img
                            src={image1URL}
                            alt="document"
                            className="w-full max-w-40 object-cover rounded-xl h-full"
                          />
                        ) : (
                          <>
                            <label className="text-white flex justify-center w-full max-w-40 gap-3 rounded-2xl bg-primary py-3 px-3">
                              <input
                                type="file"
                                className="hidden"
                                name="image1"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  setimage1(file);
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setImage1URL(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-upload"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 9l5 -5l5 5" />
                                <path d="M12 4l0 12" />
                              </svg>
                              <span>Cargar</span>
                            </label>
                            <span className="text-sm text-center w-full max-w-52 text-white">
                              10mb como máximo en formato .jpg/ .jpeg/ .png
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold">
                        Reverso del doc. de identidad
                      </h3>
                      <div
                        className={`flex flex-col justify-center items-center bg-stone-800 rounded-xl ${
                          image1URL ? "py-4" : "py-10 px-8 gap-3"
                        } `}
                      >
                        {image2URL ? (
                          <img
                            src={image2URL}
                            alt="document"
                            className="w-full max-w-40"
                          />
                        ) : (
                          <>
                            <label className="text-white flex justify-center w-full max-w-40 gap-3 rounded-2xl bg-primary py-3 px-3">
                              <input
                                type="file"
                                className="hidden"
                                name="image2"
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

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-upload"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 9l5 -5l5 5" />
                                <path d="M12 4l0 12" />
                              </svg>
                              <span>Cargar</span>
                            </label>
                            <span className="text-sm text-center w-full max-w-52 text-white">
                              10mb como máximo en formato .jpg/ .jpeg/ .png
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="px-4 py-10 flex flex-col items-center text-black text-center ">
                <h1 className="text-3xl text-start font-bold mb-4 text-black">
                  Bajo revisión
                </h1>
                <div className="flex flex-col gap-8 px-10 relative">
                  <p className="font-semibold text-sm">
                    Recibirás un correo electrónico cuando tu documento haya
                    sido verificado.
                  </p>

                  <p>
                    Tiempo estimado de revisión: <span>1 día(s)</span>
                  </p>
                  <ButtonBase
                    type="button"
                    variant={"alert"}
                    className="mx-auto text-black bg-primary py-4 px-10 rounded-2xl max-w-80"
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    Ir a la página principal
                  </ButtonBase>

                  <img
                    src="/img/g-token.png"
                    alt="document"
                    className="w-full max-w-72 mx-auto absolute -top-52 left-[500px] right-0 bottom-0 -z-0"
                  />
                  <img
                    src="/img/kyc/reloj.png"
                    alt="document"
                    className="w-full max-w-72 mx-auto absolute top-24 right-[480px] bottom-0"
                  />
                </div>
              </div>
            )}
          </>
          {step < 6 && (
            <div className="flex flex-col pt-10 pb-5 px-10 mb-8 mt-14 mx-auto w-11/12 md:max-w-[780px] bg-white/65 rounded-3xl text-black relative">
              <img
                src="/img/icons/notificate.svg"
                className="w-[70px] absolute left-[35px] -top-[35px]"
                alt=""
              />
              <h2 className="text-lg font-bold">
                {textHelpFooter[step]?.title}
              </h2>
              <ul>
                {textHelpFooter[step]?.list.map((item, i) => (
                  <li key={i} className="list-disc text-[13px] tracking-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {step < 6 && (
            <div className="flex justify-end mr-10 gap-3 mt-4 w-full">
              {/* <button
                type="button"
                className="bg-primary py-4 px-10 rounded-xl"
                onClick={() => setStep(0)}
              >
                Cancelar
              </button> */}
              <div className="flex gap-4">
                {step > 0 && (
                  <button
                    type="button"
                    className=" rounded-xl text-black  flex items-center gap-1"
                    onClick={() => {
                      if (step === 3 && userSession?.user?.isMetamask) {
                        return setStep(1);
                      }
                      setStep(Math.max(step - 1, 0));
                    }}
                  >
                    <i className="pi pi-angle-left text-xl"></i>
                    Atras
                  </button>
                )}

                {step < 5 && (
                  <button
                    type={"button"}
                    className="bg-primary text-white rounded-3xl font-bold py-2 px-12 disabled:bg-gray-500"
                    disabled={validForm()}
                    onClick={() => {
                      if (step === 5 && !image1URL && !image2URL) {
                        return;
                      }
                      if (
                        step === 1 &&
                        !!errors.country &&
                        !!errors.typeDocument
                      ) {
                        return;
                      }
                      if (step === 1 && userSession?.user?.isMetamask) {
                        console.log("entro");
                        return setStep(3);
                      }
                      setStep(Math.min(step + 1, 6));
                    }}
                  >
                    Continuar
                  </button>
                )}
              </div>

              {step === 5 && (
                <Button
                  type="submit"
                  className="bg-primary text-white rounded-3xl font-bold py-2 px-12 disabled:bg-gray-500"
                  disabled={!image1URL || !image2URL}
                  loading={loadinForm}
                >
                  Finalizar
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default KYCForm;

interface FormInputs {
  country: string;
  typeDocument: string;
}

interface ITextHelpFooter {
  title: string;
  list: string[];
}

const textHelpFooter: ITextHelpFooter[] = [
  {
    title: "Proporciona Información Precisa",
    list: [
      "Utiliza Documentos Oficiales",
      "Utiliza documentos oficiales válidos, como tu identificación emitida por el gobierno, para verificar tu identidad.",
      "Escanea o toma fotografías claras de tus documentos y asegúrate de que toda la información sea legible.",
    ],
  },
  {
    title: "Utiliza Documentos Oficiales",
    list: [
      "Utiliza documentos oficiales válidos, como tu identificación emitida por el gobierno, para verificar tu identidad.",
      "Escanea o toma fotografías claras de tus documentos y asegúrate de que toda la información sea legible.",
    ],
  },
  {
    title: "Contraseña para transacciones",
    list: [
      "Crea una contraseña segura para firmar transacciones.",
      "Esta contraseña será utilizada para firmar todas las transacciones que realices.",
    ],
  },
  {
    title: "Mantén la Privacidad",
    list: [
      "Ten en cuenta que la información que proporcionas durante el proceso de KYC es confidencial y se utiliza únicamente con fines de verificación.",
      "Nunca compartas tus datos de KYC con terceros no autorizados o enlaces no seguros.",
    ],
  },
  {
    title: "Paciencia y Colaboración",
    list: [
      "Sé paciente durante el proceso de verificación de KYC, ya que puede llevar tiempo revisar y verificar tus documentos.",
      "Colabora con el equipo de soporte si se requiere información adicional o si hay problemas con tu solicitud de KYC.",
    ],
  },
  {
    title: "Contacto con el Soporte",
    list: [
      "Si tienes alguna pregunta o necesitas asistencia durante el proceso de KYC, no dudes en contactar a nuestro equipo de soporte.",
      "Estamos aquí para ayudarte en cada paso del camino y garantizar una experiencia sin problemas.",
    ],
  },
];

const typeDocuments = [
  {
    name: "Docuemnto Nacional de Identidad",
    value: "dni",
    image: "/img/icons/dni.svg",
  },
  {
    name: "Pasaporte",
    value: "passport",
    image: "/img/icons/passport.svg",
  },
];

const countries = [
  {
    name: "Colombia",
    value: "colombia",
    image: "/img/kyc/countries/colombia.png",
  },
  {
    name: "Perú",
    value: "peru",
    image: "/img/kyc/countries/peru.png",
  },
  {
    name: "Venezuela",
    value: "venezuela",
    image: "/img/kyc/countries/venezuela.png",
  },
  {
    name: "Argentina",
    value: "argentina",
    image: "/img/kyc/countries/argentina.png",
  },
  {
    name: "Brasil",
    value: "brasil",
    image: "/img/kyc/countries/brasil.png",
  },
  {
    name: "Estado Unidos",
    value: "usa",
    image: "/img/kyc/countries/estados-unidos.png",
  },
  {
    name: "Francia",
    value: "francia",
    image: "/img/kyc/countries/francia.png",
  },
];

/*
{userSession?.user?.isMetamask === false && (
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-black/75">
                        Contraseña para firmar transacciones
                      </label>
                      <div className="w-full relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`w-full px-5 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none ${
                            errors.passwordToSign && "border-red-500"
                          }`}
                          {...register("passwordToSign", {
                            required: "Contraseña es requerida",
                          })}
                          placeholder="Contraseña"
                        />
                        <div
                          className="absolute right-4 top-4 cursor-pointer z-40"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`pi ${
                              showPassword ? "pi-eye-slash" : "pi-eye"
                            } text-xl`}
                          ></i>
                        </div>
                      </div>
                      {errors.passwordToSign?.message && (
                        <span className="text-red-500 text-sm bottom-2 left-2 relative">
                          {errors.passwordToSign?.message}
                        </span>
                      )}
                      {/* Helper text to explain this password is to sign all transaction 
                      <span className="text-sm text-gray-500">
                        Esta contraseña será usada para firmar todas las
                        transacciones que realices. No la compartas con nadie.
                      </span>
                    </div>
                  )}

*/
