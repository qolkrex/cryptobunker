"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const AdminLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
    const pathName = usePathname();
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block py-2 my-1 px-3 text-black  rounded  transition-colors hover:bg-primary drop-shadow-md hover:text-white  ${ pathName === href ? 'bg-primary border-b-2 text-white' : '' }`}
        >
            {children}
        </Link>
    );
};

export default AdminLink;
