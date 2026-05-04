import { useState, useEffect } from "react";
import { supabase } from "../../backend/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface SingleObject {
  teacher: string;
  task: string;
  location: string;
  time: string;
  hours: number;
  max_spots: number;
  description: string;
  id: number;
}

const TeacherDashboard = ({ user }) => {
  const [form, setForm] = useState<SingleObject>({
    teacher: "",
    task: "",
    location: "",
    time: "",
    hours: 0,
    max_spots: 0,
    description: "",
    id: user.id,
  });

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 outline-none focus:border-[#125C9B] transition-all";
  const labelClass =
    "text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1 ml-1";

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="flex items-center justify-center py-50 px-4">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 5 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 20,
        }}
        className="max-w-md w-full bg-[#125C9B] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
      >
        {/* Teacher Input */}
        <div className="flex flex-col">
          <label className={labelClass}>Teacher Name</label>
          <input
            className={inputClass}
            name="teacher"
            placeholder="e.g. Mr. Smith"
            value={form.teacher}
            onChange={handleInput}
          />
        </div>

        {/* Task Input */}
        <div className="flex flex-col">
          <label className={labelClass}>Task / Title</label>
          <input
            className={inputClass}
            name="task"
            placeholder="e.g. Library Help"
            value={form.task}
            onChange={handleInput}
          />
        </div>

        {/* Location Input */}
        <div className="flex flex-col">
          <label className={labelClass}>Location</label>
          <input
            className={inputClass}
            name="location"
            placeholder="e.g. Room 402"
            value={form.location}
            onChange={handleInput}
          />
        </div>

        <button className="w-full py-4 bg-white text-[#125C9B] font-bold rounded-2xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs mt-4">
          Post Opportunity
        </button>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
