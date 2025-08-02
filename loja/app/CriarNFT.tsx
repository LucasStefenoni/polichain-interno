"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const CriarNFT = () => {
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  if (isConnected && address === '0xE1a12Bf819Ba6e6Bb3043A3E8FF7Fc4d9D8E0008') {
    return (
      <li>
        {/*Conteúdo do ADM*/}
        <a href="/../../cupchain/app" className="text-black block py-2 px-3 rounded-sm hover:bg-gray-100">Criar NFT</a>
      </li>
    );
  }

  return null;
};