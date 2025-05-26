import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-background h-screen flex items-center justify-center relative">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl tracking-wider glow-text cursor-pointer transition-all duration-500 hover:scale-105"
        >
          SYNTHWAVE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-gray-400 text-lg md:text-xl mt-4 font-light tracking-wide opacity-80"
        >
          Electronic Music Artist
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-glow-green text-2xl glow-icon" />
      </motion.div>
    </section>
  );
}
