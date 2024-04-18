export interface KYCEmail {
  name: string;
  email: string;
}

export const templateKycApprove = (data: KYCEmail) => {
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
            <h1>¡Su KYC fue aprovado!</h1>
            <p>¡Hola ${data.name}!</p>
            <p>
              Nos complace informarte que tu proceso de verificación KYC en
              Cryptobunker ha sido exitoso. ¡Bienvenido oficialmente a nuestra
              plataforma!
            </p>
            <p>
              A partir de ahora, estás listo para disfrutar de todas las funciones
              y beneficios que Cryptobunker tiene para ofrecer. Recuerda que ahora
              puedes participar en transacciones seguras y confiables dentro de
              nuestro ecosistema de construcción.
            </p>
            <p>
              Para garantizar la seguridad de tus transacciones, te recordamos que
              necesitarás tu contraseña de transacción cada vez que realices una
              operación en nuestra plataforma. Mantén esta contraseña segura y
              nunca la compartas con nadie.
            </p>
            <p>
              ¡Gracias por unirte a Cryptobunker y por ser parte de nuestra comunidad!
              Si tienes alguna pregunta o necesitas asistencia, no dudes en
              contactar a nuestro equipo de soporte. Estamos aquí para ayudarte en
              cada paso del camino.
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 16px">
            <p>¡Que tengas un excelente día!</p>
            <p>Gracias,</p>
            <p>El equipo de Cryptobunker</p>
          </td>
        </tr>
      </table>
    </body>
  </html>  
  `;
};
