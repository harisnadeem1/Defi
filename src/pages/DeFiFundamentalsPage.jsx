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
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mb-8 max-w-3xl mx-auto">
          <TabsTrigger value="learning-path">📘 Learning Path</TabsTrigger>
          <TabsTrigger value="free-course">🎓 Free Course</TabsTrigger>
          <TabsTrigger value="1to1-coaching">🤝 1-to-1 Coaching</TabsTrigger>
          <TabsTrigger value="defi-tools">🛠️ DeFi Tools</TabsTrigger>
        </TabsList>

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