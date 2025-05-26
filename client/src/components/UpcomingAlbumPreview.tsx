import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RELEASE_DATE = new Date("2025-06-26T00:00:00Z");

function getTimeLeft() {
  const now = new Date();
  const diff = RELEASE_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function UpcomingAlbumPreview() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotify = () => {
    toast({
      title: "You'll be notified!",
      description: "We'll let you know when the album is live.",
    });
    // For real notifications, you'd collect emails or use Push API
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center bg-dark-charcoal p-8 rounded-lg shadow-2xl">
        <img
          src="/NS008.jpg"
          alt="Upcoming Album Cover"
          className="w-80 h-80 object-cover rounded-lg mb-6"
        />
        <h2 className="text-3xl font-orbitron font-bold mb-2 text-white">Upcoming Album</h2>
        <p className="text-lg text-gray-400 mb-4">Releases June 26, 2025</p>
        {timeLeft ? (
          <div className="text-2xl font-mono text-glow-green mb-6">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
        ) : (
          <div className="text-2xl font-mono text-glow-green mb-6">Now Live!</div>
        )}
        <Button onClick={handleNotify} className="bg-glow-green text-black font-bold px-8 py-3 rounded-lg hover:bg-green-400 transition-colors duration-300">
          Notify Me
        </Button>
      </div>
    </section>
  );
} 