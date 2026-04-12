import OpportunityCard from "./components/OpportunityCard";
import { Route, Routes } from "react-router-dom";
import OpportunityDetail from "./components/OpportunityDetail";
const oppor = [
  {
    id: 1,
    teacher: "Mr. Smith",
    task: "Library Cleanup",
    location: "Room 502",
    time: "10th Period",
    hours: 10,
    max_spots: 3,
    description:
      "Help organize the new science fiction section. You'll be sorting books by author and applying new spine labels. Please wear comfortable shoes!",
  },
  {
    id: 2,
    teacher: "Ms. Johnson",
    task: "Math Tutoring",
    location: "Learning Commons",
    time: "After School",
    hours: 2,
    max_spots: 5,
    description:
      "Provide 1-on-1 algebra support for struggling freshmen. You will be helping them work through their weekly problem sets and preparing them for the upcoming midterm.",
  },
  {
    id: 3,
    teacher: "Coach Davis",
    task: "Equipment Organization",
    location: "Main Gym",
    time: "7th Period",
    hours: 1,
    max_spots: 2,
    description:
      "Help inventory the athletic department's gear. This involves pumping up basketballs, sorting jerseys by size, and ensuring all training cones are accounted for.",
  },
  {
    id: 4,
    teacher: "Dr. Aris",
    task: "Lab Assistant",
    location: "Science Wing B",
    time: "8th Period",
    hours: 1.5,
    max_spots: 1,
    description:
      "Assist with setting up the chemistry titration lab. You will be responsible for cleaning glassware, preparing distilled water stations, and restocking safety goggles.",
  },
  {
    id: 5,
    teacher: "Ms. Lee",
    task: "Art Show Setup",
    location: "Main Lobby",
    time: "Weekend",
    hours: 5,
    max_spots: 10,
    description:
      "Help transform the lobby into a gallery space. Volunteers will hang student paintings, set up sculpture pedestals, and arrange the lighting for the opening reception.",
  },
  {
    id: 6,
    teacher: "Mr. Garcia",
    task: "IT Support Help",
    location: "Tech Office",
    time: "9th Period",
    hours: 1,
    max_spots: 2,
    description:
      "Work alongside the IT staff to troubleshoot laptop connectivity issues. You'll also help run software updates and organize the tablet charging carts.",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 md:p-8">
      <Routes>
        <Route
          path="/"
          element={
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6   ">
              {oppor.map((oneObject) => (
                <OpportunityCard key={oneObject.id} oneObject={oneObject} />
              ))}
            </div>
          }
        />
        <Route
          path="/opportunity/:id"
          element={<OpportunityDetail oppor={oppor} />}
        />
      </Routes>
    </div>
  );
}

export default App;
