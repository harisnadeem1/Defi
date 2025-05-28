import React from 'react';

export const toolsAndTechnologiesTerms = [
  {
    id: "smart-contract",
    term: "Smart Contract",
    category: "DeFi Tools and Technologies",
    definition: "Self-executing contracts with the terms of the agreement directly written into code. They run on a blockchain and automatically execute when predefined conditions are met, eliminating the need for intermediaries in many DeFi processes.",
    relatedTerms: ["Blockchain", "Ethereum", "DApp", "Solidity"],
    videoUrl: "https://www.youtube.com/watch?v=ZE2_xA5sZ3A"
  },
  {
    id: "wallets",
    term: "Wallets (Crypto Wallets)",
    category: "DeFi Tools and Technologies",
    definition: "Digital wallets used to store, manage, and interact with cryptocurrencies and DeFi applications. They hold your private keys, which authorize transactions. Types include: \n- **Software (Hot) Wallets:** Browser extensions (MetaMask, Phantom), mobile apps (Trust Wallet), desktop apps. Convenient but connected to the internet. \n- **Hardware (Cold) Wallets:** Physical devices (Ledger, Trezor) that store keys offline for enhanced security. \n- **Smart Contract Wallets:** Offer features like social recovery and multi-signature (e.g., Argent, Gnosis Safe).",
    relatedTerms: ["MetaMask", "Trust Wallet", "Ledger", "Private Key", "Seed Phrase", "Non-Custodial"],
    externalLinks: [{title: "Choosing a Wallet Guide", url: "https://ethereum.org/en/wallets/find-wallet/"}]
  },
  {
    id: "metamask",
    term: "MetaMask",
    category: "DeFi Tools and Technologies",
    definition: "A popular non-custodial cryptocurrency wallet available as a browser extension and mobile app. It allows users to interact with Ethereum and other EVM-compatible blockchains and their DApps.",
    relatedTerms: ["Wallet", "Browser Extension", "EVM", "Non-Custodial"],
    tutorialUrl: "https://learn.metamask.io/overview"
  },
  {
    id: "trust-wallet",
    term: "Trust Wallet",
    category: "DeFi Tools and Technologies",
    definition: "A mobile-first non-custodial cryptocurrency wallet that supports a wide range of blockchains and assets. Known for its user-friendly interface and DApp browser.",
    relatedTerms: ["Wallet", "Mobile Wallet", "Non-Custodial", "DApp Browser"],
  },
  {
    id: "ledger-wallet",
    term: "Ledger (Hardware Wallet)",
    category: "DeFi Tools and Technologies",
    definition: "A brand of hardware wallets (e.g., Ledger Nano S, Ledger Nano X) that provide cold storage for private keys, offering a high level of security for crypto assets.",
    relatedTerms: ["Wallet", "Hardware Wallet", "Cold Storage", "Security"],
  },
  {
    id: "dex",
    term: "DEX (Decentralized Exchange)",
    category: "DeFi Tools and Technologies",
    definition: "Cryptocurrency exchanges that operate without a central authority, allowing users to trade peer-to-peer directly from their wallets. Most DEXs use Automated Market Makers (AMMs) instead of traditional order books. Examples: Uniswap, Sushiswap, PancakeSwap.",
    relatedTerms: ["Uniswap", "Sushiswap", "PancakeSwap", "AMM", "Liquidity Pool", "Non-Custodial"],
  },
  {
    id: "uniswap",
    term: "Uniswap",
    category: "DeFi Tools and Technologies",
    definition: "A leading decentralized exchange (DEX) protocol built on Ethereum. It pioneered the Automated Market Maker (AMM) model, allowing users to swap tokens and provide liquidity.",
    relatedTerms: ["DEX", "AMM", "Liquidity Pool", "Ethereum"],
    externalLinks: [{title: "Uniswap Official Site", url: "https://uniswap.org/"}]
  },
  {
    id: "sushiswap",
    term: "Sushiswap",
    category: "DeFi Tools and Technologies",
    definition: "A decentralized exchange (DEX) that originated as a fork of Uniswap. It offers similar AMM functionalities along with additional features like yield farming and staking (xSUSHI).",
    relatedTerms: ["DEX", "AMM", "Yield Farming", "Fork"],
  },
  {
    id: "pancakeswap",
    term: "PancakeSwap",
    category: "DeFi Tools and Technologies",
    definition: "The leading decentralized exchange (DEX) on the BNB Chain, known for its low transaction fees and diverse range of DeFi services including token swaps, liquidity provision, yield farming, and lottery.",
    relatedTerms: ["DEX", "AMM", "BNB Chain", "Yield Farming"],
  },
  {
    id: "dex-aggregators",
    term: "DEX Aggregators",
    category: "DeFi Tools and Technologies",
    definition: "Platforms that source liquidity from multiple DEXs to find the best possible trading prices for users. They split trades across different exchanges to minimize slippage and optimize execution. Examples: 1inch, Matcha, Paraswap.",
    relatedTerms: ["DEX", "Liquidity", "Slippage", "1inch", "Matcha"],
  },
  {
    id: "1inch",
    term: "1inch",
    category: "DeFi Tools and Technologies",
    definition: "A popular DEX aggregator that scours various decentralized exchanges to find the most efficient swap routes for users, aiming to provide the best rates by splitting orders across multiple liquidity sources.",
    relatedTerms: ["DEX Aggregator", "Liquidity", "Pathfinder Algorithm"],
  },
  {
    id: "blockchain-bridges",
    term: "Blockchain Bridges & Cross-Chain Interoperability",
    category: "DeFi Tools and Technologies",
    definition: "Blockchain bridges are protocols that enable the transfer of assets and data between different blockchain networks (e.g., Ethereum to Polygon). They are crucial for cross-chain interoperability, allowing DeFi to expand beyond single chains. Different bridge designs exist, each with its own security model (e.g., trusted, trustless).",
    relatedTerms: ["Cross-Chain", "Interoperability", "Wrapped Assets", "Layer 1", "Layer 2"],
    diagramUrl: "placeholder_bridge_diagram.png"
  },
  {
    id: "oracles",
    term: "Oracles",
    category: "DeFi Tools and Technologies",
    definition: "Services that provide external, real-world data (like asset prices) to smart contracts on the blockchain. Since blockchains are deterministic systems, they cannot natively access off-chain information. Oracles bridge this gap. Examples: Chainlink, Band Protocol.",
    relatedTerms: ["Smart Contract", "Data Feed", "Chainlink", "Oracle Manipulation"],
  },
];