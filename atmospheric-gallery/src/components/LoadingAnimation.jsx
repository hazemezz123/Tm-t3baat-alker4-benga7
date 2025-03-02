import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col justify-center items-center h-60">
      <motion.div
        className="w-16 h-16 mb-4"
        animate={{
          rotateY: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Crescent moon icon for Ramadan */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-amber-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </motion.div>

      <motion.p
        className="text-lg font-medium text-amber-600 dark:text-amber-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        dir="rtl"
      >
        جاري التحميل...
      </motion.p>

      <motion.div
        className="flex space-x-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400"
            animate={{
              y: ["0%", "-50%", "0%"],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
