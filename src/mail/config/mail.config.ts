import nodemailer, { Transport, TransportOptions } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface MailConfig {
  host: TransportOptions | Transport<unknown>;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface mailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const mailConfig = {
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
} as MailConfig;

export const transporter = nodemailer.createTransport(
  mailConfig as TransportOptions
);

export const mailOptions: mailOptions = {
  from: "romelx23@gmail.com",
  to: "romelx23juegos@gmail.com",
  subject: "Asunto del correo electrónico",
  text: "Cuerpo del correo electrónico",
};

// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(info);
//   }
// });

export const sendMail = async (mailOptions: mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};
