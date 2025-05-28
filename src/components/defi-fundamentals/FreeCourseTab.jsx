import React from "react";
import { motion } from "framer-motion";
import { Award } from 'lucide-react';

const FreeCourseTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-xl shadow-xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 text-white glass-effect"
    >
      <div className="flex flex-col items-center text-center">
        <Award className="h-16 w-16 mb-6 text-white" />
        <h2 className="text-3xl font-bold mb-4">Free DeFi Fundamentals Course!</h2>
        <p className="text-lg mb-3 max-w-2xl">
          Dive into the world of Decentralized Finance with our complimentary introductory course! This course is designed to give you a solid understanding of the core concepts, key technologies, and exciting possibilities within the DeFi space.
        </p>
        <p className="text-md mb-6 max-w-2xl">
          What you'll learn:
        </p>
        <ul className="list-disc list-inside mb-6 text-left max-w-md mx-auto space-y-1">
          <li>What is DeFi and why it matters.</li>
          <li>Understanding cryptocurrencies and blockchain basics.</li>
          <li>Introduction to smart contracts and dApps.</li>
          <li>Exploring common DeFi use cases: lending, borrowing, DEXs.</li>
          <li>Basic security practices for engaging with DeFi.</li>
        </ul>
        <p className="text-xl font-semibold">
          Start learning today and unlock the power of DeFi!
        </p>
        <button className="mt-6 bg-white text-green-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-slate-100 transition-colors duration-300">
          Enroll Now (Coming Soon!)
        </button>
      </div>
    </motion.div>
  );
};

export default FreeCourseTab;