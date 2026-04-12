import { motion } from "framer-motion";

const Header = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          Community <span className="text-[#125C9B]">Service</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Find your next in house opportunity
        </p>
      </motion.div>
    </div>
  );
};

export default Header;
