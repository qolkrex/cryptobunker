import { SessionProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode;
}

export const NextAuthProvider = ({ children, ...rest }: Props) => {
    return (
        <SessionProvider {...rest}>
            {children}
        </SessionProvider>
    )
}