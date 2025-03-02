import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";

const ImageCard = ({ image, index, onLoad, onImageClick, layout = "grid" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate a random delay for staggered animation - reduced for better performance
  const delay = Math.min(index * 0.05, 1); // Cap the delay at 1 second

  // Random rotation for a more dynamic feel (only in grid layout)
  // Use a deterministic value based on image ID for better performance
  const randomRotation = layout === "grid" ? ((image.id % 3) - 1) * 0.7 : 0; // Between -0.7 and 0.7 degrees

  // Calculate aspect ratio for masonry layout
  useEffect(() => {
    if (layout === "masonry") {
      // Use a deterministic value based on image ID for better performance
      const ratio = 0.7 + (image.id % 8) * 0.1; // Between 0.7 and 1.4
      setAspectRatio(ratio);
    } else {
      setAspectRatio(1);
    }
  }, [layout, image.id]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Card variants for animation - simplified for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleClick = () => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  // Optimize image URL with size parameters
  const optimizedImageUrl = `${image.url}?auto=format&fit=crop&w=500&q=75`;

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg dark:shadow-gray-700 cursor-pointer"
      style={
        layout === "masonry" ? { paddingBottom: `${aspectRatio * 100}%` } : {}
      }
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        scale: 1.03, // Reduced scale for better performance
        rotate: randomRotation,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      layoutId={`image-container-${image.id}`}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className={`bg-gray-200 dark:bg-gray-700 animate-pulse w-full h-full ${
            layout === "masonry" ? "absolute inset-0" : ""
          }`}
        />
      )}

      <motion.img
        src={optimizedImageUrl}
        alt={image.alt}
        className={`w-full h-full object-cover ${
          layout === "masonry" ? "absolute inset-0" : ""
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy" // Native lazy loading
        onLoad={handleImageLoad}
        layoutId={`image-${image.id}`}
      />

      {isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="p-4 w-full"
            initial={{ y: 10 }}
            animate={{ y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-white font-medium">{image.alt}</p>
            <div className="flex mt-2 space-x-2">
              <motion.button
                className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </motion.button>
              <motion.button
                className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ImageCard);
