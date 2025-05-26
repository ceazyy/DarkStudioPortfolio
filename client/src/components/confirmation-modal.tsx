import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  onClose: () => void;
}

export default function ConfirmationModal({ onClose }: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 checkout-overlay"
        onClick={onClose}
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-charcoal rounded-xl shadow-2xl max-w-md w-full p-8 text-center border border-gray-700"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="text-glow-green text-6xl mb-4 glow-icon mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-orbitron font-bold mb-2">Purchase Complete!</h3>
              <p className="text-gray-400">
                Thank you for your order. You'll receive a download link via email shortly.
              </p>
            </div>
            
            <Button
              onClick={onClose}
              className="bg-glow-green text-black font-bold py-3 px-8 rounded-lg hover:bg-green-400 transition-colors duration-300"
            >
              Continue
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
