import { motion, AnimatePresence } from "framer-motion";
import TokenDisplay from "./TokenDisplay";

const TheDetails = ({ spotsLeft, selectedOpp, isSubmit, tokenCode }) => {
  return (
    <div className="w-full">
      {/* Tightened Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-white/10 mb-6">
        <div>
          <p className="text-blue-200/40 text-[10px] uppercase font-bold tracking-widest">
            Location
          </p>
          <p className="text-white text-sm md:text-base font-medium truncate">
            {selectedOpp.location}
          </p>
        </div>
        <div>
          <p className="text-blue-200/40 text-[10px] uppercase font-bold tracking-widest">
            Time
          </p>
          <p className="text-white text-sm md:text-base font-medium">
            {selectedOpp.time}
          </p>
        </div>
        <div>
          <p className="text-blue-200/40 text-[10px] uppercase font-bold tracking-widest">
            Credit
          </p>
          <p className="text-white text-sm md:text-base font-medium">
            {selectedOpp.hours}h
          </p>
        </div>
        <div>
          <p className="text-blue-200/40 text-[10px] uppercase font-bold tracking-widest">
            Spots
          </p>
          <p
            className={`text-sm md:text-base font-bold ${
              spotsLeft === 0
                ? "text-red-400"
                : spotsLeft < 5
                  ? "text-amber-300"
                  : "text-emerald-400"
            }`}
          >
            {spotsLeft} Left
          </p>
        </div>
      </div>

      {/* The "Swap" Section */}
      <div className="relative min-h-[120px]">
        <AnimatePresence mode="wait">
          {isSubmit && tokenCode ? (
            <motion.div
              key="token-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TokenDisplay tokenCode={tokenCode} />
            </motion.div>
          ) : (
            <motion.div
              key="desc-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-white text-lg font-bold mb-2">Description</h2>
              <p className="text-blue-50/70 text-base md:text-lg leading-relaxed">
                {selectedOpp.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TheDetails;
