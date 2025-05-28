import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Star, CreditCard } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from "@/lib/supabaseClient";

const SubscriptionModal = ({ isOpen, onClose, onSubscriptionSuccess, stripePublishableKey, stripePriceId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setCurrentUser(profile);
      } else {
        setCurrentUser(null);
      }
    };
    if (isOpen) fetchUser();
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

    if (!stripePublishableKey || !stripePriceId || stripePublishableKey === "YOUR_STRIPE_PUBLISHABLE_KEY") {
      toast({
        variant: "destructive",
        title: "Stripe Not Configured",
        description: "Stripe is not yet configured by the admin.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const stripe = await loadStripe(stripePublishableKey);
      if (!stripe) throw new Error("Stripe.js failed to load.");

      await stripe.redirectToCheckout({
        lineItems: [{ price: stripePriceId, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/strategies?subscription_success=true`,
        cancelUrl: `${window.location.origin}/strategies?subscription_cancelled=true`,
        customerEmail: currentUser.email,
        clientReferenceId: currentUser.id.toString(),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: error.message || "Could not initiate subscription.",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleRedirectAfterPayment = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("subscription_success") === "true" && currentUser) {
        await supabase
          .from("profiles")
          .update({ is_subscribed: true })
          .eq("id", currentUser.id);

        if (onSubscriptionSuccess) onSubscriptionSuccess();

        toast({
          title: "Subscription Successful",
          description: "Thank you for subscribing!",
        });

        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (queryParams.get("subscription_cancelled") === "true") {
        toast({
          title: "Subscription Cancelled",
          description: "You cancelled the subscription process.",
        });

        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    handleRedirectAfterPayment();
  }, [currentUser, onSubscriptionSuccess, toast]);

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
            <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
            <p><strong>Premium Content:</strong> Full access to all expert DeFi strategies.</p>
          </div>
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
            <p><strong>Lifetime Updates:</strong> Future strategy updates included.</p>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-blue-500 mt-0.5" />
            <p><strong>Secure Payment:</strong> Powered by Stripe.</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Maybe Later
          </Button>
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 text-white text-lg px-8 py-6"
          >
            {isLoading ? "Processing..." : "Subscribe Now ($100)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
