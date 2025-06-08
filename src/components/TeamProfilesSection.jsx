import React from "react";
import { motion } from "framer-motion";
import gian from "../assets/Team/Gian.webp"
import alex from "../assets/Team/alex.webp"
import luca from "../assets/Team/luca.webp"



const team = [
  {
    name: "Gian",
    image: gian,
    title: "Founder • Strategy Architect",
    bio: "Gian has guided over 160 DeFi newcomers through copy-paste yield strategies with proven success. With a strong background in user-centric design, he crafts actionable systems that simplify yield farming into repeatable, beginner-friendly steps.",
  },
  {
    name: "Alex Klamann",
    image: alex,
    title: "Crypto Analyst • Coin Economist",
    bio: "Alex has over 3 years of experience in crypto analytics and token economics. A former advisor at Binance, he specializes in decoding market behavior and developing risk-aware strategies that help users navigate volatile DeFi protocols with confidence.",
  },
  {
    name: "Luca Myers",
    image: luca,
    title: "Strategy Analyzer",
    bio: "Luca worked with Binance’s strategy team, focusing on evaluating DeFi models and smart contract behavior. Now he breaks down high-risk farming protocols into clear tutorials, helping users avoid pitfalls and optimize their returns with precision.",
  },
];


const TeamCard = ({ member }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center max-w-sm w-full shadow-md backdrop-blur-md"
  >
    <img
      src={member.image}
      alt={member.name}
      className="w-28 h-28 rounded-full object-cover border-2 border-white/20 mb-4"
    />
    <h3 className="text-white text-xl font-semibold">{member.name}</h3>
    <p className="text-sm text-primary/80 font-medium mb-3">{member.title}</p>
    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
  </motion.div>
);

const TeamSection = () => {
  return (
    <section className="py-16 px-4 bg-background text-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold">
          Meet the <span className="text-gradient">Faces</span> Behind <span className="text-gradient"> DeFiStrategies</span>
        </h2>
        <p className="text-muted-foreground mt-3 text-base md:text-lg">
          Real people. Proven results. Trusted by 162+ members.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center items-start">
        {team.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
