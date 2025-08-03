'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';
import { config } from './wagmi'; 
import ERC721_ABI from './abi/ERC721_ownerOf.json';


export function VerificadorDePosseNFT() {
  const { address, isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerification = async () => {
    if (!isConnected || !address) {
      setMessage('Erro: Conecte sua carteira primeiro.');
      return;
    }
    if (!contractAddress || !tokenId) {
      setMessage('Erro: Preencha o endereço do contrato e o ID do token.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    try {
      // 1. Chama a função 'ownerOf(tokenId)' do contrato do NFT
      const owner = await readContract(config, {
        address: contractAddress as `0x${string}`,
        abi: [
            {
                "inputs": [
                { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
                ],
                "name": "ownerOf",
                "outputs": [
                { "internalType": "address", "name": "", "type": "address" }
                ],
                "stateMutability": "view",
                "type": "function"
            }
            ],
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      });

      // 2. Compara o dono do token com o usuário conectado
      if (String(owner).toLowerCase() === address.toLowerCase()) {
        setMessage('✅ Sucesso! Este NFT está na sua carteira.');
      } else {
        setMessage(`❌ Atenção: Este NFT não pertence à sua carteira. Pertence a: ${owner}`);
      }

    } catch (error) {
      console.error(error);
      setMessage('Erro: Falha ao verificar. O contrato ou ID do token pode ser inválido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
 <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', marginTop: '1rem', borderColor: "black" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h4 className='text-black'>Verificar Posse de NFT</h4>
        <button 
          onClick={handleVerification} 
          disabled={isLoading}
          className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
        >
          {isLoading ? 'Verificando...' : 'Verificar Posse'}
        </button>
        <input type="text" className='text-black'value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder="Endereço do Contrato do NFT" />
        <input type="text" className='text-black' value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="ID do Token" />
      </div>
      {message && <p style={{ marginTop: '15px', wordBreak: 'break-word' }}>{message}</p>}
    </div>
  );
}