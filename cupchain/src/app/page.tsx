'use client'

import Image from "next/image"
import { useAccount, useWriteContract } from 'wagmi'
import { couponNftAbi } from '@/abi/CouponNFT'
import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default function Home() {
  const { address } = useAccount()
  const [uri, setUri] = useState('https://meu-cupom.com/ipfs/metadata.json')
  const [success, setSuccess] = useState(false)

  const { writeContract, isPending, error } = useWriteContract()

  const handleMint = () => {
    if (!address || !uri) return

    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: couponNftAbi,
        functionName: 'mintCoupon',
        args: [address, uri],
      },
      {
        onSuccess: () => setSuccess(true),
        onError: (err) => console.error('Erro ao emitir NFT:', err),
      }
    )
  }

  return (
    <main className="p-8 space-y-4">
      <div className="mb-4 flex justify-between space-x-4">
        <h1 className="text-2xl font-bold">Emitir Cupom NFT</h1>
        <ConnectButton />
      </div>

      <input
        type="text"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded w-full"
        placeholder="https://meu-cupom.com/ipfs/metadata.json"
      />

      <button
        onClick={handleMint}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={isPending}
      >
        {isPending ? 'Emitindo...' : 'Emitir Cupom NFT'}
      </button>

      {success && <p className="text-green-600">✅ NFT emitido com sucesso!</p>}
      {error && <p className="text-red-600">❌ Erro: {error.message}</p>}
    </main>
  )
}
