"use client";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast, ToastMessage } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const textConfirmationOperation = {
  "1": "Por favor, ingresa el número de transacción de tu depósito.",
  "2": "Por favor, ingresa el número de transacción de operación de Yape.",
  "3": "Por favor, ingresa el número de transacción de operación de Plin.",
};

export const CustomTableDepositAndWithdraw = () => {
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [showConfirmOperation, setShowConfirmOperation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buyBnbFirstTime, setBuyBnbFirstTime] = useState(false);

  const toastBottomCenter = useRef(null);

  const showMessage = (
    ref: React.RefObject<Toast>,
    severity: ToastMessage["severity"],
    label: string,
    detail: string
  ) => {
    ref.current?.show({
      severity: severity,
      summary: label,
      detail,
      life: 3000,
    });
  };

  return (
    <div className="bg-[#414141] px-2 py-2 mt-5">
      <TabView panelContainerClassName="bg-inherit text-white">
        <TabPanel header="Depositar" leftIcon="pi pi-arrow-circle-down mr-2">
          <p className="m-0 mb-4">
            Deposita y recibe DgSoles en tu cuenta de usuario.{" "}
            <i
              id="deposit-steps"
              className="pi pi-question-circle cursor-pointer"
            ></i>{" "}
          </p>
          <Tooltip target="#deposit-steps">
            <div className="flex flex-col">
              <p>Para ello, sigue los siguientes pasos:</p>
              <ol className="list-decimal ml-5 mt-1">
                <li>Seleccione el método de pago que prefieras.</li>
                <li>Selecciona la cantidad de DgSoles que deseas depositar.</li>
                <li>Realiza el depósito.</li>
                <li>Confirmar la operación en el botón de abajo.</li>
                <li>Ingresa el numero de transacción.</li>
                <li>Espera a que tu depósito sea confirmado.</li>
              </ol>
            </div>
          </Tooltip>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="quantitySoles">Medio de Pago</label>
              <select
                name="quantitySoles"
                id="quantitySoles"
                className="w-full bg-[#333333] text-white p-2 rounded-md"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="1">Transferencia Bancaria</option>
                <option value="2">Yape</option>
                <option value="3">Plin</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="quantitySoles">Cantidad</label>
              <input
                type="number"
                id="quantitySoles"
                name="quantitySoles"
                className="w-full bg-[#333333] text-white p-2 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between gap-3 my-3">
              <label htmlFor="buyBnbFirstTime" className="m-0 text-sm">
                ¿Quieres comprar <b>1 USD</b> de BNB para el pago de tus Tx
                (GAS)?, se descontará de tu depósito
              </label>
              {/* <input type="checkbox" className="m-0" /> */}
              <Checkbox
                inputId="buyBnbFirstTime"
                checked={buyBnbFirstTime}
                onChange={(e) => setBuyBnbFirstTime(e.checked as boolean)}
              />
            </div>
            {paymentMethod === "1" && (
              <div className="px-1 py-2">
                <h2 className="font-bold">Datos Bancarios</h2>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between">
                    <p className="m-0 font-bold text-sm">Nombre empresa</p>
                    <p className="m-0 text-sm">Qolkrex foundation</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="m-0 font-bold text-sm">Banco</p>
                    <p className="m-0 text-sm">
                      Banco de Credito del Peru (BCP)
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="m-0 font-bold text-sm">N° de cuenta</p>
                    <p className="m-0 text-sm flex items-center">
                      194216455478787
                      <button
                        onClick={(event) => {
                          navigator.clipboard.writeText("194216455478787");
                          showMessage(
                            toastBottomCenter,
                            "info",
                            "Copiado",
                            "Número de cuenta copiado"
                          );
                        }}
                      >
                        <i className="pi pi-copy cursor-pointer ml-1"></i>
                      </button>
                      <Toast ref={toastBottomCenter} position="bottom-center" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="m-0 font-bold text-sm">Tipo de cuenta</p>
                    <p className="m-0 text-sm">Cuenta Corriente</p>
                  </div>
                </div>
              </div>
            )}
            {
              // Payment method 2
              paymentMethod === "2" && (
                <div>
                  <h2 className="font-bold">Datos de Yape</h2>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between">
                      <p className="m-0 font-bold text-sm">Nombre empresa</p>
                      <p className="m-0 text-sm">Qolkrex foundation</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="m-0 font-bold text-sm">N° de celular</p>
                      <p className="m-0 text-sm">321 654 873</p>
                    </div>
                  </div>
                </div>
              )
            }

            {
              // Payment method 3
              paymentMethod === "3" && (
                <div>
                  <h2 className="font-bold">Datos de Plin</h2>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between">
                      <p className="m-0 font-bold text-sm">Nombre empresa</p>
                      <p className="m-0 text-sm">Qolkrex foundation</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="m-0 font-bold text-sm">N° de celular</p>
                      <p className="m-0 text-sm">321 654 873</p>
                    </div>
                  </div>
                </div>
              )
            }
            {/* Ya realice mi deposito aqui colocar algo como un boton o algo */}
            <p className="text-sm">
              Si ya realizaste tu deposito, por favor haz click en el siguiente
              botón
            </p>
            <button
              className="bg-[#333333] text-white p-2 w-full rounded-md hover:opacity-60"
              onClick={() => setShowConfirmOperation(true)}
            >
              Confirmar Operacion
            </button>

            <p className="m-0 text-sm mt-2">
              <strong>Nota:</strong> El tiempo de confirmación de tu depósito
              puede variar dependiendo del método de pago seleccionado.
            </p>
            <Dialog
              header="Confirmar Operacion"
              visible={showConfirmOperation}
              onHide={() => setShowConfirmOperation(false)}
              headerClassName="bg-[#414141] text-white"
              contentClassName="bg-[#414141] text-white"
            >
              <div>
                <p className="m-0">
                  {textConfirmationOperation[
                    paymentMethod as keyof typeof textConfirmationOperation
                  ] || ""}
                </p>
                <input
                  type="text"
                  className="w-full bg-[#333333] text-white p-2 rounded-md mt-2"
                />
                <Button
                  className="bg-[#333333] text-white p-2 w-full rounded-md mt-2 flex justify-center gap-2"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setShowConfirmOperation(false);
                    }, 2000);
                  }}
                  loading={loading}
                  disabled={loading}
                >
                  Confirmar
                </Button>
              </div>
            </Dialog>
          </div>
        </TabPanel>
        <TabPanel header="Retirar" rightIcon="pi pi-arrow-circle-up ml-2">
          <div>
            <h2>Retirar a tu banco</h2>
            <p>
              Retira tus DgSoles a tu cuenta bancaria.{" "}
              <i
                id="withdraw-steps"
                className="pi pi-question-circle cursor-pointer"
              ></i>
            </p>
            <Tooltip target="#withdraw-steps">
              <div>
                <p>Para ello, sigue los siguientes pasos:</p>
                <ol className="list-decimal ml-5 mt-1">
                  <li>Selecciona la cantidad de DgSoles que deseas retirar.</li>
                  <li>Selecciona el banco de destino.</li>
                  <li>Ingresa el número de cuenta.</li>
                  <li>Espera a que tu retiro sea confirmado.</li>
                </ol>
              </div>
            </Tooltip>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="quantitySoles">Cantidad</label>
                <input
                  type="number"
                  id="quantitySoles"
                  name="quantitySoles"
                  className="w-full bg-[#333333] text-white p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="quantitySoles">Banco</label>
                <select
                  name="quantitySoles"
                  id="quantitySoles"
                  className="w-full bg-[#333333] text-white p-2 rounded-md"
                >
                  <option value="1">Banco de Credito del Peru (BCP)</option>
                  <option value="2">Interbank</option>
                  <option value="3">BBVA</option>
                  <option value="4">Scotiabank</option>
                  <option value="5">Banbif</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="quantitySoles">N° de cuenta</label>
                <input
                  type="number"
                  id="quantitySoles"
                  name="quantitySoles"
                  className="w-full bg-[#333333] text-white p-2 rounded-md"
                />
              </div>
              <button
                className="bg-[#333333] text-white p-2 w-full rounded-md hover:opacity-60"
                onClick={() => {
                  Swal.fire({
                    title: "Retiro en proceso",
                    text: "Tu retiro se esta procesando, se te notificará al email cuando este listo.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                  });
                }}
              >
                Retirar
              </button>

              <p className="m-0 text-sm opacity-90 mt-1">
                <strong>Nota:</strong> El tiempo de confirmación de tu retiro
                puede variar dependiendo del banco seleccionado.
              </p>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};
// bg-[#333333]
// bg-[#414141]
