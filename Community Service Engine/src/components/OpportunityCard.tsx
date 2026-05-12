import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../backend/supabase";

interface SingleObject {
  oneObject: {
    teacher: string;
    task: string;
    location: string;
    time: string;
    hours: number;
    max_spots: number;
    description: string;
    id: number;
    signups: any;
  };
}

const OpportunityCard = ({ oneObject }: SingleObject) => {
  const [spots, setSpotsLeft] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      const { count, error } = await supabase
        .from("tokens")
        .select("*", { count: "exact", head: true })
        .eq("opportunity_id", oneObject.id)
        .eq("is_claimed", false);

      if (!error) {
        setSpotsLeft(count);
      }
    };

    fetchTokens();
  }, [oneObject.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      whileHover={{
        y: 0,
        shadow:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-[#125C9B] flex flex-col justify-between gap-6 w-full p-6 rounded-3xl border border-white/10"
    >
      <div className="space-y-3">
        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">
              {oneObject.hours} {oneObject.hours === 1 ? "Hour" : "Hours"}{" "}
              Offered
            </span>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight tracking-tight group-hover:text-white/90">
            {oneObject.task}
          </h2>
          <p className="text-lg text-blue-100/80 font-medium">
            with {oneObject.teacher}
          </p>
        </div>

        {/* Spots Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10">
          <span
            className={`text-xs font-bold ${
              spots === null
                ? "text-white/40"
                : spots === 0
                  ? "text-red-400"
                  : spots < 5
                    ? "text-amber-300"
                    : "text-emerald-300"
            }`}
          >
            ●{" "}
            {spots === null
              ? "Loading..."
              : spots === 0
                ? "Full Capacity"
                : `${spots} ${spots === 1 ? "Seat Remains" : "Seats Remain"}`}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/opportunity/${oneObject.id}`)}
        className="w-full py-3 rounded-xl font-bold bg-white text-[#125C9B] hover:bg-gray-300 transition-colors shadow-md cursor-pointer"
      >
        See Details
      </button>
    </motion.div>
  );
};

export default OpportunityCard;
