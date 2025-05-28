import React from "react";
import { Lightbulb } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-primary p-2 rounded-md">
              <Lightbulb className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">
              DeFi<span className="text-gradient">Strategies</span>
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <span className="text-sm text-muted-foreground">© 2025 DeFiStrategies. All rights reserved.</span>
            <span className="text-sm text-muted-foreground">Educational content only. Not financial advice.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;