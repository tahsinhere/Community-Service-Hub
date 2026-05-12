import { HiOutlineTicket, HiCheckCircle, HiLockClosed } from "react-icons/hi2";

const VolunteerButton = ({ isSubmit, spotsLeft, setConfirm }) => {
  // 1. Determine the button state for cleaner logic
  const isFull = spotsLeft <= 0;
  const isClaimed = isSubmit;
  const canVolunteer = !isClaimed && !isFull;

  // 2. Define styles based on state
  const getButtonStyles = () => {
    if (isClaimed)
      return "bg-emerald-500/10 border-emerald-500/40 text-emerald-500 cursor-not-allowed";
    if (isFull)
      return "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed";

    // Active State (Brand Blue/White)
    return " text-white border-white/60 hover:bg-[#0e4a7d] hover:scale-101 hover:shadow-lg active:scale-99 cursor-pointer shadow-lg";
  };

  return (
    <button
      onClick={() => canVolunteer && setConfirm(true)}
      disabled={!canVolunteer}
      className={`group relative flex items-center justify-center px-8 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all border-2 ${getButtonStyles()}`}
    >
      <div className="flex items-center gap-3">
        {isClaimed ? (
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

      {/* Subtle "Low Capacity" alert pulse if only 1 or 2 spots left */}
      {!isFull && !isClaimed && spotsLeft <= 2 && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className=" absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      )}
    </button>
  );
};

export default VolunteerButton;
