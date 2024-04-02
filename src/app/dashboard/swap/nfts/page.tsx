"use client";
import { useWallet } from "@/hooks/useWalletContext";
import {
  getOwnedNFTs,
  getOwnedNFTsWithURI,
  getTotalSupplyNFT,
} from "@/utils/contract/contractInteraction";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IGMKNFT {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: string;
  compiler: string;
}

export default function NftsPage() {
  const [listNft, setListNft] = useState<string[]>([]);
  const { address } = useWallet();
  useEffect(() => {
    getTotalSupplyNFT()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // getOwnedNFTs(address);
    getOwnedNFTsWithURI(address)
      .then((res) => {
        console.log(res);
        setListNft(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

  const arrayNfts = Array(10)
    .fill(0)
    .map((_, i) => i);
  return (
    <div className="flex flex-col py-10 px-5">
      <h1 className="text-3xl font-bold">NFTs</h1>
      <div className="flex flex-wrap gap-3 justify-items-center place-items-center">
        {listNft.length > 0 &&
          listNft.map((nft, i) => (
            <Link
              href={`/dashboard/swap/nfts/${i}`}
              key={i}
              className="flex justify-center items-center mt-4 flex-col"
            >
              <>
                <div className="w-64">
                  <img
                    className="rounded-full shadow-lg"
                    src={nft}
                    alt="Imagen del NFT"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://media.discordapp.net/attachments/839620709517230081/1200100543402610778/3d-illustration-ethereum-coin-and-nft-coin-png.png?ex=65c4f3ba&is=65b27eba&hm=574041e029f4b5ee3da832996bbb8e9e95e59985d7aa83aa4ef48044c69e2741&=&format=webp&quality=lossless&width=523&height=523";
                    }}
                  />
                </div>
                <div className="flex mt-4 ">
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {"INTY " + (i + 1)}
                    </h2>
                    <p className="text-sm mb-2">
                      {"INTY Description " + (i + 1)}
                    </p>
                  </div>
                  <div className="">
                    <a
                      href="#"
                      className="btn btn-secondary line-through cursor-default"
                    >
                      Vender
                    </a>
                    <a href="#" className="btn btn-info">
                      Enviar
                    </a>
                  </div>
                </div>
              </>
            </Link>
          ))}
        {/* {arrayNfts.map((nft, i) => (
          <Link
            href={`/dashboard/swap/nfts/${i}`}
            key={i}
            className="flex justify-center items-center mt-4"
          >
            <>
              <div className="w-64">
                <img
                  className="rounded-full shadow-lg"
                  src="https://media.discordapp.net/attachments/839620709517230081/1200100543402610778/3d-illustration-ethereum-coin-and-nft-coin-png.png?ex=65c4f3ba&is=65b27eba&hm=574041e029f4b5ee3da832996bbb8e9e95e59985d7aa83aa4ef48044c69e2741&=&format=webp&quality=lossless&width=523&height=523"
                  alt="Imagen del NFT"
                />
              </div>
              <div className="flex flex-col mt-4">
                <h2 className="text-xl font-bold mb-2">Nombre del NFT</h2>
                <p className="text-sm mb-2">Descripción del NFT</p>
                <h3 className="text-xl font-bold">Precio</h3>
                <a href="#" className="btn btn-primary">
                  Comprar
                </a>
                <a href="#" className="btn btn-secondary">
                  Vender
                </a>
                <a href="#" className="btn btn-info">
                  Intercambiar
                </a>
              </div>
            </>
          </Link>
        ))} */}
      </div>
    </div>
  );
}
