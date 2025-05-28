export const ethereumStrategies = [
  {
    id: 1,
    title: "ETH Low Risk: Stablecoin Lending on Aave",
    description: "Lend stablecoins like USDC or DAI on Aave (Ethereum) for conservative, steady returns.",
    risk: "low",
    expectedReturn: "3-7% APY",
    timeFrame: "Short to Medium Term",
    author: "DeFi Sage",
    authorAvatar: "/avatar-eth-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "Ethereum",
    steps: [
      { title: "Acquire Stablecoins", description: "Obtain USDC, DAI, or USDT.", tip: "USDC is often preferred for its transparency." },
      { title: "Connect to Aave", description: "Use a Web3 wallet (e.g., MetaMask) to connect to the Aave protocol on Ethereum.", tip: "Ensure you have ETH for gas fees." },
      { title: "Supply Stablecoins", description: "Deposit your chosen stablecoins into the Aave lending pool.", tip: "Monitor interest rates as they can fluctuate." },
      { title: "Track Earnings", description: "Your supplied assets will earn interest over time. Withdraw or compound as desired.", tip: "Aave provides a clear dashboard of your supplied assets and earnings." }
    ]
  },
  {
    id: 11,
    title: "ETH Medium Risk: Uniswap V3 Concentrated Liquidity",
    description: "Provide liquidity within specific price ranges on Uniswap V3 (Ethereum) to earn trading fees, potentially higher returns but with impermanent loss risk.",
    risk: "medium",
    expectedReturn: "8-20% APY",
    timeFrame: "Medium Term",
    author: "LP Pro",
    authorAvatar: "/avatar-eth-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "Ethereum",
    steps: [
      { title: "Choose a Pair", description: "Select a token pair with good volume, e.g., ETH/USDC.", tip: "Understand the tokens you're providing liquidity for." },
      { title: "Set Price Range", description: "Define a price range for your liquidity. Narrower ranges can mean higher fees but more risk of going out of range.", tip: "Start with a wider range if you're new." },
      { title: "Add Liquidity on Uniswap V3", description: "Deposit your tokens into the selected pool and range.", tip: "Monitor your position and adjust the range if needed." },
      { title: "Claim Fees", description: "Collect accrued trading fees periodically.", tip: "Be mindful of Ethereum gas costs when claiming." }
    ]
  },
  {
    id: 12,
    title: "ETH High Risk: Leveraged Staking on Lido with Instadapp",
    description: "Stake ETH on Lido for stETH, then use stETH as collateral on Instadapp to borrow more ETH and re-stake, amplifying staking rewards but increasing liquidation risk.",
    risk: "high",
    expectedReturn: "10-25% APY (leveraged)",
    timeFrame: "Short to Medium Term",
    author: "Risk Taker",
    authorAvatar: "/avatar-eth-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "Ethereum",
    steps: [
      { title: "Stake ETH on Lido", description: "Convert ETH to stETH via Lido Finance.", tip: "stETH accrues staking rewards daily." },
      { title: "Use Instadapp Lite", description: "Connect to Instadapp and select their stETH leveraged staking strategy.", tip: "Instadapp simplifies the looping process." },
      { title: "Choose Leverage", description: "Select your desired leverage level. Higher leverage means higher potential returns and risks.", tip: "Start with lower leverage (e.g., 2x) to understand the risks." },
      { title: "Monitor Health Factor", description: "Closely watch your loan health factor to avoid liquidation if ETH price drops significantly.", tip: "Be prepared to deleverage or add collateral." }
    ]
  }
];