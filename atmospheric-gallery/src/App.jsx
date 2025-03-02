import { useEffect, lazy, Suspense } from "react";
import { images } from "./data";
import "./App.css";

// Lazy load components for better performance
const Header = lazy(() => import("./components/Header"));
const Gallery = lazy(() => import("./components/Gallery"));
const Footer = lazy(() => import("./components/Footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-amber-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4">
        <svg
          className="animate-spin text-amber-500"
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
      <p
        className="text-lg font-medium text-amber-600 dark:text-amber-400"
        dir="rtl"
      >
        جاري تحميل المعرض...
      </p>
    </div>
  </div>
);

function App() {
  // Apply dark mode class based on localStorage on initial load
  useEffect(() => {
    // Apply dark mode if needed
    const isDarkMode = localStorage.getItem("theme") === "dark";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add RTL direction to the document
    document.documentElement.dir = "rtl";

    // Add Ramadan-themed font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap";
    document.head.appendChild(link);

    // Apply the font to the body
    document.body.style.fontFamily = "'Amiri', serif";

    // Preload critical images
    const preloadImages = () => {
      // Only preload the first few images for better initial load performance
      const criticalImages = images.slice(0, 10); // Preload first page of images
      criticalImages.forEach((image) => {
        const img = new Image();
        img.src = `${image.url}?auto=format&fit=crop&w=500&q=75`;
      });
    };

    // Preload images after a short delay to prioritize initial render
    const timer = setTimeout(preloadImages, 1000);

    // Listen for pagination changes to update scroll position
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#page=")) {
        const pageNumber = parseInt(hash.replace("#page=", ""), 10);
        if (!isNaN(pageNumber)) {
          // Scroll to gallery container
          const galleryContainer = document.querySelector(".gallery-container");
          if (galleryContainer) {
            galleryContainer.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Ramadan decorative elements - reduced for better performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Reduced number of decorative elements for better performance */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-500"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${
                  Math.random() * 10 + 10
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Suspense fallback={<LoadingFallback />}>
          <Header />
          <Gallery images={images} />
          <Footer />
          <ScrollToTop />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
