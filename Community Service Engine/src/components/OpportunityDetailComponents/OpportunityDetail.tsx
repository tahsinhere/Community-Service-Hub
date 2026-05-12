import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../backend/supabase";
import { toast } from "sonner";
import CannotFind from "../CannotFind";
import LoadingCard from "../LoadingCard";
import { useEffect, useState } from "react";

import OpportunityModal from "./OpportunityModal";
import OpportunityHeader from "./OpportunityHeader";
import TokenDisplay from "./TokenDisplay";
import TheDetails from "./TheDetails";
import VolunteerButton from "./VolunteerButton";

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
}

const OpportunityDetail = ({ oppor, dataLoading }: SingleObject) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenCode, setTokenCode] = useState<string | null>(null);

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
        .eq("opportunity_id", selectedOpp.id)
        .eq("is_claimed", false);

      if (error) {
        toast.error("Error has occurred...");
        console.log(error);
      } else if (data) {
        setTokenCount(data);
      }
    };

    fetchTokens();
  }, [selectedOpp]);

  useEffect(() => {
    const checkLocalStorage = async () => {
      if (!selectedOpp) {
        setLoading(false);
        return;
      }

      const localStorageToken = localStorage.getItem(`token-${selectedOpp.id}`);

      if (localStorageToken) {
        setTokenCode(localStorageToken);
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

  const spotsLeft = tokenCount.length;

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

    if (data) {
      setTokenCode(data);
      localStorage.setItem(`token-${selectedOpp.id}`, data);
      toast.success("Successfuly Volunteered");
    }
    setTimeout(() => {
      window.location.reload();
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
      </button>{" "}
      ;
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative max-w-4xl w-full bg-[#125C9B] border border-white/20 p-8 md:p-16 rounded-3xl shadow-2xl"
      >
        <OpportunityHeader navigate={navigate} selectedOpp={selectedOpp} />
        <TheDetails spotsLeft={spotsLeft} selectedOpp={selectedOpp} />
        {isSubmit && tokenCode && <TokenDisplay tokenCode={tokenCode} />}

        <div className="h-13 flex items-center">
          {loading ? (
            <div className="h-full w-40 bg-white/5 animate-pulse rounded-lg border border-white/10" />
          ) : (
            <VolunteerButton
              isSubmit={isSubmit}
              spotsLeft={spotsLeft}
              setConfirm={setConfirm}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OpportunityDetail;
