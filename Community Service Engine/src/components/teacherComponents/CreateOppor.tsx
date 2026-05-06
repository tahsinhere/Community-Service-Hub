import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuClock } from "react-icons/lu";
import { supabase } from "../../backend/supabase";
import { toast } from "sonner";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const CreateOppor = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // New Modal State
  const [form, setForm] = useState({
    teacher: "",
    task: "",
    location: "",
    time: "",
    hours: 0,
    max_spots: 0,
    description: "",
    teacher_id: user?.id,
  });

  const handleInput = (event) => {
    const { name, value, type } = event.target;
    if (type === "number") {
      const realValue = parseInt(value) || 0;
      setForm({ ...form, [name]: realValue < 0 ? 0 : realValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Validation Check
  const validateForm = () => {
    const { teacher, task, location, time, hours, max_spots, description } =
      form;
    if (!teacher || !task || !location || !time || !description) {
      toast.error("Please fill in all text fields.");
      return false;
    }
    if (hours <= 0 || max_spots <= 0) {
      toast.error("Hours and Capacity must be greater than 0.");
      return false;
    }
    return true;
  };

  const triggerConfirm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  const handleSubmit = async () => {
    setShowConfirm(false);

    const { error } = await supabase.from("opportunities").insert([form]);

    if (error) {
      console.log("There was an error", error);
      toast.error("Posting failed. Check connection.");
    } else {
      toast.success("Opportunity Live!");

      setIsExpanded(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const inputClass =
    "[appearance:none] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-white/30 focus:bg-white/10 transition-all duration-200 text-sm";
  const labelClass =
    "text-[10px] uppercase tracking-widest text-blue-200 font-bold mb-1.5 ml-1";

  return (
    <div className="flex items-center justify-center py-40 px-4">
      {/* --- TEACHER CONFIRMATION MODAL --- */}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setShowConfirm(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 text-red-600">
                  <HiOutlineExclamationTriangle className="text-2xl" />
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Finalize Publication
                  </h2>
                </div>

                {/* Warning Section */}
                <div className="bg-white/40 border-l-4 border-red-500 p-5 rounded-r-lg space-y-3">
                  <p className="text-sm text-slate-700 font-bold leading-relaxed">
                    Critical Notice:
                  </p>
                  <ul className="space-y-3 text-xs font-medium text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      <span>
                        Opportunities{" "}
                        <span className="text-red-600 font-bold uppercase">
                          cannot be edited or deleted
                        </span>{" "}
                        once live to prevent scheduling conflicts.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span>
                        This post will be automatically archived and removed
                        from the student feed once the time limit is reached.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span>
                        Visible to all{" "}
                        <span className="font-bold text-slate-900">
                          500+ active users
                        </span>{" "}
                        immediately.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-end gap-4 pt-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="cursor-pointer text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer px-8 py-3 bg-[#125C9B] text-white text-sm font-black rounded-lg hover:bg-[#0a4a7c] active:scale-95 transition-all shadow-lg"
                  >
                    Confirm & Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <motion.div
        layout
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        className="max-w-md w-full bg-[#125C9B]/90 backdrop-blur-xl border border-white/10 rounded-4xl p-8 shadow-2xl"
      >
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Create Opportunity
            </h2>
            <p className="text-blue-100/30 text-[9px] uppercase tracking-[0.3em] ml-1">
              Teacher Portal
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 flex items-center gap-2 text-white/80">
            <LuClock size={12} className="text-blue-300" />
            <span className="text-xs font-bold">{form.hours || 0}h</span>
          </div>
        </header>

        <form className="space-y-4" onSubmit={triggerConfirm}>
          <div className="flex flex-col">
            <label className={labelClass}>Opportunity Title</label>
            <input
              className={inputClass}
              name="task"
              placeholder="e.g. Library Assistant"
              value={form.task}
              onChange={handleInput}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={labelClass}>Teacher Name</label>
              <input
                className={inputClass}
                name="teacher"
                placeholder="Mr. Smith"
                value={form.teacher}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col">
              <label className={labelClass}>Location</label>
              <input
                className={inputClass}
                name="location"
                placeholder="Room 202"
                value={form.location}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>Time / Date</label>
            <input
              className={inputClass}
              name="time"
              placeholder="Monday @ 3:30 PM"
              value={form.time}
              onChange={handleInput}
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer flex items-center justify-between w-full p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">
                {isExpanded ? "Less Info" : "Add Description & Hours"}
              </span>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <LuChevronDown
                  size={18}
                  className="text-white/40 group-hover:text-white"
                />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pt-4 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className={labelClass}>Credit Hours</label>
                      <input
                        className={inputClass}
                        type="number"
                        name="hours"
                        value={form.hours || ""}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>Max Capacity</label>
                      <input
                        className={inputClass}
                        type="number"
                        name="max_spots"
                        value={form.max_spots || ""}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className={labelClass}>Detailed Description</label>
                    <textarea
                      className={`${inputClass} min-h-24 resize-none`}
                      name="description"
                      placeholder="What will students be doing?"
                      value={form.description}
                      onChange={handleInput}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-4 bg-white text-[#125C9B] font-black rounded-xl shadow-xl transition-all uppercase tracking-[0.2em] text-[11px] mt-4 hover:bg-blue-50 active:scale-[0.98]"
          >
            Publish Opportunity
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateOppor;
