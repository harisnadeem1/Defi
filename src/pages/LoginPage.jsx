import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Eye, EyeOff, Shield } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: error.message,
    });
    return;
  }

  // Get the user metadata
  const { user } = data;
  const username = user.user_metadata?.username || user.email;
  const role = user.user_metadata?.role || "user";

  toast({
    title: "Login Successful!",
    description: `Welcome back, ${username}!`,
  });

  window.dispatchEvent(new CustomEvent("userUpdated")); // trigger updates

  // Navigate based on role
  if (role === "admin" || role === "worker") {
    navigate("/admin");
  } else {
    navigate("/");
  }
};

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
                  required
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
                    required
                    className="bg-input/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full text-lg py-3">
                Log In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link to="/register">Sign up</Link>
              </Button>
            </p>
            <p className="text-sm text-muted-foreground">
              Admin/Worker?{" "}
              <Button variant="link" asChild className="p-0 h-auto">
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