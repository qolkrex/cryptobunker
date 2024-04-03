"use client";
import React, { useState, useEffect } from "react";

const ButtonTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // Cambia 100 al número de píxeles que desees que el usuario haga scroll antes de que aparezca el botón
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 p-5 bg-[#191970] text-white rounded-full shadow-md rotate-180 hover:bg-primaryHover z-30 ${
        isVisible ? "block" : "hidden"
      } transition duration-500 transform hover:scale-110`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 0 1 1 1v11.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1
                    1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 14.586V3a1 1 0 0 1 1-1z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ButtonTop;
