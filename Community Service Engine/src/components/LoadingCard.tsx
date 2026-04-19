import { motion } from "framer-motion";

const LoadingCard = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 gap-2">
      <div className="flex gap-8">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-[#125C9B] rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]"
      >
        Fetching
      </motion.p>
    </div>
  );
};

export default LoadingCard;
