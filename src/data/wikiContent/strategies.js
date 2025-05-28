import React from 'react';

export const strategiesTerms = [
  {
    id: "yield-farming",
    term: "Yield Farming",
    category: "DeFi Strategies",
    definition: "The practice of lending or staking cryptocurrency assets to generate returns, often in the form of additional cryptocurrency (yield). Farmers move their assets between different DeFi protocols to maximize returns. This often involves providing liquidity to DEXs and receiving Liquidity Provider (LP) tokens, which can then be staked. Key risk: Impermanent Loss.",
    relatedTerms: ["Liquidity Pool", "LP Token", "Impermanent Loss", "Staking", "APY"],
  },
  {
    id: "lp-tokens",
    term: "LP Tokens (Liquidity Provider Tokens)",
    category: "DeFi Strategies",
    definition: "Tokens issued to users who provide liquidity to a liquidity pool on a DEX. These tokens represent a share of the pool and can often be staked in other DeFi protocols to earn additional rewards (yield farming).",
    relatedTerms: ["Liquidity Pool", "Yield Farming", "DEX", "AMM"],
  },
  {
    id: "impermanent-loss-explained",
    term: "Impermanent Loss Explained",
    category: "DeFi Strategies",
    definition: "A potential risk when providing liquidity to an Automated Market Maker (AMM). It occurs when the price of the tokens in the liquidity pool changes significantly compared to when they were deposited. If you withdraw your liquidity, the USD value of your withdrawn assets might be less than if you had simply held the original tokens. The loss is 'impermanent' because it's only realized upon withdrawal, and can be offset by trading fees earned.",
    relatedTerms: ["Liquidity Pool", "AMM", "Yield Farming", "Risk Management"],
    videoUrl: "https://www.youtube.com/watch?v=8XJ1MSTEuU0"
  },
  {
    id: "staking-vs-delegated-staking",
    term: "Staking vs. Delegated Staking",
    category: "DeFi Strategies",
    definition: "**Staking:** Directly participating in network consensus (e.g., validating transactions) on Proof-of-Stake (PoS) blockchains by locking up your own tokens. Often requires technical setup and a minimum stake. \n**Delegated Staking (DPoS):** Token holders delegate their voting rights and staking power to a validator node that participates in consensus on their behalf. Users still earn rewards but typically pay a small fee to the validator. More accessible than direct staking.",
    relatedTerms: ["Proof-of-Stake (PoS)", "Validators", "Rewards", "Consensus Mechanism"],
  },
  {
    id: "lending-borrowing",
    term: "Lending & Borrowing",
    category: "DeFi Strategies",
    definition: "DeFi protocols like Aave and Compound allow users to: \n- **Lend:** Deposit crypto assets to earn interest from borrowers. \n- **Borrow:** Take out loans by providing other crypto assets as collateral. Borrowing is typically overcollateralized, meaning you must deposit more value than you borrow.",
    relatedTerms: ["Aave", "Compound", "Collateral", "Overcollateralization", "Interest Rate"],
  },
  {
    id: "perpetuals-leverage",
    term: "Perpetuals & Leverage Trading (DeFi)",
    category: "DeFi Strategies",
    definition: "Decentralized platforms (e.g., GMX, dYdX) offer perpetual futures contracts, which are derivatives that mimic traditional futures but have no expiry date. They allow traders to use leverage (borrowed capital) to amplify potential profits (and losses) on price movements of underlying assets. Highly risky.",
    relatedTerms: ["GMX", "dYdX", "Leverage", "Derivatives", "Futures Contract", "Risk Management"],
  },
  {
    id: "auto-compounders",
    term: "Auto-Compounders (Yield Optimizers)",
    category: "DeFi Strategies",
    definition: "Protocols (e.g., Beefy Finance, Yearn Finance) that automatically reinvest (compound) the rewards earned from yield farming or staking strategies. This saves users time and gas fees associated with manual compounding, potentially leading to higher APYs. They often employ complex strategies across multiple platforms.",
    relatedTerms: ["Yield Farming", "Staking", "Compounding", "APY", "Beefy Finance", "Yearn Finance"],
  },
];