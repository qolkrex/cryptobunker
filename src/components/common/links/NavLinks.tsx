"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const pathName = usePathname();
    return (
        <Link
            href={href}
            className={`block py-2 px-3 text-white  rounded bg-opacity-20 md:p-0 md:bg-transparent md:hover:bg-transparent hover:border-b hover:bg-yellow-500 transition-colors  ${ pathName === href ? 'border-b-2' : '' }`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
