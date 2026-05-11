import { useState, useEffect } from "react";
import { supabase } from "../../backend/supabase";
import CreateOppor from "./CreateOppor";
import { LuPlus, LuUsers, LuMail } from "react-icons/lu";

const TeacherDashboard = ({ user }) => {
  const [myOpps, setMyOpps] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Create an async function inside the effect
    const loadDashboardData = async () => {
      if (!user) {
        // Only set loading to false if we actually need to stop the spinner
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("opportunities")
          .select(`*, signups(*, profiles(*))`)
          .eq("teacher_id", user.id);

        if (error) throw error;

        // 2. ONLY update state once the external data is back
        setMyOpps(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        // 3. This is the only place setLoading should be called
        setLoading(false);
      }
    };

    loadDashboardData();

    // 4. Critical: Only run this when the user ID changes
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-40 selection:bg-white/20">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12 border-b border-white/10 pb-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase ">
            Dashboard
          </h1>
          <p className="text-blue-200/50 text-sm font-medium mt-2">
            Managing {myOpps.length} active opportunities
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="cursor-pointer bg-white text-[#125C9B] px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white/80 transition-all shadow-xl active:scale-95"
        >
          + Create New
        </button>
      </div>

      {/* --- CARDS GRID --- */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-64 bg-white/5 animate-pulse rounded-[2rem]" />
          <div className="h-64 bg-white/5 animate-pulse rounded-[2rem]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {myOpps.map((opp) => (
            <div
              key={opp.id}
              className="bg-[#125C9B] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col transition-transform hover:translate-y-[-4px]"
            >
              {/* Card Header */}
              <div className="p-8 border-b border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-white leading-none tracking-tight">
                    {opp.task}
                  </h3>
                  <span className="bg-white/10 text-white border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                    {opp.signups?.length || 0} / {opp.max_spots}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                  {opp.time} • {opp.location}
                </p>
              </div>

              {/* Roster Section */}
              <div className="p-8 flex-1 bg-white/5">
                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <LuUsers size={14} /> Registered Students
                </h4>

                <div className="space-y-3">
                  {opp.signups && opp.signups.length > 0 ? (
                    opp.signups.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/10 border border-white/10 text-white rounded-full flex items-center justify-center font-bold text-xs">
                            {s.profiles?.full_name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-none">
                              {s.profiles?.full_name}
                            </p>
                            <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest font-medium">
                              {s.profiles?.email}
                            </p>
                          </div>
                        </div>
                        <a
                          href={`mailto:${s.profiles?.email}`}
                          className="text-white/20 hover:text-white transition-colors p-2"
                        >
                          <LuMail size={16} />
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                        Empty Roster
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- CREATE MODAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-8">
          <div
            onClick={() => setShowCreateModal(false)}
            className="absolute inset-0 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg max-h overflow-y-hidden ">
            <CreateOppor user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
