'use client'

import { IoMdArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 border-2 border-[#CCA33A] bg-black/80 backdrop-blur-sm rounded-full px-4 py-6 cursor-pointer transition-all duration-300 hover:bg-[#CCA33A]/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(204,163,58,0.5)] active:scale-95 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <IoMdArrowUp size={24} color="#CCA33A" />
    </button>
  );
};

export default BackToTop;