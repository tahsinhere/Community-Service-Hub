import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LuBookOpen,
  LuUserPlus,
  LuShieldCheck,
  LuLayoutDashboard,
  LuLogOut,
  LuLock,
  LuUser,
  LuMail,
  LuChevronDown,
} from "react-icons/lu";

const Navbar = ({ teacher, onLogout, user }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userName =
    user?.user_metadata?.name || user?.user_metadata?.full_name || "User";
  const userEmail = user?.email || "No email provided";
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTeacherAccessClick = () => {
    if (!user) navigate("/TeacherAccess");
    else navigate("/secretCode");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-full mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <LuShieldCheck className="text-2xl text-[#125C9B]" />
          <div className="flex flex-col border-l border-white/10 pl-3">
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">
              In House Community <span className="text-[#125C9B]">Service</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              Eleanor Roosevelt HS
            </p>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-6">
          {teacher && (
            <Link
              to="/TeacherDashboard"
              className="flex items-center gap-2 text-[#125C9B] hover:text-blue-400 font-bold transition-colors uppercase tracking-widest text-[11px] border border-[#125C9B]/20 px-3 py-1.5 rounded-lg bg-[#125C9B]/5"
            >
              <LuLayoutDashboard className="text-lg" />
              My Posts
            </Link>
          )}

          {!teacher && (
            <button
              onClick={handleTeacherAccessClick}
              className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-colors text-[12px] tracking-[0.2em]"
            >
              <LuLock className="text-[15px]" />
              Teacher Access
            </button>
          )}

          <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-colors text-[12px] tracking-[0.2em]">
            <LuBookOpen className="text-[15px]" />
            User Guide
          </button>

          {/* Improved Profile Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="group flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#125C9B] to-[#0a3d66] flex items-center justify-center text-white shadow-lg ring-2 ring-white/5 group-hover:ring-[#125C9B]/50 transition-all">
                  {userName !== "User" ? (
                    <span className="font-black text-xs">{userInitial}</span>
                  ) : (
                    <LuUser className="text-sm" />
                  )}
                </div>
                <LuChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#121212] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60] overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                  {/* Dropdown Header */}
                  <div className="p-4 bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#125C9B] flex items-center justify-center text-white font-black">
                        {userInitial}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-bold text-white truncate leading-none mb-1">
                          {userName}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate flex items-center gap-1">
                          <LuMail className="text-[8px]" /> {userEmail}
                        </p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div
                      className={`text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded-md inline-block ${
                        teacher
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-[#125C9B]/10 text-[#125C9B] border border-[#125C9B]/20"
                      }`}
                    >
                      {teacher ? "Authorized Staff" : "Student Member"}
                    </div>
                  </div>

                  {/* Dropdown Actions */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <LuLogOut className="text-lg" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">
                          Sign Out
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="cursor-pointer px-5 py-2 bg-white text-black text-[12px] font-black uppercase tracking-widest rounded-full hover:bg-blue-50 transition-all shadow-lg shadow-white/5 flex items-center gap-2 active:scale-95"
            >
              <LuUserPlus className="text-lg" />
              Join Now
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
