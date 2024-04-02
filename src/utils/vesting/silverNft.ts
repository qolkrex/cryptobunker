
// import { CONTRACTS } from "../../../../config";
// import VESTING_ABI from "../../../../config/abi/silverNft.json";

// export const mintSilverNft = async (web3: any, account: string, to: string) => {
//     VESTING_ABI
//     try {
//         const contract = new web3.eth.Contract(VESTING_ABI, CONTRACTS.nftCoinSilver);
//         return await contract.methods
//             .mint(to)
//             .send({ from: account });
//     } catch (error) {
//         console.log(error);
//         throw new Error("No se pudo realizar el procedimiento");
//     }
// }


// export const getTokensByAddress = async (web3: any, owner: string) => {
//     try {
//         const contract = new web3.eth.Contract(VESTING_ABI, CONTRACTS.nftCoinSilver);
//         return await contract.methods
//             .getTokensByAddress(owner)
//             .call()
//     } catch (error) {
//         console.log(error);
//         throw new Error("No se pudo realizar el procedimiento");
//     }
// }


// export const staticUrl = async (web3: any) => {
//     try {
//         const contract = new web3.eth.Contract(VESTING_ABI, CONTRACTS.nftCoinSilver);
//         return await contract.methods
//             .staticUrl()
//             .call()
//     } catch (error) {
//         console.log(error);
//         throw new Error("No se pudo realizar el procedimiento");
//     }
// }

