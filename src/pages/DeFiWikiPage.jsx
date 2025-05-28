import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { wikiTerms, wikiCategories } from "@/data/wikiData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Assuming ScrollArea exists

const WikiTermCard = ({ term }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col glassmorphic-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            {term.term}
          </CardTitle>
          <Badge variant="secondary" className="w-fit">{term.category}</Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm mb-3">{term.definition}</p>
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1 text-foreground/80">Related Terms:</h4>
              <div className="flex flex-wrap gap-1">
                {term.relatedTerms.map(related => (
                  <Badge key={related} variant="outline" className="text-xs">{related}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DeFiWikiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(wikiCategories[0]);

  const filteredTerms = useMemo(() => {
    return wikiTerms.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const termsByCategory = useMemo(() => {
    const grouped = {};
    wikiCategories.forEach(category => {
      grouped[category] = filteredTerms.filter(term => term.category === category);
    });
    if (searchTerm) { // If searching, show all filtered results regardless of category tab
        return {"All Results": filteredTerms};
    }
    return grouped;
  }, [filteredTerms, searchTerm]);

  const currentCategories = searchTerm ? ["All Results"] : wikiCategories;


  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gradient mb-4">DeFi Wiki</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive guide to understanding the world of Decentralized Finance. Search terms or browse by category.
        </p>
      </motion.div>

      <div className="mb-8 sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search DeFi terms, definitions, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full text-base py-6 rounded-md border-border focus-visible:ring-primary"
          />
        </div>
      </div>
      
      <Tabs value={searchTerm ? "All Results" : activeTab} onValueChange={(value) => {
          if (!searchTerm) setActiveTab(value);
        }} 
        className="w-full"
      >
        {!searchTerm && (
          <ScrollArea className="w-full whitespace-nowrap rounded-md border border-border mb-6">
            <TabsList className="inline-flex h-auto p-1 bg-transparent">
              {currentCategories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="text-sm px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 ease-in-out"
                >
                  <TagIcon className="mr-2 h-4 w-4"/> {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {currentCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-gradient flex items-center">
                {category}
                <span className="ml-2 text-lg text-muted-foreground">({termsByCategory[category]?.length || 0} terms)</span>
              </h2>
              {termsByCategory[category]?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {termsByCategory[category].map((term) => (
                    <WikiTermCard key={term.id} term={term} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8 text-lg">
                  {searchTerm ? "No matching terms found for your search." : `No terms in the "${category}" category yet.`}
                </p>
              )}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DeFiWikiPage;