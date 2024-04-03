import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC } from "react";

// Customized button variations
const buttonVariants = cva(
    `px-3 py-2 rounded-xl transition-all duration-200 ease-in-out hover:shadow-md hover:ring-2 hover:ring-opacity-50`,
    {
        variants: {
            variant: {
                primary: "bg-primary hover:bg-primaryHover hover:ring-primary",
                info: "bg-blue-500 hover:bg-blue-600 hover:ring-blue-500",
                danger: "bg-red-500 hover:bg-red-600 hover:ring-red-500",
                alert: "bg-yellow-500 hover:bg-yellow-600 hover:ring-yellow-500",
            },
            size: {
                small: "py-2 px-4 font-bold rounded-md text-white",
                large: "text-xl py-3 px-6 font-bold rounded-md",
            },
        },
        defaultVariants: {
            size: "small",
            variant: "primary",
        },
    }
);

// It is our ButtonProps interafce it extends ButtonHTMLAttributes of HTMLButtonElement interface
// Also extends from class-variance-authority lastly we passed our forwarded Reference type
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    ref?: React.Ref<HTMLButtonElement>;
}

const ButtonBase: FC<ButtonProps> = ({
    size,
    variant,
    className,
    children,
    ...props
}) => {
    return (
        <button
            type="button"
            className={cn(buttonVariants({ className, variant, size }))}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonBase;
