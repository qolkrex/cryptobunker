'use client';
import { FC } from "react";
// import { useTranslation } from "react-i18next";

interface Props {
    content: string;
    handleProp?: () => void;
}

export const ButtonSimple: FC<Props> = ({ content, handleProp }) => {
    // const { t } = useTranslation();
    const handleClick = () => {
        console.log("click");
    }
    return (
        <button
            onClick={handleProp ? handleProp : handleClick}
            className="flex items-center justify-center px-8 rounded-md text-black font-bold text-lg bg-golden  shadow-md hover:bg-warning hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out py-2"
            title={content}
        >
            {content}
        </button>
    )
}
