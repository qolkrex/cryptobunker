"use client";
import ButtonBase from '@/components/common/buttons/ButtonBase';
import BaseModal from '@/components/common/modals/BaseModal';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
// import * as userApi from '@/server';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
import { createUser } from '@/server';

export const UserModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    // si viene de los params un id se randeriza el form de actualiza si no el de crear

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: any) => {

        // TODO actualización optimista

        console.log(data);
        try {

            // const createUser = await userApi.createUser(data);

            await createUser(data);

            console.log(createUser);

            router.refresh();

            setIsOpen(false);

            reset();

            toast.success('Usuario creado correctamente');
        } catch (error) {
            console.log(error);
            toast.error('Error al crear el usuario');
        }

    }

    return (
        <>
            <Toaster />
            <ButtonBase
                variant="primary"
                size="small"
                onClick={() => setIsOpen(true)}
            >
                Agregar Usuario
            </ButtonBase>
            <BaseModal
                isOpen={isOpen}
                onClose={setIsOpen}
                title="Agregar Usuario"
            >
                <form className="mt-4 min-w-[400px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className="block">
                        <span className="text-gray-700">Nombre</span>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Jane Doe"
                            {
                            ...register("name", {
                                required: true,
                            })
                            }
                        />
                        {
                            errors.name && <span className="text-red-500">Este campo es requerido</span>
                        }
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            className="form-input mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="Email"
                            {
                            ...register("email", {
                                required: true,
                            })
                            }
                        />
                        {
                            errors.email && <span className="text-red-500">Este campo es requerido</span>
                        }
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Contraseña</span>
                        <input
                            type="password"
                            className="form-input mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="***************"
                            {
                            ...register("password", {
                                required: true,
                            })
                            }
                        />
                        {
                            errors.password && <span className="text-red-500">Este campo es requerido</span>
                        }
                    </label>

                    <div className="mt-4">
                        <ButtonBase
                            variant="primary"
                            size="small"
                            type="submit"
                        >
                            Agregar Usuario
                        </ButtonBase>
                    </div>
                </form>
            </BaseModal>
        </>
    )
}
