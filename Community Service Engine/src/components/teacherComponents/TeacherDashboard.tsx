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
        <input
          className="px-4 py-4 bg-white"
          name="teacher"
          value={form.teacher}
          onChange={handleInput}
        ></input>
        <input
          className="px-4 py-4 bg-white"
          name="task"
          value={form.task}
          onChange={handleInput}
        ></input>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
