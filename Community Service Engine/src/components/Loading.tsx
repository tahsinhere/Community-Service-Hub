import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-6">
      {/* Animated Logo/Spinner */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-white/10 border-t-[#125C9B] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
      </div>

      {/* Text with Shimmer Effect */}
      <div className="space-y-2 text-center">
        <motion.h2
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-2xl font-black text-white tracking-tighter"
        >
          FETCHING OPPORTUNITIES
        </motion.h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
          Eleanor Roosevelt HS
        </p>
      </div>
    </div>
  );
};

export default Loading;
