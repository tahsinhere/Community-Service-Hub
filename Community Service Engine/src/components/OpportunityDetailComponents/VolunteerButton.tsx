import { HiOutlineTicket, HiCheckCircle, HiLockClosed } from "react-icons/hi2";
import { RiLoader4Line } from "react-icons/ri";

const VolunteerButton = ({ isSubmit, spotsLeft, setConfirm, tokenCount }) => {
  const isInitialLoading = tokenCount === null && !isSubmit;
  const isFull = spotsLeft <= 0;
  const isClaimed = isSubmit;
  const canVolunteer = !isClaimed && !isFull && !isInitialLoading;

  const getButtonStyles = () => {
    if (isInitialLoading) return "bg-white/5 border-white/10 text-white/20";
    if (isClaimed)
      return "bg-emerald-500/10 border-emerald-500/40 text-emerald-500";
    if (isFull) return "bg-slate-100 border-slate-200 text-slate-400";
    return "text-white border-white/60 hover:bg-[#0e4a7d] shadow-lg cursor-pointer";
  };

  return (
    <button
      onClick={() => canVolunteer && setConfirm(true)}
      disabled={!canVolunteer}
      className={`group flex items-center justify-center min-w-50 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-xl transition-all border-2 ${getButtonStyles()}`}
    >
      <div className="flex items-center gap-3">
        {isInitialLoading ? (
          <RiLoader4Line className="text-xl animate-spin" />
        ) : isClaimed ? (
          <>
            <HiCheckCircle className="text-xl" />
            <span>Token Claimed</span>
          </>
        ) : isFull ? (
          <>
            <HiLockClosed className="text-lg opacity-50" />
            <span>Full Capacity</span>
          </>
        ) : (
          <>
            <HiOutlineTicket className="text-xl group-hover:rotate-12 transition-transform" />
            <span>Claim Token</span>
          </>
        )}
      </div>
    </button>
  );
};

export default VolunteerButton;
