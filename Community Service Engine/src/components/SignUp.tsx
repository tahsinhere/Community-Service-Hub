import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onLogin }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center py-32 px-4 selection:bg-white/30">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
      >
        {/* Header Section */}
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

        {/* Form Placeholders */}
        <div className="space-y-3 mb-6">
          <div className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex justify-between items-center">
            <span className="text-blue-100/80 text-sm font-semibold tracking-tight">
              Email address
            </span>
            <span className="text-[10px] text-white/20 font-bold tracking-widest">
              SOON
            </span>
          </div>
          <div className="w-full py-4 px-6 bg-white/10 border border-white/10 rounded-2xl flex justify-between items-center">
            <span className="text-blue-100/80 text-sm font-semibold tracking-tight">
              Password
            </span>
            <span className="text-[10px] text-white/20 font-bold tracking-widest">
              SOON
            </span>
          </div>
          <button className="w-full py-4 bg-white/5 text-white/30 font-bold rounded-2xl border border-white/5 cursor-not-allowed uppercase tracking-widest text-[11px]">
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-white/40 text-[10px] font-bold tracking-widest">
            OR
          </span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* Google  */}
        <button
          onClick={onLogin}
          className="w-full py-4 bg-white text-[#125C9B] font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-transform cursor-pointer "
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm tracking-tight">Continue with Google</span>
        </button>

        {/* Teacher Entry */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            onClick={() => navigate("/secretCode")}
            className="w-full py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-sm cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Teacher Dashboard</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
          <p className="text-[10px] text-white/40 mt-3 font-medium uppercase  tracking-tighter italic">
            [Code Required] Authorized Only For Teachers
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
