import HeroSection from "@/components/hero-section";
import AlbumGallery from "@/components/album-gallery";
import SocialMediaSection from "@/components/social-media-section";
import CheckoutModal from "@/components/checkout-modal";
import ConfirmationModal from "@/components/confirmation-modal";
import Cart from "@/components/cart";
import CartButton from "@/components/cart-button";
import { useState } from "react";
import type { Album } from "@shared/schema";

interface CartItem extends Album {
  quantity: number;
}

export default function Home() {
  const [checkoutAlbum, setCheckoutAlbum] = useState<Album | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handlePurchaseClick = (album: Album) => {
    setCheckoutAlbum(album);
  };

  const handleAddToCart = (album: Album) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === album.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...album, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (albumId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== albumId));
  };

  const handleUpdateQuantity = (albumId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === albumId ? { ...item, quantity } : item
      )
    );
  };

  const handleCartCheckout = () => {
    // For now, we'll treat cart checkout as individual purchases
    // You can implement bulk checkout later
    setIsCartOpen(false);
    setShowConfirmation(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutAlbum(null);
  };

  const handlePurchaseComplete = () => {
    setCheckoutAlbum(null);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <AlbumGallery onPurchaseClick={handlePurchaseClick} />
      <SocialMediaSection />
      
      {checkoutAlbum && (
        <CheckoutModal
          album={checkoutAlbum}
          onClose={handleCloseCheckout}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}
      
      {showConfirmation && (
        <ConfirmationModal onClose={handleCloseConfirmation} />
      )}
    </div>
  );
}
