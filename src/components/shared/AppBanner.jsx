import toolbox from "../../images/toolbox.png";
import { motion } from "framer-motion";

const AppBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="flex flex-col sm:justify-between items-center sm:flex-row mt-12 md:mt-2"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full md:w-2/3 text-left">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.1,
          }}
          className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
        >
          ENCONTRA A TU MEJOR PROFESIONAL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.2,
          }}
          className="font-general-medium mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200"
        >
          EN UN SOLO SITIO{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
            }}
          >
            {" "}
            YAOFICIOS{" "}
          </span>
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0"
      >
        <img src={toolbox} width={1024} height={1024} alt="Ilustración de caja de herramientas" />
      </motion.div>
    </motion.section>
  );
};

export default AppBanner;
