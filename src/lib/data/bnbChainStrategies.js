export const bnbChainStrategies = [
  {
    id: 3,
    title: "BNB Low Risk: PancakeSwap Syrup Pool (Stablecoins)",
    description: "Stake CAKE tokens in PancakeSwap Syrup Pools to earn new tokens, focusing on stablecoin reward pools for lower risk.",
    risk: "low",
    expectedReturn: "5-12% APY (in new tokens)",
    timeFrame: "Short to Medium Term",
    author: "BNB Conservative",
    authorAvatar: "/avatar-bnb-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "BNB Chain",
    steps: [
      { title: "Acquire CAKE Tokens", description: "Buy CAKE tokens on PancakeSwap or another exchange.", tip: "CAKE is the native token of PancakeSwap." },
      { title: "Go to Syrup Pools", description: "Navigate to the Syrup Pools section on PancakeSwap.", tip: "New pools are added regularly." },
      { title: "Choose a Stablecoin Pool", description: "Find a pool that rewards users with stablecoins or tokens from established projects.", tip: "Read about the project being offered." },
      { title: "Stake CAKE", description: "Stake your CAKE tokens in the selected pool to start earning rewards.", tip: "Rewards are distributed per block." }
    ]
  },
  {
    id: 15,
    title: "BNB Medium Risk: Alpaca Finance Leveraged Yield Farming (Stable Pairs)",
    description: "Use Alpaca Finance on BNB Chain to yield farm stablecoin pairs with leverage, increasing APY but also liquidation risk.",
    risk: "medium",
    expectedReturn: "15-40% APY",
    timeFrame: "Medium Term",
    author: "Alpaca Rider",
    authorAvatar: "/avatar-bnb-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "BNB Chain",
    steps: [
      { title: "Choose a Stablecoin Pair", description: "Select a stablecoin pair on Alpaca Finance (e.g., USDT-BUSD).", tip: "Stable pairs minimize impermanent loss." },
      { title: "Select Leverage", description: "Choose your desired leverage (e.g., 2x, 3x). Alpaca will borrow one asset for you.", tip: "Higher leverage increases risk." },
      { title: "Open Position", description: "Alpaca Finance automates the process of borrowing and providing liquidity on PancakeSwap.", tip: "Monitor your position's health and kill buffer." },
      { title: "Manage and Harvest", description: "Harvest rewards (CAKE and ALPACA) and manage your position to avoid liquidation.", tip: "Consider auto-compounding options if available." }
    ]
  },
  {
    id: 16,
    title: "BNB High Risk: Yield Farming High APY Meme Coins",
    description: "Farm extremely high APY pools for new meme coins or highly speculative tokens on BNB Chain DEXs. Very high risk of impermanent loss and rug pulls.",
    risk: "high",
    expectedReturn: "1000%+ APY (extremely volatile and risky)",
    timeFrame: "Very Short Term",
    author: "BSC Degen",
    authorAvatar: "/avatar-bnb-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "BNB Chain",
    steps: [
      { title: "Find High APY Farms", description: "Scan DEXs and yield farming aggregators for new farms with astronomical APYs.", tip: "Often found on smaller, less audited platforms." },
      { title: "Acquire Risky Tokens", description: "Buy the meme coin or speculative token needed for the LP pair.", tip: "Only invest what you can afford to lose completely." },
      { title: "Provide Liquidity and Farm", description: "Create LP tokens and stake them in the farm.", tip: "APRs can drop dramatically in minutes or hours." },
      { title: "Harvest Aggressively & Exit", description: "Harvest rewards very frequently and have an exit plan. Be ready for the token price to crash.", tip: "The first few hours/days are critical." }
    ]
  }
];