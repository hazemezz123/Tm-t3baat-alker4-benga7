import { useContext } from "react";
import { AboutModalContext } from "../App";
import { motion } from "framer-motion";

const Footer = () => {
  const { toggleAboutModal } = useContext(AboutModalContext);

  return (
    <motion.footer
      className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8 mt-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>

      {/* Animated Lanterns */}
      <div className="absolute -top-6 left-1/4 ramadan-lantern">
        <div className="w-4 h-4 bg-amber-500 rounded-full opacity-70"></div>
        <div className="w-6 h-8 mt-1 bg-amber-400 rounded-lg opacity-60"></div>
      </div>

      <div
        className="absolute -top-8 right-1/4 ramadan-lantern"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="w-4 h-4 bg-amber-500 rounded-full opacity-70"></div>
        <div className="w-6 h-8 mt-1 bg-amber-400 rounded-lg opacity-60"></div>
      </div>

      <div
        className="absolute -top-7 left-3/4 ramadan-lantern"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-4 h-4 bg-amber-500 rounded-full opacity-70"></div>
        <div className="w-6 h-8 mt-1 bg-amber-400 rounded-lg opacity-60"></div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start mb-3">
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
              <h3
                className="text-xl font-bold text-gray-800 dark:text-white"
                dir="rtl"
              >
                تم تعبئة الكرش بنجاح
              </h3>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0"
              dir="rtl"
            >
              معرض صور لأجواء رمضان الجميلة، شارك معنا لحظاتك المميزة خلال الشهر
              الكريم
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-4 gap-4">
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
              <motion.a
                href="https://www.linkedin.com/in/hazem-ezz-424498285/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/hazemezz123"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} تم تعبئة الكرش بنجاح Gallery. جميع
            الحقوق محفوظة.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
