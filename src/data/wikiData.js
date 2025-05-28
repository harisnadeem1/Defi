import React from 'react';

export const wikiCategories = [
  "Core Concepts",
  "DeFi Tools and Technologies",
  "DeFi Strategies",
  "Risk Management",
  "Metrics and Analysis",
  "Tokens & Coins",
  "Protocols & Platforms", // Existing, can be merged or kept separate
  "Technology", // Existing
  "Community & Governance", // Existing
  "Educational Material"
];

export const wikiTerms = [
  // --- Core Concepts ---
  {
    id: "what-is-defi",
    term: "What is DeFi?",
    category: "Core Concepts",
    definition: "DeFi (Decentralized Finance) is a movement that aims to recreate traditional financial systems (like lending, borrowing, trading, insurance) using decentralized technologies, primarily blockchain. Instead of relying on central intermediaries like banks, DeFi applications use smart contracts on blockchains (like Ethereum) to automate transactions and agreements in a transparent and permissionless way.",
    relatedTerms: ["Decentralization", "Smart Contract", "Blockchain", "Traditional Finance (TradFi)"],
    externalLinks: [{ title: "Ethereum.org on DeFi", url: "https://ethereum.org/en/defi/" }]
  },
  {
    id: "defi-vs-tradfi",
    term: "DeFi vs. Traditional Finance (TradFi)",
    category: "Core Concepts",
    definition: "Traditional Finance (TradFi) relies on centralized institutions like banks, brokers, and exchanges. DeFi offers alternatives that are typically: \n- **Permissionless:** Anyone can access services without approval. \n- **Transparent:** All transactions are publicly verifiable on the blockchain. \n- **Interoperable:** DeFi protocols can often be combined like 'money legos'. \n- **Non-custodial:** Users typically retain control of their assets. \nTradFi often involves more intermediaries, less transparency, and restricted access.",
    relatedTerms: ["Decentralization", "Permissionless", "Transparency", "Custodial vs Non-Custodial"],
  },
  {
    id: "importance-of-decentralization",
    term: "Importance of Decentralization & Trustless Systems",
    category: "Core Concepts",
    definition: "Decentralization in DeFi means no single point of failure or control. This leads to: \n- **Censorship Resistance:** Difficult for any entity to block or reverse transactions. \n- **Reduced Counterparty Risk:** Less reliance on trusting a central party. \n- **Increased Transparency:** Operations are typically open and verifiable. \nA 'trustless' system doesn't mean no trust is involved, but rather that trust is placed in the code and consensus mechanism of the blockchain, not in a fallible human intermediary.",
    relatedTerms: ["Blockchain", "Smart Contract", "Censorship Resistance", "Counterparty Risk"],
  },
  {
    id: "defi-compatible-blockchains",
    term: "DeFi-Compatible Blockchains",
    category: "Core Concepts",
    definition: "While Ethereum was the pioneer, many blockchains now support DeFi applications. Key characteristics include smart contract capabilities, robust security, and a strong developer ecosystem. Examples include: \n- **Ethereum (ETH):** Largest DeFi ecosystem. \n- **BNB Chain (BSC):** Fast transactions, lower fees, large user base. \n- **Polygon (MATIC):** Layer 2 scaling solution for Ethereum, offering speed and low costs. \n- **Solana (SOL):** High throughput, designed for scalability. \n- **Avalanche (AVAX):** Fast finality, subnet architecture. \n- **Arbitrum & Optimism:** Popular Ethereum Layer 2 Rollups.",
    relatedTerms: ["Ethereum", "Polygon", "Solana", "Avalanche", "BNB Chain", "Layer 1", "Layer 2"],
  },
  {
    id: "blockchain", // Existing, slightly expanded
    term: "Blockchain",
    category: "Core Concepts",
    definition: "A distributed, immutable (unchangeable) digital ledger that records transactions and tracks assets across a network of computers. It's the foundational technology for cryptocurrencies and DeFi applications, providing security, transparency, and decentralization.",
    relatedTerms: ["Decentralization", "Smart Contract", "Ledger", "Immutability"],
  },
  {
    id: "decentralization", // Existing
    term: "Decentralization",
    category: "Core Concepts",
    definition: "The transfer of control and decision-making from a centralized entity (individual, organization, or group thereof) to a distributed network. DeFi aims to decentralize traditional financial services.",
    relatedTerms: ["Blockchain", "DAO", "Censorship Resistance"],
  },
  {
    id: "dapp", // Existing
    term: "DApp (Decentralized Application)",
    category: "Core Concepts",
    definition: "Applications that run on a decentralized network, such as a blockchain, utilizing smart contracts. They are designed to be transparent, autonomous, and resistant to censorship.",
    relatedTerms: ["Smart Contract", "Blockchain", "Ethereum"],
  },

  // --- DeFi Tools and Technologies ---
  {
    id: "smart-contract", // Existing, moved to Tools
    term: "Smart Contract",
    category: "DeFi Tools and Technologies",
    definition: "Self-executing contracts with the terms of the agreement directly written into code. They run on a blockchain and automatically execute when predefined conditions are met, eliminating the need for intermediaries in many DeFi processes.",
    relatedTerms: ["Blockchain", "Ethereum", "DApp", "Solidity"],
    videoUrl: "https://www.youtube.com/watch?v=ZE2_xA5sZ3A" // Example placeholder
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
    tutorialUrl: "https://learn.metamask.io/overview" // Example placeholder
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
    id: "dex", // Existing, expanded
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
    diagramUrl: "placeholder_bridge_diagram.png" // Example placeholder
  },
  {
    id: "oracles",
    term: "Oracles",
    category: "DeFi Tools and Technologies",
    definition: "Services that provide external, real-world data (like asset prices) to smart contracts on the blockchain. Since blockchains are deterministic systems, they cannot natively access off-chain information. Oracles bridge this gap. Examples: Chainlink, Band Protocol.",
    relatedTerms: ["Smart Contract", "Data Feed", "Chainlink", "Oracle Manipulation"],
  },

  // --- DeFi Strategies ---
  {
    id: "yield-farming", // Existing, expanded
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
    id: "impermanent-loss-explained", // Existing, now a dedicated entry
    term: "Impermanent Loss Explained",
    category: "DeFi Strategies",
    definition: "A potential risk when providing liquidity to an Automated Market Maker (AMM). It occurs when the price of the tokens in the liquidity pool changes significantly compared to when they were deposited. If you withdraw your liquidity, the USD value of your withdrawn assets might be less than if you had simply held the original tokens. The loss is 'impermanent' because it's only realized upon withdrawal, and can be offset by trading fees earned.",
    relatedTerms: ["Liquidity Pool", "AMM", "Yield Farming", "Risk Management"],
    videoUrl: "https://www.youtube.com/watch?v=8XJ1MSTEuU0" // Example placeholder
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
    id: "aave-protocol",
    term: "Aave",
    category: "Protocols & Platforms",
    definition: "A leading decentralized lending and borrowing protocol. Users can lend various cryptocurrencies to earn interest and borrow assets by providing collateral. Known for features like flash loans and variable/stable interest rates.",
    relatedTerms: ["Lending Protocol", "Borrowing", "Flash Loans", "Collateral"],
  },
  {
    id: "compound-finance",
    term: "Compound Finance",
    category: "Protocols & Platforms",
    definition: "An algorithmic, autonomous interest rate protocol built for developers to unlock a universe of open financial applications. Users can lend assets to earn interest (cTokens) or borrow assets.",
    relatedTerms: ["Lending Protocol", "Borrowing", "cTokens", "Governance Token (COMP)"],
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

  // --- Risk Management ---
  {
    id: "rug-pulls-exit-scams", // Existing, expanded
    term: "Rug Pulls and Exit Scams",
    category: "Risk Management",
    definition: "Malicious maneuvers where developers abandon a project and abscond with investors' funds. Common tactics include: \n- Draining liquidity pools. \n- Selling off a large supply of team-held tokens. \n- Exploiting backdoors in smart contracts. \nRed flags: Anonymous teams, unaudited contracts, unrealistic promises, locked liquidity (or lack thereof).",
    relatedTerms: ["Scam", "Liquidity Pool", "Due Diligence (DYOR)", "Security Audit"],
  },
  {
    id: "smart-contract-risk",
    term: "Smart Contract Risk",
    category: "Risk Management",
    definition: "The risk that a smart contract may contain bugs, vulnerabilities, or design flaws that could be exploited by malicious actors, leading to loss of funds. Even audited contracts can have risks. This is a fundamental risk in DeFi.",
    relatedTerms: ["Smart Contract", "Security Audit", "Bug Bounty", "Exploit"],
  },
  {
    id: "oracle-manipulation",
    term: "Oracle Manipulation Risk",
    category: "Risk Management",
    definition: "The risk that an oracle providing external data to a smart contract is compromised or provides inaccurate data. This can lead to incorrect execution of smart contracts, potentially causing financial losses in protocols that rely on accurate price feeds (e.g., lending platforms, derivatives).",
    relatedTerms: ["Oracles", "Data Feed", "Price Manipulation", "Flash Loan Attack"],
  },
  {
    id: "dyor",
    term: "DYOR (Do Your Own Research)",
    category: "Risk Management",
    definition: "A fundamental principle in the crypto space encouraging individuals to thoroughly investigate and understand a project before investing. This includes: \n- Reading the whitepaper. \n- Checking the team's background. \n- Reviewing smart contract audits. \n- Understanding tokenomics. \n- Assessing community sentiment (critically). \n- Identifying potential risks.",
    relatedTerms: ["Due Diligence", "Whitepaper", "Tokenomics", "Security Audit"],
  },
  {
    id: "security-audits",
    term: "Security Audits (Smart Contract Audits)",
    category: "Risk Management",
    definition: "An independent review of a smart contract's code to identify vulnerabilities, bugs, and potential security flaws. Reputable audit firms (e.g., CertiK, ConsenSys Diligence, Trail of Bits, Hacken) publish reports. While audits increase confidence, they don't guarantee 100% security. Users should learn how to read audit reports to understand scope and severity of findings.",
    relatedTerms: ["Smart Contract Risk", "Vulnerability", "CertiK", "Due Diligence (DYOR)"],
    externalLinks: [{title: "How to Read an Audit Report (Example)", url: "https://www.example.com/how-to-read-audit"}] // Placeholder
  },

  // --- Metrics and Analysis ---
  {
    id: "tvl",
    term: "TVL (Total Value Locked)",
    category: "Metrics and Analysis",
    definition: "The total value of crypto assets deposited in a specific DeFi protocol or across the entire DeFi ecosystem. It's a key metric used to gauge the adoption, liquidity, and perceived trust in a project or the sector. Often tracked on sites like DeFiLlama.",
    relatedTerms: ["DeFiLlama", "Liquidity", "Market Cap", "Protocol Health"],
  },
  {
    id: "apy-vs-apr", // Existing, now a dedicated entry
    term: "APY vs. APR",
    category: "Metrics and Analysis",
    definition: "**APR (Annual Percentage Rate):** The simple interest rate earned or paid over a year, without accounting for compounding. \n**APY (Annual Percentage Yield):** The effective annual rate of return, taking compounding interest into account. APY will typically be higher than APR if interest is compounded frequently. DeFi protocols often advertise APYs.",
    relatedTerms: ["Interest Rate", "Compounding", "Yield Farming", "Staking"],
  },
  {
    id: "gas-fees-impact", // Existing, expanded
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

  // --- Tokens & Coins (Existing Category, adding more) ---
  {
    id: "cryptocurrency", // Existing
    term: "Cryptocurrency",
    category: "Tokens & Coins",
    definition: "A digital or virtual currency that is secured by cryptography, making it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized networks based on blockchain technology.",
    relatedTerms: ["Bitcoin", "Ethereum", "Altcoin"],
  },
  {
    id: "bitcoin", // Existing
    term: "Bitcoin (BTC)",
    category: "Tokens & Coins",
    definition: "The first and most well-known cryptocurrency, created by an unknown person or group of people under the name Satoshi Nakamoto. It operates on a decentralized peer-to-peer network.",
    relatedTerms: ["Cryptocurrency", "Blockchain"],
  },
  {
    id: "ethereum", // Existing
    term: "Ethereum (ETH)",
    category: "Tokens & Coins",
    definition: "A decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform. It's a popular platform for building DApps and DeFi protocols.",
    relatedTerms: ["Smart Contract", "DApp", "Gas Fees", "EVM"],
  },
  {
    id: "altcoin", // Existing
    term: "Altcoin",
    category: "Tokens & Coins",
    definition: "Any cryptocurrency other than Bitcoin. The term is a portmanteau of 'alternative coin'.",
    relatedTerms: ["Cryptocurrency", "Ethereum", "Solana"],
  },
  {
    id: "stablecoin", // Existing
    term: "Stablecoin",
    category: "Tokens & Coins",
    definition: "A type of cryptocurrency whose value is pegged to another asset, such as a fiat currency (e.g., USD) or a commodity (e.g., gold), to maintain a stable price. Crucial for DeFi liquidity and trading.",
    relatedTerms: ["USDT", "USDC", "DAI", "Peg"],
  },
  {
    id: "usdt-tether",
    term: "USDT (Tether)",
    category: "Tokens & Coins",
    definition: "One of the largest and most widely used stablecoins, pegged to the US dollar. Issued by Tether Limited.",
    relatedTerms: ["Stablecoin", "Peg", "Fiat-Collateralized"],
  },
  {
    id: "usdc-usd-coin",
    term: "USDC (USD Coin)",
    category: "Tokens & Coins",
    definition: "A popular US dollar-pegged stablecoin issued by Circle and Coinbase. Known for its transparency and regulatory compliance efforts.",
    relatedTerms: ["Stablecoin", "Peg", "Fiat-Collateralized"],
  },
  {
    id: "dai-stablecoin",
    term: "DAI",
    category: "Tokens & Coins",
    definition: "A decentralized, crypto-collateralized stablecoin soft-pegged to the US dollar, governed by MakerDAO. Its stability is maintained through a system of collateralized debt positions (CDPs).",
    relatedTerms: ["Stablecoin", "Decentralized", "Crypto-Collateralized", "MakerDAO"],
  },
  {
    id: "wrapped-tokens",
    term: "Wrapped Tokens (e.g., wBTC, wETH)",
    category: "Tokens & Coins",
    definition: "Tokens that represent another cryptocurrency from a different blockchain, but conform to the token standard of the host blockchain. For example, Wrapped Bitcoin (wBTC) is an ERC-20 token on Ethereum that represents Bitcoin. Wrapping allows assets to be used in DeFi protocols on non-native chains.",
    relatedTerms: ["Interoperability", "ERC-20", "Bitcoin", "Ethereum", "Blockchain Bridges"],
  },
  {
    id: "nft", // Existing
    term: "NFT (Non-Fungible Token)",
    category: "Tokens & Coins",
    definition: "A unique digital asset that represents ownership of a specific item, such as art, collectibles, or virtual land. Unlike cryptocurrencies, NFTs are not interchangeable (non-fungible).",
    relatedTerms: ["Blockchain", "Digital Art", "Collectibles", "ERC-721"],
  },
  {
    id: "governance-token", // Existing
    term: "Governance Token",
    category: "Tokens & Coins",
    definition: "A type of cryptocurrency that grants holders voting rights and the ability to participate in the decision-making process (governance) of a decentralized protocol or DApp.",
    relatedTerms: ["DAO", "Decentralization", "Voting", "Protocol Governance"],
  },
  {
    id: "tokenomics",
    term: "Tokenomics",
    category: "Tokens & Coins",
    definition: "The study of the economic characteristics of a cryptocurrency or token. This includes its supply, distribution, utility, demand drivers, and incentive mechanisms. Understanding tokenomics is crucial for assessing a project's long-term viability.",
    relatedTerms: ["Supply and Demand", "Inflation/Deflation", "Utility Token", "Governance Token", "Vesting"],
  },

  // --- Protocols & Platforms (Existing Category, adding more) ---
  {
    id: "amm", // Existing
    term: "AMM (Automated Market Maker)",
    category: "Protocols & Platforms",
    definition: "A type of decentralized exchange (DEX) protocol that relies on a mathematical formula (e.g., x*y=k) to price assets using liquidity pools, instead of a traditional order book.",
    relatedTerms: ["DEX", "Liquidity Pool", "Uniswap", "Constant Function Market Maker"],
  },
  {
    id: "lending-protocol", // Existing
    term: "Lending Protocol",
    category: "Protocols & Platforms",
    definition: "DeFi platforms that allow users to lend their crypto assets to earn interest or borrow assets by providing collateral. Examples include Aave and Compound.",
    relatedTerms: ["Aave", "Compound", "Collateral", "Interest Rate Model"],
  },
  {
    id: "dao", // Existing
    term: "DAO (Decentralized Autonomous Organization)",
    category: "Protocols & Platforms",
    definition: "An organization whose rules and operations are encoded in smart contracts on a blockchain, allowing for transparent and member-controlled governance. Often managed via governance tokens.",
    relatedTerms: ["Governance Token", "Decentralization", "Voting", "Treasury Management"],
  },
  {
    id: "yearn-finance",
    term: "Yearn Finance (YFI)",
    category: "Protocols & Platforms",
    definition: "A decentralized suite of products that provides yield generation, lending aggregation, and insurance on the Ethereum blockchain. Known for its Vaults that automate yield farming strategies.",
    relatedTerms: ["Auto-Compounder", "Yield Aggregator", "Vaults", "yTokens"],
  },
  {
    id: "beefy-finance",
    term: "Beefy Finance",
    category: "Protocols & Platforms",
    definition: "A decentralized, multi-chain yield optimizer platform that allows its users to earn compound interest on their crypto holdings. Beefy automates strategies using liquidity pools and other yield farming opportunities.",
    relatedTerms: ["Auto-Compounder", "Yield Optimizer", "Vaults", "Multi-Chain"],
  },
  {
    id: "gmx",
    term: "GMX",
    category: "Protocols & Platforms",
    definition: "A decentralized perpetual exchange that allows users to trade spot and perpetual futures with leverage. Known for its shared liquidity pool model (GLP) that earns fees for liquidity providers.",
    relatedTerms: ["Perpetuals", "Leverage Trading", "DEX", "GLP Token", "Arbitrum", "Avalanche"],
  },
  {
    id: "dydx",
    term: "dYdX",
    category: "Protocols & Platforms",
    definition: "A leading decentralized exchange for trading perpetual contracts with leverage. It operates on its own Layer 2 solution (StarkEx) for scalability and low fees.",
    relatedTerms: ["Perpetuals", "Leverage Trading", "DEX", "Layer 2", "Order Book"],
  },
  {
    id: "chainlink",
    term: "Chainlink",
    category: "Protocols & Platforms",
    definition: "A decentralized oracle network that enables smart contracts to securely access off-chain data feeds, web APIs, and traditional bank payments. Crucial infrastructure for many DeFi applications.",
    relatedTerms: ["Oracles", "Data Feed", "Smart Contract", "Hybrid Smart Contracts"],
  },
  {
    id: "curve-finance",
    term: "Curve Finance",
    category: "Protocols & Platforms",
    definition: "A decentralized exchange liquidity pool on Ethereum (and other chains) designed for extremely efficient stablecoin trading and low-risk fee income for liquidity providers via its specialized AMM formula.",
    relatedTerms: ["DEX", "AMM", "Stablecoin", "Liquidity Pool", "veCRV"],
  },

  // --- Technology (Existing Category, adding more) ---
  {
    id: "proof-of-work", // Existing
    term: "Proof-of-Work (PoW)",
    category: "Technology",
    definition: "A consensus mechanism used by blockchains like Bitcoin to validate transactions and add new blocks. It requires miners to solve complex mathematical problems, consuming significant computational power.",
    relatedTerms: ["Consensus Mechanism", "Mining", "Bitcoin", "Energy Consumption"],
  },
  {
    id: "proof-of-stake", // Existing
    term: "Proof-of-Stake (PoS)",
    category: "Technology",
    definition: "A consensus mechanism where users can stake their own coins to validate transactions and create new blocks. It is generally more energy-efficient than Proof-of-Work. Variations include Delegated Proof-of-Stake (DPoS).",
    relatedTerms: ["Consensus Mechanism", "Staking", "Ethereum", "Validators", "DPoS"],
  },
  {
    id: "layer-1", // Existing
    term: "Layer 1 (L1)",
    category: "Technology",
    definition: "The base blockchain protocol, such as Bitcoin or Ethereum. Layer 1 solutions are responsible for the core consensus, security, and data availability of the network.",
    relatedTerms: ["Blockchain", "Ethereum", "Bitcoin", "Consensus Mechanism"],
  },
  {
    id: "layer-2", // Existing
    term: "Layer 2 (L2)",
    category: "Technology",
    definition: "A secondary framework or protocol built on top of an existing Layer 1 blockchain. Layer 2 solutions aim to improve scalability (transaction speed and cost) by processing transactions off the main chain. Examples: Rollups (Optimistic, ZK), State Channels, Sidechains.",
    relatedTerms: ["Scalability", "Rollups", "Optimistic Rollups", "ZK-Rollups", "Polygon", "Arbitrum", "Optimism"],
  },
  {
    id: "evm",
    term: "EVM (Ethereum Virtual Machine)",
    category: "Technology",
    definition: "A Turing-complete virtual machine that enables the execution of smart contracts on the Ethereum blockchain. Many other blockchains are EVM-compatible, meaning they can run Ethereum smart contracts with minimal changes.",
    relatedTerms: ["Ethereum", "Smart Contract", "Solidity", "EVM-Compatible Chains"],
  },
  {
    id: "sharding",
    term: "Sharding",
    category: "Technology",
    definition: "A database partitioning technique used to improve blockchain scalability. It involves splitting the network into smaller, more manageable pieces called 'shards,' each capable of processing transactions and smart contracts independently, thus increasing overall throughput.",
    relatedTerms: ["Scalability", "Layer 1", "Ethereum", "Throughput"],
  },
  {
    id: "zero-knowledge-proofs",
    term: "Zero-Knowledge Proofs (ZKPs)",
    category: "Technology",
    definition: "A cryptographic method by which one party (the prover) can prove to another party (the verifier) that they know a value x, without conveying any information apart from the fact that they know the value x. Used in ZK-Rollups for privacy and scalability.",
    relatedTerms: ["Cryptography", "ZK-Rollups", "Privacy", "Scalability"],
  },

  // --- Community & Governance (Existing Category, adding more) ---
  {
    id: "whitelist", // Existing
    term: "Whitelist",
    category: "Community & Governance",
    definition: "A list of approved or recognized entities (e.g., wallet addresses) that are granted exclusive access or privileges, often used in token sales (ICOs/IDOs), NFT mints, or for accessing beta features.",
    relatedTerms: ["ICO", "IDO", "NFT Mint", "Token Sale"],
  },
  {
    id: "airdrop", // Existing
    term: "Airdrop",
    category: "Community & Governance",
    definition: "A distribution of a cryptocurrency token or coin, usually for free, to numerous wallet addresses. Airdrops are often used as a marketing strategy, to reward early users, or to distribute governance tokens.",
    relatedTerms: ["Token", "Marketing", "Community", "Governance Token"],
  },
  {
    id: "fork",
    term: "Fork (Blockchain)",
    category: "Community & Governance",
    definition: "A change in a blockchain's protocol. \n- **Soft Fork:** A backward-compatible upgrade. \n- **Hard Fork:** A non-backward-compatible upgrade that requires all nodes to update; can lead to a chain split if there's disagreement (e.g., Ethereum and Ethereum Classic). Forks can also refer to copying and modifying an existing DApp's codebase (e.g., Sushiswap from Uniswap).",
    relatedTerms: ["Blockchain", "Protocol Upgrade", "Hard Fork", "Soft Fork", "Community Consensus"],
  },

  // --- Educational Material ---
  {
    id: "defi-glossary-intro",
    term: "DeFi Glossary",
    category: "Educational Material",
    definition: "This wiki serves as an extensive DeFi glossary. Use the search bar or browse categories to find definitions for various terms. The goal is to provide clear explanations for beginners and in-depth information for advanced users.",
    relatedTerms: ["Learning DeFi", "Terminology"],
  },
  {
    id: "learning-paths",
    term: "Learning Paths (Beginner, Intermediate, Advanced)",
    category: "Educational Material",
    definition: "DeFi can be complex. A structured learning path can help: \n- **Beginner:** Understand core concepts (blockchain, wallets, DeFi basics), learn to use a wallet, make first swaps on a DEX. Focus on security. \n- **Intermediate:** Explore yield farming, staking, lending/borrowing. Learn about risk assessment (impermanent loss, smart contract risk). \n- **Advanced:** Deep dive into specific protocols, derivatives, governance, cross-chain strategies, and advanced risk management. \n(This wiki aims to support all levels).",
    relatedTerms: ["DeFi Education", "DYOR", "Risk Management"],
    externalLinks: [{title: "Example Beginner Guide", url: "https://www.example.com/beginner-defi"}] // Placeholder
  },
  {
    id: "case-studies-defi",
    term: "DeFi Case Studies",
    category: "Educational Material",
    definition: "Analyzing past events, both successes and failures, provides valuable lessons in DeFi. Examples: \n- **The DAO Hack (2016):** Early smart contract exploit leading to Ethereum hard fork. \n- **Anchor Protocol Collapse (Terra/LUNA):** Unsustainable yields and algorithmic stablecoin failure. \n- **Curve Wars:** Competition for CRV emissions and governance power. \n- **Flash Loan Attacks:** Various protocols exploited using flash loans to manipulate prices or logic. \nUnderstanding these helps in assessing future risks and opportunities.",
    relatedTerms: ["Risk Management", "Smart Contract Risk", "Algorithmic Stablecoin", "Flash Loan"],
  },
  {
    id: "practical-guides-setup",
    term: "Practical Guides (Wallets, First Trades)",
    category: "Educational Material",
    definition: "Getting started in DeFi involves practical steps: \n1. **Choosing & Setting Up a Wallet:** (e.g., MetaMask guide - see 'MetaMask' term). \n2. **Funding Your Wallet:** Buying crypto on an exchange and transferring it. \n3. **Connecting to a DApp:** Using your wallet to connect to a DEX or lending platform. \n4. **Making Your First Swap/Transaction:** Understanding gas fees and confirming. \n(Look for specific tool entries like 'MetaMask' or 'Uniswap' for more focused guidance or external links).",
    relatedTerms: ["MetaMask", "Wallet", "DEX", "Gas Fees"],
    tutorialUrl: "placeholder_wallet_setup_video.mp4" // Placeholder
  },
  {
    id: "comparison-tables-defi",
    term: "Comparison Tables (Protocols, Fees, Risks)",
    category: "Educational Material",
    definition: "Comparing DeFi protocols can be complex. Tables can help visualize differences in: \n- **DEXs:** Fees, slippage, supported chains, token availability. \n- **Lending Platforms:** Collateral types, loan-to-value ratios, interest rates. \n- **Yield Farms:** APYs (highly variable), risks, lockup periods. \n(While this wiki provides info on individual protocols, users should consult analytics platforms like DeFiLlama for up-to-date comparative data).",
    relatedTerms: ["DeFiLlama", "DYOR", "Risk Assessment"],
  },
];
