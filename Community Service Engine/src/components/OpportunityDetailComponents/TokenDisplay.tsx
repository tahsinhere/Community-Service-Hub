import { motion } from "framer-motion";

const TokenDisplay = ({ tokenCode }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-10 p-6 bg-white/10 border border-white/20 rounded-2xl flex flex-col items-center justify-center text-center"
      >
        <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest mb-2">
          Your Unique Verification Token
        </p>
        <p className="text-3xl md:text-4xl font-mono font-bold text-white tracking-wider">
          {tokenCode}
        </p>
        <p className="mt-3 text-blue-100/40 text-sm">
          Show this code to your teacher to verify your hours.
        </p>
      </motion.div>
    </div>
  );
};

export default TokenDisplay;
