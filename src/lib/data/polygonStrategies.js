export const polygonStrategies = [
  {
    id: 27, // New ID for Polygon Low Risk
    title: "Polygon Low Risk: Stablecoin Lending on Aave v3",
    description: "Deposit stablecoins (USDC, USDT, DAI) into Aave v3 on Polygon to earn interest. Optionally use E-mode for capital efficiency.",
    risk: "low",
    expectedReturn: "~4–8% APY",
    timeFrame: "Short to Medium Term",
    author: "Matic Minimalist",
    authorAvatar: "/avatar-poly-low.jpg",
    createdAt: "2025-05-29",
    blockchain: "Polygon",
    steps: [
      { title: "Acquire Stablecoins", description: "Obtain USDC, USDT, or DAI on the Polygon network.", tip: "Ensure you have MATIC for gas fees." },
      { title: "Connect to Aave v3 (Polygon)", description: "Use a Web3 wallet to connect to Aave v3, ensuring you select the Polygon network.", tip: "Verify the URL carefully." },
      { title: "Supply Stablecoins", description: "Deposit your chosen stablecoins into the Aave lending pool on Polygon.", tip: "Monitor interest rates and utilization." },
      { title: "Explore E-Mode (Optional)", description: "If borrowing against stablecoins, consider Aave's E-mode for higher LTVs with similar assets.", tip: "Understand E-mode risks and benefits." },
      { title: "Track Earnings", description: "Monitor your supplied assets and accrued interest. Withdraw or compound as needed.", tip: "Aave's dashboard provides detailed information." }
    ]
  },
  {
    id: 28, // New ID for Polygon Medium Risk
    title: "Polygon Medium Risk: Liquidity Provision on Quickswap",
    description: "Provide liquidity in a blue-chip trading pair (e.g., MATIC/USDC or MATIC/ETH) on Quickswap to earn trading fees and potential farming rewards.",
    risk: "medium",
    expectedReturn: "~10–25% APY",
    timeFrame: "Medium Term",
    author: "Polygon Pundit",
    authorAvatar: "/avatar-poly-medium.jpg",
    createdAt: "2025-05-29",
    blockchain: "Polygon",
    steps: [
      { title: "Choose a Pair & Acquire Tokens", description: "Select a pair like MATIC/USDC or MATIC/ETH. Acquire both tokens in a 50/50 value ratio.", tip: "Pairs with MATIC are common on Polygon." },
      { title: "Connect to Quickswap", description: "Use your Web3 wallet to connect to the Quickswap DEX.", tip: "Ensure you are on the correct Quickswap version (v2 or v3)." },
      { title: "Add Liquidity", description: "Navigate to the 'Pool' or 'Liquidity' section and deposit your tokens to receive LP tokens.", tip: "Understand impermanent loss before providing liquidity." },
      { title: "Stake LP Tokens (Farming)", description: "Check Quickswap's 'Farms' section to see if your LP token can be staked for additional rewards (QUICK tokens).", tip: "Farming rewards can significantly boost APY." },
      { title: "Monitor and Reinvest", description: "Periodically claim trading fees and farming rewards. Decide whether to reinvest or convert to stablecoins.", tip: "Impermanent loss can affect your returns." }
    ]
  },
  {
    id: 29, // New ID for Polygon High Risk
    title: "Polygon High Risk: Yield Farming on Beefy Finance",
    description: "Deposit LP tokens into Beefy Finance auto-compounding vaults (e.g., WMATIC–USDC or small-cap pairs) for compounded returns.",
    risk: "high",
    expectedReturn: "~30–200% APY",
    timeFrame: "Short to Medium Term",
    author: "Degen Farmer",
    authorAvatar: "/avatar-poly-high.jpg",
    createdAt: "2025-05-29",
    blockchain: "Polygon",
    steps: [
      { title: "Acquire LP Tokens", description: "First, provide liquidity on a DEX (like Quickswap) for a pair supported by Beefy (e.g., WMATIC-USDC). You will receive LP tokens.", tip: "Beefy supports LPs from various DEXs." },
      { title: "Connect to Beefy Finance (Polygon)", description: "Use your Web3 wallet to connect to Beefy Finance, ensuring you select the Polygon network.", tip: "Verify Beefy's official URL." },
      { title: "Choose a Vault", description: "Browse available vaults on Polygon. Pay attention to the underlying assets, APY, and Total Value Locked (TVL).", tip: "Higher APY often means higher risk (e.g., small-cap or volatile pairs)." },
      { title: "Deposit LP Tokens into Vault", description: "Approve and deposit your LP tokens into the selected Beefy vault.", tip: "Beefy will auto-compound your earnings." },
      { title: "Monitor Performance", description: "Track your investment on the Beefy dashboard. APYs can change frequently.", tip: "Understand the risks of the underlying assets and platform risk." }
    ]
  }
];