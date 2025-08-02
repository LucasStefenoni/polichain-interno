'use client';

import { useMemo, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useBalance } from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import { converterBrlParaEth } from './utils/conversor';
import PagamentoDiretoABI from './abi/PagamentoDireto.json';

const enderecoDoContrato = '0xee1249C6BB7cFa643e7624D6219e96cf1Eab1b37'; 

interface BotaoPagarBrlProps {
  valor: number;
}

export function BotaoPagar(props: BotaoPagarBrlProps) {
  const {address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const { data: hash, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  const saldoComoNumero = useMemo(() => {
    if (!balanceData) return 0; 

    const saldoString = formatUnits(balanceData.value, balanceData.decimals);
    return parseFloat(saldoString);

  }, [balanceData]);
  
  const handlePayment = async (valorEmBrlString: string) => {
    if (!isConnected) return alert('Por favor, conecte sua carteira primeiro.');
    setIsLoading(true);

    try {
      const valorEmBrl = parseFloat(valorEmBrlString);
      if (isNaN(valorEmBrl) || valorEmBrl <= 0) {
        throw new Error("Valor em BRL é inválido.");
      }

      console.log("Convertendo valor...");
      const valorEmEth = await converterBrlParaEth(valorEmBrl);
      if (saldoComoNumero < valorEmEth) return alert('Saldo insuficiente');
      console.log("Aguardando confirmação do usuário no MetaMask...");
      await writeContractAsync({
        address: enderecoDoContrato as `0x${string}`,
        abi: PagamentoDiretoABI.abi,
        functionName: 'efetuarPagamento',
        value: parseEther(valorEmEth.toFixed(18)),
      });

    } catch (err: any) {
      console.error("Pagamento falhou ou foi cancelado:", err.shortMessage);
    } finally {
      console.log("Finalizando processo.");
      setIsLoading(false);
    }
  };
  
  const buttonText = () => {
    if (isConfirming) return 'Confirmando...';
    if (isLoading) return 'Processando...';
    if (isSuccess) return 'Pagamento Concluído!';
    return `Comprar R$${props.valor}`;
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