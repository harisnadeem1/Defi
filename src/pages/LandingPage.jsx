import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, BarChart, Users, Puzzle, Sparkles, Lock, Layers, TrendingUp } from 'lucide-react';
import FAQSection from "@/components/FAQSection";
import ReviewCarousel from "@/components/ReviewCarousel";
import TeamSection from "@/components/TeamProfilesSection";


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LandingPage = () => {
  const features = [
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Curated DeFi Strategies",
      description: "Access a library of DeFi strategies, vetted for clarity and potential."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Risk Level Filtering",
      description: "Easily find strategies that match your risk appetite, from low to high."
    },
    {
      icon: <Puzzle className="h-10 w-10 text-primary" />,
      title: "Blockchain Choices",
      description: "Explore opportunities across popular blockchains like Ethereum, Polygon, Solana, and more."
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Step-by-Step Guides",
      description: "Follow clear, actionable steps for each strategy. No more guesswork!"
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure & Transparent",
      description: "We prioritize education and transparency. Understand before you invest."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Stay Ahead",
      description: "Discover new and emerging DeFi opportunities as the market evolves."
    }
  ];

  const howItWorksSteps = [
    {
      icon: <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary" />,
      title: "Discover",
      description: "Browse our curated list of DeFi strategies."
    },
    {
      icon: <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />,
      title: "Filter & Select",
      description: "Choose strategies based on risk and preferred blockchain."
    },
    {
      icon: <Layers className="h-8 w-8 mx-auto mb-3 text-primary" />,
      title: "Learn & Execute",
      description: "Follow simple step-by-step guides to implement strategies."
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 md:py-32 bg-gradient-to-br from-background via-blue-900/10 to-purple-900/20 overflow-hidden"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{duration: 0.5}}
      >
        <div className="absolute inset-0 opacity-10">
          {/* Subtle background pattern or animation if desired */}
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeInUp}>
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unlock Your <span className="text-gradient">DeFi Potential</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Navigate the world of Decentralized Finance with confidence. Discover curated, step-by-step investment strategies tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
                <Link to="/strategies" className="flex items-center gap-2">
                  Explore Strategies <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/learn-defi">
                  Learn DeFi Basics
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      </motion.section>

      {/* Problem/Solution Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Feeling <span className="text-gradient">Overwhelmed by DeFi</span>? You're Not Alone.
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                The Decentralized Finance space is exciting, but it can also be complex and risky. Finding trustworthy information and actionable strategies is a challenge.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                That's where we come in. We simplify DeFi by providing clear, step-by-step guides for various investment strategies, helping you make informed decisions.
              </p>
              <Button asChild variant="link" className="text-primary text-lg p-0 h-auto hover:text-primary/80">
                <Link to="/learn-defi">
                  Understand Key DeFi Concepts <ArrowRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="relative p-6 rounded-xl shadow-2xl bg-card border border-border">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-500 rounded-full opacity-50 animate-pulse delay-500"></div>
                <img  
                  alt="Abstract DeFi illustration" 
                  className="rounded-lg w-full h-auto object-cover" 
                  style={{ aspectRatio: '16/9' }}
                 src="https://images.unsplash.com/photo-1667371927761-8fa90f33a248" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need to <span className="text-gradient">Succeed in DeFi</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Our platform is designed to equip you with the tools and knowledge for your DeFi journey.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true }} 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-border flex flex-col items-start text-left"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Start Your DeFi Journey in <span className="text-gradient">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Getting started is easier than you think. Here's how our platform guides you:
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {howItWorksSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-card p-8 rounded-xl shadow-lg text-center border border-border hover:border-primary/50 transition-colors"
              >
                <div className="mb-4">
                  <span className="inline-block p-3 bg-primary/10 rounded-full">{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      <ReviewCarousel />





      {/* Placeholder for Social Proof/Testimonials */}
      {/* <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Trusted by <span className="text-gradient">DeFi Explorers</span> Like You
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              ( Testimonials will appear here soon! )
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1,2,3].map(i => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-card p-6 rounded-lg shadow-md border border-border"
              >
                <div className="flex items-center mb-4">
                  <img  alt={`User avatar ${i}`} className="w-12 h-12 rounded-full mr-4 object-cover" src="https://images.unsplash.com/photo-1649767590910-367f54f3d0e3" />
                  <div>
                    <h4 className="font-semibold">User Name {i}</h4>
                    <p className="text-sm text-muted-foreground">DeFi Enthusiast</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"This platform made DeFi so much more accessible! The strategies are clear and easy to follow."</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-b from-background to-blue-900/10">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient">Dive Into DeFi</span>?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join our platform today and start exploring DeFi strategies with confidence. Your journey to financial empowerment starts now.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
              <Link to="/register" className="flex items-center gap-2">
                Get Started For Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <FAQSection />


      {/* <ReviewCarousel /> */}

      <TeamSection/>



    </div>
  );
};

export default LandingPage;