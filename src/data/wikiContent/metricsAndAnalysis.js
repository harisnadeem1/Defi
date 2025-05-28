import React from 'react';

export const metricsAndAnalysisTerms = [
  {
    id: "tvl",
    term: "TVL (Total Value Locked)",
    category: "Metrics and Analysis",
    definition: "The total value of crypto assets deposited in a specific DeFi protocol or across the entire DeFi ecosystem. It's a key metric used to gauge the adoption, liquidity, and perceived trust in a project or the sector. Often tracked on sites like DeFiLlama.",
    relatedTerms: ["DeFiLlama", "Liquidity", "Market Cap", "Protocol Health"],
  },
  {
    id: "apy-vs-apr",
    term: "APY vs. APR",
    category: "Metrics and Analysis",
    definition: "**APR (Annual Percentage Rate):** The simple interest rate earned or paid over a year, without accounting for compounding. \n**APY (Annual Percentage Yield):** The effective annual rate of return, taking compounding interest into account. APY will typically be higher than APR if interest is compounded frequently. DeFi protocols often advertise APYs.",
    relatedTerms: ["Interest Rate", "Compounding", "Yield Farming", "Staking"],
  },
  {
    id: "gas-fees-impact",
    term: "Gas Fees and Their Impact",
    category: "Metrics and Analysis",
    definition: "Fees paid to network validators/miners for processing transactions on a blockchain (especially Ethereum). Gas fees can fluctuate significantly based on network demand. High gas fees can make smaller transactions uneconomical and impact the profitability of DeFi strategies. Layer 2 solutions aim to reduce gas fees.",
    relatedTerms: ["Ethereum", "Transaction Costs", "Layer 2", "Scalability", "Gwei"],
  },
  {
    id: "defi-dashboards",
    term: "DeFi Dashboards & Analytics Platforms",
    category: "Metrics and Analysis",
    definition: "Websites and tools that provide data, analytics, and visualizations for the DeFi ecosystem. They help users track TVL, protocol performance, token prices, yield farming opportunities, and more. Examples: \n- **DeFiLlama:** Tracks TVL across chains and protocols. \n- **Dune Analytics:** Allows users to query blockchain data and create custom dashboards. \n- **Nansen:** On-chain analytics with wallet labeling. \n- **Zapper/Zerion:** Portfolio trackers and DeFi dashboards.",
    relatedTerms: ["DeFiLlama", "Dune Analytics", "TVL", "On-Chain Analysis", "Portfolio Tracker"],
  },
];