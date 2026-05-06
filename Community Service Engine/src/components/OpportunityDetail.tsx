import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../backend/supabase";
import { toast } from "sonner";
import CannotFind from "./CannotFind";
import LoadingCard from "./LoadingCard";
import { useEffect, useState } from "react";

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

  const selectedOpp = oppor.find((item) => item.id === Number(id));

  useEffect(() => {
    const checkButton = async () => {
      // 1. If there's no user or the opportunity hasn't loaded, stop.
      if (!user || !selectedOpp) return;

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
      }
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
    }

    toast.success("Successfuly Volunteered");
    setSubmit(true);
  };

  return (
    <div className="flex items-center justify-center p-6">
      {/* --- NEW MODAL CODE START --- */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-8">
              You are about to volunteer for {selectedOpp.task} // Note this
              cannot be undone
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setConfirm(false)} // Close if they change their mind
                className="flex-1 py-3 font-bold bg-[#125C9B] rounded-xl text-white hover:text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleVolunteer} // Actually call the Supabase function
                className="flex-1 py-3 bg-[#125C9B] text-white font-bold rounded-xl"
              >
                Yes, Confirm
              </button>
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

        <button
          onClick={() => setConfirm(true)}
          disabled={isSubmit}
          className={`px-12 py-4 font-black rounded-2xl transition-all shadow-xl ${
            isSubmit
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 cursor-not-allowed"
              : "bg-white text-[#125C9B] hover:bg-blue-50 active:scale-95 cursor-pointer"
          }`}
        >
          {isSubmit ? "Volunteered" : "Volunteer Now"}
        </button>
      </motion.div>
    </div>
  );
};

export default OpportunityDetail;
