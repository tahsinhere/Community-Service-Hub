import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CannotFind = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-30 text-center">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 2 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-black text-white mb-2">Not Found</h1>
          <p className="text-gray-400 mb-8">
            We couldn't find the opportunity with ID:{" "}
            <span className="text-[#125C9B] font-mono">{id}</span>
          </p>
          <button
            onClick={() => navigate("/")}
            className="  cursor-pointer   w-full py-3 bg-[#125C9B] text-white font-bold rounded-xl hover:bg-[#054e8d] transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CannotFind;
