export const arbitrumStrategies = [
  {
    id: 6,
    title: "Arbitrum Low Risk: GMX GLP Staking",
    description: "Buy and stake GLP tokens on GMX (Arbitrum). GLP is an index of blue-chip cryptos and stablecoins, earning fees from platform traders.",
    risk: "low",
    expectedReturn: "8-15% APY (paid in ETH/stablecoins)",
    timeFrame: "Medium to Long Term",
    author: "Arbi Analyst",
    authorAvatar: "/avatar-arb-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "Arbitrum",
    steps: [
      { title: "Bridge Assets to Arbitrum", description: "Use an official or third-party bridge to move ETH or stablecoins to Arbitrum.", tip: "Ensure you have ETH for gas." },
      { title: "Acquire GLP on GMX", description: "Go to the GMX platform and buy GLP tokens using ETH, USDC, etc.", tip: "GLP price fluctuates based on its underlying assets." },
      { title: "Stake GLP", description: "Once acquired, GLP is typically auto-staked, or you can stake it in the 'Earn' section.", tip: "Rewards are paid in ETH or stablecoins." },
      { title: "Claim Rewards", description: "Periodically claim your earned rewards.", tip: "GLP provides exposure to a diversified basket." }
    ]
  },
  {
    id: 21,
    title: "Arbitrum Medium Risk: Radiant Capital Lending & Borrowing",
    description: "Lend assets on Radiant Capital (Arbitrum) and potentially borrow against them to engage in other Arbitrum DeFi activities.",
    risk: "medium",
    expectedReturn: "5-20% APY (varies by asset and strategy)",
    timeFrame: "Medium Term",
    author: "Radiant Explorer",
    authorAvatar: "/avatar-arb-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "Arbitrum",
    steps: [
      { title: "Supply Assets to Radiant", description: "Deposit assets like ETH, WBTC, or stablecoins into Radiant Capital's lending pools.", tip: "Earn supply APY and RDNT rewards." },
      { title: "Borrow (Optional)", description: "If desired, borrow other assets against your supplied collateral.", tip: "Maintain a healthy LTV to avoid liquidation." },
      { title: "Lock RDNT for Emissions", description: "Consider locking RDNT tokens to receive a larger share of platform emissions.", tip: "This involves locking tokens for a period." },
      { title: "Monitor Position", description: "Track your supplied/borrowed assets and RDNT rewards.", tip: "Radiant aims to be an omnichain money market." }
    ]
  },
  {
    id: 22,
    title: "Arbitrum High Risk: Jones DAO Options Vaults",
    description: "Deposit assets into Jones DAO vaults that employ automated options strategies (e.g., covered calls on ETH). Complex, higher risk.",
    risk: "high",
    expectedReturn: "10-50%+ APY (highly variable, depends on options performance)",
    timeFrame: "Short to Medium Term (per epoch)",
    author: "Options Operator",
    authorAvatar: "/avatar-arb-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "Arbitrum",
    steps: [
      { title: "Understand Options Strategies", description: "Familiarize yourself with how covered calls or other options strategies work.", tip: "These are not simple 'set and forget' investments." },
      { title: "Choose a Jones DAO Vault", description: "Select a vault based on the underlying asset (e.g., ETH, gOHM) and strategy.", tip: "Read the vault's documentation carefully." },
      { title: "Deposit Assets", description: "Deposit your assets into the chosen vault during its deposit window.", tip: "Vaults operate in epochs (e.g., weekly)." },
      { title: "Monitor Performance", description: "Track the vault's performance. Yields depend on options premiums and market volatility.", tip: "Withdrawals are typically only possible at the end of an epoch." }
    ]
  }
];