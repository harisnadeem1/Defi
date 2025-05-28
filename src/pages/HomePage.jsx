import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getStrategies } from "@/lib/data";
import StrategyCard from "@/components/StrategyCard";
import SubscriptionModal from "@/components/SubscriptionModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Network, Zap, Shield, Activity, Settings, Layers, Bitcoin, DollarSign, Sun, Droplets, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import allLogo from "../assets/blockchain_logos/all.png";
import ethLogo from "../assets/blockchain_logos/Ethereum.png";
import polyLogo from "../assets/blockchain_logos/Polygon.png";
import bnbLogo from "../assets/blockchain_logos/bnb.png";
import solLogo from "../assets/blockchain_logos/solana.png";
import avalLogo from "../assets/blockchain_logos/avalanche.png";
import arbLogo from "../assets/blockchain_logos/arbitrum.png";
import opLogo from "../assets/blockchain_logos/optimism.png";
import fanLogo from "../assets/blockchain_logos/fantom.png";








const topBlockchains = [
  { name: "All Chains", value: "all", icon: allLogo },
  { name: "Ethereum", value: "Ethereum", icon: ethLogo },
  { name: "Polygon", value: "Polygon", icon: polyLogo},
  { name: "BNB Chain", value: "BNB Chain", icon: bnbLogo },
  { name: "Solana", value: "Solana", icon: solLogo },
  { name: "Avalanche", value: "Avalanche", icon: avalLogo },
  { name: "Arbitrum", value: "Arbitrum", icon: arbLogo },
  { name: "Optimism", value: "Optimism", icon: opLogo },
  { name: "Fantom", value: "Fantom", icon: fanLogo },
];


const HomePage = () => {
  const [activeRiskTab, setActiveRiskTab] = useState("all");
  const [activeChainTab, setActiveChainTab] = useState("all");
  const [currentStrategies, setCurrentStrategies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); 
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedStrategyForUnlock, setSelectedStrategyForUnlock] = useState(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const updateUserSubscriptionStatus = useCallback(() => {
    try {
      const userString = localStorage.getItem("currentUser");
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      } else {
        setCurrentUser(null); 
      }
    } catch (error) {
      setCurrentUser(null); 
    }
  }, []);

  useEffect(() => {
    setCurrentStrategies(getStrategies());
    updateUserSubscriptionStatus(); 
    
    const handleStorageChange = (event) => {
      if (event.key === "currentUser" || event.key === null) { 
        updateUserSubscriptionStatus();
      }
      if (event.key === "strategies" || event.key === null) {
        setCurrentStrategies(getStrategies());
      }
    };
    
    const handleUserUpdate = () => { 
        updateUserSubscriptionStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userUpdated', handleUserUpdate);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [updateUserSubscriptionStatus]);
  
  const isUserSubscribed = currentUser ? !!currentUser.isSubscribed : false;

  const handleUnlockStrategy = (strategy) => {
    if (strategy.isSample) { // Samples are always viewable
      navigate(`/strategy/${strategy.id}`);
      return;
    }
    if (!currentUser) { 
      toast({
        title: "Login Required",
        description: "Please log in or register to subscribe and unlock strategies.",
        action: <Button onClick={() => navigate('/login')}>Login</Button>,
      });
      return;
    }
    setSelectedStrategyForUnlock(strategy);
    setIsSubscriptionModalOpen(true);
  };

  const filteredStrategies = currentStrategies.filter(strategy => {
    const riskMatch = activeRiskTab === "all" || strategy.risk === activeRiskTab;
    const chainMatch = activeChainTab === "all" || strategy.blockchain === activeChainTab;
    return riskMatch && chainMatch;
  });

  const onSubscriptionSuccess = () => {
    updateUserSubscriptionStatus(); 
    setIsSubscriptionModalOpen(false);
    toast({
        title: "Subscription Successful!",
        description: "All strategies are now unlocked. Happy exploring!",
        className: "bg-green-500 text-white",
    });
  };

  const renderStrategyGrid = (strategiesToRender) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {strategiesToRender.length > 0 ? strategiesToRender.map(strategy => (
        <StrategyCard 
            key={strategy.id} 
            strategy={strategy} 
            isSubscribed={isUserSubscribed} 
            onUnlock={handleUnlockStrategy}
        />
      )) : <p className="col-span-full text-center text-muted-foreground py-10">No strategies match your current filters.</p>}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="hero-gradient rounded-xl p-8 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          DeFi Strategies for Every Investor
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover step-by-step DeFi investment strategies. Filter by risk level and your favorite blockchain.
        </p>
        {!isUserSubscribed && (
           <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-2xl mx-auto text-sm">
            <Info className="inline-block h-5 w-5 mr-2 text-primary align-text-bottom"/>
            The first 3 strategies are free samples! <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setIsSubscriptionModalOpen(true)}>Subscribe now</Button> to unlock all strategies.
          </div>
        )}
      </motion.div>

      <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Filter by Blockchain</h2>
            <Tabs defaultValue="all" value={activeChainTab} onValueChange={setActiveChainTab}>
              <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
                {topBlockchains.map(chain => (
                  <TabsTrigger
                    key={chain.value}
                    value={chain.value}
                    className="flex items-center justify-center gap-1 text-xs sm:text-sm px-2 py-1.5 h-auto"
                  >
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                    />
                    <span>{chain.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>


      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Filter by Risk Level</h2>
        <Tabs defaultValue="all" value={activeRiskTab} onValueChange={setActiveRiskTab}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="all" className="flex items-center justify-center gap-1"><Layers className="h-4 w-4"/>All</TabsTrigger>
            <TabsTrigger value="low" className="flex items-center justify-center gap-1"><Shield className="h-4 w-4 text-emerald-500"/>Low</TabsTrigger>
            <TabsTrigger value="medium" className="flex items-center justify-center gap-1"><Activity className="h-4 w-4 text-amber-500"/>Medium</TabsTrigger>
            <TabsTrigger value="high" className="flex items-center justify-center gap-1"><Zap className="h-4 w-4 text-rose-500"/>High</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="mt-8">
        {renderStrategyGrid(filteredStrategies)}
      </div>

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          onSubscriptionSuccess={onSubscriptionSuccess}
          stripePublishableKey="YOUR_STRIPE_PUBLISHABLE_KEY" 
          stripePriceId="YOUR_STRIPE_PRICE_ID"
        />
      )}
    </div>
  );
};

export default HomePage;