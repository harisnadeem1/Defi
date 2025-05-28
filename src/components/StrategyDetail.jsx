import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, TrendingUp, Flame, Calendar, User, Target, Lock, Unlock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { getStrategyById } from "@/lib/data";
import SubscriptionModal from "@/components/SubscriptionModal";
import { useToast } from "@/components/ui/use-toast";

const riskIcons = {
  low: <Shield className="h-5 w-5 text-emerald-400" />,
  medium: <TrendingUp className="h-5 w-5 text-amber-400" />,
  high: <Flame className="h-5 w-5 text-rose-400" />
};

const riskLabels = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk"
};

const StrategyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [strategy, setStrategy] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); 
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

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
    const fetchedStrategy = getStrategyById(id);
    setStrategy(fetchedStrategy);
    updateUserSubscriptionStatus(); 

    const handleStorageChange = (event) => {
      if (event.key === "currentUser" || event.key === null) {
        updateUserSubscriptionStatus();
      }
      if (event.key === "strategies" || event.key === null) {
         const updatedStrategy = getStrategyById(id);
         setStrategy(updatedStrategy);
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
  }, [id, updateUserSubscriptionStatus]);

  const isUserSubscribed = currentUser ? !!currentUser.isSubscribed : false;
  
  const effectivelyUnlocked = strategy && (isUserSubscribed || strategy.isSample);


  const handleUnlockRequest = () => {
    if (strategy && strategy.isSample) { // Should not be called for samples
        return;
    }
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in or register to subscribe and unlock strategies.",
        action: <Button onClick={() => navigate('/login')}>Login</Button>,
      });
    } else {
      setIsSubscriptionModalOpen(true);
    }
  };
  
  const onSubscriptionSuccess = () => {
    updateUserSubscriptionStatus(); 
    setIsSubscriptionModalOpen(false);
     toast({
        title: "Subscription Successful!",
        description: "Strategy unlocked. Happy exploring!",
        className: "bg-green-500 text-white",
    });
  };


  if (!strategy) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Strategy not found</h2>
        <Button onClick={() => navigate("/strategies")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Strategies
        </Button>
      </div>
    );
  }

  if (!effectivelyUnlocked) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto bg-card p-8 rounded-xl shadow-xl border border-primary/30"
        >
          <Lock className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-gradient">{strategy.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            This strategy is currently locked. Subscribe to gain full access to this and all other premium strategies.
          </p>
          <div className="space-y-4">
            <Button onClick={handleUnlockRequest} size="lg" className="w-full gap-2">
              <Unlock className="h-5 w-5" />
              Unlock Full Strategy ($100)
            </Button>
            <Button variant="outline" onClick={() => navigate("/strategies")} className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Strategies
            </Button>
          </div>
        </motion.div>
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
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/strategies")} 
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Strategies
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-xl border shadow-lg risk-${strategy.risk} glass-effect relative`}
      >
        {strategy.isSample && !isUserSubscribed && (
            <Badge variant="default" className="absolute top-4 right-4 z-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 text-sm font-semibold shadow-lg">
                <Eye className="h-4 w-4 mr-1.5"/> Free Sample
            </Badge>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">{strategy.title}</h1>
          <Badge variant={strategy.risk} className="flex items-center gap-1 text-base px-3 py-1">
            {riskIcons[strategy.risk]}
            {riskLabels[strategy.risk]}
          </Badge>
        </div>

        <p className="text-lg text-muted-foreground mb-8">{strategy.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Return</p>
              <p className="font-medium">{strategy.expectedReturn}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Frame</p>
              <p className="font-medium">{strategy.timeFrame}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created By</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                   <AvatarImage src={strategy.authorAvatar} alt={strategy.author} />
                  <AvatarFallback>{strategy.author ? strategy.author.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{strategy.author}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div>
          <h2 className="text-2xl font-bold mb-6">Step-by-Step Guide</h2>
          
          <div className="space-y-8">
            {strategy.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/30 backdrop-blur-sm border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    {step.tip && (
                      <div className="bg-primary/10 border border-primary/30 rounded-md p-4 mt-3">
                        <p className="text-sm font-medium text-primary">💡 Tip: <span className="font-normal text-foreground">{step.tip}</span></p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
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

export default StrategyDetail;