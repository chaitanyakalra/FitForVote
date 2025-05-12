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

function App() {
  const [candidates, setCandidates] = useState(mockCandidates);

  return (
    <div className="app">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
                <CandidateList candidates={candidates} loading={false} />
              </div>
            </DashboardLayout>
          }
        />

        {/* Candidate Profile */}
        <Route
          path="/dashboard/candidate/:id"
          element={
            <DashboardLayout>
              {candidates.length > 0 && (
                <CandidateProfile candidate={candidates[0]} />
              )}
            </DashboardLayout>
          }
        />

        {/* Resume Upload */}
        <Route
          path="/upload"
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
        />

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
