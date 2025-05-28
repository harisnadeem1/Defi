import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake as Handshake } from 'lucide-react';

const CoachingTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-xl shadow-xl bg-gradient-to-br from-primary/80 via-primary to-secondary/80 text-primary-foreground glass-effect"
    >
      <div className="flex flex-col items-center text-center">
        <Handshake className="h-16 w-16 mb-6 text-white" />
        <h2 className="text-3xl font-bold mb-4">Personalized 1-to-1 DeFi Education</h2>
        <p className="text-lg mb-3 max-w-2xl">
          Ready to fast-track your DeFi journey and achieve success with tailored guidance? Our 1-to-1 coaching sessions are designed to provide you with personalized learning, expert insights, and a clear path to mastering decentralized finance.
        </p>
        <p className="text-md mb-6 max-w-2xl">
          Whether you're a complete beginner aiming to understand the essentials or looking to delve into advanced strategies, our experts are here to help you navigate the complexities of DeFi with confidence.
        </p>
        <p className="text-xl font-semibold">
          Contact us today for more details and to schedule your personalized coaching!
        </p>
         <button className="mt-6 bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-slate-100 transition-colors duration-300">
          Get in Touch (Placeholder)
        </button>
      </div>
    </motion.div>
  );
};

export default CoachingTab;