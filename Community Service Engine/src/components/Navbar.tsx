import { useNavigate, Link } from "react-router-dom";
import {
  LuBookOpen,
  LuUserPlus,
  LuShieldCheck,
  LuLayoutDashboard,
} from "react-icons/lu";

const Navbar = ({ teacher }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-full mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <LuShieldCheck className="text-2xl text-[#125C9B] transition-transform" />
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
          {/* TEACHER ONLY: "My Posts" */}
          {teacher && (
            <Link
              to="/TeacherDashboard"
              className="flex items-center gap-2 text-[#125C9B] hover:text-blue-400 font-bold transition-colors uppercase tracking-widest text-[11px] border border-[#125C9B]/20 px-3 py-1.5 rounded-lg bg-[#125C9B]/5"
            >
              <LuLayoutDashboard className="text-lg" />
              My Posts
            </Link>
          )}

          <button className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors">
            <LuBookOpen className="text-lg" />
            User Guide
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="cursor-pointer px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-lg shadow-white/5 flex items-center gap-2 "
          >
            <LuUserPlus className="text-lg" />
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
