import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Flame, Layers, Lock, Unlock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const riskIcons = {
  low: <Shield className="h-4 w-4 text-emerald-400" />,
  medium: <TrendingUp className="h-4 w-4 text-amber-400" />,
  high: <Flame className="h-4 w-4 text-rose-400" />
};

const riskLabels = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk"
};

const getChainColor = (chainName) => {
  if (!chainName) return "bg-gray-600";
  let hash = 0;
  for (let i = 0; i < chainName.length; i++) {
    hash = chainName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  const hexColor = "00000".substring(0, 6 - color.length) + color;
  
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness > 125) {
      return `bg-gradient-to-r from-slate-700 to-slate-600`;
  }
  return `bg-gradient-to-r from-[#${hexColor}] to-[#${color.substring(0,4)}AA]`;
};


const StrategyCard = ({ strategy, isSubscribed, onUnlock }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);

  const effectivelyUnlocked = (currentUser?.is_subscribed ?? isSubscribed) || strategy.is_sample;



useEffect(() => {
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_subscribed")
      .eq("id", user.id)
      .single();

    if (profile) {
      setCurrentUser({ ...user, is_subscribed: profile.is_subscribed });
    } else {
      setCurrentUser({ ...user, is_subscribed: false });
    }
  };
  fetchUser();
}, []);

  const handleViewStrategy = () => {
    if (effectivelyUnlocked) {
      navigate(`/strategy/${strategy.id}`);
    } 
    else {
      if (!currentUser) {
        toast({
          title: "Login Required",
          description: "Please log in to unlock strategies.",
          action: <Button onClick={() => navigate('/login')}>Login</Button>,
        });
      } else {
        if (onUnlock) {
          onUnlock(strategy); 
        } else {
          toast({
            title: "Subscription Required",
            description: "Unlock this strategy and get access to all strategies by subscribing.",
          });
        }
      }
    }
  };

  const chainColorClass = getChainColor(strategy.blockchain);

  return (
    <motion.div
      className={`strategy-card risk-${strategy.risk} flex flex-col p-5 rounded-xl shadow-lg border border-border/20 relative overflow-hidden bg-card hover:shadow-primary/10 transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {!effectivelyUnlocked && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4">
          <Lock className="h-12 w-12 text-primary mb-4" />
          <p className="text-primary-foreground text-center font-semibold mb-3">Strategy Locked</p>
          <Button onClick={handleViewStrategy} size="sm" className="gap-1 group text-xs bg-primary hover:bg-primary/90">
            <Unlock className="h-3.5 w-3.5"/>
            Unlock Strategy
          </Button>
        </div>
      )}

     {strategy.is_sample && !isSubscribed && (
  <Badge
    variant="default"
    className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 text-xs font-semibold shadow-md flex items-center rounded-none"
  >
    <Eye className="h-3.5 w-3.5 mr-1" /> Free Sample
  </Badge>
)}

      <div className="flex justify-between items-start mb-3">
        <Badge variant={strategy.risk} className="flex items-center gap-1 text-xs py-0.5 px-2">
          {riskIcons[strategy.risk]}
          {riskLabels[strategy.risk]}
        </Badge>
        {strategy.blockchain && (
           <Badge className={`flex items-center gap-1 text-xs py-0.5 px-2 text-white ${chainColorClass}`}>
            <Layers className="h-3 w-3" /> 
            {strategy.blockchain}
          </Badge>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-1.5 text-card-foreground">{strategy.title}</h3>
      
      {effectivelyUnlocked ? (
        <>
          <p className="text-sm text-muted-foreground mb-3 flex-grow">{strategy.description}</p>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Expected Return:</span>
              <span className="font-medium text-primary">{strategy.expectedReturn}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Time Frame:</span>
              <span className="font-medium">{strategy.timeFrame}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Added:</span>
              <span className="font-medium">
  {new Date(strategy.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
</span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground mb-3 flex-grow">
          Unlock full details, expected returns, and step-by-step guides for this strategy.
        </p>
      )}
      
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/20">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border-2 border-border">
            <AvatarImage src={strategy.authorAvatar} alt={strategy.author} />
            <AvatarFallback>{strategy.author ? strategy.author.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">{strategy.author}</span>
        </div>
        
        <Button onClick={handleViewStrategy} size="sm" className="gap-1 group text-xs">
            {effectivelyUnlocked ? "View Strategy" : "Unlock Details"}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Button>

      </div>
    </motion.div>
  );
};

export default StrategyCard;