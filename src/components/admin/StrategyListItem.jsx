import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

const StrategyListItem = ({ strategy, openEditForm, deleteStrategy, riskIcons }) => {
  return (
    <motion.div
      key={strategy.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`shadow-md hover:shadow-lg transition-shadow risk-${strategy.risk}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{strategy.title}</CardTitle>
            <div className="flex items-center">
              {riskIcons[strategy.risk]}
              <span className={`capitalize text-sm font-medium text-${strategy.risk === 'low' ? 'emerald' : strategy.risk === 'medium' ? 'amber' : 'rose'}-500`}>
                {strategy.risk} Risk
              </span>
            </div>
          </div>
          <CardDescription className="text-xs">Last updated: {strategy.createdAt}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{strategy.description}</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => openEditForm(strategy)} className="gap-1">
              <Edit className="h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => deleteStrategy(strategy.id)} className="gap-1">
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StrategyListItem;