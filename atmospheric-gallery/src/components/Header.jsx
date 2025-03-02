import { motion } from "framer-motion";
import { useContext } from "react";
import { AboutModalContext } from "../App";

const Header = () => {
  const { showAboutModal, toggleAboutModal } = useContext(AboutModalContext);

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

      <div className="flex items-center mt-4 md:mt-0 space-x-3 rtl:space-x-reverse">
        {/* About Us Button with Ramadan Style */}
        <motion.button
          className="px-4 py-2 rounded-full ml-2 bg-amber-500 text-white text-sm font-medium flex items-center space-x-1 rtl:space-x-reverse"
          onClick={toggleAboutModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-about-button
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>انا مين </span>
        </motion.button>

        <motion.div
          className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          رمضان كريم
        </motion.div>
      </div>

      {/* About Us Modal with Ramadan Style */}
      {showAboutModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 about-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleAboutModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full overflow-hidden about-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Ramadan Style */}
            <div className="relative about-modal-header">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 opacity-90"></div>
              <div className="relative p-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">من نحن</h3>
                <button
                  className="text-white hover:text-gray-200"
                  onClick={toggleAboutModal}
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
                </button>
              </div>

              {/* Ramadan Decorative Elements */}
              <div className="absolute top-0 left-0 w-full flex justify-between px-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-4 bg-white rounded-b-full transform -translate-y-1"
                    style={{ opacity: 0.8 - i * 0.1 }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 about-modal-content" dir="rtl">
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20 ramadan-pulse"></div>
                  <div className="absolute inset-2 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-amber-500"
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
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
                مطور مواقع كده يدوب عالقد ممكن تاخد لفة علي لينكد ان او جيت هب
                ممكن يعجبك 😉
              </p>

              <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">
                ايوا هنا يباشا
              </h4>

              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/hazem-ezz-424498285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:from-amber-100 hover:to-amber-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all social-link mb-4"
                >
                  <div className="w-10 h-10 ml-2 bg-blue-600 rounded-full flex items-center justify-center mr-3 social-icon">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      لينكد ان
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hazem Ezz
                    </p>
                  </div>
                </a>
                <a
                  href="https://github.com/hazemezz123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:from-amber-100 hover:to-amber-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all social-link"
                >
                  <div className="w-10 h-10 ml-2 bg-gray-800 rounded-full flex items-center justify-center mr-3 social-icon">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      جيت هب
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @hazemezz123
                    </p>
                  </div>
                </a>
              </div>

              {/* Ramadan Decoration at Bottom */}
              <div className="mt-6 flex justify-center">
                <div className="relative">
                  <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent ramadan-shimmer"></div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full ramadan-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
