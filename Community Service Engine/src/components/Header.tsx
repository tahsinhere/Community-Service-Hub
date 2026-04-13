import { motion } from "framer-motion";

const Header = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-center"
      >
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter flex items-center justify-center gap-3">
          Available
          <span className="text-[#125C9B] relative inline-flex items-center">
            Now
            {/* just a red button*/}
            <span className="ml-3 flex h-4 w-4 items-center justify-center">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-800"></span>
            </span>
          </span>
        </h1>
        <p className="text-gray-400 mt-2">
          Find your next in house opportunity
        </p>
      </motion.div>
    </div>
  );
};

export default Header;
