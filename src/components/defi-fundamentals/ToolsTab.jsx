import React from "react";
import { motion } from "framer-motion";
import { Wrench, ExternalLink } from 'lucide-react';
import { defiTools, categoryOrder } from "@/data/defiToolsData";

const ToolsTab = () => {
  const categorizedTools = defiTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-xl shadow-xl bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900 text-white glass-effect"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <Wrench className="h-16 w-16 mb-6 text-primary" />
        <h2 className="text-3xl font-bold mb-4">Essential DeFi Tools & Resources</h2>
        <p className="text-lg mb-3 max-w-3xl mx-auto">
          Navigate the DeFi landscape with confidence using this curated list of essential tools for security, analytics, portfolio management, and more.
        </p>
      </div>
      
      <div className="space-y-10">
        {categoryOrder.map(categoryName => {
          const toolsInCategory = categorizedTools[categoryName];
          if (!toolsInCategory || toolsInCategory.length === 0) return null;
          
          return (
            <section key={categoryName}>
              <h3 className="text-2xl font-semibold text-primary mb-6 border-b-2 border-primary/30 pb-2">
                {categoryName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolsInCategory.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95, y:10 }}
                    animate={{ opacity: 1, scale: 1, y:0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col backdrop-blur-sm border border-white/20"
                  >
                    <div className="flex items-center mb-3">
                      {tool.icon}
                      <h4 className="text-lg font-semibold text-primary-foreground ml-2">{tool.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{tool.description}</p>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center mt-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
                    >
                      Visit Tool <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

       <p className="text-center text-sm text-muted-foreground mt-12 pt-6 border-t border-white/20">
        Disclaimer: Always do your own research (DYOR) before connecting your wallet to any third-party tool or dApp. These links are provided for informational purposes only. We are not affiliated with and do not endorse any specific tool listed.
      </p>
    </motion.div>
  );
};

export default ToolsTab;