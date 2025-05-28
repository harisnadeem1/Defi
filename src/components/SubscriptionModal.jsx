import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Zap, ShieldCheck, Star, CreditCard } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const SubscriptionModal = ({ isOpen, onClose, onSubscriptionSuccess, stripePublishableKey, stripePriceId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [isOpen]);

  const handleSubscribe = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in or register to subscribe.",
        action: <Button onClick={() => { onClose(); navigate('/login'); }}>Login</Button>,
      });
      return;
    }

    if (!stripePublishableKey || stripePublishableKey === "YOUR_STRIPE_PUBLISHABLE_KEY" || !stripePriceId || stripePriceId === "YOUR_STRIPE_PRICE_ID") {
        toast({
            variant: "destructive",
            title: "Stripe Not Configured",
            description: "Stripe is not yet configured by the admin. Please check back later.",
        });
        return;
    }
    
    setIsLoading(true);
    try {
      const stripe = await loadStripe(stripePublishableKey);
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: stripePriceId, quantity: 1 }],
        mode: 'payment', // Use 'payment' for one-time purchases
        successUrl: `${window.location.origin}/strategies?subscription_success=true`, // Redirect back to strategies page
        cancelUrl: `${window.location.origin}/strategies?subscription_cancelled=true`,
        customerEmail: currentUser.email, // Pre-fill email if available
        clientReferenceId: currentUser.id.toString(), // Associate checkout with user ID
      });

      if (error) {
        console.error("Stripe Checkout error:", error);
        toast({
          variant: "destructive",
          title: "Subscription Failed",
          description: error.message || "An unexpected error occurred. Please try again.",
        });
        setIsLoading(false);
      }
      // If redirectToCheckout is successful, the user is redirected to Stripe.
      // The success/cancel URLs will handle the post-payment logic.
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: error.message || "Could not initiate subscription. Please try again.",
      });
      setIsLoading(false);
    }
  };
  
  // This effect handles the redirect from Stripe
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("subscription_success") === "true") {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        const updatedUser = { ...user, isSubscribed: true };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Update user in 'users' array as well
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = allUsers.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          allUsers[userIndex] = updatedUser;
          localStorage.setItem("users", JSON.stringify(allUsers));
        }
        window.dispatchEvent(new CustomEvent('userUpdated'));
      }
      // Call onSubscriptionSuccess which is passed from parent (HomePage or StrategyDetail)
      if(onSubscriptionSuccess) onSubscriptionSuccess(); 
      
      // Clean up query params
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else if (queryParams.get("subscription_cancelled") === "true") {
       toast({
        title: "Subscription Cancelled",
        description: "Your subscription process was cancelled. You can try again anytime.",
      });
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

  }, [onSubscriptionSuccess, toast]);


  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-card border-primary/30 shadow-2xl glass-effect">
        <DialogHeader className="items-center text-center">
          <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
            <Zap className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-bold text-gradient">Unlock All Strategies!</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2 text-base">
            For a one-time payment of <span className="font-bold text-primary">$100</span>, get lifetime access to every strategy on our platform.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 px-2 space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <p><span className="font-semibold">Premium Content:</span> Access detailed guides, risk assessments, and expert insights for all strategies.</p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
            <p><span className="font-semibold">All Future Updates:</span> Your one-time payment includes access to all new strategies added in the future.</p>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <p><span className="font-semibold">Secure Payment:</span> Processed securely through Stripe. We don't store your card details.</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Maybe Later
          </Button>
          <Button 
            onClick={handleSubscribe} 
            disabled={isLoading} 
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground text-lg px-8 py-6"
          >
            {isLoading ? "Processing..." : "Subscribe Now ($100)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;