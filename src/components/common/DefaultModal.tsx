import React, { useState } from 'react';

interface Props {
    children: React.ReactNode;
    setOpenModal: (state: boolean) => void;
    // setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultModal: React.FC<Props> = ({ children, setOpenModal }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-">
            {/* <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Modal Content</h2>
                        <p>This is the content of the modal.</p>
                        {children}
                        <button
                            onClick={() => setOpenModal(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                        >
                            X
                        </button>
                    </div> */}
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div onClick={() => setOpenModal(false)} className="absolute inset-0 bg-gray-500 opacity-40"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    className="inline-block align-bottom bg-[#7f7f7f] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-12 py-12"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <button
                        onClick={() => setOpenModal(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg absolute right-4 top-4"
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultModal;
