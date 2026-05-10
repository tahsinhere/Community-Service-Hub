import { useNavigate, Link } from "react-router-dom";
import {
  LuBookOpen,
  LuUserPlus,
  LuShieldCheck,
  LuLayoutDashboard,
  LuLogOut,
  LuLock,
} from "react-icons/lu";

const Navbar = ({ teacher, onLogout, user }) => {
  const navigate = useNavigate();

  // The logic: when they click "Teacher Access"?
  const handleTeacherAccessClick = () => {
    if (!user) {
      // If guest -> Send to the "Gate" page
      navigate("/TeacherAccess");
    } else {
      // If logged in student -> Send straight to the secret code entry
      navigate("/secretCode");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-full mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
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
          {/* 1. Verified Teacher View */}
          {teacher && (
            <Link
              to="/TeacherDashboard"
              className="flex items-center gap-2 text-[#125C9B] hover:text-blue-400 font-bold transition-colors uppercase tracking-widest text-[11px] border border-[#125C9B]/20 px-3 py-1.5 rounded-lg bg-[#125C9B]/5"
            >
              <LuLayoutDashboard className="text-lg" />
              My Posts
            </Link>
          )}

          <button className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-colors cursor-pointer text-[12px] tracking-[0.2em]">
            <LuBookOpen className="text-[15px]" />
            User Guide
          </button>

          {/* 3. Auth Button */}
          {user ? (
            <button
              onClick={onLogout}
              className="cursor-pointer px-4 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 font-bold rounded-xl hover:bg-red-600/20 hover:text-white transition-all text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <LuLogOut className="text-lg" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="cursor-pointer px-4 py-1.5 bg-white text-black font-bold rounded-xl hover:bg-gray-300 transition-all shadow-lg shadow-white/5 flex items-center gap-2"
            >
              <LuUserPlus className="text-lg" />
              Teacher
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
