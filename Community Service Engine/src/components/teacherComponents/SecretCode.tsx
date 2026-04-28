import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SecretCode = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input === import.meta.env.VITE_SECRET_CODE) {
      navigate("/TeacherDashboard");
    } else {
      return <div> No </div>;
    }
  };

  return (
    <div className="flex items-center justify-center py-50 px-4">
      {/* This motion.div adds the smooth "pop-in" effect */}
      <motion.div
        initial={{ opacity: 1, y: 18 }}
        animate={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-6 bg-white/40 rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">
              Teacher Verification
            </span>
          </div>
          <h2 className="text-3xl font-black text-white leading-none tracking-tight">
            RESTRICTED ACCESS
          </h2>
        </div>

        {/* The Input Area */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] text-white/50 font-bold uppercase tracking-widest mb-2 ml-2">
              Enter Access Key
            </label>
            <input
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-white/20 transition-all font-mono"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-white text-[#125C9B] font-black rounded-2xl hover:bg-gray-300 transition-colors cursor-pointer uppercase tracking-widest text-xs"
          >
            Verify Identity
          </button>

          {/* Go Back Button */}
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
