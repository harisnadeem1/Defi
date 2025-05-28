export const fantomStrategies = [
  {
    id: 8,
    title: "Fantom Low Risk: SpookySwap Stablecoin Farming & Staking xBOO",
    description: "Provide liquidity to stablecoin pairs on SpookySwap (Fantom) and stake BOO tokens for xBOO to earn a share of trading fees.",
    risk: "low",
    expectedReturn: "5-10% APY",
    timeFrame: "Medium Term",
    author: "Fantom Farmer",
    authorAvatar: "/avatar-ftm-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "Fantom",
    steps: [
      { title: "Acquire Stablecoins & BOO", description: "Get stablecoins (USDC, DAI) and BOO tokens on Fantom.", tip: "BOO is SpookySwap's native token." },
      { title: "LP for Stablecoins", description: "Provide liquidity to a stablecoin/stablecoin pool on SpookySwap.", tip: "Earn trading fees and potentially BOO rewards." },
      { title: "Stake BOO for xBOO", description: "Stake your BOO tokens on SpookySwap to receive xBOO.", tip: "xBOO holders earn a portion of the DEX's trading fees." },
      { title: "Claim Rewards", description: "Claim LP rewards and xBOO fee distributions.", tip: "Consider compounding your BOO into xBOO." }
    ]
  },
  {
    id: 25,
    title: "Fantom Medium Risk: Beethoven X Liquidity Pools (Weighted/Boosted)",
    description: "Provide liquidity to various types of pools on Beethoven X (Fantom), including weighted pools or boosted pools if staking fBEETS.",
    risk: "medium",
    expectedReturn: "10-30% APY",
    timeFrame: "Medium Term",
    author: "Beethoven Buff",
    authorAvatar: "/avatar-ftm-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "Fantom",
    steps: [
      { title: "Explore Beethoven X Pools", description: "Browse the different pool types: weighted, stable, boosted.", tip: "Understand the composition of each pool." },
      { title: "Provide Liquidity", description: "Deposit assets into your chosen pool(s) to receive BPT (Balancer Pool Tokens).", tip: "Consider pools with FTM or stablecoins." },
      { title: "Stake BPTs in Gauge", description: "Stake your BPTs in the corresponding gauge farm to earn BEETS rewards.", tip: "Check for boosted rewards if you stake fBEETS (locked BEETS)." },
      { title: "Manage BEETS Rewards", description: "Harvest BEETS. Decide to sell, hold, or lock for fBEETS to boost future rewards.", tip: "Beethoven X uses a ve-token model." }
    ]
  },
  {
    id: 26,
    title: "Fantom High Risk: Tomb Finance Ecosystem (Pegged Assets)",
    description: "Participate in the Tomb Finance ecosystem by farming with TOMB (pegged to FTM) or TSHARE tokens. High risk due to peg stability and algorithmic nature.",
    risk: "high",
    expectedReturn: "Highly Variable (can be very high or negative if peg breaks)",
    timeFrame: "Short to Medium Term (requires active monitoring)",
    author: "Tomb Raider",
    authorAvatar: "/avatar-ftm-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "Fantom",
    steps: [
      { title: "Understand Tomb's Mechanics", description: "Learn how TOMB aims to maintain its peg to FTM, and the role of TSHARE and TBOND.", tip: "This is crucial before investing." },
      { title: "Acquire TOMB or TSHARE", description: "Buy TOMB or TSHARE on a Fantom DEX like SpookySwap.", tip: "TSHARE is the governance/seigniorage token." },
      { title: "Farm in TOMB-FTM LP or Stake TSHARE", description: "Provide liquidity to TOMB-FTM LP on SpookySwap and stake in Tomb's farms, or stake TSHARE in the 'Masonry' to earn TOMB when above peg.", tip: "APRs are dynamic." },
      { title: "Monitor Peg & Manage Risk", description: "Closely watch the TOMB-FTM peg. If TOMB falls below peg, strategies change (e.g., buying TBONDs).", tip: "Algorithmic stablecoins carry significant risks." }
    ]
  }
];