import { motion } from "framer-motion";
import { useState } from "react";

const ImageCard = ({ image, index, onLoad, onImageClick, layout = "grid" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Optimize image URL with size parameters
  const optimizedImageUrl = `${image.url}?auto=format&fit=crop&w=500&q=75`;

  const downloadImage = (e) => {
    // Prevent the click event from bubbling up to parent elements
    e.stopPropagation();

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `ramadan-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const handleClick = () => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  // Calculate a random slight rotation for a more natural look
  const randomRotation = Math.random() * 2 - 1; // Between -1 and 1 degrees

  // Determine aspect ratio (use a default if not provided)
  const aspectRatio = image.aspectRatio || 1;

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05, // Stagger effect
      },
    },
    exit: { opacity: 0, y: 20 },
  };

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
        alt={image.alt || `Ramadan image ${index + 1}`}
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
            <div className="flex mt-2 space-x-2 rtl:space-x-reverse justify-between">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={downloadImage}
                  className="bg-amber-500 cursor-pointer hover:bg-amber-600 text-white py-1 px-3 rounded-full text-sm font-medium transition-colors duration-300"
                >
                  تحميل
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageCard;
