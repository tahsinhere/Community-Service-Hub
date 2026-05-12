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

  return (
    <div className="flex items-center justify-center py-32 px-4 selection:bg-white/30">
      <motion.form
        onSubmit={handleSubmit}
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
              type="email"
              className=" focus-within:border-white/30  autofill:shadow-[inset_0_0_0px_1000px_#125C9B] autofill:text-black  w-full  text-blue-100/80 text-sm font-semibold tracking-tight bg-transparent border-transparent outline-none "
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="  w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex justify-between items-center">
            <input
              className="autofill:shadow-[inset_0_0_0px_1000px_#125C9B] autofill:text-white       w-full focus-within:border-white/80 text-blue-100/80 text-sm font-semibold tracking-tigh bg-transparent border-transparent outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="group cursor-pointer px-24 py-3.5 bg-white/5 border border-white/20 text-white font-bold rounded-xl 
                            hover:text-white/40 flex items-center justify-center mx-auto 
                           transition-all duration-300 ease-out active:scale-95 "
          >
            <span className="text-sm uppercase tracking-tighter ">
              Login Required
            </span>
            <LuChevronRight className="ml-2 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
      </motion.form>
    </div>
  );
};

export default SignUp;
