"use client";
import { getUser, getUserByEmail } from "@/server";
import {
  registerUserWithAddress,
  signInEmailAndMessage,
  signMetamask,
} from "@/server/actions/auth/register-actions";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Web3, { Personal } from "web3";

interface FormLoginEmailProps {
  email: string;
}

export const FormLoginEmail = () => {
  const [show, setShow] = useState(false);
  const [typeInput, setTypeInput] = useState("password");
  // const [state, dispatch] = useFormState(authenticate, undefined)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      // password: ''
    },
  });

  const handleLogin = async (data: FormLoginEmailProps, e: any) => {
    console.log({ data });
    e.preventDefault();
    try {
      const user = await getUserByEmail(data.email);
      if (user && user.isMetamask) {
        return toast.error(
          "Usuario registrado con Metamask, inicia sesión con Metamask"
        );
      }
      const response = await signInEmailAndMessage(data.email);

      console.log({ response });

      if (response?.status === "no-registered") {
        toast.error("Credenciales inválidas");
      }

      if (response?.status === "unconfirmed") {
        toast.error("Cuenta no confirmada, revisa tu correo");
      }

      if (response?.status === "inactive") {
        toast.error("Cuenta inactiva, contacta con el administrador");
      }

      if (response?.status === "success") {
        // router.replace("/dashboard");
        toast.success("Revisa tu correo para continuar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginWithMetamask = async (e: any) => {
    try {
      e.preventDefault();
      // await validateMetamask("metamask", true);
      if (typeof (window as any).ethereum === "undefined") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró Metamask, por favor instala Metamask",
        });
        return;
      }
      if (typeof (window as any).ethereum !== "undefined") {
        console.log("window", (window as any).ethereum);
        const provider = (window as any).ethereum;

        if (provider) {
          console.log("MetaMask is installed!");

          // Request accounts using eth_requestAccounts
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts);
        }
      }
      const web3 = new Web3((window as any).ethereum);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0].toLowerCase();
      console.log(userAddress);

      // Generar un mensaje que el usuario debe firmar
      const message = "Autorizo la autenticacion de mi cuenta";

      const personal: Personal = web3.eth.personal;
      const signature = await personal.sign(message, userAddress, "");
      // Firmar el mensaje

      // Enviar la firma al servidor para la verificación
      const response = await fetch("/api/metamask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userAddress, signature }),
      });
      console.log(response);
      const data = await response.json();

      console.log(data);

      if (data.message) {
        // Autenticado
        console.log("Autenticado");

        // Swal.fire({
        //   icon: "success",
        //   title: "Autenticado",
        //   text: "Autenticado con éxito",
        // });
        await comprobeAndLogin(userAddress);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al autenticar",
      });
    }
  };

  const comprobeAndLogin = async (address: string) => {
    try {
      const users = await fetch("/api/users");
      const usersJson = await users.json();
      const user = await usersJson.find(
        (u: any) => u.address.toLowerCase() === address.toLowerCase()
      );
      console.log(user);
      if (user && user.email) {
        // console.log("Usuario registrado con email");
        const response = await signInEmailAndMessage(user.email, true);
        console.log({ response });
        if (response) {
          router.push(response.message);
        }
      } else {
        // console.log("Usuario no registrado");
        const user: any = await registerUserWithAddress({ address });
        // console.log(user);
        if (user && user) {
          const response = await signInEmailAndMessage(user.email, true);
          console.log({ response });
          if (response) {
            router.push(response.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al autenticar, intente de nuevo",
      });
    }
  };

  return (
    <form
      // action={dispatch}
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col w-full max-w-[400px] bg-primary p-10"
    >
      <h1 className="text-2xl font-bold mb-4 text-white">
        Logueate en GoldMak
      </h1>
      <label htmlFor="" className="flex flex-col">
        <span className="text-white text-base">Email</span>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Email inválido",
            },
          })}
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
        />
        <span className="text-red-500 text-sm">{errors.email?.message}</span>
      </label>
      {/* <label htmlFor="" className='flex flex-col'>
                <span className="text-white text-base">
                    Password
                </span>
                <div className="w-full relative">
                    <input
                        type={typeInput}
                        placeholder="Password"
                        {
                        ...register('password', {
                            required: 'Required',
                            minLength: {
                                value: 6,
                                message: 'Tamaño mínimo de 6 caracteres',
                            },
                            // pattern: {
                            //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            //     message: 'Debe contener al menos una letra y un número',
                            // },
                        })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
                    />
                    {
                        show ?
                            <button
                                type="button"
                                className="absolute right-0 top-0 bg-transparent w-11 h-11 flex justify-center items-center rounded-md"
                                onClick={() => {
                                    setShow(!show)
                                    setTypeInput("text")
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </button>
                            :
                            <button
                                type="button"
                                className="absolute right-0 top-0 bg-transparent w-11 h-11 flex justify-center items-center rounded-md"
                                onClick={() => {
                                    setShow(!show)
                                    setTypeInput("password")
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>

                            </button>
                    }
                </div>
                <span className="text-red-500 text-sm">
                    {errors.email?.message}
                </span>
            </label> */}

      {/* {
                state === "CredentialsSignin" &&
                <div className='mb-2'>
                    <p className="text-red-500 text-sm mt-2">
                        Credenciales Inválidas
                    </p>
                </div>
            } */}

      <LoginButton />
      {/* <button
                type='button'
                className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 mt-2 flex items-center justify-center gap-2"
            >
                <span>
                    Login with Gmail
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" strokeWidth="0" fill="currentColor" /></svg>
            </button> */}

      {/* si no estas registrado, continua en el siguiente link */}

      <p className="mt-4">
        ¿No tienes cuenta? &nbsp;
        <Link href="/register" className="text-blue-600">
          Regístrate aquí
        </Link>
      </p>

      <div className="mt-2 h-1 bg-white bg-opacity-60" />
      <button
        className="px-4 py-2 bg-white text-primary rounded-md hover:bg-opacity-80 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 mt-4"
        type="button"
        onClick={handleLoginWithMetamask}
      >
        <MetamaskSVG className="w-10 h-10" />
        Conecta con Metamask
      </button>
      {/* divider */}
      <button
        className="px-4 py-2 bg-white text-primary rounded-md hover:bg-opacity-80 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 mt-4"
        onClick={() => {
          signIn("google");
        }}
        type="button"
      >
        Inicia sesión con Google
      </button>
      <div className="mt-2 h-1 bg-white bg-opacity-60" />

      {/* olvidaste tu constraseña */}
      <p className="mt-2 text-end">
        <Link href="/forgot-password" className="text-blue-600">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
    </form>
    // <div className="flex flex-col w-full max-w-[800px] min-h-[100vh] my-24 md:my-36 bg-primary px-3 py-5 md:p-10">
    //     <h1 className='text-2xl mx-auto text-white font-semibold'>
    //         Únete a GoldMak
    //     </h1>
    //     <iframe src="https://app.mailingboss.com/lists/65ba95cc440b2/subscribe"
    //         width="100%"
    //         height="100%"
    //         frameBorder="0"
    //         scrolling="yes"
    //         className='w-full h-full min-h-[100vh]'
    //     ></iframe>
    // </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        {
          "": !pending,
          "opacity-30 bg-gray-800": pending,
        },
        "bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
      )}
    >
      {pending ? (
        <span className="flex gap-3 justify-center">
          Cargando
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        </span>
      ) : (
        <span>Iniciar sesión</span>
      )}
    </button>
  );
}

const MetamaskSVG = ({ className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="189"
      viewBox="0 0 212 189"
      id="metamask"
      className={className}
    >
      <g fill="none" fillRule="evenodd">
        <polygon
          fill="#CDBDB2"
          points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"
        ></polygon>
        <polygon
          fill="#CDBDB2"
          points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875"
          transform="matrix(-1 0 0 1 256.5 0)"
        ></polygon>
        <polygon
          fill="#393939"
          points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"
        ></polygon>
        <polygon
          fill="#F89C35"
          points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"
        ></polygon>
        <polygon
          fill="#F89D35"
          points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
        ></polygon>
        <polygon
          fill="#D87C30"
          points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
        ></polygon>
        <polygon
          fill="#EA8D3A"
          points="46.125 101.813 65.25 119.813 65.25 137.813"
        ></polygon>
        <polygon
          fill="#F89D35"
          points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
        ></polygon>
        <polygon
          fill="#EB8F35"
          points="65.25 138.375 60.75 173.25 90.563 152.438"
        ></polygon>
        <polygon
          fill="#EA8E3A"
          points="92.25 102.375 95.063 150.188 86.625 125.719"
        ></polygon>
        <polygon
          fill="#D87C30"
          points="39.375 138.938 65.25 138.375 60.75 173.25"
        ></polygon>
        <polygon
          fill="#EB8F35"
          points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
        ></polygon>
        <polygon
          fill="#E8821E"
          points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
        ></polygon>
        <polygon
          fill="#DFCEC3"
          points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"
        ></polygon>
        <polygon
          fill="#DFCEC3"
          points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625"
          transform="matrix(-1 0 0 1 272.25 0)"
        ></polygon>
        <polygon
          fill="#393939"
          points="70.313 112.5 64.125 125.438 86.063 119.813"
          transform="matrix(-1 0 0 1 150.188 0)"
        ></polygon>
        <polygon
          fill="#E88F35"
          points="12.375 .563 88.875 58.5 75.938 27"
        ></polygon>
        <path
          fill="#8E5A30"
          d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
        ></path>
        <g transform="matrix(-1 0 0 1 211.5 0)">
          <polygon
            fill="#F89D35"
            points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
          ></polygon>
          <polygon
            fill="#D87C30"
            points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
          ></polygon>
          <polygon
            fill="#EA8D3A"
            points="46.125 101.813 65.25 119.813 65.25 137.813"
          ></polygon>
          <polygon
            fill="#F89D35"
            points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
          ></polygon>
          <polygon
            fill="#EB8F35"
            points="65.25 138.375 60.75 173.25 90 153"
          ></polygon>
          <polygon
            fill="#EA8E3A"
            points="92.25 102.375 95.063 150.188 86.625 125.719"
          ></polygon>
          <polygon
            fill="#D87C30"
            points="39.375 138.938 65.25 138.375 60.75 173.25"
          ></polygon>
          <polygon
            fill="#EB8F35"
            points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
          ></polygon>
          <polygon
            fill="#E8821E"
            points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
          ></polygon>
          <polygon
            fill="#393939"
            points="70.313 112.5 64.125 125.438 86.063 119.813"
            transform="matrix(-1 0 0 1 150.188 0)"
          ></polygon>
          <polygon
            fill="#E88F35"
            points="12.375 .563 88.875 58.5 75.938 27"
          ></polygon>
          <path
            fill="#8E5A30"
            d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
          ></path>
        </g>
      </g>
    </svg>
  );
};
