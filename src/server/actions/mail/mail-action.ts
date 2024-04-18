import { sendMail } from "@/mail/config/mail.config";
import { KYCEmail, templateKycApprove } from "@/utils/mail/templateKycApprove";
import {
  KYCEmailReject,
  templateKycReject,
} from "@/utils/mail/templateKycReject";
import { templateLogin } from "@/utils/mail/templateLogin";
import { RegisterUser, templateRegister } from "@/utils/mail/templateRegister";

export const sendRegisterMail = async (data: RegisterUser) => {
  await sendMail({
    from: "romelx23@gmail.com",
    to: data.email,
    subject: "Confirmación de cuenta en Cryptobunker",
    html: templateRegister(data),
  });
};

export const sendLoginMail = async (data: RegisterUser) => {
  await sendMail({
    from: "romelx23@gmail.com",
    to: data.email,
    subject: "Confirmación Login Cryptobunker",
    html: templateLogin(data),
  });
};

export const sendKycApproveMail = async (data: KYCEmail) => {
  await sendMail({
    from: "romelx23@gmail.com",
    to: data.email,
    subject: "¡Tu KYC ha sido validado en Cryptobunker!",
    html: templateKycApprove(data),
  });
};

export const sendKycRejectMail = async (data: KYCEmailReject) => {
  await sendMail({
    from: "romelx23@gmail.com",
    to: data.email,
    subject: "KYC Rechazado",
    html: templateKycReject(data),
  });
};
