import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from 'lucide-react';

import LearningPathTab from "@/components/defi-fundamentals/LearningPathTab";
import FreeCourseTab from "@/components/defi-fundamentals/FreeCourseTab";
import CoachingTab from "@/components/defi-fundamentals/CoachingTab";
import ToolsTab from "@/components/defi-fundamentals/ToolsTab";

const DeFiFundamentalsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3">DeFi Basics: Learn & Grow</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your comprehensive guide to understanding Decentralized Finance. Start your journey from foundational concepts to advanced topics and tools.
        </p>
      </motion.div>

      <Tabs defaultValue="learning-path" className="w-full">
     <div className="w-full flex justify-center mb-8">
  <div className="bg-muted rounded-lg p-2 w-full md:w-auto">
    <TabsList className="bg-transparent p-0 h-auto grid grid-cols-2 gap-2 w-full md:flex md:gap-2 md:w-auto">
      <TabsTrigger value="learning-path" className="text-sm font-medium px-4 py-2 whitespace-nowrap">
        📘 Learning Path
      </TabsTrigger>
      <TabsTrigger value="free-course" className="text-sm font-medium px-4 py-2 whitespace-nowrap">
        🎓 Free Course
      </TabsTrigger>
      <TabsTrigger value="1to1-coaching" className="text-sm font-medium px-4 py-2 whitespace-nowrap">
        🤝 1-to-1 Coaching
      </TabsTrigger>
      <TabsTrigger value="defi-tools" className="text-sm font-medium px-4 py-2 whitespace-nowrap">
        🛠️ DeFi Tools
      </TabsTrigger>
    </TabsList>
  </div>
</div>


        <TabsContent value="learning-path">
          <LearningPathTab />
        </TabsContent>

        <TabsContent value="free-course">
          <FreeCourseTab />
        </TabsContent>

        <TabsContent value="1to1-coaching">
          <CoachingTab />
        </TabsContent>

        <TabsContent value="defi-tools">
          <ToolsTab />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default DeFiFundamentalsPage;