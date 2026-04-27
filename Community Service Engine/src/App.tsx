import OpportunityCard from "./components/OpportunityCard";
import { Route, Routes } from "react-router-dom";
import OpportunityDetail from "./components/OpportunityDetail";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "./backend/supabase";
import LoadingCard from "./components/LoadingCard";
import type { User } from "@supabase/supabase-js";
import SignUp from "./components/SignUp";

interface SingleObject {
  id: number;
  task: string;
  teacher: string;
  location: string;
  time: string;
  hours: number;
  max_spots: number;
  description: string;
}

function App() {
  const [opportunities, setOpportunities] = useState<SingleObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data, error } = await supabase.from("opportunities").select("*");
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (error) {
        console.log("Error in fetching data from Opportunities", error);
      } else {
        setOpportunities(data || []);
      }

      setLoading(false);
    };
    fetchOpportunities();
  }, []);

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
                  <Header user={user} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 ">
                  {loading ? (
                    <LoadingCard />
                  ) : (
                    opportunities.map((oneObject) => (
                      <OpportunityCard
                        key={oneObject.id}
                        oneObject={oneObject}
                      />
                    ))
                  )}
                </div>
              </div>
            }
          />
          <Route
            path="/opportunity/:id"
            element={
              <div className="flex flex-col gap-12 pt-25">
                <OpportunityDetail oppor={opportunities} />
              </div>
            }
          />

          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
