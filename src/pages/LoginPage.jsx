import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          return;
        }

        if (session?.user) {
          const role = session.user.user_metadata?.role || "user";
          
          // User is already logged in, redirect them
          if (role === "admin" || role === "worker") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkExistingSession();
  }, [navigate]);

  // Client-side validation
  const validateForm = useCallback(() => {
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Email is required.",
      });
      return false;
    }

    if (!password.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Password is required.",
      });
      return false;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  }, [email, password, toast]);

  // Optimized submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Early validation to prevent unnecessary API calls
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Handle specific error types with better messages
        let errorMessage = error.message;
        
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please check your email and click the confirmation link before logging in.";
        } else if (error.message.includes("Too many requests")) {
          errorMessage = "Too many login attempts. Please wait a moment and try again.";
        }

        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });
        return;
      }

      const { user } = data;
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Authentication failed. Please try again.",
        });
        return;
      }

      // Get user data efficiently
      const username = user.user_metadata?.username || user.email?.split('@')[0] || 'User';
      const role = user.user_metadata?.role || "user";

      // Clear form data on successful login
      setEmail("");
      setPassword("");

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${username}!`,
      });

      // Trigger global user update event
      window.dispatchEvent(new CustomEvent("userUpdated", { detail: { user, role } }));

      // Navigate based on role with replace to prevent back navigation
      if (role === "admin" || role === "worker") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error("Unexpected login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key in password field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  // Show loading spinner while checking existing session
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-blue-900/10 to-purple-900/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl glass-effect">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary p-3 rounded-full w-fit mb-4">
              <LogIn className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">Welcome Back!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="email"
                  className="bg-input/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    required
                    autoComplete="current-password"
                    className="bg-input/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full text-lg py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                asChild 
                className="p-0 h-auto"
                disabled={isLoading}
              >
                <Link to="/register">Sign up</Link>
              </Button>
            </p>
            <p className="text-sm text-muted-foreground">
              Admin/Worker?{" "}
              <Button 
                variant="link" 
                asChild 
                className="p-0 h-auto"
                disabled={isLoading}
              >
                <Link to="/admin-login" className="flex items-center gap-1">
                  <Shield className="h-4 w-4"/> Admin Login
                </Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;