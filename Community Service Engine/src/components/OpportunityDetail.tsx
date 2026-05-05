import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../backend/supabase";

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

const OpportunityDetail = ({ oppor, user }: SingleObject) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedOpp = oppor.find((item) => item.id === Number(id));

  const spotTaken = selectedOpp.signups?.[0]?.count || 0;

  const spotsLeft = selectedOpp.max_spots - spotTaken;

  const handleVolunteer = async () => {
    if (!user) {
      alert("Sign Up first");
      return;
    }

    const { error } = await supabase
      .from("signups")
      .insert([{ opportunity_id: selectedOpp.id, student_id: user.id }]);

    if (error) {
      console.log("Error details:", error);

      if (error.code === "23505") {
        alert("You are already signed up");
      } else {
        alert(`Error: ${error.message}`);
      }
      return;
    }

    alert("Successfully volunteered!");
  };

  if (selectedOpp === undefined) {
    return (
      <div className="flex flex-col items-center justify-center p-30 text-center">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 2 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-black text-white mb-2">Not Found</h1>
          <p className="text-gray-400 mb-8">
            We couldn't find the opportunity with ID:{" "}
            <span className="text-[#125C9B] font-mono">{id}</span>
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-[#125C9B] text-white font-bold rounded-xl hover:bg-[#054e8d] transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center p-6">
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

        {/* Grid Section - increased border opacity for better contrast on blue */}
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
          onClick={handleVolunteer}
          className="px-12 py-4 bg-white text-[#125C9B] font-black rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
        >
          Volunteer Now
        </button>
      </motion.div>
    </div>
  );
};

export default OpportunityDetail;
