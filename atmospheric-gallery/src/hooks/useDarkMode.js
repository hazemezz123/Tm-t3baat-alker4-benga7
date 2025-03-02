import { useState, useEffect } from "react";

const useDarkMode = () => {
  // Check if user has a preference stored
  const getInitialMode = () => {
    // Check for saved theme in localStorage
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      return savedMode === "dark";
    }

    // Check for preferred color scheme
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialMode);

  // Update dark mode in localStorage and document class
  useEffect(() => {
    // Update document class
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Add listener for changes in system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Only update if there's no localStorage value
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;
