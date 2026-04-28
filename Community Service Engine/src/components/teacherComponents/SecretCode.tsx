import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SecretCode = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);

  const handleChange = (e) => {
    setWrong(false);
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (input === import.meta.env.VITE_SECRET_CODE) {
      navigate("/TeacherDashboard");
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="flex items-center justify-center py-50 px-4">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 20,
        }}
        // The "Haptic" Shake: Sharp, fast, and subtle
        animate={
          wrong
            ? {
                // Increased range from 5 to 12 for a more noticeable snap
                x: [0, -3, 3, -3, 8, 0, 3, 0],
                // Keeps the subtle scale compression for a "impact" feel

                transition: { duration: 0.2 },
              }
            : {}
        }
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
      >
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-0.5 w-6 rounded-full bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
              Teacher Verification
            </span>
          </div>
          <h2 className="text-3xl font-black text-white leading-none tracking-tight">
            RESTRICTED ACCESS
          </h2>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <label className="block text-[10px] text-white/50 font-bold uppercase tracking-widest mb-2 ml-2">
              Enter Access Key
            </label>

            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="password"
              placeholder="••••••••"
              // Removed all conditional logic for the border - it stays clean
              className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 outline-none focus:border-white/40 transition-all duration-300 font-mono"
            />

            {/* Error Message: Using absolute to keep layout 100% still */}
            <div className="absolute -bottom-6 left-2">
              <AnimatePresence>
                {wrong && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-white/40 font-bold uppercase tracking-[0.25em]"
                  >
                    // Invalid Code - Are you not a teacher?_
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-white text-[#125C9B] w-full py-4 font-black rounded-2xl transition-all cursor-pointer uppercase tracking-widest text-xs hover:bg-gray-200"
          >
            Verify Identity
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SecretCode;
