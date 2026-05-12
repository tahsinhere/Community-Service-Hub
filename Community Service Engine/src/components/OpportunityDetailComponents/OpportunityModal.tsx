import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const OpportunityModal = ({
  handleVolunteer,
  setConfirm,
  selectedOpp,
}: {
  handleVolunteer: (...args: any) => any;
  setConfirm: any;
  selectedOpp: any;
}) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      {/* Heavy Backdrop */}
      <div
        onClick={() => setConfirm(false)}
        className="absolute inset-0  backdrop-blur-sm transition-opacity"
      />

      {/* Optimized Compact Modal */}
      <div className="relative z-10 w-full max-w-100 bg-[#125C9B] rounded-4xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="p-7 md:p-9">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3">
              <HiOutlineExclamationTriangle className="text-3xl text-white" />
              <h2 className="text-lg font-black uppercase tracking-widest text-white">
                Final Commitment
              </h2>
              <p className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest">
                Academic Integrity Protocol
              </p>
            </div>

            {/* Steps & Honesty Logic */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-5 w-5 rounded bg-[#125C9B] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-[12px] text-slate-700 leading-tight font-bold">
                    <span className="text-slate-950">Claim:</span> Confirming
                    claims 1 of {selectedOpp.capacity} spots. This action is{" "}
                    <span className="underline">permanent</span> and affects
                    peer availability.
                  </p>
                </div>

                <div className="flex gap-4 border-t border-slate-100 pt-4">
                  <div className="h-5 w-5 rounded bg-[#125C9B] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-[12px] text-slate-700 leading-tight font-bold">
                    <span className="text-slate-950">Code:</span> A unique
                    verification code will be generated immediately.{" "}
                    <span className="text-[#125C9B]">Remember this code</span>{" "}
                    and provide it to {selectedOpp.teacher}.
                  </p>
                </div>

                <div className="flex gap-4 border-t border-slate-100 pt-4">
                  <div className="h-5 w-5 rounded bg-[#125C9B] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-[12px] text-slate-700 leading-tight font-bold">
                    <span className="text-slate-950">Verify:</span> Present this
                    code to{" "}
                    <span className="italic">{selectedOpp.teacher}</span> at{" "}
                    <span className="italic text-[#125C9B]">
                      {selectedOpp.location}
                    </span>{" "}
                    to verify your hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 pt-2 text-center">
              <p className="text-[10px] font-bold text-blue-100/70 italic px-4">
                "I affirm that I will fulfill this commitment according to ERHS
                honesty standards."
              </p>

              <button
                onClick={handleVolunteer}
                className="w-full cursor-pointer py-4 bg-white text-[#125C9B] text-[11px] font-black rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all uppercase tracking-widest shadow-lg"
              >
                Accept & Get Code
              </button>

              <button
                onClick={() => setConfirm(false)}
                className="w-full cursor-pointer py-2 text-[10px] font-bold text-blue-200/50 hover:text-white transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
