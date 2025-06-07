import React from "react";
import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Top section: Logo and Menu */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo with link to home */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-md">
              <Lightbulb className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">
              DeFi<span className="text-gradient">Strategies</span>
            </span>
          </Link>

          {/* Menu links */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-muted-foreground text-left md:text-left mt-4 md:mt-0">
  <Link to="/legal/terms-of-service">Terms of Service</Link>
  <Link to="/legal/privacy-policy">Privacy Policy</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/legal/about">About Us</Link>
  <Link to="/legal/cookies">Cookies</Link>

</div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 text-sm text-muted-foreground text-center md:text-left">
          © 2025 DeFiStrategies. All rights reserved. | Educational content only. Not financial advice.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
