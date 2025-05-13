// import ResumeUploader from "./components/ResumeUploader.jsx";
// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-xl font-bold mb-4">🧠 Resume Evaluator</h1>
//       <ResumeUploader />
//     </div>
//     </>
//   )
// }

// export default App

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ResumeUploader from "./components/resume-uploader.jsx";
import DashboardLayout from "./components/dashboard-layout.jsx";
import CandidateList from "./components/candidate-list.jsx";
import CandidateProfile from "./components/candidate-profile.jsx";
import LandingPage from "./components/landing-page.jsx";
import { mockCandidates } from "./lib/mock-data.js";
import "./App.css";
import ResumeUploader2 from "./components/ResumeUploader.jsx";
import IPCSectionList from "./components/ipc-section-list.jsx";
import LegalAssessmentCard from "./components/legal-assment-card.jsx";
import ScoreBreakdownCard from "./components/score-breakdown-card.jsx";

function App() {
  const [candidates, setCandidates] = useState(mockCandidates);

  return (
    <div className="app">
      <Routes>
        {/* Landing Page */}
        <Route path="/Landing" element={<LandingPage />} />

        {/* TESTING */}
        <Route path="/old" element={<ResumeUploader2 />} />
        <Route path="/ipc" element={<IPCSectionList />} />
        <Route path="/legal" element={<LegalAssessmentCard />} />
        <Route path="/profile" element={<CandidateProfile />} />
        <Route path="/score" element={<ScoreBreakdownCard />} />
        
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/" element={<ResumeUploader/>} />


        {/* <ResumeUploader2 /> */}

        {/* Dashboard */}
        {/* <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
                <CandidateList candidates={candidates} loading={false} />
              </div>
            </DashboardLayout>
          }
        /> */}

        

        

        {/* Resume Upload */}
        {/* <Route
          path="/"
          element={
            <DashboardLayout>
              <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Resume Upload</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ResumeUploader
                    onUploadSuccess={(id) => console.log("Upload success:", id)}
                  />
                </div>
              </div>
            </DashboardLayout>
          }
        /> */}

        {/* Candidate Profile */}
        {/* <Route
          path="/dashboard/candidate/:id"
          element={
            <DashboardLayout>
              {candidates.length > 0 && (
                <CandidateProfile candidate={candidates[0]} />
              )}
            </DashboardLayout>
          }
        /> */}

        {/* Fallback for direct ResumeUploader access (your original view) */}
        <Route
          path="/simple"
          element={
            <div className="min-h-screen p-6 bg-gray-50">
              <h1 className="text-xl font-bold mb-4">🧠 Resume Evaluator</h1>
              <ResumeUploader />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
