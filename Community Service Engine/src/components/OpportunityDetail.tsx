import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface WholeObject {
  oppor: any[];
}

const OpportunityDetail = ({ oppor }: WholeObject) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedOpp = oppor.find((item) => item.id === Number(id));

  if (selectedOpp === undefined) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-black text-white mb-2">Not Found</h1>
          <p className="text-gray-400 mb-8">
            We couldn't find the opportunity with ID:{" "}
            <span className="text-blue-600 font-mono">{id}</span>
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-[#125C9B] text-white font-bold rounded-xl hover:bg-blue-900 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      {/* Just ONE animation on the main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl"
      >
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 left-5 text-gray-400 hover:text-white transition-all flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Back to Explore
        </button>

        <header className="mb-8">
          <h1 className="text-5xl font-black text-[#125C9B] mb-2">
            {selectedOpp.task}
          </h1>
          <p className="text-xl text-gray-400">By {selectedOpp.teacher}</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-8">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">
              Location
            </p>
            <p className="text-white text-lg">{selectedOpp.location}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Time</p>
            <p className="text-white text-lg">{selectedOpp.time}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Credit</p>
            <p className="text-white text-lg">{selectedOpp.hours}h offered </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold">Spots</p>
            <p
              className={`text-lg font-bold ${selectedOpp.max_spots < 5 ? "text-amber-400" : "text-emerald-400"}`}
            >
              {selectedOpp.max_spots} Left
            </p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-xl text-gray-300">{selectedOpp.description}</p>
        </section>

        <button className="px-12 py-4 bg-[#125C9B] text-white font-bold rounded-2xl">
          Volunteer
        </button>
      </motion.div>
    </div>
  );
};

export default OpportunityDetail;
