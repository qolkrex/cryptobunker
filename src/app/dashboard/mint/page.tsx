"use client";
import React, { useState } from "react";
import { mintGMK } from "../rounds/Web3Client";

const MintPage = () => {
  const [quantityToMint, setQuantityToMint] = useState(0);
  return (
    <div className="px-8">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl">Mintear GMK</h2>
        <input
          type="number"
          name="quantityToMint"
          id="quantityToMint"
          placeholder="Ingrese la cantidad a mintear"
          className="px-2 py-1 rounded-lg text-black"
          value={quantityToMint}
          onChange={(e) => setQuantityToMint(Number(e.target.value))}
        />
        <button
          className="bg-yellow-500 text-white px-4 py-1 text-lg rounded-lg mt-2"
          onClick={() => mintGMK(quantityToMint).then((res) => console.log(res))}
        >
          Mint
        </button>
      </div>
    </div>
  );
};

export default MintPage;
