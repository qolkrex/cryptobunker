export const expirationTimeJwt = (expiresIn: number) => {
  // const now = new Date();
  const expirationTime = Math.floor(Date.now() / 1000) + expiresIn * 60;
  return expirationTime;
};
