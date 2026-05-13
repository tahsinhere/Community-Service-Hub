import { motion } from "framer-motion";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { toast } from "sonner";

const TokenDisplay = ({ tokenCode }: { tokenCode: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenCode);
    toast.success("Token copied!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-2"
    >
      <div className="flex flex-col items-start space-y-4">
        {/* Status Label */}
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <HiOutlineCheckBadge className="text-emerald-400 text-sm" />
          <span className="text-emerald-400 text-[10px] uppercase font-black tracking-widest">
            Registration Verified
          </span>
        </div>

        {/* The Token Row */}
        <div className="flex flex-wrap items-end gap-6">
          <div
            onClick={copyToClipboard}
            className="group cursor-pointer active:scale-95 transition-all"
          >
            <p className="text-blue-200/50 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
              Your Unique Code
            </p>
            <div className="flex items-center gap-4">
              <span className="text-5xl md:text-6xl font-mono font-black text-white tracking-tighter">
                {tokenCode}
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                <HiOutlineDocumentDuplicate className="text-xl text-blue-200/40 group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* Verification Instruction */}
          <div className="max-w-50 pb-1">
            <p className="text-white/80 text-xs leading-relaxed font-bold border-l border-white/10 pl-4">
              Show this to your instructor to verify your attendance.
              <span className="text-white/60 font-semibold block mt-2 ">
                Copy or Memorize it
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenDisplay;
