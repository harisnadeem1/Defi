import React from 'react';

export const riskManagementTerms = [
  {
    id: "rug-pulls-exit-scams",
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
    externalLinks: [{title: "How to Read an Audit Report (Example)", url: "https://www.example.com/how-to-read-audit"}]
  },
];