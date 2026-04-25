import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SignUp = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center py-32 px-4 selection:bg-blue-500/30">
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-md w-full bg-[#1A1C1E] border border-white/10 rounded-[2.5rem] p-8 "
      >
        {/* Header Section */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-6 bg-blue-500 rounded-full" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">
              System Access
            </span>
          </div>
          <h2 className="text-4xl font-black text-white leading-none tracking-tight">
            SERVICE HUB
          </h2>
        </div>

        {/* Form Placeholders */}
        <div className="space-y-3 mb-6">
          <div className="w-full py-4 px-6 bg-white/[0.04] border border-white/5 rounded-2xl flex justify-between items-center group">
            <span className="text-neutral-400 text-sm font-semibold tracking-tight">
              Email address
            </span>
            <span className="text-[10px] text-white/20 font-bold tracking-widest">
              SOON
            </span>
          </div>
          <div className="w-full py-4 px-6 bg-white/[0.04] border border-white/5 rounded-2xl flex justify-between items-center group">
            <span className="text-neutral-400 text-sm font-semibold tracking-tight">
              Password
            </span>
            <span className="text-[10px] text-white/20 font-bold tracking-widest">
              SOON
            </span>
          </div>
          <button className="w-full py-4 bg-white/5 text-white/20 font-bold rounded-2xl border border-white/5 cursor-not-allowed uppercase tracking-widest text-[11px]">
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-white/20 text-[10px] font-bold tracking-widest">
            OR
          </span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* Google  */}
        <button
          onClick={onLogin}
          className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform cursor-pointer shadow-xl mb-4"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm tracking-tight">Continue with Google</span>
        </button>

        {/* Teacher Entry */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <button
            onClick={onLogin}
            className="w-full py-4 bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold rounded-2xl hover:bg-blue-600/20 transition-all text-sm cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Teacher Dashboard</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
          <p className="text-[10px] text-white/20 mt-3 font-medium uppercase tracking-tighter">
            Authorized For Only Teachers
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
