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
import SecretCode from "./components/teacherComponents/SecretCode";
import TeacherDashboard from "./components/teacherComponents/TeacherDashboard";
import TeacherAccess from "./components/teacherComponents/TeacherAccess";

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
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState(false);

  const [dataLoading, setDataLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data, error } = await supabase.from("opportunities").select("*");
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (error) {
        console.log("Error in fetching data from Opportunities", error);
      } else {
        setOpportunities(data || []);
      }

      setDataLoading(false);
    };
    fetchOpportunities();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      // Clear states manually just to be safe
      setUser(null);
      setTeacher(false);
      // Optional: redirect to home
      window.location.href = "/";
    }
  };
  useEffect(() => {
    const checkUserRole = async (currentUser: User | null) => {
      if (currentUser) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        setTeacher(data?.role === "teacher");
      } else {
        setTeacher(false);
      }
      setAuthLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      const startUser = session?.user ?? null;
      setUser(startUser);
      checkUserRole(startUser);
    });
    //prettier-ignore
    const { data: { subscription } } = supabase.auth.onAuthStateChange( async (_event, session)  => {
    const activeUser = session?.user ?? null;
    setUser(activeUser);
    checkUserRole(activeUser); 
      
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

  const appReady = !dataLoading && !authLoading;
  if (!appReady) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <LoadingCard />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]">
      <Navbar teacher={teacher} onLogout={handleLogout} user={user} />

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
                  {opportunities.map((oneObject) => (
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
                <OpportunityDetail oppor={opportunities} />
              </div>
            }
          />

          <Route
            path="/signup"
            element={<SignUp onLogin={handleLogin} user={user} />}
          />
          <Route
            path="/secretCode"
            element={<SecretCode setTeacher={setTeacher} user={user} />}
          />

          <Route path="/TeacherAccess" element={<TeacherAccess />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
