import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import ImageCard from "./ImageCard";
import LoadingAnimation from "./LoadingAnimation";
import ImageModal from "./ImageModal";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import GalleryStats from "./GalleryStats";
import { categories } from "../data";

// Memoized RamadanLantern component to prevent unnecessary re-renders
const RamadanLantern = memo(({ position }) => (
  <motion.div
    className={`absolute ${position} pointer-events-none z-10`}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  >
    <svg
      width="40"
      height="60"
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 5V0" stroke="#FCD34D" strokeWidth="2" />
      <path d="M10 10H30V50H10V10Z" fill="#FCD34D" />
      <path d="M15 10V50" stroke="#F59E0B" strokeWidth="1" />
      <path d="M25 10V50" stroke="#F59E0B" strokeWidth="1" />
      <path d="M10 20H30" stroke="#F59E0B" strokeWidth="1" />
      <path d="M10 30H30" stroke="#F59E0B" strokeWidth="1" />
      <path d="M10 40H30" stroke="#F59E0B" strokeWidth="1" />
      <path
        d="M15 55C15 52.5 20 52.5 20 55C20 57.5 25 57.5 25 55"
        stroke="#FCD34D"
        strokeWidth="2"
      />
    </svg>
  </motion.div>
));

RamadanLantern.displayName = "RamadanLantern";

// Pagination Tab component
const PaginationTab = memo(({ pageNumber, isActive, onClick, isAllTab }) => (
  <motion.button
    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-amber-500 text-white"
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: pageNumber * 0.03 }}
  >
    {isAllTab ? "الكل" : pageNumber}
  </motion.button>
));

PaginationTab.displayName = "PaginationTab";

const Gallery = ({ images }) => {
  const [columns, setColumns] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [layout, setLayout] = useState("grid"); // 'grid' or 'masonry'
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("paginated"); // 'paginated' or 'all'

  const imagesPerPage = 10; // Number of images per page

  // Memoize the resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    if (window.innerWidth < 640) {
      setColumns(1);
    } else if (window.innerWidth < 1024) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  }, []);

  // Adjust columns based on screen size
  useEffect(() => {
    handleResize(); // Initial check

    // Use passive event listener for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Memoize the filtering logic for better performance
  const filterImages = useCallback((images, category, term) => {
    if (!images.length) return [];

    return images.filter((image) => {
      // Category filter
      const passesCategory =
        category === "all" || image.categories.includes(category);

      // Search term filter
      const passesTerm =
        !term || image.alt.toLowerCase().includes(term.toLowerCase());

      return passesCategory && passesTerm;
    });
  }, []);

  // Filter images when category or search term changes
  useEffect(() => {
    const filtered = filterImages(images, activeCategory, searchTerm);
    setFilteredImages(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeCategory, searchTerm, images, filterImages]);

  // Simulate image loading
  useEffect(() => {
    // Simulate loading delay - shorter for better performance
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredImages(filterImages(images, activeCategory, searchTerm));
    }, 800);

    return () => clearTimeout(timer);
  }, [images, activeCategory, searchTerm, filterImages]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount === images.length) {
        setIsLoading(false);
      }
      return newCount;
    });
  }, [images.length]);

  // Handle image click
  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Handle layout toggle
  const toggleLayout = useCallback(() => {
    setLayout((prev) => (prev === "grid" ? "masonry" : "grid"));
  }, []);

  // Toggle stats visibility
  const toggleStats = useCallback(() => {
    setShowStats((prev) => !prev);
  }, []);

  // Handle modal navigation
  const handleModalNavigation = useCallback(
    (direction) => {
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage?.id
      );

      if (direction === "next" && currentIndex < filteredImages.length - 1) {
        setSelectedImage(filteredImages[currentIndex + 1]);
      } else if (direction === "prev" && currentIndex > 0) {
        setSelectedImage(filteredImages[currentIndex - 1]);
      }
    },
    [filteredImages, selectedImage]
  );

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top of gallery when changing pages
    window.scrollTo({
      top: document.querySelector(".gallery-container")?.offsetTop - 100 || 0,
      behavior: "smooth",
    });
  }, []);

  // Toggle view mode between paginated and all
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "paginated" ? "all" : "paginated"));
    setCurrentPage(1); // Reset to first page when changing view mode
  }, []);

  // Calculate total number of pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredImages.length / imagesPerPage);
  }, [filteredImages.length, imagesPerPage]);

  // Get current page images
  const currentImages = useMemo(() => {
    if (viewMode === "all") {
      return filteredImages;
    }

    const startIndex = (currentPage - 1) * imagesPerPage;
    return filteredImages.slice(startIndex, startIndex + imagesPerPage);
  }, [filteredImages, currentPage, imagesPerPage, viewMode]);

  // Distribute images into columns - memoized for performance
  const columnImages = useMemo(() => {
    const columnImages = Array.from({ length: columns }, () => []);

    currentImages.forEach((image, index) => {
      const columnIndex = index % columns;
      columnImages[columnIndex].push(image);
    });

    return columnImages;
  }, [currentImages, columns]);

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced for better performance
      },
    },
  };

  // Generate pagination tabs
  const paginationTabs = useMemo(() => {
    const tabs = [];

    // Add "All" tab
    tabs.push(
      <PaginationTab
        key="all"
        pageNumber={0}
        isActive={viewMode === "all"}
        onClick={() => toggleViewMode()}
        isAllTab={true}
      />
    );

    // Add numbered tabs
    for (let i = 1; i <= totalPages; i++) {
      tabs.push(
        <PaginationTab
          key={i}
          pageNumber={i}
          isActive={viewMode === "paginated" && currentPage === i}
          onClick={() => {
            setViewMode("paginated");
            handlePageChange(i);
          }}
          isAllTab={false}
        />
      );
    }

    return tabs;
  }, [totalPages, currentPage, viewMode, handlePageChange, toggleViewMode]);

  return (
    <motion.div
      className="container mx-auto px-4 py-8 relative gallery-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Reduced for better performance
    >
      {/* Ramadan decorations - only render two for better performance */}
      <RamadanLantern position="top-0 left-4" />
      <RamadanLantern position="top-0 right-4" />

      <div className="relative">
        <motion.div
          className="absolute -top-6 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <h1
          className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white"
          dir="rtl"
        >
          تم تعبئة الكرش بنجاح Gallery
        </h1>

        <h2
          className="text-xl font-medium text-center mb-8 text-amber-500"
          dir="rtl"
        >
          أجواء رمضان
        </h2>

        <motion.div
          className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {!isLoading && (
        <>
          <SearchBar onSearch={handleSearch} />

          <div className="flex flex-wrap justify-between items-center mb-6">
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex space-x-2 mt-4 sm:mt-0">
              <motion.button
                className="px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium"
                onClick={toggleLayout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {layout === "grid" ? "عرض متداخل" : "عرض شبكي"}
              </motion.button>

              <motion.button
                className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-medium"
                onClick={toggleStats}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showStats ? "إخفاء الإحصائيات" : "عرض الإحصائيات"}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryStats
                  images={images}
                  filteredImages={filteredImages}
                  activeCategory={activeCategory}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination tabs */}
          {filteredImages.length > 0 && (
            <div className="flex flex-wrap justify-center mb-8 mt-4 gap-2 rtl">
              {paginationTabs}
            </div>
          )}
        </>
      )}

      {isLoading ? (
        <LoadingAnimation />
      ) : filteredImages.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl text-gray-600 dark:text-gray-400" dir="rtl">
            لا توجد صور تطابق معايير البحث.
          </p>
          <motion.button
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            onClick={() => {
              setActiveCategory("all");
              setSearchTerm("");
              handleSearch("");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            إعادة ضبط الفلاتر
          </motion.button>
        </motion.div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchTerm}-${layout}-${currentPage}-${viewMode}`}
              className={`flex flex-wrap -mx-4 ${
                layout === "masonry" ? "items-start" : ""
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {columnImages.map((columnImages, columnIndex) => (
                <div
                  key={columnIndex}
                  className="px-4 w-full sm:w-1/2 lg:w-1/3 mb-8"
                >
                  <div
                    className={`${
                      layout === "masonry" ? "space-y-4" : "space-y-4"
                    }`}
                  >
                    {columnImages.map((image, imageIndex) => (
                      <ImageCard
                        key={`${image.id}-${activeCategory}-${searchTerm}-${currentPage}`}
                        image={image}
                        index={
                          columnIndex * (currentImages.length / columns) +
                          imageIndex
                        }
                        onLoad={handleImageLoad}
                        onImageClick={handleImageClick}
                        layout={layout}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination controls */}
          {viewMode === "paginated" && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2 rtl:space-x-reverse">
              {/* Previous page button */}
              <motion.button
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 rtl:rotate-180"
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

              {/* Page indicator */}
              <span className="text-gray-700 dark:text-gray-300">
                {currentPage} / {totalPages}
              </span>

              {/* Next page button */}
              <motion.button
                className={`p-2 mr-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 rtl:rotate-180"
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
            </div>
          )}

          {/* View all/paginated toggle button */}
          <div className="flex justify-center mt-6">
            <motion.button
              className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              onClick={toggleViewMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {viewMode === "paginated" ? "عرض كل الصور" : "العرض المقسم"}
            </motion.button>
          </div>
        </>
      )}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          images={filteredImages}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNavigate={handleModalNavigation}
        />
      )}
    </motion.div>
  );
};

export default memo(Gallery);
