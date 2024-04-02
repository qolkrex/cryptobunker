import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string): boolean => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

export default verifyToken;
