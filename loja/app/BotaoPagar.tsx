'use client'; 

import { useMemo, useState } from 'react'; 
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useBalance } from 'wagmi'; 
import { formatUnits, parseEther } from 'viem'; 
import { converterBrlParaEth } from './utils/conversor'; // Corrija o nome do arquivo se for 'conversor'
import PagamentoDiretoABI from './abi/PagamentoDireto.json'; 

const enderecoDoContrato = '0xee1249C6BB7cFa643e7624D6219e96cf1Eab1b37';  

// 1. Adicione a nova prop 'descontoAtivo'
interface BotaoPagarBrlProps { 
  valor: number; 
  descontoAtivo: boolean; // <-- NOVA PROP
} 

export function BotaoPagar(props: BotaoPagarBrlProps) { 
  const { address, isConnected } = useAccount(); 
  const [isLoading, setIsLoading] = useState(false); 

  const { data: hash, writeContractAsync } = useWriteContract(); 
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash }); 
  const { data: balanceData } = useBalance({ address: address }); 

  const saldoComoNumero = useMemo(() => { 
    if (!balanceData) return 0;  
    return parseFloat(formatUnits(balanceData.value, balanceData.decimals)); 
  }, [balanceData]); 
   
  const handlePayment = async (valorEmBrlString: string) => { 
    // ... (sua função handlePayment continua a mesma)
  }; 
   
  // 2. Atualize a função 'buttonText'
  const buttonText = () => { 
    if (isConfirming) return 'Confirmando...'; 
    if (isLoading) return 'Processando...'; 
    if (isSuccess) return 'Pagamento Concluído!'; 

    // Se a prop 'descontoAtivo' for true, mude o texto
    if (props.descontoAtivo) {
      return `Comprar com Desconto R$${props.valor.toFixed(2)}`;
    }
    
    // Texto padrão
    return `Comprar R$${props.valor.toFixed(2)}`; 
  }; 
   
  return ( 
    <div> 
      <button  
        onClick={() => handlePayment(props.valor.toString())}  
        disabled={isLoading || isConfirming} 
        className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" 
      > 
        {buttonText()} 
      </button> 
    </div> 
  ); 
}