import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function SocialMediaSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="min-h-screen global-background flex items-center justify-center px-4">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-white"
        >
          CONNECT
        </motion.h2>
        
        <div className="flex justify-center items-center space-x-12 md:space-x-16 lg:space-x-20">
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <social.icon className="text-6xl md:text-7xl lg:text-8xl text-white hover:text-gray-300 transition-colors duration-300" />
            </motion.a>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-400 text-lg mt-12"
        >
          Follow for latest releases and updates
        </motion.p>
      </div>
    </section>
  );
}
