import Web3 from "web3";

export async function POST(request: Request) {
  const { userAddress, signature } = await request.json();
  console.log(request)
  console.log({ userAddress, signature })
  const message = "Atenticacion de mi cuenta";
  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
  try {
    const signer = await web3.eth.accounts.recover(message, signature);

    if (signer.toLowerCase() === userAddress.toLowerCase()) {
      return Response.json({ message: "Autenticado" });
    } else {
      return Response.json({ message: "No autenticado" });
    }
  } catch (error) {
    console.log({ error });
    Response.json({ error });
  }
  // return Response.json({ product })
}
