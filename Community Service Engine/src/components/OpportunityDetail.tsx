import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../backend/supabase";
import { toast } from "sonner";
import CannotFind from "./CannotFind";
import LoadingCard from "./LoadingCard";
import { useEffect, useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface SingleObject {
  oppor: {
    id: number;
    task: string;
    teacher: string;
    location: string;
    time: string;
    hours: number;
    max_spots: number;
    description: string;
  };
}

const OpportunityDetail = ({ oppor, user, dataLoading }: SingleObject) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedOpp = oppor.find((item) => item.id === Number(id));

  useEffect(() => {
    const checkButton = async () => {
      // 1. If there's no user or the opportunity hasn't loaded, stop.
      if (!user || !selectedOpp) {
        setLoading(false);
        return;
      }

      // 2. Ask Supabase: Does a signup exist for this student + this opp?
      const { data } = await supabase
        .from("signups")
        .select("id")
        .eq("opportunity_id", selectedOpp.id)
        .eq("student_id", user.id)
        .maybeSingle();

      // found a match!
      if (data) {
        setSubmit(true);
        setConfirm(false);
      }
      setLoading(false);
    };

    checkButton();
  }, [user, selectedOpp]);

  if (dataLoading) {
    return <LoadingCard />;
  }

  if (!selectedOpp) {
    return <CannotFind id={id} />;
  }

  const spotTaken = selectedOpp.signups?.[0]?.count || 0;

  const spotsLeft = selectedOpp.max_spots - spotTaken;

  const handleVolunteer = async () => {
    setConfirm(false);
    if (!user) {
      toast.error("Please Sign Up First");
      return;
    }

    const { error } = await supabase
      .from("signups")
      .insert([{ opportunity_id: selectedOpp.id, student_id: user.id }]);

    if (error) {
      console.log("Error details:", error);
      toast.error("Registration failed. Please try again.");
    }

    toast.success("Successfuly Volunteered");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    setSubmit(true);
  };

  return (
    <div className="flex items-center justify-center p-6">
      {/* --- NEW MODAL CODE START --- */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setConfirm(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
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
                <div className="bg-slate-50 border-l-4 border-slate-400 p-5 rounded-r-lg">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    This platform functions exclusively as a{" "}
                    <span className="font-semibold text-slate-900">
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
                  Registration cannot be cancelled through this interface.
                  Should unforeseen circumstances arise preventing your
                  attendance, it is your responsibility to notify the instructor
                  directly.
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
      )}
      {/* --- NEW MODAL CODE END --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative max-w-4xl w-full bg-[#125C9B] border border-white/20 p-8 md:p-16 rounded-3xl shadow-2xl"
      >
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-8 text-white/60 hover:text-white transition-all flex items-center gap-2 group font-medium cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Explore
        </button>

        <header className="mb-8 mt-4">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">
            {selectedOpp.task}
          </h1>

          <p className="text-xl text-blue-100/90 font-medium">
            By {selectedOpp.teacher}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/20 mb-8">
          <div>
            <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
              Location
            </p>
            <p className="text-white text-lg font-semibold">
              {selectedOpp.location}
            </p>
          </div>
          <div>
            <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
              Time
            </p>
            <p className="text-white text-lg font-semibold">
              {selectedOpp.time}
            </p>
          </div>
          <div>
            <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
              Credit
            </p>
            <p className="text-white text-lg font-semibold">
              {selectedOpp.hours}h Offered
            </p>
          </div>
          <div>
            <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
              Spots
            </p>
            <p
              className={`text-lg font-bold ${spotsLeft < 5 ? "text-amber-300" : "text-emerald-300"}`}
            >
              {spotsLeft} Left
            </p>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-xl text-blue-50/80 leading-relaxed">
            {selectedOpp.description}
          </p>
        </section>
        <div className="h-13 flex items-center">
          {loading ? (
            <div className="h-full w-40 bg-white/5 animate-pulse rounded-lg border border-white/10" />
          ) : (
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
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OpportunityDetail;
