"use server";

import { sendKycApproveMail, sendKycRejectMail } from "./mail-action";

interface KYC {
  name: string;
  email: string;
}

export const sendApproveEmail = async (kyc: KYC) => {
  await sendKycApproveMail({
    email: kyc.email,
    name: kyc.name,
  });
};

export const sendRejectEmail = async (kyc: KYC) => {
  await sendKycRejectMail({
    email: kyc.email,
    name: kyc.name,
  });
};
