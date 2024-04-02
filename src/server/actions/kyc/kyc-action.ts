"use server";

import cloudinary from "cloudinary";
import prisma from "@/lib/prisma/prisma";
import { createAddress } from "@/utils/wallet";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* 
model KYC {
  id                 String   @id @default(uuid())
  userId             String
  documentType       String
  documentNumber     String
  documentFrontUrl   String
  documentBackUrl    String
  verificationStatus KYCStatus
  verificationDate   DateTime
  user               User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum KYCStatus {
  unverified
  pending
  approved
  rejected
}
*/

type KYCStatus = "unverified" | "pending" | "approved" | "rejected";

interface IKyc {
  id: string;
  userId: string;
  documentType: string;
  documentNumber: string;
  documentFrontUrl: string;
  documentBackUrl: string;
  verificationStatus: KYCStatus;
  verificationDate: Date;
  address: string;
  country: string;
  createdAt: Date;
  passwordHashPrivateKey?: string;
}

export const createKyc = async (kyc: IKyc) => {
  try {
    const newKyc = await prisma.kYC.create({
      data: {
        userId: kyc.userId,
        documentType: kyc.documentType,
        documentNumber: kyc.documentNumber,
        documentFrontUrl: kyc.documentFrontUrl,
        documentBackUrl: kyc.documentBackUrl,
        verificationStatus: kyc.verificationStatus,
        verificationDate: kyc.verificationDate,
        address: kyc.address,
        country: kyc.country,
        createdAt: kyc.createdAt,
        passwordHashPrivateKey: kyc.passwordHashPrivateKey,
      },
    });
    // change the user kyc status
    await prisma.user.update({
      where: {
        id: kyc.userId,
      },
      data: {
        verified: "pending",
      },
    });
    return newKyc;
  } catch (error) {
    console.log(error);
  }
};

export const approveKyc = async (id: string, _address: string) => {
  try {
    const kyc = await prisma.kYC.update({
      where: {
        id: id,
      },
      data: {
        verificationStatus: "approved",
      },
    });
    // change the user kyc status
    await prisma.kYC.update({
      where: {
        id: id,
      },
      data: {
        address: _address,
        passwordHashPrivateKey: "",
        reason: "",
        badFields: [],
      },
    });
    await prisma.user.update({
      where: {
        id: kyc.userId,
      },
      data: {
        verified: "approved",
        documentImageBack: kyc.documentBackUrl,
        documentImageFront: kyc.documentFrontUrl,
        address: _address.toLowerCase(),
        country: kyc.country,
        documentNumber: kyc.documentNumber,
        documentType: kyc.documentType,
        // isMetamask: false,
        // Add userWhitelist role
        roles: {
          push: "userWhitelist",
        },
      },
    });
    return {
      _address,
    };
  } catch (error) {
    console.log(error);
  }
};

export const generateAddress = async (userId: string) => {
  try {
    const { address, privateKey } = await createAddress();
    console.log(address, privateKey);
    await prisma.addressAndPrivateKey.create({
      data: {
        address: address,
        privateKey: privateKey,
        userId: userId,
      },
    });
    return { address, privateKey };
  } catch (error) {
    console.log(error);
    return { address: "", privateKey: "" };
  }
};
export const rejectKyc = async (
  id: string,
  reasons: string[],
  aditionalComment: string
) => {
  try {
    const kyc = await prisma.kYC.findUnique({
      where: {
        id: id,
      },
    });
    if (!kyc) throw new Error("KYC not found");
    // change the user kyc status
    await prisma.user.update({
      where: {
        id: kyc.userId,
      },
      data: {
        verified: "rejected",
      },
    });
    await prisma.kYC.update({
      where: {
        id: id,
      },
      data: {
        verificationStatus: "rejected",
        badFields: reasons,
        reason: aditionalComment,
      },
    });
    return kyc;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (image: string) => {
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(image, {
      folder: "kyc",
    });
    return uploadedImage;
  } catch (error) {
    console.log(error);
    throw new Error("error uploading image to cloudinary");
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const deletedImage = await cloudinary.v2.uploader.destroy(publicId);
    return deletedImage;
  } catch (error) {
    console.log(error);
  }
};

export const getImages = async () => {
  try {
    const images = await cloudinary.v2.api.resources({
      type: "upload",
    });
    return images;
  } catch (error) {
    console.log(error);
  }
};

export const getImage = async (publicId: string) => {
  try {
    const image = await cloudinary.v2.api.resource(publicId);
    return image;
  } catch (error) {
    console.log(error);
  }
};

export const comprobeEmailExist = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findUserBYDocumentNumber = async (documentNumber: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        documentNumber: documentNumber,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateKYC = async (
  id: string,
  data: any,
  img1: string,
  img2: string
) => {
  try {
    const kycFind = await prisma.kYC.findUnique({
      where: {
        id: id,
      },
    });
    if (!kycFind) throw new Error("KYC not found");
    const kyc = await prisma.kYC.update({
      where: {
        id: id,
      },
      data: {
        reason: "",
        badFields: [],
        verificationStatus: "pending",
        documentFrontUrl: img1,
        documentBackUrl: img2,
      },
    });
    await prisma.user.update({
      where: {
        id: kycFind.userId,
      },
      data: {
        verified: "pending",
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        documentNumber: data.documentNumber,
      },
    });
  } catch (error) {
    console.log(error);
    // return or throw error what is better?
    return null;
  }
};
