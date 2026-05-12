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
    tokens?: { is_claimed: boolean }[];
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
  const [tokens, setToken] = useState<string | null>(null);

  const [tokenCount, setTokenCount] = useState<{ is_claimed: boolean }[]>([]);

  const selectedOpp = oppor.find((item) => item.id === Number(id));

  useEffect(() => {
    const fetchTokens = async () => {
      if (!selectedOpp) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("tokens")
        .select("is_claimed")
        .eq("opportunity_id", selectedOpp.id);

      if (error) {
        toast.error("Error has occured...");
        console.log(error);
      }
      if (data) {
        setTokenCount(data);
      }
      fetchTokens();
    };
  }, [selectedOpp]);

  useEffect(() => {
    const checkLocalStorage = async () => {
      if (!selectedOpp) {
        setLoading(false);
        return;
      }

      const localStorageToken = localStorage.getItem(`token-${selectedOpp.id}`);

      if (localStorageToken) {
        setToken(localStorageToken);
        setSubmit(true);
      }

      setLoading(false);
    };

    checkLocalStorage();
  }, [selectedOpp]);

  if (dataLoading) {
    return <LoadingCard />;
  }

  if (!selectedOpp) {
    return <CannotFind id={id} />;
  }

  const tokenAmountLeft = tokenCount.filter(
    (tokenValue) => tokenValue.is_claimed === false,
  );
  const spotsLeft = selectedOpp.max_spots - tokenAmountLeft;

  const handleVolunteer = async () => {
    setConfirm(false);
    //prettier-ignore
    const {data, error } = await supabase.rpc("claim_token", {target_opportunity_id:selectedOpp.id});

    if (error || !data) {
      console.log("Error details:", error);
      toast.error("Registration failed. Please try again.");
    }

    if (data === "FULL") {
      setLoading(false);
      toast.error("Sorry, this event is full");
    }
    setToken(data);
    localStorage.setItem(`token-${selectedOpp.id}`, data);
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
      <button
        onClick={() => {
          localStorage.removeItem(`token-${selectedOpp.id}`);
          window.location.reload();
        }}
        className="text-xs text-red-400 underline mt-4"
      >
        Debug: Reset Registration
      </button>
      ;
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative max-w-4xl w-full bg-[#125C9B] border border-white/20 p-8 md:p-16 rounded-3xl shadow-2xl"
      >
        <OpportunityHeader navigate={navigate} selectedOpp={selectedOpp} />

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
