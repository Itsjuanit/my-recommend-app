import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FiChevronUp
      className="scrollToTop"
      onClick={scrollToTop}
      style={{
        height: 45,
        width: 45,
        borderRadius: 50,
        right: 50,
        bottom: 50,
        display: visible ? "flex" : "none",
        padding: 5,
        backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
      }}
    />
  );
};

export default ScrollToTopButton;
