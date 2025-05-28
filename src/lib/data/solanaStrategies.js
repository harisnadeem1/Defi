export const solanaStrategies = [
  {
    id: 4,
    title: "Solana Low Risk: SOL Liquid Staking with Marinade/Lido",
    description: "Stake SOL through liquid staking protocols like Marinade (mSOL) or Lido (stSOL) to earn staking rewards while keeping your SOL liquid.",
    risk: "low",
    expectedReturn: "5-7% APY + DeFi utility",
    timeFrame: "Medium to Long Term",
    author: "Sol Staker",
    authorAvatar: "/avatar-sol-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "Solana",
    steps: [
      { title: "Acquire SOL", description: "Purchase SOL tokens.", tip: "Use a Solana-native wallet like Phantom or Solflare." },
      { title: "Choose Liquid Staking Provider", description: "Select Marinade Finance (for mSOL) or Lido (for stSOL).", tip: "Both are reputable options." },
      { title: "Stake SOL", description: "Stake your SOL on the chosen platform to receive liquid staked tokens (mSOL or stSOL).", tip: "These tokens represent your staked SOL and accrue rewards." },
      { title: "Utilize Liquid Tokens (Optional)", description: "Use mSOL/stSOL in other Solana DeFi protocols for additional yield (lending, LP).", tip: "This enhances capital efficiency." }
    ]
  },
  {
    id: 17,
    title: "Solana Medium Risk: Orca Whirlpools Concentrated Liquidity",
    description: "Provide concentrated liquidity on Orca's Whirlpools for selected pairs to earn higher trading fees. Similar to Uniswap V3 but on Solana.",
    risk: "medium",
    expectedReturn: "10-30% APY",
    timeFrame: "Medium Term",
    author: "Orca Optimizer",
    authorAvatar: "/avatar-sol-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "Solana",
    steps: [
      { title: "Select a Whirlpool", description: "Choose a token pair and Whirlpool on Orca with good volume and rewards.", tip: "SOL-USDC or mSOL-USDC are popular." },
      { title: "Define Price Range", description: "Set your concentrated liquidity price range.", tip: "Narrower ranges can yield more but require active management." },
      { title: "Deposit Liquidity", description: "Add your tokens to the Whirlpool within your chosen range.", tip: "Solana's speed makes adjustments faster." },
      { title: "Monitor and Rebalance", description: "Track your position and rebalance your range if the market price moves significantly.", tip: "Some tools can help automate rebalancing." }
    ]
  },
  {
    id: 18,
    title: "Solana High Risk: Trading New SPL Tokens & NFTs",
    description: "Actively trade newly launched SPL tokens on DEXs like Raydium or Jupiter, or flip new NFT mints. High potential reward, high risk.",
    risk: "high",
    expectedReturn: "Highly Variable (can be >100% or < -90%)",
    timeFrame: "Very Short Term",
    author: "Solana Sniper",
    authorAvatar: "/avatar-sol-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "Solana",
    steps: [
      { title: "Research New Projects", description: "Follow Solana launchpads, Twitter, Discord for info on new token launches and NFT mints.", tip: "Look for hype, team, and utility." },
      { title: "Prepare for Launch/Mint", description: "Have SOL ready in your wallet. For NFTs, understand the minting process (e.g., Magic Eden, launchpads).", tip: "Speed is often key." },
      { title: "Trade/Mint Quickly", description: "Attempt to buy tokens early on DEX listings or mint NFTs at launch.", tip: "Gas wars can occur. Set appropriate slippage for tokens." },
      { title: "Set Profit/Loss Targets", description: "Have clear targets for taking profits or cutting losses. Don't get emotionally attached.", tip: "Many new projects fail or are scams." }
    ]
  }
];