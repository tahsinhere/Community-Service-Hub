import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../backend/supabase";
import { LuChevronRight } from "react-icons/lu";

const SecretCode = ({ setTeacher }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);

  const handleChange = (event) => {
    setWrong(false);
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    const { error } = await supabase.rpc("verify_teacher", {
      provided_code: input,
    });

    if (error) {
      console.error("Wrong code or there was  an error", error.message);
      setWrong(true);
    } else {
      setTeacher(true);
      navigate("/TeacherDashboard");
    }
  };

  return (
    <div className="flex items-center justify-center py-50 px-4">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 5 }}
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
                // Increased range
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
                    className="   text-[9px] text-red-300 font-bold uppercase tracking-[0.25em]"
                  >
                    // Invalid Code - Are you not a teacher?_
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-9 group cursor-pointer px-15 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl 
                           hover:text-white/40 flex items-center justify-center mx-auto 
                          transition-all duration-300 ease-out  "
          >
            <span className="text-sm uppercase tracking-tighter ">
              Verify Code
            </span>
            <LuChevronRight className="ml-2 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="cursor-pointer  w-full  text-white/30 hover:text-white/80 text-[11px] font-bold uppercase tracking-widest transition-colors"
          >
            Back to Opportunities
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SecretCode;
