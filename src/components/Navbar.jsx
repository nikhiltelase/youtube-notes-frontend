import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check the system's preference for dark mode when the component mounts
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);

    // Listen for changes in the system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Toggle dark mode and apply it globally
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Use effect to add dark mode class to body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-indigo-600 text-white"
      } shadow-lg pr-10 fixed w-full z-50 transition-all ease-in-out duration-300`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a
          href="/"
          className="text-lg font-semibold transform transition-all duration-300 hover:scale-105"
        >
          AI Notes Generator
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-white hover:bg-indigo-700 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex space-x-4 items-center transition-all ease-in-out duration-300`}
        >
          <li>
            <a
              href="/"
              className="hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
            >
              Contact
            </a>
          </li>

          {/* Login/Register buttons */}
          <li>
            <a
              href="/login"
              className="px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
            >
              Register
            </a>
          </li>

          {/* Dark Mode Toggle */}
          <li>
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-white" />
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu - Transition Animation */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden -mt-12 mx-4 absolute left-0 top-16 w-full bg-gray-800 text-white p-4 rounded-b-md shadow-lg transition-transform transform duration-300 ease-in-out`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-3 right-3 p-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul>
          <li className="py-2">
            <a
              href="/"
              className="hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
            >
              Home
            </a>
          </li>
          <li className="py-2">
            <a
              href="/about"
              className="hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
            >
              About
            </a>
          </li>
          <li className="py-2">
            <a
              href="/contact"
              className="hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
            >
              Contact
            </a>
          </li>
          <li className="py-2">
            <a
              href="/login"
              className="px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
            >
              Login
            </a>
          </li>
          <li className="py-2">
            <a
              href="/register"
              className="px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
            >
              Register
            </a>
          </li>
          <li className="py-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors duration-300 w-full"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
