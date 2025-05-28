import React from "react";
import { BookOpen, Users, ShieldCheck, BarChart3, MessageCircle, Video, Lightbulb, TrendingUp, Users2, DollarSign, Zap, Brain, CheckCircle, ArrowRightCircle, Target, Award } from 'lucide-react';

export const learningModules = [
  {
    id: "intro",
    icon: <BookOpen className="h-8 w-8 text-white" />,
    title: "Module 1: What is DeFi?",
    videoTitle: "DeFi Unveiled: Your First Step into Decentralized Finance",
    objective: "Grasp the core idea of DeFi and why it's a game-changer.",
    bgColor: "from-sky-500 to-blue-600",
    description: "DeFi stands for Decentralized Finance. Think of it like your usual bank services (saving, lending, trading) but without the actual bank in the middle! Instead, it uses cool technology called blockchain and smart contracts to make things happen automatically and openly.",
    passiveIncomeFocus: "Understanding DeFi is the first step. While this module itself doesn't generate income, it lays the foundation for all future passive income strategies you'll learn.",
    keyTakeaways: [
      "DeFi aims to rebuild traditional finance without central authorities.",
      "It uses blockchain for transparency and security.",
      "Smart contracts automate financial agreements."
    ],
    nextSteps: ["Explore 'Key Components of DeFi' to see what makes it tick."],
    estimatedTime: "Approx. 30 mins",
  },
  {
    id: "components",
    icon: <Zap className="h-8 w-8 text-white" />,
    title: "Module 2: DeFi's Building Blocks",
    videoTitle: "Smart Contracts, Tokens & Protocols: The Core Engine",
    objective: "Learn about the essential tech that powers DeFi.",
    bgColor: "from-indigo-500 to-purple-600",
    description: "DeFi runs on a few key ingredients: \n- **Smart Contracts:** These are like digital vending machines. You put in a condition (like an agreement), and they automatically give you the result. No human needed! \n- **Tokens:** Digital assets representing value (like money, ownership, or access). \n- **Protocols:** Sets of rules and smart contracts that create specific DeFi services (like a lending app).",
    passiveIncomeFocus: "Many passive income methods involve interacting with specific tokens and protocols. Understanding these components is crucial for choosing where to put your crypto to work.",
    keyTakeaways: [
      "Smart contracts are self-executing agreements.",
      "Tokens can represent various forms of value or utility.",
      "Protocols are the 'apps' of the DeFi world."
    ],
    nextSteps: ["Learn how to keep your assets safe in 'Wallets & Security'."],
    estimatedTime: "Approx. 45 mins",
  },
  {
    id: "wallets",
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: "Module 3: Your DeFi Vault - Wallets & Security",
    videoTitle: "Safeguarding Your Crypto: A Guide to DeFi Wallets",
    objective: "Master setting up and securing a non-custodial wallet.",
    bgColor: "from-emerald-500 to-green-600",
    description: "A crypto wallet is like your digital bank account, but YOU are the only one with the keys! \n- **Non-Custodial:** Means you have full control (and responsibility!) for your assets. \n- **Seed Phrase:** A super-important backup password. Keep it secret, keep it safe! \nPopular wallets include MetaMask (browser) and Trust Wallet (mobile).",
    passiveIncomeFocus: "You need a secure wallet to hold the crypto you'll use for passive income and to store the earnings. Security is paramount – lose your keys, lose your crypto!",
    keyTakeaways: [
      "Non-custodial wallets give you control.",
      "Your seed phrase is your ultimate backup; protect it fiercely.",
      "Practice safe online habits to avoid scams."
    ],
    nextSteps: ["Understand 'Stablecoins' – a key asset for many DeFi strategies."],
    estimatedTime: "Approx. 1 hour",
  },
  {
    id: "stablecoins",
    icon: <DollarSign className="h-8 w-8 text-white" />,
    title: "Module 4: Steadying the Ship - Stablecoins",
    videoTitle: "Stablecoins Explained: Digital Dollars in DeFi",
    objective: "Learn how stablecoins work and their role in DeFi.",
    bgColor: "from-amber-500 to-yellow-600",
    description: "Cryptocurrencies like Bitcoin can be very volatile (prices go up and down a lot). Stablecoins are different – they are designed to keep a stable value, often pegged 1-to-1 with a real-world currency like the US Dollar (e.g., USDC, USDT, DAI). This makes them super useful for trading, lending, and earning predictable interest in DeFi.",
    passiveIncomeFocus: "Many DeFi passive income strategies, especially in lending or providing liquidity, involve stablecoins because they offer more predictable returns without the extreme price swings of other cryptos.",
    keyTakeaways: [
      "Stablecoins aim for price stability, often pegged to fiat currencies.",
      "They are essential for reducing volatility in DeFi transactions.",
      "Common examples: USDC, USDT, DAI."
    ],
    nextSteps: ["Dive into 'Lending & Borrowing' to see how stablecoins can earn you interest."],
    estimatedTime: "Approx. 30 mins",
  },
  {
    id: "lending",
    icon: <MessageCircle className="h-8 w-8 text-white" />,
    title: "Module 5: Earn by Lending, Grow by Borrowing",
    videoTitle: "DeFi Lending & Borrowing: Make Your Crypto Work for You",
    objective: "Explore platforms like Aave and Compound for passive income or loans.",
    bgColor: "from-rose-500 to-red-600",
    description: "DeFi lending platforms let you: \n- **Lend:** Deposit your crypto (especially stablecoins) and earn interest from borrowers. It's like a savings account but often with better rates! \n- **Borrow:** Use your existing crypto as collateral (a security deposit) to borrow other crypto assets. \nPlatforms like Aave and Compound are popular for this.",
    passiveIncomeFocus: "Lending is one of the most straightforward ways to earn passive income in DeFi. You deposit your assets and earn interest over time. The rates can vary but are often higher than traditional savings accounts.",
    keyTakeaways: [
      "Lend crypto to earn interest.",
      "Borrow crypto by providing collateral.",
      "Interest rates are determined by supply and demand.",
      "Always be aware of collateralization ratios and liquidation risks when borrowing."
    ],
    nextSteps: ["Discover 'Decentralized Exchanges (DEXs)' for trading assets."],
    estimatedTime: "Approx. 1 hour",
  },
  {
    id: "dexs",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    title: "Module 6: Trading Without the Middleman - DEXs",
    videoTitle: "Decentralized Exchanges (DEXs): Swap Tokens Peer-to-Peer",
    objective: "Understand how DEXs like Uniswap facilitate trading.",
    bgColor: "from-cyan-500 to-teal-600",
    description: "Decentralized Exchanges (DEXs) let you trade cryptocurrencies directly from your wallet without needing a company like Coinbase or Binance to hold your funds. They use smart contracts (often called AMMs - Automated Market Makers) to make trades happen. Uniswap and PancakeSwap are famous examples.",
    passiveIncomeFocus: "While direct trading isn't passive, DEXs are crucial for acquiring tokens needed for other passive income strategies. Also, you can earn passive income by providing liquidity to DEXs (covered next!).",
    keyTakeaways: [
      "DEXs enable peer-to-peer token swaps.",
      "You always keep custody of your funds.",
      "AMMs use liquidity pools instead of traditional order books."
    ],
    nextSteps: ["Learn about 'Liquidity Pools & Yield Farming' – a major passive income source."],
    estimatedTime: "Approx. 45 mins",
  },
  {
    id: "liquidity",
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: "Module 7: Fueling DeFi - Liquidity Pools & Yield Farming",
    videoTitle: "Become a Liquidity Provider & Farm High Yields",
    objective: "Learn how to provide liquidity and earn rewards.",
    bgColor: "from-fuchsia-500 to-pink-600",
    description: "Liquidity Pools are like big pots of tokens that DEXs use to enable trading. Users (like you!) can deposit pairs of tokens into these pools (e.g., ETH and USDC) and become Liquidity Providers (LPs). \n**Yield Farming:** As an LP, you earn trading fees. Often, you can take your 'LP tokens' (proof of your deposit) and 'stake' them elsewhere to earn even MORE rewards (this is yield farming!).",
    passiveIncomeFocus: "Providing liquidity and yield farming can offer very attractive returns (APYs). You earn from trading fees and often bonus tokens from the protocol. It's a core passive income strategy in DeFi.",
    keyTakeaways: [
      "Liquidity pools enable trading on DEXs.",
      "Provide liquidity to earn trading fees and LP tokens.",
      "Yield farming involves staking LP tokens (or other tokens) for extra rewards."
    ],
    nextSteps: ["Understand the risks involved, especially 'Impermanent Loss'."],
    estimatedTime: "Approx. 1.5 hours",
  },
  {
    id: "impermanent_loss",
    icon: <Brain className="h-8 w-8 text-white" />,
    title: "Module 8: The Catch - Impermanent Loss & Risks",
    videoTitle: "DeFi Risks: Understanding Impermanent Loss & Staying Safe",
    objective: "Grasp key DeFi risks, especially Impermanent Loss.",
    bgColor: "from-orange-500 to-red-700",
    description: "**Impermanent Loss (IL):** This is a tricky risk when you're a Liquidity Provider. If the prices of the two tokens you deposited change a lot relative to each other, the value of your share in the pool might be less than if you had just held those tokens separately. It's 'impermanent' because it only becomes a real loss if you withdraw your funds. Trading fees can sometimes offset IL. \nOther risks: Smart contract bugs, scams ('rug pulls').",
    passiveIncomeFocus: "Understanding Impermanent Loss is CRITICAL for anyone providing liquidity. High APYs often come with higher IL risk. You need to weigh the potential rewards against this and other risks.",
    keyTakeaways: [
      "Impermanent Loss can reduce the value of your liquidity position.",
      "It's more significant when token prices diverge greatly.",
      "Always research projects thoroughly (DYOR - Do Your Own Research) to avoid scams."
    ],
    nextSteps: ["Explore 'Governance & DAOs' to see how DeFi projects are managed."],
    estimatedTime: "Approx. 1 hour",
  },
  {
    id: "governance",
    icon: <Users2 className="h-8 w-8 text-white" />,
    title: "Module 9: Having a Say - Governance & DAOs",
    videoTitle: "DAOs & Governance: How DeFi is Ruled by Communities",
    objective: "Discover how DAOs and governance tokens work.",
    bgColor: "from-violet-500 to-purple-700",
    description: "Many DeFi projects are run by DAOs (Decentralized Autonomous Organizations). Think of them like online communities where decisions are made by voting. Often, holding a project's 'governance token' gives you voting rights on proposals, like how the protocol should be upgraded or how treasury funds should be spent.",
    passiveIncomeFocus: "While not direct passive income, participating in governance can influence protocols in ways that might benefit your investments. Some protocols also reward active voters or stakers of governance tokens.",
    keyTakeaways: [
      "DAOs enable community-led governance of DeFi projects.",
      "Governance tokens often grant voting power.",
      "Participation can shape the future of a protocol."
    ],
    nextSteps: ["Look at 'DeFi Trends & the Future' to see what's next."],
    estimatedTime: "Approx. 45 mins",
  },
  {
    id: "future_trends",
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Module 10: What's Next? DeFi Trends & Your Journey",
    videoTitle: "The Horizon of DeFi: Innovations & Your Path Forward",
    objective: "Explore upcoming DeFi innovations and how to continue learning.",
    bgColor: "from-lime-500 to-green-700",
    description: "DeFi is always evolving! New trends include Layer 2 solutions (for faster, cheaper transactions), real-world asset tokenization, more advanced derivatives, and increasing focus on user experience and security. Your learning journey doesn't end here – stay curious, keep researching, and always practice safe DeFi!",
    passiveIncomeFocus: "Staying updated on new trends can help you identify emerging passive income opportunities early. The DeFi space moves fast, so continuous learning is key to adapting your strategies.",
    keyTakeaways: [
      "DeFi is rapidly evolving with new technologies and use cases.",
      "Layer 2s, RWAs, and better UX are key areas of development.",
      "Continuous learning and cautious exploration are vital for success."
    ],
    nextSteps: ["Revisit earlier modules, explore the DeFi Wiki, and start practicing with small amounts on reputable platforms."],
    estimatedTime: "Approx. 30 mins",
  },
];
