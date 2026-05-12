import { HiOutlineExclamationTriangle } from "react-icons/hi2";
//prettier-ignore
const OpportunityModal = ({ handleVolunteer, setConfirm }: { handleVolunteer: (...args: any) => any,  setConfirm: any}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setConfirm(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/80 rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 text-amber-600">
              <HiOutlineExclamationTriangle className="text-2xl" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Commitment Confirmation
              </h2>
            </div>

            {/* Professional Notice */}
            <div className=" bg-amber-400 border-l-4 border-slate-400 p-5 rounded-r-lg">
              <p className="text-sm text-slate-900 leading-relaxed">
                This platform functions exclusively as a{" "}
                <span className="font-bold text-slate-900">
                  scheduling mediator
                </span>
                . By confirming, you acknowledge that your registration
                constitutes a formal commitment to:
              </p>
              <ul className="mt-4 space-y-3 text-sm font-medium text-slate-800">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    Report physically to {selectedOpp.teacher}’s designated
                    classroom.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    Execute the assigned task in-person at{" "}
                    {selectedOpp.location}.
                  </span>
                </li>
              </ul>
            </div>

            {/* Legal/Expectation Footnote */}
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Post-Confirmation Protocol
            </p>
            <p className="text-xs text-slate-500 leading-normal bg-blue-50/50 p-3 rounded-md border border-blue-100">
              Registration cannot be cancelled through this interface. Should
              unforeseen circumstances arise preventing your attendance, it is
              your responsibility to notify the instructor directly.
            </p>

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                onClick={() => setConfirm(false)}
                className=" cursor-pointer  text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVolunteer}
                className=" cursor-pointer  px-8 py-3 bg-[#125C9B] text-white text-sm font-black rounded-lg hover:bg-[#0a4a7c] active:scale-95 transition-all  shadow-blue-900/20"
              >
                Confirm Participation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
