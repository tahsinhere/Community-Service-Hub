import { motion } from "framer-motion";
import { useState } from "react";
import { LuChevronRight } from "react-icons/lu";

const SignUp = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  // Code to remove google auto fill white background or highlight for saved email and passwords
  const autofillStyles = {
    WebkitTextFillColor: "white", // Keeps text white even when autofilled
    transition: "background-color 5000s ease-in-out 0s", // Prevents background color change
    boxShadow: "inset 0 0 0px 1000px transparent", // Forces background to stay transparent
  };

  return (
    /* py-32 kept for navbar clearance */
    <div className="flex items-center justify-center py-32 px-4 selection:bg-white/30">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
      >
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-8 bg-white/40 rounded-full" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-white/60 font-bold">
              Community Access
            </span>
          </div>
          <h2 className="text-4xl font-black text-white leading-none tracking-tight">
            SERVICE HUB
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {/* Email Input */}
          <div className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex items-center focus-within:border-white/30 transition-all">
            <input
              type="email"
              style={autofillStyles}
              className="w-full text-white text-sm font-semibold tracking-tight bg-transparent border-none outline-none placeholder:text-white/30"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex items-center focus-within:border-white/30 transition-all">
            <input
              type="password"
              style={autofillStyles}
              className="w-full text-white text-sm font-semibold tracking-tight bg-transparent border-none outline-none placeholder:text-white/30"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer group w-full py-4 bg-white/5 border border-white/20 text-white font-bold rounded-2xl 
                       hover:bg-white/10 flex items-center justify-center 
                       transition-all duration-300 ease-out active:scale-[0.98]"
          >
            <span className="text-xs uppercase tracking-widest">
              Gain Access
            </span>
            <LuChevronRight className="ml-2 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">
            Admin
          </span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <p className="text-center text-white/30 text-[10px] font-medium uppercase tracking-[0.25em]">
          Faculty Login Only
        </p>
      </motion.form>
    </div>
  );
};

export default SignUp;
