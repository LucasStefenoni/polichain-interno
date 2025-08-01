// frontend/app/utils/conversoes.ts


export async function converterBrlParaEth(valorEmBrl: number): Promise<number> {
  try {
    console.log("Buscando cotação ETH/BRL...");
    const response = await fetch('https://api.coinbase.com/v2/prices/ETH-BRL/spot');
    
    if (!response.ok) {
      throw new Error('A resposta da API não foi bem-sucedida.');
    }
    
    const data = await response.json();
    const precoEthEmBrl = parseFloat(data.data.amount);

    if (!precoEthEmBrl || precoEthEmBrl <= 0) {
      throw new Error('Preço do ETH retornado pela API é inválido.');
    }
    
    console.log(`Cotação atual: 1 ETH = R$ ${precoEthEmBrl.toFixed(2)}`);
    
    const valorEmEth = valorEmBrl / precoEthEmBrl;
    return valorEmEth;

  } catch (error) {
    console.error("Erro ao buscar cotação ou converter BRL para ETH:", error);
    throw error;
  }
}