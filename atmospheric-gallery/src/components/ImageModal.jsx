import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";

const ImageModal = ({ image, images, isOpen, onClose, onNavigate }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNavigate("prev"); // Reversed for RTL
      } else if (e.key === "ArrowLeft") {
        onNavigate("next"); // Reversed for RTL
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, onNavigate]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Reset image loaded state when image changes
  useEffect(() => {
    setIsImageLoaded(false);
  }, [image]);

  // Find current image index - memoized for performance
  const currentIndex = images.findIndex((img) => img.id === image?.id);
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // Handle download - optimized with useCallback
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      // Create a filename from the image alt text
      const filename = image.alt.toLowerCase().replace(/\s+/g, "-") + ".jpg";

      // Create a download link
      const a = document.createElement("a");
      a.href = image.url;
      a.download = filename;
      a.style.display = "none";

      // Trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);

      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Error downloading image:", error);
      setIsDownloading(false);
    }
  }, [image, isDownloading]);

  // Optimize image URL with size parameters
  const optimizedImageUrl = image
    ? `${image.url}?auto=format&fit=crop&w=1200&q=80`
    : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} // Reduced for better performance
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }} // Reduced for better performance
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading placeholder */}
            {!isImageLoaded && (
              <div className="w-full h-[70vh] bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-600 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}

            <motion.img
              src={optimizedImageUrl}
              alt={image?.alt}
              className={`w-full h-full object-contain rounded-lg ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              layoutId={`image-${image?.id}`}
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }} // Reduced for better performance
              dir="rtl"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white text-xl font-medium">
                    {image?.alt}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {currentIndex + 1} من {images.length}
                  </p>
                </div>

                <motion.button
                  className="px-4 py-2 bg-amber-500 text-white rounded-md flex items-center space-x-2 rtl:space-x-reverse"
                  onClick={handleDownload}
                  disabled={isDownloading || !isImageLoaded}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDownloading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>جاري التحميل...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span>تحميل</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Navigation buttons - reversed for RTL */}
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4">
              {hasNext && (
                <motion.button
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("next");
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }} // Reduced for better performance
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>
              )}

              {hasPrev && (
                <motion.button
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("prev");
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }} // Reduced for better performance
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              )}
            </div>

            <motion.button
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ImageModal);
