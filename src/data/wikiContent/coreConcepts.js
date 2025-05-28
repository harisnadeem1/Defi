import React from 'react';

export const coreConceptsTerms = [
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
    id: "blockchain",
    term: "Blockchain",
    category: "Core Concepts",
    definition: "A distributed, immutable (unchangeable) digital ledger that records transactions and tracks assets across a network of computers. It's the foundational technology for cryptocurrencies and DeFi applications, providing security, transparency, and decentralization.",
    relatedTerms: ["Decentralization", "Smart Contract", "Ledger", "Immutability"],
  },
  {
    id: "decentralization",
    term: "Decentralization",
    category: "Core Concepts",
    definition: "The transfer of control and decision-making from a centralized entity (individual, organization, or group thereof) to a distributed network. DeFi aims to decentralize traditional financial services.",
    relatedTerms: ["Blockchain", "DAO", "Censorship Resistance"],
  },
  {
    id: "dapp",
    term: "DApp (Decentralized Application)",
    category: "Core Concepts",
    definition: "Applications that run on a decentralized network, such as a blockchain, utilizing smart contracts. They are designed to be transparent, autonomous, and resistant to censorship.",
    relatedTerms: ["Smart Contract", "Blockchain", "Ethereum"],
  },
];