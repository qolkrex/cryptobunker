import React, { useEffect, useReducer } from "react";
import { AuthContext, AuthReducer } from "../";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
// } from "firebase/auth";
// import { User } from "../../interfaces";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
// import { User } from "@/utils/models/user.model";
// import { auth } from '../../../firebase';
// import { motivozApi } from "../../api";
// import { AxiosError, AxiosResponse } from "axios";


interface Props {
    children: React.ReactNode;
}
export enum AUTH_STATUS {
    CHECKING = 'checking', // revisando
    NOT_AUTHENTICATED = 'not-authenticated', // no esta autenticado
    AUTHENTICATED = 'authenticated' // esta autenticado
}

export interface AuthState {
    isLogged: boolean;
    user: User | null;
    status: AUTH_STATUS,
}

export const Auth_INITIAL_STATE: AuthState = {
    isLogged: false,
    user: null,
    status: AUTH_STATUS.CHECKING,
};

interface SignUpResponse {
    ok: boolean;
    msg: string;
    statusLogin: 'confirmed' | 'pending';
}

interface SignInResponse {
    ok: boolean;
    msg: string;
    statusLogin?: 'confirmed' | 'pending';
    status?: 'enabled' | 'disabled';
    google?: boolean;
    user?: User;
    token: string;
}

export const AuthProvider = ({ children }: Props) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);

    const handleSignup = async (name: string, email: string, password: string) => {
        //         try {
        //     motivozApi.post<SignUpResponse>('/register', {
        //         name,
        //         email,
        //         password,
        //     })
        //         .then((res: AxiosResponse<SignUpResponse>) => {
        //             console.log(res.data)
        //             const { ok, msg, statusLogin } = res.data;

        //             if (ok && statusLogin === 'pending') {
        //                 Swal.fire({
        //                     icon: 'info',
        //                     title: 'Se ha enviado un correo de confirmación a su cuenta de correo electrónico.',
        //                     text: msg,
        //                 });
        //                 return;
        //             }

        //             if (ok) {
        //                 Swal.fire({
        //                     icon: 'success',
        //                     title: 'Correcto',
        //                     text: 'Se Registro correctamente...',
        //                     html: `
        //                         <p>Se ha enviado un correo de confirmación a su cuenta de correo electrónico.</p>
        //                         <p>Por favor, revise su bandeja de entrada y haga clic en el enlace de confirmación para activar su cuenta.</p>
        //                     `,
        //                 });
        //                 return;
        //             }

        //             if (!ok) {
        //                 Swal.fire({
        //                     icon: 'error',
        //                     title: 'Error',
        //                     text: msg,
        //                 });
        //                 return;
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Error',
        //                 text: err.message,
        //             });
        //             // dispatch({
        //             //     type: '[Auth] - Logout',
        //             // });
        //         })
        // } catch (error: any) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: error.message,
        //     });
        //     // dispatch({
        //     //     type: '[Auth] - Logout',
        //     // });
        // }
    };

    const handleLogin = (email: string, password: string) => {

        // motivozApi.post('/auth/login', {
        //     email,
        //     password,
        // })
        //     .then((res: AxiosResponse<SignInResponse>) => {
        //         console.log(res.data)
        //         const { ok, msg, statusLogin, status, google, user, token } = res.data;

        //         if (status === 'disabled') {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Error',
        //                 text: 'Su cuenta se encuentra deshabilitada, por favor contacte con el administrador.',
        //             });
        //             return;
        //         }

        //         if (google) {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Error',
        //                 text: 'Por favor, inicie sesión con su cuenta de Google.',
        //             });
        //             return;
        //         }

        //         if (ok && statusLogin === 'pending') {

        //             Swal.fire({
        //                 icon: 'info',
        //                 title: 'Se ha enviado un correo de confirmación a su cuenta de correo electrónico.',
        //                 text: msg,
        //             });
        //             return;
        //         }

        //         if (ok && user) {
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Correcto',
        //                 text: 'Se Logueo correctamente...',
        //             });

        //             localStorage.setItem("x-token", token);
        //             localStorage.setItem("token-init-date", new Date().getTime().toString());

        //             dispatch({
        //                 type: '[Auth] - Is Login',
        //                 payload: {
        //                     user: {
        //                         uid: user.uid,
        //                         name: user.name,
        //                         email: user.email,
        //                         role: user.role,
        //                         photoUrl: user.photoUrl,
        //                         status: user.status,
        //                     },
        //                     isLogged: true,
        //                 }
        //             });

        //             return;
        //         }

        //         // if (!ok) {
        //         //     Swal.fire({
        //         //         icon: 'error',
        //         //         title: 'Error',
        //         //         text: msg,
        //         //     });
        //         //     return;
        //         // }
        //     })
        //     .catch(err => {
        //         console.log(err)

        //         const { ok, msg, statusLogin, status, google } = err.response.data;

        //         if (status === 'disabled') {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Error',
        //                 text: 'Su cuenta se encuentra deshabilitada, por favor contacte con el administrador.',
        //             });
        //             return;
        //         }

        //         if (!google) {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Error',
        //                 text: 'Por favor, inicie sesión con su cuenta de Google.',
        //             });
        //             return;
        //         }

        //         if (!ok && statusLogin === 'pending') {

        //             Swal.fire({
        //                 icon: 'info',
        //                 title: 'Se ha enviado un correo de confirmación a su cuenta de correo electrónico.',
        //                 text: msg,
        //             });
        //             return;
        //         }


        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Error',
        //             text: "Error al iniciar sesión",
        //         });
        //         // dispatch({
        //         //     type: '[Auth] - Logout',
        //         // });
        //     })
    };

    const handleGoogleSignIn = async () => {
        // const googleProvider = new GoogleAuthProvider();
        // try {
        //     const result = await signInWithPopup(auth, googleProvider);

        //     motivozApi.post("/auth/google", {
        //         uid: result.user.uid,
        //     })
        //         .then((res) => {
        //             console.log(res);

        //             const { ok, msg, user, token } = res.data;

        //             if (ok) {
        //                 // const { token, user } = data;
        //                 localStorage.setItem("x-token", token);
        //                 localStorage.setItem("token-init-date", new Date().getTime().toString());
        //                 dispatch({
        //                     type: '[Auth] - Is Login',
        //                     payload: {
        //                         user: {
        //                             uid: user.uid,
        //                             name: user.name,
        //                             email: user.email,
        //                             role: user.role,
        //                             photoUrl: user.photoUrl,
        //                             status: user.status,
        //                         },
        //                         isLogged: true,
        //                     }
        //                 });
        //                 sweetalert2.fire({
        //                     icon: "success",
        //                     title: "Correcto",
        //                     text: "Se Logueo correctamente..."
        //                 });
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             const { msg, data } = err.response.data;

        //             if (!data) {
        //                 sweetalert2.fire({
        //                     icon: "error",
        //                     title: "Error",
        //                     text: "Usuario no existe",
        //                     html: `
        //                         <a href="/auth/register" class="text-blue-500">Registrarse</a>
        //                     `
        //                 });
        //                 return;
        //             }

        //             // console.log(msg);
        //             const { status, statusLogin, google } = data;

        //             if (status === "disabled") {
        //                 sweetalert2.fire({
        //                     icon: "error",
        //                     title: "Error",
        //                     text: msg,
        //                 });
        //                 return;
        //             }

        //             if (statusLogin === "pending") {
        //                 sweetalert2.fire({
        //                     icon: "info",
        //                     title: msg,
        //                     // text: msg,
        //                     html: `
        //                     <ul class="flex items-start flex-col gap-2">
        //                         <li class="list-disc">Por favor, revise su bandeja de entrada y haga clic en el enlace de confirmación para activar su cuenta.</li>
        //                         <li class="list-disc">Si no encuentra el correo electrónico, revise su carpeta de correo no deseado.</li>
        //                     </ul>
        //                 `,
        //                 });
        //                 return;
        //             }

        //             if (google === false) {
        //                 sweetalert2.fire({
        //                     icon: "error",
        //                     title: "Error",
        //                     text: "Usuario no existe",
        //                 });
        //                 return;
        //             }


        //         });
        // } catch (error) {
        //     console.log(error)
        // }
    };

    const handleGoogleSignUp = async () => {
        // const googleProvider = new GoogleAuthProvider();
        // try {
        //     const result = await signInWithPopup(auth, googleProvider);
        //     motivozApi.post<SignInResponse>("/register/create-user-google", {
        //         name: result.user.displayName,
        //         email: result.user.email,
        //         photoUrl: result.user.photoURL,
        //         uid: result.user.uid,
        //     })
        //         .then((res) => {
        //             console.log(res);
        //             sweetalert2.fire({
        //                 icon: "success",
        //                 title: "Correcto",
        //                 text: "Se Registro correctamente...",
        //             });
        //             router.push("/auth/login");
        //         })
        //         .catch((err: AxiosError<SignInResponse>) => {
        //             console.log(err);
        //             const { msg, status, statusLogin } = err.response?.data || {};

        //             if (status === "disabled") {
        //                 sweetalert2.fire({
        //                     icon: "error",
        //                     title: "Error",
        //                     text: msg,
        //                 });
        //                 return;
        //             }

        //             if (statusLogin === "pending") {
        //                 Swal.fire({
        //                     icon: "info",
        //                     title: msg,
        //                     text: msg,
        //                     html: `
        //                         <ul class="flex items-start flex-col gap-2">
        //                             <li class="list-disc">Por favor, revise su bandeja de entrada y haga clic en el enlace de confirmación para activar su cuenta.</li>
        //                             <li class="list-disc">Si no encuentra el correo electrónico, revise su carpeta de correo no deseado.</li>
        //                         </ul>
        //                     `,
        //                 });
        //                 return;
        //             }

        //             if (statusLogin === "confirmed") {
        //                 Swal.fire({
        //                     icon: "info",
        //                     title: msg,
        //                     text: "El correo ya esta registrado",
        //                 });
        //                 return;
        //             }

        //             sweetalert2.fire({
        //                 icon: "error",
        //                 title: "Error",
        //                 text: "Error al registrar usuario",
        //             });
        //         });

        // } catch (error) {
        //     console.log(error)
        // }
    };

    const handleLogOut = () => {
        // signOut(auth);
        // dispatch({
        //     type: "[Auth] - Is Login",
        //     payload: {
        //         isLogged: false,
        //         user: null,
        //     }
        // });
        // // clean session storage
        // localStorage.removeItem("x-token");
        // router.push("/");
    };

    // renew token
    // useEffect(() => {
    //     dispatch({
    //         type: '[Auth] - Checking'
    //     })
    //     // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     motivozApi.get("/auth/renew", {
    //         headers: {
    //             "x-token": localStorage.getItem("x-token") || "",
    //         },
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             const { ok, msg, token, user } = res.data;
    //             if (ok) {
    //                 localStorage.setItem("x-token", token);
    //                 localStorage.setItem("token-init-date", new Date().getTime().toString());
    //                 dispatch({
    //                     type: "[Auth] - Is Login",
    //                     payload: {
    //                         user: {
    //                             uid: user.uid,
    //                             name: user.name,
    //                             email: user.email,
    //                             role: user.role,
    //                             photoUrl: user.photoUrl,
    //                             status: user.status,
    //                         },
    //                         isLogged: true,
    //                     },
    //                 });
    //             } else {
    //                 dispatch({
    //                     type: "[Auth] - Logout",
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             dispatch({
    //                 type: "[Auth] - Logout",
    //             });
    //         });
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleSignup,
                handleLogin,
                handleGoogleSignIn,
                handleLogOut,
                handleGoogleSignUp
            }}
        >
            {
                state.status === AUTH_STATUS.CHECKING
                    ?
                    <div className="w-full h-full min-h-screen bg-gray-800 text-white"
                    >
                        cheching
                    </div>
                    :
                    children
            }
        </AuthContext.Provider>
    );
};
