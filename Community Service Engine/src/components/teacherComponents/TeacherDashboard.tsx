import { useState, useEffect } from "react";
import { supabase } from "../../backend/supabase";
import CreateOppor from "./CreateOppor";
import { LuUsers, LuMail, LuInfo, LuTicket, LuPlus } from "react-icons/lu";

const TeacherDashboard = ({ user }) => {
  const [myOpps, setMyOpps] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("opportunities")
          .select(`*, tokens(id, token_code, is_claimed)`)
          .eq("teacher_id", user.id);

        if (error) throw error;

        setMyOpps(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16 md:px-10 md:pt-36 selection:bg-white/20">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 md:mb-12 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Dashboard
          </h1>
          <p className="text-blue-200/50 text-xs md:text-sm font-medium mt-1">
            {myOpps.length} Active • Anonymous Token System
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className=" cursor-pointer flex items-center justify-center gap-2 bg-white text-[#125C9B] w-full md:w-auto px-8 py-4 md:py-3 rounded-2xl md:rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl active:scale-95"
        >
          <LuPlus size={16} /> New Task
        </button>
      </div>

      {/* --- CARDS GRID --- */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="h-64 bg-white/5 animate-pulse rounded-3xl" />
          <div className="h-64 bg-white/5 animate-pulse rounded-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {myOpps.map((opp) => {
            const claimedTokens = opp.tokens?.filter((t) => t.is_claimed) || [];

            return (
              <div
                key={opp.id}
                className="bg-[#125C9B] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 border-b border-white/5">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">
                    {opp.task}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest bg-black/20 px-2 py-1 rounded">
                      {opp.location}
                    </span>
                    <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      {claimedTokens.length} / {opp.max_spots} Claimed
                    </span>
                  </div>
                </div>

                {/* Claimed Tokens List */}
                <div className="p-6 md:p-8 bg-white/5 flex-1">
                  <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <LuUsers size={14} /> Claimed Token Codes
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {claimedTokens.length > 0 ? (
                      claimedTokens.map((token) => (
                        <div
                          key={token.id}
                          className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10"
                        >
                          <LuTicket className="text-white/40" size={14} />
                          <span className="text-sm font-mono font-bold text-white uppercase">
                            {token.token_code}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10 border border-dashed border-white/10 rounded-2xl">
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                          No tokens claimed yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="px-6 py-4 bg-black/20 flex items-center gap-2">
                  <LuInfo size={14} className="text-blue-300" />
                  <p className="text-[10px] text-blue-100/70 uppercase font-bold tracking-tight">
                    Verify codes upon student arrival
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          <div
            onClick={() => setShowCreateModal(false)}
            className="absolute inset-0 backdrop-blur-md bg-black/40"
          />
          <div className="relative w-full max-w-lg">
            <CreateOppor user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
