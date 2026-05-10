import { motion } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignUp = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center py-32 px-4 selection:bg-white/30">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
      >
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-6 bg-white/40 rounded-full" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/60 font-bold">
              Community Access
            </span>
          </div>
          <h2 className="text-4xl font-black text-white leading-none tracking-tight">
            SERVICE HUB
          </h2>
        </div>

        {/* Email/Pass Placeholders */}
        <div className="space-y-3 mb-6">
          <div className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex justify-between items-center">
            <input
              className="text-blue-100/80 text-sm font-semibold tracking-tight"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex justify-between items-center">
            <input
              className="text-blue-100/80 text-sm font-semibold tracking-tight"
              placeholder="Password"
              type="password"
            />
          </div>
          <button className="w-full py-4 bg-white/5 text-white/30  font-bold rounded-2xl border border-white/5 cursor-pointer hover:bg-white/20 uppercase tracking-widest text-[11px]">
            {" "}
            Login in
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-white/40 text-[10px] font-bold tracking-widest">
            Admin
          </span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <p className="text-center mt-8 text-white/30 text-[10px] font-medium uppercase tracking-[0.2em]">
          Faculty Login Only
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
