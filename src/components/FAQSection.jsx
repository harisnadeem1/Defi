import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What if I’m completely new to DeFi?",
    answer: "No worries! We’ve designed our learning path and strategy breakdowns for complete beginners. You’ll learn everything from the ground up with simple explanations."
  },
  {
    question: "What exactly do I get with the $7 trial?",
    answer: "You get full access to our premium strategies, learning modules, and exclusive community chat for 7 days. Explore everything before committing."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. Cancel anytime from your profile. No hidden fees or contracts—just freedom to explore DeFi at your own pace."
  },
  {
    question: "How are your strategies different from free content on YouTube or Twitter?",
    answer: "We offer structured, vetted strategies with risk assessments, expected returns, and step-by-step execution. No fluff, just actionable alpha."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-white/10 py-4">
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full text-left text-white text-lg font-medium focus:outline-none"
    >
      {question}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="h-5 w-5 text-white" />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mt-3 pr-1">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-black text-white px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[30px] md:text-[48px] font-bold text-center mb-5">
  <span className="text-white">Frequently Asked </span>
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
    Questions
  </span>
</h2>

        <p className="text-center text-muted-foreground mb-10">
          Everything you need to know before diving into DeFi with us.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
