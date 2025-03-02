import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center space-x-2 rtl:space-x-reverse"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex items-center">
          {/* Crescent moon icon for Ramadan */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-amber-500 ml-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </div>
        <div className="text-right">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white"
            dir="rtl"
          >
            تم تعبئة الكرش بنجاح
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400" dir="rtl">
            أجواء رمضان
          </p>
        </div>
      </motion.div>

      <div className="flex items-center mt-4 md:mt-0">
        <motion.div
          className="ml-4 px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          رمضان كريم
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
