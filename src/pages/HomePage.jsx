import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getStrategies } from "@/lib/data";
import StrategyCard from "@/components/StrategyCard";
import SubscriptionModal from "@/components/SubscriptionModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Activity, Zap, Layers, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

// Logos
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
  { name: "Polygon", value: "Polygon", icon: polyLogo },
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

  const fetchCurrentUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const userId = session.user.id;
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile) {
        setCurrentUser(profile);
      } else {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    setCurrentStrategies(getStrategies());
    fetchCurrentUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchCurrentUser();
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [fetchCurrentUser]);

  const isUserSubscribed = currentUser?.is_subscribed || false;

  const handleUnlockStrategy = (strategy) => {
    if (strategy.isSample) {
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
    fetchCurrentUser();
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
      )) : (
        <p className="col-span-full text-center text-muted-foreground py-10">
          No strategies match your current filters.
        </p>
      )}
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
            <Info className="inline-block h-5 w-5 mr-2 text-primary align-text-bottom" />
            The first 3 strategies are free samples!{" "}
            <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setIsSubscriptionModalOpen(true)}>
              Subscribe now
            </Button>{" "}
            to unlock all strategies.
          </div>
        )}
      </motion.div>

  <div className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-center">Filter by Blockchain</h2>
  <Tabs defaultValue="all" value={activeChainTab} onValueChange={setActiveChainTab}>
    <div className="w-full overflow-x-auto md:overflow-visible flex justify-start md:justify-center">
      <TabsList className="inline-flex gap-2 px-2 py-2 bg-muted rounded-lg min-w-max md:min-w-0">
        {topBlockchains.map(chain => (
          <TabsTrigger
            key={chain.value}
            value={chain.value}
            className="flex items-center gap-1 text-xs sm:text-sm px-3 py-1.5 whitespace-nowrap rounded-md"
          >
            <img
              src={chain.icon}
              alt={chain.name}
              className="w-4 h-4 object-contain"
            />
            <span>{chain.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  </Tabs>
</div>


   <div className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-center">Filter by Risk Level</h2>
  <Tabs defaultValue="all" value={activeRiskTab} onValueChange={setActiveRiskTab}>
    <div className="w-full overflow-x-auto flex justify-center">
      <TabsList className="inline-flex gap-2 px-2 py-2 bg-muted rounded-lg min-w-max">
        <TabsTrigger value="all" className="flex items-center gap-1 px-3 py-1.5 rounded-md">
          <Layers className="h-4 w-4" />All
        </TabsTrigger>
        <TabsTrigger value="low" className="flex items-center gap-1 px-3 py-1.5 rounded-md">
          <Shield className="h-4 w-4 text-emerald-500" />Low
        </TabsTrigger>
        <TabsTrigger value="medium" className="flex items-center gap-1 px-3 py-1.5 rounded-md">
          <Activity className="h-4 w-4 text-amber-500" />Medium
        </TabsTrigger>
        <TabsTrigger value="high" className="flex items-center gap-1 px-3 py-1.5 rounded-md">
          <Zap className="h-4 w-4 text-rose-500" />High
        </TabsTrigger>
      </TabsList>
    </div>
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
