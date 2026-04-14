import OpportunityCard from "./components/OpportunityCard";
import { Route, Routes } from "react-router-dom";
import OpportunityDetail from "./components/OpportunityDetail";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import oppor from "./data/mockData";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]">
      <Navbar />
      <div className="w-full max-w-[90%] mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="flex flex-col gap-12 pt-30 ">
                  <Header />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 ">
                  {oppor.map((oneObject) => (
                    <OpportunityCard key={oneObject.id} oneObject={oneObject} />
                  ))}
                </div>
              </div>
            }
          />
          <Route
            path="/opportunity/:id"
            element={
              <div className="flex flex-col gap-12 pt-25">
                <OpportunityDetail oppor={oppor} />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
