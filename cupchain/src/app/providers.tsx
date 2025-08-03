'use client'

import { WagmiProvider, http } from 'wagmi'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

// 🔑 Pega URL da Sepolia do .env
const SEPOLIA_RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || ''

// 🟣 Configuração com Sepolia
const config = getDefaultConfig({
  appName: 'Cupchain',
  projectId: 'cupchain-sepolia', // pode ser qualquer string se não usar WalletConnect
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(SEPOLIA_RPC_URL),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
