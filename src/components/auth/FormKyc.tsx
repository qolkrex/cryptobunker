"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonBase from "../common/buttons/ButtonBase";
import Link from "next/link";
import { registerUser } from "@/server/actions/auth/register-actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// status -> unconfirmed, confirmed, active, inactive

interface FormInputs {
  name: string;
  lastName: string;
  phone: string;
  email: string;
}

export const FormKyc = () => {
  const [step, setStep] = useState(0);

  const ref = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const sendedEmail = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (ref.current) {
      if (step !== 0) {
        ref.current.classList.add("animate-fade-left", "animation-bounce");
      }
      ref.current?.getAnimations().forEach((animation) => {
        animation.onfinish = () => {
          ref.current?.classList.remove(
            "animate-fade-left",
            "animation-bounce"
          );
        };
      });
    }
    console.log({ step });
  }, [step]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    const { name, lastName, phone, email } = data;

    // server action
    const resp = await registerUser({ name, lastName, phone, email });

    console.log({ resp });

    if (!resp.ok) {
      toast.error(resp.message);
      return;
    }

    toast.success(resp.message);

    if (resp?.user?.status === "unconfirmed") {
      toast.info("Verifica tu correo electrónico", {
        autoClose: false,
      });
      reset();
      // router.push('/confirmar-cuenta');
      return;
    }

    reset();
  };

  return (
    <div className="flex flex-1 items-center w-full md:max-w-[500px] mx-auto pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center bg-white bg-opacity-65 rounded-xl p-4 py-10 w-full "
        ref={ref}
      >
        {step === 0 && (
          <>
            <h1 className="text-3xl text-start font-bold mb-4 text-black">
              Registro GOLDMAK
            </h1>
            <div className="w-full max-w-[450px]">
              <label htmlFor="name" className="block w-full">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-xl"
                autoFocus
                {...register("name", {
                  required: "Nombre es requerido",
                })}
                id="name"
              />
              <label htmlFor="lastName" className="block w-full">
                Apellidos
              </label>
              <input
                type="text"
                placeholder="Apellidos"
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-xl"
                {...register("lastName", {
                  required: "Apellidos es requerido",
                })}
                id="lastName"
              />
              <label htmlFor="phone" className="block w-full">
                Teléfono
              </label>
              <input
                type="text"
                placeholder="Teléfono"
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-xl"
                {...register("phone", {
                  required: "Teléfono es requerido",
                })}
                id="phone"
              />
              <label htmlFor="email" className="block w-full">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-xl"
                {...register("email", {
                  required: "Email es requerido",
                })}
                id="email"
              />
            </div>
          </>
        )}

        <div className="w-full max-w-[450px] flex gap-2 mt-5">
          {sendedEmail ? (
            <>
              <button
                type="button"
                className="bg-primary py-4 px-10 rounded-xl"
                onClick={() => setStep(0)}
              >
                Cancelar
              </button>
              {step > 0 && (
                <button
                  type="button"
                  className="bg-primary py-4 px-10 rounded-xl"
                  onClick={() => setStep(step - 1)}
                >
                  Atras
                </button>
              )}

              <button
                type="button"
                className="bg-primary py-4 px-10 rounded-xl"
                onClick={() => setStep(step + 1)}
              >
                Continuar
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="w-full items-center bg-primary py-4 px-10 rounded-xl"
            >
              Registrate
            </button>
          )}
        </div>
        <p className="mt-4">
          ¿Ya tienes cuenta? &nbsp;
          <Link href="/login" className="text-blue-600">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
    // <div className="mx-auto flex flex-col w-full max-w-[800px] min-h-[100vh] my-24 md:my-36 bg-primary px-3 py-5 md:p-10">
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
