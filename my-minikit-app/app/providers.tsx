"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";

// 1. Import modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './wagmi/config'

export function Providers(props: { children: ReactNode }) {


  // 2. Set up a React Query client.
  const queryClient = new QueryClient()

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
      }}
    >
      {/* <WagmiProvider config={config}> */}
        {/* <QueryClientProvider client={queryClient}> */}
          {props.children}
        {/* </QueryClientProvider> */}
      {/* </WagmiProvider> */}

    </MiniKitProvider>
  );
}
