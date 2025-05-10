import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '87b95f25-0204-4e8c-a0dc-0b822045bfed'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet(),
    // metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
