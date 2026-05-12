const VolunteerButton = ({ isSubmit, spotsLeft, setConfirm }) => {
  return (
    <button
      onClick={() => setConfirm(true)}
      disabled={isSubmit || spotsLeft <= 0}
      className={`h-full px-10 text-sm font-bold tracking-tight rounded-lg transition-all border ${
        isSubmit
          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 cursor-not-allowed"
          : spotsLeft <= 0
            ? "bg-transparent border-white/10 text-white/30 cursor-not-allowed"
            : "bg-white text-[#125C9B] border-white hover:bg-slate-100 active:scale-[0.98] cursor-pointer rounded-lg"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isSubmit ? (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Registration Confirmed</span>
          </>
        ) : spotsLeft <= 0 ? (
          "Capacity reached"
        ) : (
          "Volunteer"
        )}
      </div>
    </button>
  );
};

export default VolunteerButton;
