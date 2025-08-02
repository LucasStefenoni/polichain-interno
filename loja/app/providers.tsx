'use client';

import React, { useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // useEffect só roda no cliente, após a montagem inicial
  useEffect(() => {
    setMounted(true);
  }, []);

  // Se o componente ainda não montou no cliente, não renderize nada
  // para evitar o erro de hidratação.
  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}