import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-background h-screen flex items-center justify-center relative">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="cursor-pointer transition-all duration-500 hover:scale-105"
        >
          <img 
            src="/Logo_white.png" 
            alt="Artist Logo" 
            className="mx-auto max-w-md md:max-w-lg lg:max-w-xl w-full h-auto"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-white text-2xl" />
      </motion.div>
    </section>
  );
}
