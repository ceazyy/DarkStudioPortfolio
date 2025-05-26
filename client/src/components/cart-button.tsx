import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export default function CartButton({ itemCount, onClick }: CartButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className="fixed top-6 right-6 z-40 bg-black/80 backdrop-blur border-white text-white hover:bg-white hover:text-black"
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Cart ({itemCount})
    </Button>
  );
}