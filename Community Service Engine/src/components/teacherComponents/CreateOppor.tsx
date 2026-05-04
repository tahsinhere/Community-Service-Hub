import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuClock } from "react-icons/lu";
import { supabase } from "../../backend/supabase";

const CreateOppor = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      if (realValue < 0) {
        setForm({ ...form, [name]: 0 });
      } else {
        setForm({ ...form, [name]: realValue });
      }
    }

    if (type != "number") {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("opportunities").insert([form]);
    if (error) {
      console.log("There was an error", error);
      alert("Did not Post");
    } else {
      alert("Posted Successfully");
    }
  };

  const inputClass =
    "[appearance:none] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none  w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-white/30 focus:bg-white/10 transition-all duration-200 text-sm";

  const labelClass =
    "text-[10px] uppercase tracking-widest text-blue-200 font-bold mb-1.5 ml-1";

  return (
    <div className="flex items-center justify-center py-40 px-4">
      <motion.div
        layout
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 2 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="max-w-md w-full bg-[#125C9B]/90 backdrop-blur-xl border border-white/10 rounded-4xl p-8 shadow-2xl overflow-hidden"
      >
        <header className="mb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white/10 rounded-lg"></div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Create Opportunity
              </h2>
            </div>
            <p className="text-blue-100/30 text-[9px] uppercase tracking-[0.3em] ml-1">
              Teacher Portal
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 flex items-center gap-2 text-white/80">
              <LuClock size={12} className="text-blue-300" />
              <span className="text-xs font-bold">{form.hours || 0}h</span>
            </div>
          </div>
        </header>

        <form className="space-y-4">
          {/* Essential Info */}
          <div className="space-y-4">
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
                <label className={labelClass}>Teacher</label>
                <input
                  className={inputClass}
                  name="teacher"
                  placeholder="Your name"
                  value={form.teacher}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  name="location"
                  placeholder="Room #"
                  value={form.location}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className={labelClass}>Time / Date</label>
            <input
              className={inputClass}
              name="time"
              placeholder="e.g. Monday @ 3:30 PM"
              value={form.time}
              onChange={handleInput}
            />
          </div>

          {/* Progressive Disclosure Section */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className=" cursor-pointer  flex items-center justify-between w-full p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                {isExpanded ? "Less Info" : "Add Description & Hours"}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <LuChevronDown
                  className="text-white/40 group-hover:text-white"
                  size={18}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className={labelClass}>Credit Hours</label>
                        <input
                          className={inputClass}
                          type="number"
                          name="hours"
                          placeholder="Hours Gained"
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
                          placeholder="Amount needed"
                          value={form.max_spots || ""}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>Detailed Description</label>
                      <textarea
                        className={`${inputClass} min-h-27.5 resize-none pt-3 leading-relaxed`}
                        name="description"
                        placeholder="Any description for the task or information"
                        value={form.description}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleSubmit}
            className="  cursor-pointer   w-full py-4 bg-white/95 text-[#125C9B] font-black rounded-xl shadow-xl transition-all uppercase tracking-[0.2em] text-[11px] mt-4"
          >
            Publish Opportunity
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateOppor;
