import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Album } from "@shared/schema";

interface CartItem extends Album {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (albumId: number) => void;
  onUpdateQuantity: (albumId: number, quantity: number) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}: CartProps) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 checkout-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          onClick={(e) => e.stopPropagation()}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-gray-700 shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-orbitron font-bold text-white flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2" />
                Cart ({cartItems.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">
                          {item.year} • {item.genre}
                        </p>
                        <p className="text-lg font-bold text-white">${item.price}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="w-8 h-8 p-0 bg-transparent border-gray-600 text-white"
                            >
                              -
                            </Button>
                            <span className="text-white font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 bg-transparent border-gray-600 text-white"
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-700 p-6 bg-gray-900">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-white">Total:</span>
                <span className="text-2xl font-bold text-white">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full bg-white text-black font-bold py-3 hover:bg-gray-200"
              >
                Checkout
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}