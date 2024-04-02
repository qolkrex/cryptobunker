import jwt from "jsonwebtoken";

function generateJWT(
  payload: any,
  secret: string,
  expiresIn: string | number
): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export default generateJWT;
