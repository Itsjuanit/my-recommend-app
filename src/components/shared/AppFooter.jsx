import { FiGithub, FiLinkedin, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    id: 1,
    icon: <FiGithub />,
    url: "https://github.com/itsjuanit",
  },

  {
    id: 2,
    icon: <FiLinkedin />,
    url: "https://www.linkedin.com/in/itsjuanit",
  },
];

const AppFooter = () => {
  return (
    <div className="container mx-auto">
      <div className="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
        <div className="font-general-regular flex flex-col justify-center items-center mb-12 sm:mb-28">
          <p className="text-base sm:text-lg text-primary-dark dark:text-primary-light mb-5">
            Este sitio ha sido realizado por{" "}
            <a
              href="https://portfolio-itsjuanit.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
              }}
            >
              ITSJUANIT
            </a>
          </p>

          <ul className="flex gap-4 sm:gap-8">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                key={link.id}
                className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300"
              >
                <i className="text-xl sm:text-2xl md:text-3xl">{link.icon}</i>
              </a>
            ))}
          </ul>
          <Link
            to="/login"
            className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300"
            aria-label="Login"
            title="Iniciar sesión"
          >
            <FiCheckCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
