import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, LogIn, UserPlus, UserCircle, LogOut, ShieldCheck, MessagesSquare, BookOpen, Home, Compass, BookMarked } from "lucide-react"; // Added BookMarked for Wiki
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserState = useCallback(() => {
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
    updateUserState(); 

    const handleStorageChange = (event) => {
      if (event.key === "currentUser" || event.key === null) { 
        updateUserState();
      }
    };

    const handleUserUpdate = () => {
      updateUserState();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userUpdated', handleUserUpdate); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [updateUserState]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); 
    window.dispatchEvent(new CustomEvent('userUpdated')); 
    navigate("/login");
  };
  
  const navLinkClasses = (path) => {
    return location.pathname === path ? "text-primary font-semibold" : "";
  };

  const isAdminOrWorker = currentUser && currentUser.role && (currentUser.role === 'admin' || currentUser.role === 'worker');

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="flex items-center gap-2">
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
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                     <AvatarFallback>{currentUser.username ? currentUser.username.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U')}</AvatarFallback>
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
                <div className="md:hidden">
                  <DropdownMenuItem onClick={() => navigate("/")} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" /> Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/strategies")} className="cursor-pointer">
                    <Compass className="mr-2 h-4 w-4" /> Strategies
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/learn-defi")} className="cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" /> Learn DeFi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/wiki")} className="cursor-pointer"> {/* Wiki for mobile */}
                    <BookMarked className="mr-2 h-4 w-4" /> DeFi Wiki
                  </DropdownMenuItem>
                  {currentUser && ( 
                    <DropdownMenuItem onClick={() => navigate("/chat")} className="cursor-pointer">
                      <MessagesSquare className="mr-2 h-4 w-4" /> Community
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                </div>
                {isAdminOrWorker && (
                  <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default Header;