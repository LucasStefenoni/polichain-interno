'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useAccount, useWriteContract, useChainId } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { couponNftAbi } from '@/abi/CouponNFT'

const CONTRACT_ADDRESS = '0x9d7046257B4CD86584Dc7059EC3AA634c9aBcfc0'
const EXPECTED_CHAIN_ID = 11155111 // Substitua se necessário

// Substitua por suas chaves da Pinata
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET

export default function MintForm() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [percent, setPercent] = useState('')
  const [productType, setProductType] = useState('')
  const [mode, setMode] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [metadataUrl, setMetadataUrl] = useState('')
  const [success, setSuccess] = useState(false)

  const { writeContract, isPending, error } = useWriteContract()
  const seed = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 4)
  const imageUrl = `https://picsum.photos/seed/${seed}/400`
  const handleUploadAndMint = async () => {
    console.log('Wallet conectada:', isConnected)
    console.log('Endereço da carteira:', address)
    console.log('Chain conectada:', chainId)

    if (!isConnected || !address) {
      alert('Conecte sua carteira primeiro.')
      return
    }

    const metadata = {
      pinataMetadata: {
        name: `Cupom-${percent}-off`
      },
      pinataContent: {
        name: `Cupom ${percent}% OFF`,
        description: `${percent}% de desconto em ${productType}`,
        image: imageUrl,
        attributes: [
          { trait_type: 'Tipo', value: 'Desconto' },
          { trait_type: 'Valor', value: percent },
          { trait_type: 'Unidade', value: '%' },
          { trait_type: 'Modo de uso', value: mode },
          { trait_type: 'Produto', value: productType }
        ]
      }
    }

    try {
      setIsUploading(true)
      setSuccess(false)

      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        metadata,
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET
          }
        }
      )

      const cid = res.data.IpfsHash
      const url = `https://gateway.pinata.cloud/ipfs/${cid}`
      console.log('✅ CID IPFS:', cid)
      console.log('✅ URL IPFS:', url)
      setMetadataUrl(url)

      // Mint NFT com a URL gerada
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: couponNftAbi,
          functionName: 'mintCoupon',
          args: [address, url]
        },
        {
          onSuccess: () => {
            console.log('✅ NFT mintado com sucesso!')
            setSuccess(true)
          },
          onError: (err) => {
            console.error('❌ Erro ao mintar NFT:', err)
            alert('Erro ao mintar NFT')
          }
        }
      )
    } catch (err) {
      console.error('❌ Erro ao fazer upload para o IPFS (Pinata):', err)
      alert('Erro ao fazer upload para o IPFS (Pinata)')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Emitir Cupom NFT</h2>
        <ConnectButton />
      </div>

      <input
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
        placeholder="Porcentagem"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
        placeholder="Tipo de produto"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        placeholder="Modo de uso (ex: usar uma vez)"
        className="border px-2 py-1 rounded w-full"
      />

      <button
        onClick={handleUploadAndMint}
        disabled={isUploading || isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isUploading || isPending ? 'Processando...' : 'Gerar e Emitir NFT'}
      </button>

      {metadataUrl && (
        <p className="text-sm break-words">
          ✅ Metadata IPFS:{' '}
          <a
            href={metadataUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {metadataUrl}
          </a>
        </p>
      )}

      {success && <p className="text-green-600">✅ NFT emitido com sucesso!</p>}
      {error && <p className="text-red-600">❌ Erro: {error.message}</p>}
    </div>
  )
}
