import HeroSection from "@/components/hero-section";
import AlbumGallery from "@/components/album-gallery";
import SocialMediaSection from "@/components/social-media-section";
import CheckoutModal from "@/components/checkout-modal";
import ConfirmationModal from "@/components/confirmation-modal";
import { useState } from "react";
import type { Album } from "@shared/schema";

export default function Home() {
  const [checkoutAlbum, setCheckoutAlbum] = useState<Album | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePurchaseClick = (album: Album) => {
    setCheckoutAlbum(album);
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
