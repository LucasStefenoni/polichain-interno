
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Crie e exporte sua configuração
export const config = createConfig({
  // Defina as redes que sua aplicação suporta
  chains: [mainnet, sepolia],
  
  // Configure como o Wagmi se conecta a cada rede
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})