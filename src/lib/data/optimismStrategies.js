export const optimismStrategies = [
  {
    id: 7,
    title: "Optimism Low Risk: Velodrome Stablecoin LPing (Gauge Voting)",
    description: "Provide liquidity to stablecoin pairs on Velodrome (Optimism) and vote with veVELO to direct VELO emissions to your pool for enhanced, stable yields.",
    risk: "low",
    expectedReturn: "5-15% APY",
    timeFrame: "Medium Term (aligns with veVELO lock)",
    author: "OP Optimist",
    authorAvatar: "/avatar-op-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "Optimism",
    steps: [
      { title: "Acquire Stablecoins & VELO", description: "Get stablecoins (USDC, DAI) and VELO tokens on Optimism.", tip: "VELO is needed for voting." },
      { title: "Provide Liquidity", description: "Add liquidity to a stablecoin-stablecoin pool on Velodrome (e.g., USDC/DAI).", tip: "You'll receive LP tokens." },
      { title: "Lock VELO for veVELO", description: "Lock your VELO tokens to receive veVELO (vote-escrowed VELO).", tip: "Longer locks give more voting power." },
      { title: "Vote for Your Pool & Claim", description: "Use your veVELO to vote for the gauge corresponding to your LP. Claim trading fees and VELO emissions.", tip: "Re-vote weekly." }
    ]
  },
  {
    id: 23,
    title: "Optimism Medium Risk: Synthetix Staking & SNX Liquidity",
    description: "Stake SNX on Synthetix (Optimism) to mint sUSD and earn trading fees, or provide SNX liquidity on DEXs.",
    risk: "medium",
    expectedReturn: "10-25% APY (staking rewards + fees)",
    timeFrame: "Medium to Long Term",
    author: "Synth Strategist",
    authorAvatar: "/avatar-op-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "Optimism",
    steps: [
      { title: "Acquire SNX", description: "Buy SNX tokens and bridge them to Optimism.", tip: "Staking requires maintaining a target C-Ratio." },
      { title: "Stake SNX & Mint sUSD", description: "Stake SNX on the Synthetix platform to mint sUSD.", tip: "Monitor your C-Ratio to avoid liquidation and claim weekly rewards." },
      { title: "Alternatively, Provide SNX LP", description: "Provide SNX liquidity on DEXs like Velodrome or Uniswap on Optimism.", tip: "This offers different risk/reward profile than direct staking." },
      { title: "Manage Debt & Rewards", description: "If staking, manage your sUSD debt and claim SNX staking rewards. If LPing, claim LP fees.", tip: "Synthetix is a complex protocol." }
    ]
  },
  {
    id: 24,
    title: "Optimism High Risk: Perpetual Protocol Trading/LPing",
    description: "Trade perpetual futures on Perpetual Protocol (Optimism) or provide liquidity to its vPools. Trading is high risk; LPing for vPools also carries risk.",
    risk: "high",
    expectedReturn: "Highly Variable (Trading: unlimited up/down. LPing: 20-100%+ APY, but risky)",
    timeFrame: "Short Term",
    author: "Perp Player",
    authorAvatar: "/avatar-op-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "Optimism",
    steps: [
      { title: "Understand Perpetual Futures", description: "Learn how perpetual contracts work, including leverage, margin, and funding rates.", tip: "This is for experienced traders." },
      { title: "Trade on Perpetual Protocol", description: "Connect to Perpetual Protocol on Optimism and open long/short positions on available assets.", tip: "Use leverage cautiously. Manage margin." },
      { title: "Alternatively, LP for vPools", description: "Provide liquidity (e.g., USDC) to Perpetual Protocol's virtual AMM pools (vPools).", tip: "LPs earn fees but are exposed to trader PnL imbalances." },
      { title: "Monitor and Manage", description: "Actively manage trades or LP positions. Risks are significant.", tip: "Set stop-losses for trades. Understand vPool risks." }
    ]
  }
];