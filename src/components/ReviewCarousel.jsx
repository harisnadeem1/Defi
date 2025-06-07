import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews =[
  {
    name: "Liam Parker",
    image: "/Avatars/Liam Parker.webp",
    message: "DeFiStrategies helped me understand how to earn passive income through staking. The tutorials are super clear and beginner-friendly. I started earning yield within days!"
  },
  {
    name: "Maya Singh",
    image: "../../public/Avatars/Maya Singh.webp",
    message: "Their lending and borrowing walkthroughs saved me from costly mistakes. The platform explained risks in simple terms. Great for cautious investors like me."
  },
  {
    name: "Carlos Ortega",
    image: "../../public/Avatars/Carlos Ortega.webp",
    message: "I’ve tried YouTube and blogs but nothing came close to this. DeFiStrategies gave me structured learning, real examples, and easy-to-follow steps. A gem!"
  },
  {
    name: "Sophie Bennett",
    image: "../../public/Avatars/Sophie Bennett.webp",
    message: "The DeFi tools recommended here are top-notch. From gas trackers to portfolio dashboards — everything’s covered. A complete toolkit for DeFi users!"
  },
  {
    name: "Adeel Farooq",
    image: "../../public/Avatars/Adeel Farooq.webp",
    message: "I finally learned how to use LPs properly without losing money to impermanent loss. Their visual guides are next level. Highly recommended!"
  },
  {
    name: "Naomi Tanaka",
    image: "../../public/Avatars/Naomi Tanaka.webp",
    message: "The 1-on-1 coaching helped me build a DeFi income strategy tailored to my risk level. I felt supported every step of the way. Totally worth it."
  },
  {
    name: "Jason Miller",
    image: "../../public/Avatars/Jason Miller.webp",
    message: "Before this, DeFi felt like a gamble. Now I understand how the protocols work and how to manage risk. Clear, concise, and actually useful."
  }
];


const ReviewCard = ({ review }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 border border-white/10 rounded-xl p-5 min-w-[260px] md:min-w-[300px] backdrop-blur-md shadow-md snap-start"
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-12 h-12">
        <img
          src={review.image}
          alt={review.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-full border border-white/10"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-white font-medium text-sm">{review.name}</span>
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="w-[18px] h-[18px] bg-[#00B67A] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[14px] h-[14px] text-white fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.429 8.2 1.193-5.934 5.782 1.402 8.179L12 18.897l-7.336 3.858 1.402-8.179L.132 9.209l8.2-1.193z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed">{review.message}</p>
  </motion.div>
);

const ReviewCarousel = () => {
  return (
    <section className="py-14 px-4 bg-background text-white">
      <div className="max-w-6xl mx-auto text-center mb-10 px-2">
        <h2 className="text-3xl md:text-4xl font-bold">
          What Our <span className="text-gradient">Users Say</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Real reviews from DeFi enthusiasts and beginners alike.
        </p>
      </div>

      <div className="overflow-x-auto no-scrollbar px-1">
        <div className="flex gap-5 md:gap-6 px-1 md:px-2 snap-x snap-mandatory">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
