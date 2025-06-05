import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, LogIn, UserPlus, UserCircle, LogOut, ShieldCheck, MessagesSquare, BookOpen, Home, Compass, BookMarked } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabaseClient";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserProfile = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUserProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        fetchUserProfile();
      }
    });

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, [fetchUserProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate("/login");
  };

  const navLinkClasses = (path) => {
    return location.pathname === path ? "text-primary font-semibold" : "";
  };

  const isAdminOrWorker = currentUser?.role === 'admin' || currentUser?.role === 'worker';

  return (
    <>
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <div className="container mx-auto px-4 py-4 flex items-center justify-between md:justify-between relative">

         <motion.div 
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
  className="flex items-center gap-4 md:gap-4 w-full md:w-auto justify-center md:justify-start"
>
  {/* Hamburger icon only on mobile */}
  <button
    className="absolute left-4 md:hidden"
    onClick={() => setMobileMenuOpen(true)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  {/* Logo always centered on mobile */}
  <Link to="/" className="flex items-center gap-2 mx-auto md:mx-0">
    <div className="bg-primary p-2 rounded-md">
      <Lightbulb className="h-6 w-6 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold">
      DeFi<span className="text-gradient">Strategies</span>
    </span>
  </Link>
</motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="hidden md:flex items-center gap-1"
          >
            <Button variant="ghost" asChild className={navLinkClasses("/")}>
              <Link to="/" className="gap-1">
                <Home className="h-4 w-4" /> Home
              </Link>
            </Button>
            <Button variant="ghost" asChild className={navLinkClasses("/strategies")}>
              <Link to="/strategies" className="gap-1">
                <Compass className="h-4 w-4" /> Strategies
              </Link>
            </Button>
            <Button variant="ghost" asChild className={navLinkClasses("/learn-defi")}>
              <Link to="/learn-defi" className="gap-1">
                <BookOpen className="h-4 w-4" /> Learn DeFi
              </Link>
            </Button>
            <Button variant="ghost" asChild className={navLinkClasses("/wiki")}>
              <Link to="/wiki" className="gap-1">
                <BookMarked className="h-4 w-4" /> DeFi Wiki
              </Link>
            </Button>
            {currentUser && (
              <Button variant="ghost" asChild className={navLinkClasses("/chat")}>
                <Link to="/chat" className="gap-1">
                  <MessagesSquare className="h-4 w-4" /> Community
                </Link>
              </Button>
            )}
          </motion.nav>

          {currentUser ? (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {currentUser.username
              ? currentUser.username.charAt(0).toUpperCase()
              : currentUser.email
              ? currentUser.email.charAt(0).toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">Logged in as</p>
          <p className="text-xs leading-none text-muted-foreground truncate">
            {currentUser.username || currentUser.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {isAdminOrWorker && (
        <DropdownMenuItem
          onClick={() => navigate("/admin")}
          className="cursor-pointer"
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          <span>Admin Panel</span>
        </DropdownMenuItem>
      )}
      <DropdownMenuItem
        onClick={() => navigate("/profile")}
        className="cursor-pointer"
      >
        <UserCircle className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={handleLogout}
        className="cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  <div className="hidden md:flex gap-2">
    <Button variant="outline" asChild>
      <Link to="/login" className="gap-1">
        <LogIn className="h-4 w-4" /> Log In
      </Link>
    </Button>
    <Button asChild>
      <Link to="/register" className="gap-1">
        <UserPlus className="h-4 w-4" /> Register
      </Link>
    </Button>
  </div>
)}

        </div>
      </header>

      {/* Mobile Slide Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-black text-white p-6 flex flex-col justify-between shadow-lg">

            <div>
              <button onClick={() => setMobileMenuOpen(false)} className="mb-4 text-lg font-bold">
                ✕
              </button>
              <nav className="flex flex-col gap-4 text-sm">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>
                <Link to="/strategies" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Compass className="h-4 w-4" /> Strategies
                </Link>
                <Link to="/learn-defi" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Learn DeFi
                </Link>
                <Link to="/wiki" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4" /> DeFi Wiki
                </Link>
                {currentUser && (
                  <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <MessagesSquare className="h-4 w-4" /> Community
                  </Link>
                )}
              </nav>
            </div>
            <div className="pt-6 border-t mt-6">
              {currentUser ? (
                <>
                  <button onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }} className="flex items-center gap-2 mb-2">
                    <UserCircle className="h-4 w-4" /> Profile
                  </button>
                  {isAdminOrWorker && (
                    <button onClick={() => { navigate("/admin"); setMobileMenuOpen(false); }} className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-4 w-4" /> Admin Panel
                    </button>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 mb-2">
                    <LogIn className="h-4 w-4" /> Log In
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" /> Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
