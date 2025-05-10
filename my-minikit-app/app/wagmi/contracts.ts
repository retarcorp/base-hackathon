export const wagmiContractConfig = {
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // @todo change
    abi: [
      { // example
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
      { // example
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: 'supply', type: 'uint256' }],
      },
    ],
  } as const