const TheDetails = ({ spotsLeft, selectedOpp }) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/20 mb-8">
        <div>
          <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
            Location
          </p>
          <p className="text-white text-lg font-semibold">
            {selectedOpp.location}
          </p>
        </div>
        <div>
          <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
            Time
          </p>
          <p className="text-white text-lg font-semibold">{selectedOpp.time}</p>
        </div>
        <div>
          <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
            Credit
          </p>
          <p className="text-white text-lg font-semibold">
            {selectedOpp.hours}h Offered
          </p>
        </div>
        <div>
          <p className="text-blue-200/60 text-xs uppercase font-bold tracking-widest">
            Spots
          </p>
          <p
            className={`text-lg font-bold ${
              spotsLeft === 0
                ? "text-red-400"
                : spotsLeft < 5
                  ? "text-amber-300"
                  : "text-emerald-300"
            }`}
          >
            {spotsLeft} Left
          </p>
        </div>
      </div>
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
        <p className="text-xl text-blue-50/80 leading-relaxed">
          {selectedOpp.description}
        </p>
      </section>
    </div>
  );
};

export default TheDetails;
