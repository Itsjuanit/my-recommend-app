import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import logoLight from "../../images/logo-light.png";
import logoDark from "../../images/logo-dark.png";
import { motion } from "framer-motion";

const navLinkClass =
  "block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 mb-2 sm:py-2";

const navLinks = [
  { to: "/workers", ariaLabel: "Trabajadores", content: "TRABAJADORES" },
  {
    to: "/form",
    ariaLabel: "form",
    content: (
      <>
        ¿TENES UN{" "}
        <span style={{ backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" }}>
          TRABAJADOR
        </span>{" "}
        QUE RECOMENDAR?
      </>
    ),
  },
];

const renderNavLinks = (mobile) =>
  navLinks.map((link, index) => (
    <Link
      key={link.to}
      to={link.to}
      aria-label={link.ariaLabel}
      className={
        mobile && index === navLinks.length - 1
          ? `${navLinkClass} border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark`
          : navLinkClass
      }
    >
      {link.content}
    </Link>
  ));

const AppHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTheme] = useThemeSwitcher();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="nav" className="sm:container sm:mx-auto">
      <div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
        {/* Header menu links and small screen hamburger menu */}
        <div className="flex justify-between items-center px-4 sm:px-0">
          <div>
            <Link to="/">
              <img
                src={activeTheme === "dark" ? logoDark : logoLight}
                style={{ width: "60px" }}
                width={60}
                height={60}
                alt="YaOficios"
              />
            </Link>
          </div>

          {/* Small screen hamburger menu */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} type="button" className="focus:outline-none" aria-label="Hamburger Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
              >
                {showMenu ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu ? "block m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none" : "hidden"
          }
        >
          {renderNavLinks(true)}
        </div>

        {/* Header links large screen */}
        <div className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
          {renderNavLinks(false)}
        </div>
      </div>
    </motion.nav>
  );
};

export default AppHeader;
