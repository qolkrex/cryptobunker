export interface KYCEmailReject {
  name: string;
  email: string;
}

export const templateKycReject = (data: KYCEmailReject) => {
  console.log(data);
  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirmación de cuenta</title>
    </head>
    <body style="font-family: sans-serif; font-size: 16px; background: #fff">
      <table
        style="
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        "
      >
        <tr style="width: 100%">
          <td colspan="2" style="width: 100%">
            <div
              style="
                width: 100%;
                height: 100px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(
                  90deg,
                  rgb(255, 216, 41) 0%,
                  rgb(196, 196, 196) 50%,
                  rgba(255, 206, 44, 0.945) 100%
                );
              "
            >
              <div
                style="
                  margin: 20px auto;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding-top: 10px;
                "
              >
                <img
                  src="https://res.cloudinary.com/giandiaz/image/upload/v1708035900/tthbbg7ovgxm4ww71igx.png"
                  alt="Logo"
                  style="width: 500; height: 100px; margin-bottom: 10px"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 16px">
            <h1>¡Su KYC no fue aprobado!</h1>
            <p>
              Lamentablemente, su KYC no fue aprobado. Por favor, revise la
              información que proporcionó y vuelva a intentarlo.
            </p>
            <p>Si tiene alguna pregunta, no dude en contactarnos.</p>
            </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 16px">
            <p>Gracias,</p>
            <p>El equipo de Goldmak</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  
  `;
};
