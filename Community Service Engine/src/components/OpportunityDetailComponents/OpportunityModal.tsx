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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: Softer dark overlay */}
      <div
        onClick={() => setConfirm(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="space-y-6">
            {/* Header: Alert style */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <HiOutlineExclamationTriangle className="text-2xl text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Commitment Confirmation
              </h2>
            </div>

            {/* Professional Notice: Softer Amber Palette */}
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
              <p className="text-sm text-amber-900 leading-relaxed">
                This platform functions exclusively as a{" "}
                <span className="font-bold">scheduling mediator</span>. By
                confirming, you acknowledge a formal commitment to:
              </p>
              <ul className="mt-4 space-y-3 text-sm font-medium text-amber-800/90">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>
                    Report physically to{" "}
                    <span className="text-amber-950 font-semibold">
                      {selectedOpp.teacher}’s
                    </span>{" "}
                    designated classroom.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>
                    Execute the assigned task in-person at{" "}
                    <span className="text-amber-950 font-semibold">
                      {selectedOpp.location}
                    </span>
                    .
                  </span>
                </li>
              </ul>
            </div>

            {/* Protocol Footnote: Clean Slate/Blue mix */}
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">
                Post-Confirmation Protocol
              </p>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                Registration <span className="font-semibold">cannot</span> be
                cancelled through this interface. Should unforeseen
                circumstances arise, you must notify the instructor directly.
              </p>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirm(false)}
                className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
              >
                Go Back
              </button>
              <button
                onClick={handleVolunteer}
                className="cursor-pointer px-8 py-3 bg-[#125C9B] text-white text-sm font-bold rounded-xl hover:bg-blue-900 active:scale-95 transition-all "
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
