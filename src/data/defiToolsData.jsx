import React from "react";
import { ShieldCheck, Search, FileText, BarChart3, DollarSign, Briefcase, Network, ArrowRightLeft, Zap, Palette, KeyRound as KeyRound, Code2, Filter, Settings2 } from 'lucide-react';

export const defiTools = [
  {
    name: "Revoke.cash",
    description: "Crucial for reviewing and revoking active token approvals for dApps, protecting from exploits.",
    link: "https://revoke.cash",
    category: "Security",
    icon: <ShieldCheck className="h-5 w-5 mr-2 text-red-400" />
  },
  {
    name: "Wallet Guard",
    description: "Browser extension for proactive security warnings and phishing detection in Web3.",
    link: "https://walletguard.app",
    category: "Security",
    icon: <ShieldCheck className="h-5 w-5 mr-2 text-red-400" />
  },
  {
    name: "Pocket Universe",
    description: "Transaction simulator that helps you understand what a smart contract will do before you sign.",
    link: "https://pocketuniverse.app",
    category: "Security",
    icon: <ShieldCheck className="h-5 w-5 mr-2 text-red-400" />
  },
  {
    name: "CertiK Skynet",
    description: "Security leaderboard and insights for DeFi projects, helping assess risk.",
    link: "https://skynet.certik.com",
    category: "Security",
    icon: <Search className="h-5 w-5 mr-2 text-red-400" />
  },
  {
    name: "DeFi Safety",
    description: "Independent security reviews and ratings for DeFi protocols.",
    link: "https://defisafety.com",
    category: "Security",
    icon: <FileText className="h-5 w-5 mr-2 text-red-400" />
  },
  {
    name: "Impermanent Loss Calculator (e.g., Daily DeFi)",
    description: "Calculates potential impermanent loss for liquidity providers.",
    link: "https://dailydefi.org/tools/impermanent-loss-calculator/", 
    category: "Calculators & Simulators",
    icon: <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
  },
  {
    name: "Yield Farming Calculator",
    description: "Helps estimate APY/APR for various yield farming opportunities. (Search for specific platform calculators)",
    link: "https://www.google.com/search?q=yield+farming+calculator",
    category: "Calculators & Simulators",
    icon: <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
  },
  {
    name: "DeBank",
    description: "Comprehensive portfolio tracker for multiple chains and DeFi protocols.",
    link: "https://debank.com",
    category: "Portfolio Trackers",
    icon: <Briefcase className="h-5 w-5 mr-2 text-green-400" />
  },
  {
    name: "Zapper.fi",
    description: "Dashboard for managing DeFi portfolio, investments, and trades.",
    link: "https://zapper.fi",
    category: "Portfolio Trackers",
    icon: <Briefcase className="h-5 w-5 mr-2 text-green-400" />
  },
  {
    name: "Zerion",
    description: "Another popular DeFi portfolio tracker with a focus on user experience.",
    link: "https://zerion.io",
    category: "Portfolio Trackers",
    icon: <Briefcase className="h-5 w-5 mr-2 text-green-400" />
  },
  {
    name: "ApeBoard (by Nansen)",
    description: "Cross-chain DeFi dashboard to track your portfolio across various networks.",
    link: "https://apeboard.finance",
    category: "Portfolio Trackers",
    icon: <Briefcase className="h-5 w-5 mr-2 text-green-400" />
  },
  {
    name: "Etherscan / BscScan / PolygonScan",
    description: "Blockchain explorers for viewing transactions, contracts, and token details.",
    link: "https://etherscan.io",
    category: "Blockchain Explorers",
    icon: <Search className="h-5 w-5 mr-2 text-purple-400" />
  },
  {
    name: "Dune Analytics",
    description: "Platform for querying and visualizing blockchain data with community-created dashboards.",
    link: "https://dune.com",
    category: "Analytics & Data",
    icon: <BarChart3 className="h-5 w-5 mr-2 text-teal-400" />
  },
  {
    name: "Nansen",
    description: "Blockchain analytics platform with on-chain data and insights for traders and investors.",
    link: "https://nansen.ai",
    category: "Analytics & Data",
    icon: <BarChart3 className="h-5 w-5 mr-2 text-teal-400" />
  },
  {
    name: "Token Terminal",
    description: "Provides financial and business metrics on crypto protocols.",
    link: "https://tokenterminal.com",
    category: "Analytics & Data",
    icon: <BarChart3 className="h-5 w-5 mr-2 text-teal-400" />
  },
  {
    name: "Glassnode",
    description: "On-chain market intelligence and data for various cryptocurrencies.",
    link: "https://glassnode.com",
    category: "Analytics & Data",
    icon: <Network className="h-5 w-5 mr-2 text-teal-400" />
  },
  {
    name: "1inch",
    description: "DEX aggregator that finds the best trading routes across multiple exchanges.",
    link: "https://app.1inch.io",
    category: "DEX Aggregators",
    icon: <ArrowRightLeft className="h-5 w-5 mr-2 text-orange-400" />
  },
  {
    name: "Matcha (by 0x)",
    description: "DEX aggregator focused on providing deep liquidity and better prices.",
    link: "https://matcha.xyz",
    category: "DEX Aggregators",
    icon: <ArrowRightLeft className="h-5 w-5 mr-2 text-orange-400" />
  },
  {
    name: "ParaSwap",
    description: "Aggregates liquidity from various DEXs and DeFi protocols to offer optimal rates.",
    link: "https://paraswap.io",
    category: "DEX Aggregators",
    icon: <ArrowRightLeft className="h-5 w-5 mr-2 text-orange-400" />
  },
  {
    name: "Beefy Finance",
    description: "Multichain yield optimizer that automates yield farming strategies.",
    link: "https://beefy.finance",
    category: "Yield Optimizers",
    icon: <Zap className="h-5 w-5 mr-2 text-yellow-400" />
  },
  {
    name: "Yearn Finance",
    description: "A suite of products in DeFi that provides lending aggregation, yield generation, and insurance.",
    link: "https://yearn.finance",
    category: "Yield Optimizers",
    icon: <Zap className="h-5 w-5 mr-2 text-yellow-400" />
  },
  {
    name: "Convex Finance",
    description: "Platform built on top of Curve Finance to boost rewards for CRV stakers and liquidity providers.",
    link: "https://www.convexfinance.com/",
    category: "Yield Optimizers",
    icon: <Zap className="h-5 w-5 mr-2 text-yellow-400" />
  },
  {
    name: "OpenSea / Blur",
    description: "Leading marketplaces for buying, selling, and discovering NFTs.",
    link: "https://opensea.io",
    category: "NFT Marketplaces & Tools",
    icon: <Palette className="h-5 w-5 mr-2 text-pink-400" />
  },
  {
    name: "NFTGo",
    description: "NFT analytics platform providing data, rankings, and insights into the NFT market.",
    link: "https://nftgo.io",
    category: "NFT Marketplaces & Tools",
    icon: <BarChart3 className="h-5 w-5 mr-2 text-pink-400" />
  },
  {
    name: "Snapshot",
    description: "Off-chain gasless voting platform widely used by DAOs for governance.",
    link: "https://snapshot.org",
    category: "DAO Tools",
    icon: <KeyRound className="h-5 w-5 mr-2 text-indigo-400" />
  },
  {
    name: "Tally",
    description: "Platform for on-chain governance, helping users discover and participate in DAOs.",
    link: "https://www.tally.xyz",
    category: "DAO Tools",
    icon: <KeyRound className="h-5 w-5 mr-2 text-indigo-400" />
  },
  {
    name: "Aragon",
    description: "Platform for creating and managing DAOs on Ethereum and other networks.",
    link: "https://aragon.org",
    category: "DAO Tools",
    icon: <Settings2 className="h-5 w-5 mr-2 text-indigo-400" />
  },
  {
    name: "Remix IDE",
    description: "Browser-based IDE for Solidity smart contract development and deployment.",
    link: "https://remix.ethereum.org",
    category: "Developer Tools",
    icon: <Code2 className="h-5 w-5 mr-2 text-gray-400" />
  },
  {
    name: "Hardhat / Truffle",
    description: "Development environments for Ethereum software (smart contracts, dApps).",
    link: "https://hardhat.org",
    category: "Developer Tools",
    icon: <Code2 className="h-5 w-5 mr-2 text-gray-400" />
  },
  {
    name: "DefiLlama",
    description: "Tracks Total Value Locked (TVL) across various DeFi protocols and chains.",
    link: "https://defillama.com",
    category: "Analytics & Data",
    icon: <Filter className="h-5 w-5 mr-2 text-teal-400" />
  }
];

export const categoryOrder = [
  "Security",
  "Portfolio Trackers",
  "Analytics & Data",
  "Blockchain Explorers",
  "DEX Aggregators",
  "Yield Optimizers",
  "Calculators & Simulators",
  "NFT Marketplaces & Tools",
  "DAO Tools",
  "Developer Tools"
];