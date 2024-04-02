export const chainIdValidate = (chainId:any, chainIdV:any) => {
  const comprobeA =
    typeof chainId === "string" ? parseInt(chainId, 16) : chainId;
  const comprobeB =
    typeof chainIdV === "string" ? parseInt(chainIdV, 16) : chainIdV;
  return comprobeA === comprobeB;
};
