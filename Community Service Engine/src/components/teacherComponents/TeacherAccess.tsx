import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuLock, LuUserPlus, LuKey } from "react-icons/lu";

const TeacherAccess = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-neutral-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-[#125C9B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LuLock className="text-3xl text-[#125C9B]" />
        </div>

        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
          TEACHER ACCESS
        </h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Authorized faculty access only. Please verify your identity to post
          service opportunities.
        </p>

        {
          /* Case 1: Not logged in */
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest">
                Login Required
              </p>
            </div>
          </div>
        }

        <button
          onClick={() => navigate("/")}
          className="mt-8 text-gray-600 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
        >
          Back to Opportunities
        </button>
      </motion.div>
    </div>
  );
};

export default TeacherAccess;
