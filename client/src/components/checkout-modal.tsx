import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Album } from "@shared/schema";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  shippingAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  cardNumber: z.string().min(16, "Valid card number is required"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().min(3, "Valid CVV is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  album: Album;
  onClose: () => void;
  onPurchaseComplete: () => void;
}

export default function CheckoutModal({ album, onClose, onPurchaseComplete }: CheckoutModalProps) {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Purchase Successful!",
        description: "You'll receive a download link via email shortly.",
      });
      onPurchaseComplete();
    },
    onError: (error) => {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    const orderData = {
      albumId: album.id,
      totalAmount: album.price,
      ...data,
    };
    
    createOrderMutation.mutate(orderData);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

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
            className="bg-dark-charcoal rounded-xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto border border-gray-700"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-orbitron font-bold">Purchase {album.title}</h3>
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
            
            {/* Order Summary */}
            <div className="p-6 border-b border-gray-700">
              <h4 className="font-semibold mb-4">Order Summary</h4>
              <div className="flex justify-between items-center">
                <span>{album.title}</span>
                <span>${album.price}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600 font-bold">
                <span>Total</span>
                <span>${album.price}</span>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {/* Personal Information */}
              <div>
                <Label htmlFor="customerName">Full Name</Label>
                <Input
                  {...register("customerName")}
                  className="form-input mt-1"
                  placeholder="John Doe"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  {...register("customerEmail")}
                  type="email"
                  className="form-input mt-1"
                  placeholder="john@example.com"
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                )}
              </div>
              
              {/* Shipping Address */}
              <div>
                <Label htmlFor="shippingAddress">Shipping Address</Label>
                <Input
                  {...register("shippingAddress")}
                  className="form-input mt-1 mb-3"
                  placeholder="123 Main Street"
                />
                {errors.shippingAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.message}</p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      {...register("city")}
                      className="form-input"
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("zipCode")}
                      className="form-input"
                      placeholder="ZIP Code"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  {...register("cardNumber")}
                  className="form-input mt-1"
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setValue("cardNumber", formatted);
                  }}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    {...register("expiryDate")}
                    className="form-input mt-1"
                    placeholder="MM/YY"
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value);
                      setValue("expiryDate", formatted);
                    }}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    {...register("cvv")}
                    className="form-input mt-1"
                    placeholder="123"
                    maxLength={3}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
              
              {/* Purchase Button */}
              <Button
                type="submit"
                disabled={createOrderMutation.isPending}
                className="w-full bg-glow-green text-black font-bold py-4 rounded-lg hover:bg-green-400 transition-colors duration-300 glow-icon mt-6"
              >
                {createOrderMutation.isPending ? "Processing..." : "Complete Purchase"}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
