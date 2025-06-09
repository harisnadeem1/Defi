import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { registerMattermostUser } from "../api/mattermostRegister";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Client-side validation function
  const validateForm = () => {
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      });
      return false;
    }

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 8 characters long.",
      });
      return false;
    }

    if (/[^a-zA-Z0-9_]/.test(username)) {
      toast({
        variant: "destructive",
        title: "Invalid Username",
        description: "Only letters, numbers, and underscores are allowed.",
      });
      return false;
    }

    if (username.length < 3) {
      toast({
        variant: "destructive",
        title: "Invalid Username",
        description: "Username must be at least 3 characters long.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Early validation to prevent unnecessary API calls
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Register user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role: "user",
            is_subscribed: false,
          },
        },
      });

      if (authError) {
        throw new Error(`Registration failed: ${authError.message}`);
      }

      if (!authData?.user) {
        throw new Error("Failed to create user account");
      }

      const userId = authData.user.id;

      // Step 2: Parallel execution of profile creation and Mattermost registration
      const [profileResult, mattermostResult] = await Promise.allSettled([
        // Create profile in Supabase
        supabase.from("profiles").insert([
          {
            id: userId,
            email: email,
            username: username,
            role: "user",
            is_subscribed: false,
          },
        ]),
        // Register in Mattermost
        registerMattermostUser({ email, username, password })
      ]);

      // Handle profile creation result
      if (profileResult.status === "rejected") {
        console.error("Profile creation failed:", profileResult.reason);
        throw new Error(`Profile creation failed: ${profileResult.reason?.message || "Unknown error"}`);
      }

      if (profileResult.value?.error) {
        throw new Error(`Profile creation failed: ${profileResult.value.error.message}`);
      }

      // Handle Mattermost registration result
      let mattermostData = null;
      if (mattermostResult.status === "fulfilled") {
        mattermostData = mattermostResult.value;
      } else {
        console.warn("Mattermost registration failed:", mattermostResult.reason);
        // Don't fail the entire registration if Mattermost fails
        toast({
          variant: "default",
          title: "Partial Registration",
          description: "Account created but chat integration failed. You can still use the platform.",
        });
      }

      // Step 3: Update profile with Mattermost data (if available)
      if (mattermostData?.mattermost_user_id) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            mattermost_user_id: mattermostData.mattermost_user_id,
            mattermost_token: mattermostData.mattermost_token,
          })
          .eq("id", userId);

        if (updateError) {
          console.warn("Failed to update profile with Mattermost data:", updateError);
          // Don't fail registration for this
        }
      }

      // Success!
      toast({
        title: "Registration Successful!",
        description: "Please check your email to confirm your account.",
      });

      // Clear form
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to login
      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md shadow-2xl glass-effect">
          <CardHeader className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join our community of DeFi enthusiasts!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username (3+ chars)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  minLength={3}
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  minLength={8}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-7 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  minLength={8}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-7 h-7 w-7"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                type="submit" 
                className="w-full mt-6 text-lg py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <p className="text-muted-foreground w-full">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-semibold text-primary hover:underline"
                onClick={(e) => isLoading && e.preventDefault()}
              >
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;