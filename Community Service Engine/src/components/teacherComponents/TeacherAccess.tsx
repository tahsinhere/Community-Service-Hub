import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuLock, LuChevronRight } from "react-icons/lu";

const TeacherAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-40 px-4 selection:bg-white/30">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 2 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-12 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="relative w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <LuLock className="text-3xl text-white/30" />
        </div>

        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
          TEACHER ACCESS
        </h2>

        <p className="text-white/50 text-sm mb-8 leading-relaxed px-4 font-medium  tracking-wider">
          Login required to access opportunitity posting permissions
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="group cursor-pointer px-20 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl 
                      hover:text-white/40 flex items-center justify-center mx-auto 
                     transition-all duration-300 ease-out active:scale-95 shadow-lg"
        >
          <span className="text-sm uppercase tracking-tighter ">
            Login Required
          </span>
          <LuChevronRight className="ml-2 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </button>

        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mt-8 text-white/30 hover:text-white/60 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors"
        >
          Back to Opportunities
        </button>
      </motion.div>
    </div>
  );
};

export default TeacherAccess;
