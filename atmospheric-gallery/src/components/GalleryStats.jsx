import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const GalleryStats = ({ images, filteredImages, activeCategory }) => {
  const [stats, setStats] = useState({
    totalImages: 0,
    filteredCount: 0,
    categoryCounts: {},
  });

  // Arabic category names mapping
  const arabicCategoryNames = {
    all: "الكل",
    mountains: "جبال",
    water: "ماء",
    forest: "غابات",
    sky: "سماء",
    desert: "صحراء",
    ramadan: "رمضان",
  };

  // Calculate pagination stats
  const paginationStats = useMemo(() => {
    const imagesPerPage = 10;
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

    return {
      imagesPerPage,
      totalPages,
    };
  }, [filteredImages.length]);

  // Calculate statistics
  useEffect(() => {
    // Count images by category
    const categoryCounts = {};
    images.forEach((image) => {
      image.categories.forEach((category) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    });

    setStats({
      totalImages: images.length,
      filteredCount: filteredImages.length,
      categoryCounts,
    });
  }, [images, filteredImages]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        إحصائيات المعرض
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            إجمالي الصور
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.totalImages}
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeCategory === "all"
              ? "عرض الكل"
              : `تصفية (${
                  arabicCategoryNames[activeCategory] || activeCategory
                })`}
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.filteredCount}
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">التصنيفات</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {Object.keys(stats.categoryCounts).length}
          </p>
        </motion.div>
      </div>

      {/* Pagination stats */}
      <motion.div
        className="mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-md"
        variants={itemVariants}
      >
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              عدد الصفحات
            </p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {paginationStats.totalPages}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              صور لكل صفحة
            </p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {paginationStats.imagesPerPage}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              نسبة العرض
            </p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {Math.round(
                (paginationStats.imagesPerPage / stats.filteredCount) * 100
              ) || 0}
              %
            </p>
          </div>
        </div>
      </motion.div>

      {activeCategory !== "all" && (
        <motion.div
          className="mt-4 text-sm text-gray-600 dark:text-gray-300"
          variants={itemVariants}
        >
          <p>
            عرض {stats.filteredCount} من {stats.totalImages} صورة في تصنيف "
            {arabicCategoryNames[activeCategory] || activeCategory}".
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GalleryStats;
