import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../backend/supabase";
import { toast } from "sonner";
import CannotFind from "../CannotFind";
import LoadingCard from "../LoadingCard";
import { useEffect, useState } from "react";

import OpportunityModal from "./OpportunityModal";
import OpportunityHeader from "./OpportunityHeader";

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
  dataLoading: boolean;
  user: any;
}

const OpportunityDetail = ({ oppor, user, dataLoading }: SingleObject) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const selectedOpp = oppor.find((item) => item.id === Number(id));

  useEffect(() => {
    const checkButton = async () => {
      // 1. If there's no user or the opportunity hasn't loaded, stop.
      if (!user || !selectedOpp) {
        setLoading(false);
        return;
      }

      // 2.  Does a signup exist for this student + this opp?
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
    //prettier-ignore
    const {data, error } = await supabase.rpc("claim_token", {target_opportunity_id:selectedOpp.id});

    if (error) {
      console.log("Error details:", error);
      toast.error("Registration failed. Please try again.");
    }

    if (data === "FULL") {
      toast.error("Sorry, this event is full");
    }
    setToken(data);
    localStorage.setItem(`The token ${selectedOpp.id}`, data);
    toast.success("Successfuly Volunteered");

    setTimeout(() => {
      // window.location.reload();
    }, 500);
    setSubmit(true);
  };

  return (
    <div className="flex items-center justify-center p-6">
      {confirm && (
        <OpportunityModal
          handleVolunteer={handleVolunteer}
          setConfirm={setConfirm}
          selectedOpp={selectedOpp}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative max-w-4xl w-full bg-[#125C9B] border border-white/20 p-8 md:p-16 rounded-3xl shadow-2xl"
      >
        <OpportunityHeader navigate={navigate} selectedOpp={selectedOpp} />

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
