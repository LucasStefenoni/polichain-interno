"use client";
import React from "react";
import { useAccount } from "wagmi";

export const CriarNFT = () => {
  const { address, isConnected } = useAccount();

  if (isConnected && address === '0xE1a12Bf819Ba6e6Bb3043A3E8FF7Fc4d9D8E0008') {
    return (
      <li>
        {/*Conteúdo do ADM*/}
        <a href="#" className="text-black block py-2 px-3 rounded-sm hover:bg-gray-100">Criar NFT</a>
      </li>
    );
  }

  return null;
};