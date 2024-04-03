"use client";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

const ButtonNotification = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <button
        // href={"/dashboard/settings/notifications"}
        onClick={() => {
          setOpenModal(true);
        }}
        className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-6 px-8 rounded flex justify-between items-center gap-3 max-w-3xl"
      >
        <span className="flex justify-center items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-bell"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          </svg>{" "}
          Notificaciones
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevrons-right"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7l5 5l-5 5" />
          <path d="M13 7l5 5l-5 5" />
        </svg>
      </button>
      <Dialog
        visible={openModal}
        header="Notificaciones"
        onHide={() => setOpenModal(false)}
        draggable={false}
        resizable={false}
        closeOnEscape
        dismissableMask
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-2 items-center">
            <p className="text-wrap">Notificaciones de login (email -ip, hora, fecha)</p>
            <Checkbox checked />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <p className="text-wrap">
              Anuncios (rondas nuevas de venta, actualizaciones, informaciones del
              ago)
            </p>
            <Checkbox checked />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ButtonNotification;
