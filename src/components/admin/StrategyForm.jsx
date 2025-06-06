import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; // Added for is_sample

const StrategyForm = ({
  formData,
  editingStrategy,
  handleInputChange,
  handleRiskChange,
  handleBlockchainChange,
  handleStrategyTypeChange,
  handleComplexityChange,
  handleSmartContractRiskChange,
  handleImpermanentLossRiskChange,
  handleStepChange,
  addStep,
  removeStep,
  handleSubmit,
  resetForm,
  setIsFormOpen,
  availableBlockchains,
}) => {
  const strategyTypes = ["Yield Farming", "Staking", "Lending", "Arbitrage", "Liquidity Providing", "Derivatives", "Other"];
  const complexityLevels = ["Beginner", "Intermediate", "Advanced"];
  const riskOptions = ["Low", "Medium", "High"]; // For smart contract and impermanent loss

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Card className="shadow-xl glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl">{editingStrategy ? "Edit Strategy" : "Add New Strategy"}</CardTitle>
          <CardDescription>Fill in the comprehensive details for the DeFi strategy.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="E.g., Stablecoin Yield Farming on Curve" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleInputChange} placeholder="E.g., DeFi Analyst Pro" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">General Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief overview of the strategy, its goals, and target audience." required />
            </div>
            
            {/* Categorization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="risk">Overall Risk Level</Label>
                <Select name="risk" value={formData.risk} onValueChange={handleRiskChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blockchain">Primary Blockchain</Label>
                <Select name="blockchain" value={formData.blockchain} onValueChange={handleBlockchainChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBlockchains.map(chain => <SelectItem key={chain} value={chain}>{chain}</SelectItem>)}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="strategyType">Strategy Type</Label>
                <Select name="strategyType" value={formData.strategyType} onValueChange={handleStrategyTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Strategy Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {strategyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="complexity">Complexity Level</Label>
                <Select name="complexity" value={formData.complexity} onValueChange={handleComplexityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    {complexityLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Return (e.g. APY)</Label>
                <Input id="expectedReturn" name="expectedReturn" value={formData.expectedReturn} onChange={handleInputChange} placeholder="E.g., 5-10% APY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeFrame">Time Frame</Label>
                <Input id="timeFrame" name="timeFrame" value={formData.timeFrame} onChange={handleInputChange} placeholder="E.g., Short, Medium, Long Term" />
              </div>
            </div>

            {/* Detailed Risk Assessment */}
            <h3 className="text-lg font-semibold pt-4 border-t mt-6">Detailed Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="smartContractRisk">Smart Contract Risk</Label>
                    <Select name="smartContractRisk" value={formData.smartContractRisk} onValueChange={handleSmartContractRiskChange}>
                        <SelectTrigger><SelectValue placeholder="Select Smart Contract Risk" /></SelectTrigger>
                        <SelectContent>
                            {riskOptions.map(opt => <SelectItem key={`sc-${opt}`} value={opt}>{opt}</SelectItem>)}
                            <SelectItem value="Audited">Audited</SelectItem>
                            <SelectItem value="Unaudited">Unaudited</SelectItem>
                            <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="impermanentLossRisk">Impermanent Loss Risk</Label>
                    <Select name="impermanentLossRisk" value={formData.impermanentLossRisk} onValueChange={handleImpermanentLossRiskChange}>
                        <SelectTrigger><SelectValue placeholder="Select IL Risk" /></SelectTrigger>
                        <SelectContent>
                            {riskOptions.map(opt => <SelectItem key={`il-${opt}`} value={opt}>{opt}</SelectItem>)}
                            <SelectItem value="Yes">Yes (Significant)</SelectItem>
                            <SelectItem value="No">No (Not Applicable)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="estimatedGasFees">Estimated Gas Fees</Label>
                    <Input id="estimatedGasFees" name="estimatedGasFees" value={formData.estimatedGasFees} onChange={handleInputChange} placeholder="E.g., Low, Medium, High, or $5-$10" />
                </div>
            </div>
            
            {/* Requirements & Resources */}
            <h3 className="text-lg font-semibold pt-4 border-t mt-6">Requirements & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="requiredProtocols">Required Protocols/Platforms</Label>
                    <Input id="requiredProtocols" name="requiredProtocols" value={formData.requiredProtocols} onChange={handleInputChange} placeholder="E.g., Uniswap, Aave, Yearn.finance (comma-separated)" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tags">Tags/Keywords</Label>
                    <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="E.g., stablecoin, yield, farming, curve (comma-separated)" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="videoTutorialUrl">Video Tutorial URL (Optional)</Label>
                    <Input id="videoTutorialUrl" name="videoTutorialUrl" type="url" value={formData.videoTutorialUrl} onChange={handleInputChange} placeholder="https://youtube.com/watch?v=example" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="infographicUrl">Infographic URL (Optional)</Label>
                    <Input id="infographicUrl" name="infographicUrl" type="url" value={formData.infographicUrl} onChange={handleInputChange} placeholder="https://example.com/infographic.png" />
                </div>
            </div>

            {/* Steps */}
            <div className="space-y-4 pt-4 border-t mt-6">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Step-by-Step Guide</Label>
                <Button type="button" variant="outline" size="sm" onClick={addStep} className="gap-1">
                  <PlusCircle className="h-4 w-4" /> Add Step
                </Button>
              </div>
              {formData.steps.map((step, index) => (
                <div key={index} className="p-4 border rounded-md space-y-3 bg-secondary/20 relative">
                  <p className="font-medium">Step {index + 1}</p>
                  <div className="space-y-2">
                    <Label htmlFor={`step-title-${index}`}>Step Title</Label>
                    <Input id={`step-title-${index}`} name="title" value={step.title} onChange={(e) => handleStepChange(index, e)} placeholder="E.g., Choose a Stablecoin" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`step-description-${index}`}>Step Description</Label>
                    <Textarea id={`step-description-${index}`} name="description" value={step.description} onChange={(e) => handleStepChange(index, e)} placeholder="Detailed explanation of the step" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`step-tip-${index}`}>
                        Step Tip / Warning (Optional) 
                        <Info className="inline h-3 w-3 ml-1 text-muted-foreground" title="Provide helpful hints or potential pitfalls for this step."/>
                    </Label>
                    <Input id={`step-tip-${index}`} name="tip" value={step.tip} onChange={(e) => handleStepChange(index, e)} placeholder="E.g., USDC is generally considered safer / Watch out for high slippage" />
                  </div>
                  {formData.steps.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeStep(index)} className="gap-1 absolute top-4 right-4">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Sample Strategy Toggle */}
            <div className="flex items-center space-x-2 pt-4 border-t mt-6">
              <Checkbox 
                id="is_sample" 
                name="is_sample"
                checked={formData.is_sample} 
                onCheckedChange={(checked) => handleInputChange({ target: { name: 'is_sample', type: 'checkbox', checked }})}
              />
              <Label htmlFor="is_sample" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Mark as Sample Strategy (Freely Visible)
              </Label>
            </div>


            <div className="flex justify-end gap-2 pt-6">
              <Button type="button" variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button type="submit">{editingStrategy ? "Update Strategy" : "Add Strategy"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StrategyForm;