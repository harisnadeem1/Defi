export const avalancheStrategies = [
  {
    id: 5,
    title: "Avalanche Low Risk: Benqi Liquid Staking (sAVAX)",
    description: "Stake AVAX on Benqi Liquid Staking to receive sAVAX, earning staking rewards while maintaining liquidity for use in other Avalanche DeFi protocols.",
    risk: "low",
    expectedReturn: "4-7% APY + DeFi utility",
    timeFrame: "Medium to Long Term",
    author: "AVAX Accumulator",
    authorAvatar: "/avatar-avax-low.jpg",
    createdAt: "2025-05-28",
    blockchain: "Avalanche",
    steps: [
      { title: "Acquire AVAX", description: "Purchase AVAX tokens.", tip: "Ensure they are on the Avalanche C-Chain." },
      { title: "Stake on Benqi", description: "Go to Benqi Liquid Staking and stake your AVAX to mint sAVAX.", tip: "sAVAX value accrues AVAX staking rewards." },
      { title: "Hold or Use sAVAX", description: "Hold sAVAX to earn staking rewards, or use it as collateral or in liquidity pools on platforms like Trader Joe or Aave.", tip: "Increases capital efficiency." },
      { title: "Unstake When Needed", description: "You can unstake sAVAX back to AVAX, usually subject to a cooldown period or via a swap pool.", tip: "Check unstaking options and fees." }
    ]
  },
  {
    id: 19,
    title: "Avalanche Medium Risk: Trader Joe Liquidity Pools & Rocket Joe",
    description: "Provide liquidity on Trader Joe for various pairs, and participate in Rocket Joe launches for new tokens.",
    risk: "medium",
    expectedReturn: "10-25% APY (LPing) + Launchpad Potential",
    timeFrame: "Medium Term",
    author: "Trader Joe Fan",
    authorAvatar: "/avatar-avax-medium.jpg",
    createdAt: "2025-05-28",
    blockchain: "Avalanche",
    steps: [
      { title: "Choose LP on Trader Joe", description: "Select a liquidity pool on Trader Joe. Consider pairs with AVAX or stablecoins.", tip: "Check for JOE token rewards." },
      { title: "Provide Liquidity", description: "Add tokens to the pool and stake your LP tokens in the farm.", tip: "Understand impermanent loss." },
      { title: "Explore Rocket Joe", description: "Participate in new token launches on Rocket Joe by staking rJOE or LP tokens.", tip: "Launchpad investments are speculative." },
      { title: "Manage Rewards", description: "Harvest JOE rewards and decide whether to compound or diversify.", tip: "Trader Joe offers diverse farming options." }
    ]
  },
  {
    id: 20,
    title: "Avalanche High Risk: Platypus Finance Stablecoin Yields (Single-Sided)",
    description: "Provide single-sided liquidity for stablecoins on Platypus Finance, which aims for lower slippage and impermanent loss, but involves platform risk and potentially volatile reward tokens.",
    risk: "high",
    expectedReturn: "5-30% APY (variable, depends on PTP rewards)",
    timeFrame: "Short to Medium Term",
    author: "Platypus Plunger",
    authorAvatar: "/avatar-avax-high.jpg",
    createdAt: "2025-05-28",
    blockchain: "Avalanche",
    steps: [
      { title: "Acquire Stablecoins", description: "Obtain USDC, USDT.e, DAI.e, etc., on Avalanche.", tip: "Platypus supports various stablecoins." },
      { title: "Deposit into Platypus Pool", description: "Deposit your chosen stablecoin into the corresponding Platypus pool.", tip: "You receive LP tokens." },
      { title: "Stake LP Tokens", description: "Stake your Platypus LP tokens to earn PTP rewards.", tip: "You can also stake PTP to boost rewards (vePTP model)." },
      { title: "Monitor and Manage PTP", description: "PTP token price can be volatile. Decide whether to sell, hold, or stake PTP rewards.", tip: "Understand the vePTP mechanics if boosting." }
    ]
  }
];