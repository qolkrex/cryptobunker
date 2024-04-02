import { HomeLayout } from '@/components/layouts/HomeLayout';
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <HomeLayout>
            <div className="flex flex-col items-center justify-center min-h-[75vh]">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-lg text-gray-600">Page not found</p>
                <Link
                    href="/"
                    className='text-yellow-600 hover:text-yellow-800'
                >
                    Regresar al inicio
                </Link>
            </div>
        </HomeLayout>
    );
};

export default NotFound;
