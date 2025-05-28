import { ethereumStrategies } from './data/ethereumStrategies';
import { polygonStrategies } from './data/polygonStrategies';
import { bnbChainStrategies } from './data/bnbChainStrategies';
import { solanaStrategies } from './data/solanaStrategies';
import { avalancheStrategies } from './data/avalancheStrategies';
import { arbitrumStrategies } from './data/arbitrumStrategies';
import { optimismStrategies } from './data/optimismStrategies';
import { fantomStrategies } from './data/fantomStrategies';
import { otherStrategies } from './data/otherStrategies'; 

const allInitialStrategiesRaw = [
  ...ethereumStrategies,
  ...polygonStrategies,
  ...bnbChainStrategies,
  ...solanaStrategies,
  ...avalancheStrategies,
  ...arbitrumStrategies,
  ...optimismStrategies,
  ...fantomStrategies,
  ...otherStrategies
];

export const getDefaultStrategiesWithSampleFlag = () => {
  return allInitialStrategiesRaw.map((strategy, index) => ({
    ...strategy,
    id: strategy.id || (index + 1) * 10000, // Ensure unique ID generation, avoid collision
    authorAvatar: strategy.authorAvatar || `/avatar-generic-${strategy.blockchain?.toLowerCase() || 'default'}.jpg`,
    blockchain: strategy.blockchain || "Ethereum", // Default blockchain
    isSample: index < 3 // Mark the first 3 strategies as samples
  }));
};


export const getStrategies = () => {
  const storedStrategiesString = localStorage.getItem("strategies");
  const defaultStrategies = getDefaultStrategiesWithSampleFlag();

  if (storedStrategiesString) {
    try {
      const storedStrategies = JSON.parse(storedStrategiesString);
      // Intelligent merge: use stored if it exists, otherwise use default.
      // This helps preserve admin edits while ensuring all strategies are present.
      // We'll use the default set as the 'master list' of what *should* exist.
      const mergedStrategies = defaultStrategies.map(defaultStrategy => {
        const storedVersion = storedStrategies.find(s => s.id === defaultStrategy.id);
        if (storedVersion) {
          // If stored version exists, use it but ensure isSample and authorAvatar are correctly set
          // especially if isSample was added later or authorAvatar logic changed.
          return {
            ...defaultStrategy, // Start with defaults (like isSample)
            ...storedVersion, // Overlay stored data (admin edits, etc.)
            isSample: typeof storedVersion.isSample === 'boolean' ? storedVersion.isSample : defaultStrategy.isSample, // Prioritize stored isSample if it exists
            authorAvatar: storedVersion.authorAvatar || defaultStrategy.authorAvatar,
            blockchain: storedVersion.blockchain || defaultStrategy.blockchain,
          };
        }
        return defaultStrategy; // If not in storage, use the default one
      });
      
      // Add any strategies from storage that might not be in the default list (e.g. manually added via admin)
      // This is less likely if admin tools only edit existing ones.
      storedStrategies.forEach(storedStrategy => {
        if (!mergedStrategies.some(ms => ms.id === storedStrategy.id)) {
          mergedStrategies.push({
            ...storedStrategy,
            isSample: typeof storedStrategy.isSample === 'boolean' ? storedStrategy.isSample : false, // Default non-samples to false
            authorAvatar: storedStrategy.authorAvatar || `/avatar-generic-${storedStrategy.blockchain?.toLowerCase() || 'default'}.jpg`,
            blockchain: storedStrategy.blockchain || "Ethereum",
          });
        }
      });

      // Ensure all strategies from the default list are present
      // This fixes the issue where localStorage might have an outdated/shorter list.
      // The `defaultStrategies.map` above should largely handle this by iterating over defaults.
      // Let's ensure no strategy from defaultStrategies is missing.
      defaultStrategies.forEach(defaultStrategy => {
        if (!mergedStrategies.some(ms => ms.id === defaultStrategy.id)) {
          mergedStrategies.push(defaultStrategy);
        }
      });
      
      // Re-map to ensure isSample is correctly set for the first 3 overall,
      // This is a bit redundant given the defaultStrategies already have it, but acts as a final check.
      const finalStrategies = mergedStrategies.map((s, index) => ({
        ...s,
        // If the strategy was identified as a sample in defaultStrategies, keep that.
        // Otherwise, if it's one of the first 3 in the final merged list AND doesn't have isSample explicitly set to false, make it a sample.
        // This ensures newly added strategies via code (if they become one of the first 3) get the sample flag.
        isSample: defaultStrategies.find(ds => ds.id === s.id)?.isSample ?? (index < 3 && s.isSample !== false)
      }));
      
      // Update localStorage with the potentially corrected/merged list
      localStorage.setItem("strategies", JSON.stringify(finalStrategies));
      return finalStrategies;

    } catch (error) {
      console.error("Error parsing or merging strategies from localStorage:", error);
      // Fallback to default strategies if localStorage is corrupt
      localStorage.setItem("strategies", JSON.stringify(defaultStrategies));
      return defaultStrategies;
    }
  }
  
  // If no strategies in localStorage, initialize with defaults
  localStorage.setItem("strategies", JSON.stringify(defaultStrategies));
  return defaultStrategies;
};

export const getStrategyById = (id) => {
  const currentStrategies = getStrategies(); // This now returns the merged and corrected list
  const strategy = currentStrategies.find(s => s.id === parseInt(id));
  if (strategy) {
    return { 
        ...strategy, 
        // Ensure avatar and blockchain defaults if somehow missing
        authorAvatar: strategy.authorAvatar || `/avatar-generic-${strategy.blockchain?.toLowerCase() || 'default'}.jpg`,
        blockchain: strategy.blockchain || "Ethereum",
    };
  }
  return null;
};