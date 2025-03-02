import { motion } from "framer-motion";

const FilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  const handleCategoryClick = (categoryId) => {
    // Only trigger change if selecting a different category
    if (categoryId !== activeCategory) {
      onCategoryChange(categoryId);
    }
  };

  // Arabic category names mapping
  const arabicCategoryNames = {
    all: "الكل",
    mountains: "جبال",
    water: "ماء",
    forest: "غابات",
    sky: "سماء",
    desert: "صحراء",
  };

  return (
    <div className="mb-8" dir="rtl">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-amber-500 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => handleCategoryClick(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {arabicCategoryNames[category.id] || category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
