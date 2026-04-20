import { useNavigate, Link } from "react-router-dom";

interface Props {
  onLogin: () => void;
}

const Navbar = ({ onLogin }: Props) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-full mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col border-l border-white/10 pl-3">
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">
              In House Community <span className="text-[#125C9B]">Service</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              Eleanor Roosevelt HS
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white font-medium transition-colors sm:font-stretch-condensed">
            User Guide
          </button>
          <button
            onClick={onLogin}
            className="px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-lg shadow-white/5  "
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
