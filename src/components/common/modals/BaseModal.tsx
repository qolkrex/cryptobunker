import React from 'react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50 z-40 hover:cursor-pointer"
                        onClick={() => onClose(false)}
                    ></div>
                    <div className="bg-white rounded-lg shadow-lg p-4 z-50">

                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-bold">{title}</h1>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => onClose(false)}
                            >
                                <svg
                                    className="fill-current h-6 w-6"
                                    role="button"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Close</title>
                                    <path
                                        fillRule="evenodd"
                                        d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 01-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 011.414-1.414l2.93 2.93 2.93-2.93a1 1 0 011.414 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>


                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default BaseModal;
