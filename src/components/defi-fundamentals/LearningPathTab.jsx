import React from "react";
import { motion } from "framer-motion";
import { learningModules } from "@/data/defiLearningModules";
import { CheckCircle, ArrowRightCircle, Target, Info, DollarSign as PassiveIncomeIcon, AlertTriangle } from "lucide-react";

const LearningPathModule = ({ module, index, totalModules }) => {
  const isLastModule = index === totalModules - 1;

  return (
    <div className="flex flex-col sm:flex-row items-start">
      <div className="flex sm:flex-col items-center sm:mr-6 mb-4 sm:mb-0 w-full sm:w-auto justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`w-16 h-16 rounded-full ${module.bgColor} flex items-center justify-center shadow-lg mb-2`}
        >
          {React.cloneElement(module.icon, { className: "w-8 h-8 text-white" })}
        </motion.div>

        {/* Vertical connector for desktop */}
        {!isLastModule && (
          <div className="hidden sm:block w-1 bg-gradient-to-b from-slate-300 to-slate-200 h-full min-h-[100px] rounded-full" />
        )}

        {/* Horizontal connector for mobile */}
        {!isLastModule && (
          <div className="block sm:hidden h-1 w-16 bg-gradient-to-r from-slate-300 to-slate-200 rounded-full mt-2" />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        className="bg-card p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full border border-border mb-8"
      >
        <h2 className="text-2xl font-semibold text-primary mb-1">{module.title}</h2>
        <p className="text-sm text-muted-foreground mb-3">{module.objective}</p>

        <div className="mb-4 p-4 bg-gradient-to-r from-background to-slate-50/50 rounded-lg border border-dashed border-primary/30">
          <div className="flex items-center text-primary mb-2">
            <Info className="h-5 w-5 mr-2" />
            <h4 className="font-semibold">Module Overview</h4>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{module.description}</p>
        </div>

        {module.passiveIncomeFocus && (
          <div className="mb-4 p-4 bg-gradient-to-r from-background to-green-50/50 rounded-lg border border-dashed border-green-500/30">
            <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
              <PassiveIncomeIcon className="h-5 w-5 mr-2" />
              <h4 className="font-semibold">Passive Income Angle</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{module.passiveIncomeFocus}</p>
          </div>
        )}

        <div className="mb-4">
          <div className="flex items-center text-accent-foreground mb-2">
            <Target className="h-5 w-5 mr-2 text-blue-500" />
            <h4 className="font-semibold">Key Takeaways:</h4>
          </div>
          <ul className="list-none space-y-1 pl-0">
            {module.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start text-sm text-foreground/80">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                {takeaway}
              </li>
            ))}
          </ul>
        </div>

        {module.estimatedTime && (
          <p className="text-xs text-muted-foreground mb-3">
            Estimated time to complete: {module.estimatedTime}
          </p>
        )}

        <div className="mt-4 h-2.5 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${module.bgColor}`}
            initial={{ width: "0%" }}
            animate={{ width: "15%" }}
            transition={{ duration: 1, delay: index * 0.2 + 0.7 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right">
          Video Placeholder - 15% Complete
        </p>

        {!isLastModule && module.nextSteps && module.nextSteps.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex items-center text-accent-foreground mb-2">
              <ArrowRightCircle className="h-5 w-5 mr-2 text-indigo-500" />
              <h4 className="font-semibold">Next Steps:</h4>
            </div>
            <ul className="list-none space-y-1 pl-0">
              {module.nextSteps.map((step, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {module.id === "impermanent_loss" && (
          <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/30">
            <div className="flex items-center text-destructive mb-1">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <h4 className="font-semibold">Important Note on Risks</h4>
            </div>
            <p className="text-sm text-destructive/80 leading-relaxed">
              DeFi involves significant risks, including smart contract vulnerabilities and market
              volatility. Always Do Your Own Research (DYOR) and never invest more than you can
              afford to lose.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};



const LearningPathTab = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gradient mb-2">Your DeFi Learning Roadmap</h1>
        <p className="text-muted-foreground">
          Follow these modules step-by-step to build a strong foundation in Decentralized Finance and uncover passive income opportunities.
        </p>
      </div>
      <div className="relative">
        {learningModules.map((module, index) => (
          <LearningPathModule 
            key={module.id} 
            module={module} 
            index={index} 
            totalModules={learningModules.length} 
          />
        ))}
      </div>
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: learningModules.length * 0.2 + 0.5 }}
        className="mt-12 p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-xl text-center"
      >
        <h2 className="text-2xl font-semibold mb-2">Congratulations on Completing the Path!</h2>
        <p className="opacity-90 mb-4">
          You've taken a huge step in your DeFi journey. Continue exploring, stay curious, and always prioritize security. The world of DeFi is vast and full of opportunities!
        </p>
        <p className="text-sm opacity-80">
          Remember: This is an educational guide. Always do your own research (DYOR) before making any investment decisions.
        </p>
      </motion.div>
    </div>
  );
};

export default LearningPathTab;
