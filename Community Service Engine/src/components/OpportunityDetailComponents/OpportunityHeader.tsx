const OpportunityHeader = ({ navigate, selectedOpp }) => {
  return (
    <div>
      {" "}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-8 text-white/60 hover:text-white transition-all flex items-center gap-2 group font-medium cursor-pointer"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Back to Explore
      </button>
      <header className="mb-8 mt-4">
        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">
          {selectedOpp.task}
        </h1>

        <p className="text-xl text-blue-100/90 font-medium">
          By {selectedOpp.teacher}
        </p>
      </header>
    </div>
  );
};

export default OpportunityHeader;
