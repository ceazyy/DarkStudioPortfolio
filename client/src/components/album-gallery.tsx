import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Album } from "@shared/schema";

interface AlbumGalleryProps {
  onPurchaseClick: (album: Album) => void;
}

export default function AlbumGallery({ onPurchaseClick }: AlbumGalleryProps) {
  const { ref, isVisible } = useScrollReveal();
  
  const { data: albums, isLoading, error } = useQuery<Album[]>({
    queryKey: ["/api/albums"],
  });

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black to-dark-charcoal py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-orbitron font-bold text-red-500 mb-4">
            Failed to Load Albums
          </h2>
          <p className="text-gray-400">
            Unable to fetch album data. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black to-dark-charcoal py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glow-green mx-auto mb-4"></div>
          <p className="text-gray-400">Loading albums...</p>
        </div>
      </section>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black to-dark-charcoal py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-orbitron font-bold text-gray-400 mb-4">
            No Albums Available
          </h2>
          <p className="text-gray-500">
            Check back later for new releases.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-b from-black to-dark-charcoal py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 text-white"
        >
          DISCOGRAPHY
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => onPurchaseClick(album)}
              className="album-hover cursor-pointer relative group"
            >
              <img
                src={album.coverImage}
                alt={`${album.title} Album Cover`}
                className="w-full aspect-square object-cover rounded-lg shadow-2xl"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-glow-green text-black px-3 py-1 rounded-full font-bold text-sm">
                ${album.price}
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-orbitron font-bold mb-2">{album.title}</h3>
                <p className="text-gray-400">{album.year} • {album.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
