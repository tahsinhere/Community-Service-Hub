import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc"; // High-quality flat SVG Google icon

const SignUp = ({ onLogin }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-12  text-center"
      >
        <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
          Ready to serve?
        </h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Sign in and join community opportunities.
        </p>

        <button
          onClick={onLogin}
          className="cursor-pointer w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:bg-gray-200 transition-all active:scale-[0.98]"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
};

export default SignUp;
