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
  }, [user, user.id]);

  return (
    <div className="max-w-6xl mx-auto p-40">
      {/* --- HEADER & CREATE TRIGGER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage your {myOpps.length} active opportunities
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="cursor-pointer bg-[#125C9B] hover:bg-[#0a4a7c] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
        >
          <LuPlus size={20} />
          Create New
        </button>
      </div>

      {/* --- CARDS GRID --- */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 bg-slate-100 animate-pulse rounded-2xl" />
          <div className="h-48 bg-slate-100 animate-pulse rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {myOpps.map((opp) => (
            <div
              key={opp.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {opp.task}
                  </h3>
                  <span className="bg-blue-100 text-[#125C9B] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    {opp.signups?.length || 0} / {opp.max_spots} Filled
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                  {opp.time} • {opp.location}
                </p>
              </div>

              {/* Roster Section */}
              <div className="p-6 flex-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <LuUsers size={14} /> Verified Roster
                </h4>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {opp.signups && opp.signups.length > 0 ? (
                    opp.signups.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 text-[#125C9B] rounded-full flex items-center justify-center font-bold text-xs">
                            {s.profiles?.full_name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 leading-none">
                              {s.profiles?.full_name}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1">
                              {s.profiles?.email}
                            </p>
                          </div>
                        </div>
                        <a
                          href={`mailto:${s.profiles?.email}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#125C9B]"
                        >
                          <LuMail size={16} />
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl">
                      <p className="text-xs text-slate-400 italic">
                        No student registrations yet.
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
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-hidden scrollbar-hide">
            {/* Pass the close and refresh logic to the child */}
            <CreateOppor
              user={user}
              onPostSuccess={() => {
                setShowCreateModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
