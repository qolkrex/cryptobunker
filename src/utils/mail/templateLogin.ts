export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  link: string;
  expires: string;
}

export const templateLogin = (data: RegisterUser) => {
  console.log(data);
  return `
  <!DOCTYPE html>
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
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <tr style="width: 100%">
        <td colspan="2" style="width: 100%">
          <div
            style="
              width: 100%;
              height: auto;
              text-align: center;
              display: flex;
              justify-content: start;
              align-items: start;
              background-color: rgba(0, 71, 171, 0.952);
              padding: 0 20px;
              box-sizing: border-box;
            "
          >
            <div
              style="
                margin: 20px auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                src="https://res.cloudinary.com/giandiaz/image/upload/v1713478182/cryptobunker-letras.png"
                alt="Logo"
                style="
                  width: 500px;
                  height: 65px;
                  max-width: 500px;
                  max-height: 65px;
                  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.7));
                "
              />
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 16px">
          <h1>¡Gracias por Loguearte con CryptoBunker!</h1>
          <p>${data.name}</p>
          <p>
            <a href="${data.link}" style="color: #000; text-decoration: none"
              >Ingresar a la cuenta</a
            >
          </p>
          <p>
            Si no puedes hacer clic en el enlace, copia y pega la siguiente URL
            en tu navegador:
          </p>
          <p>
            <a
              href="${data.link}"
              style="
                color: #fff;
                text-decoration: none;
                background: #0047AB;
                padding: 10px 18px;
                border-radius: 8px;
              "
            >
              Ingresar a la cuenta
            </a>
          </p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 16px">
          <p>Este enlace caducará en ${data.expires}.</p>
          <p>Gracias,</p>
          <p>El equipo de CryptoBunker</p>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
};
