// import ScoreBreakdownCard from "./score-breakdown-card.jsx"
// import LegalAssessmentCard from "./legal-assment-card.jsx"
// import { useEffect, useState } from "react"

// export default function CandidateProfile({ candidate }) {
//   const [candidateData, setCandidateData] = useState(null);
//   // Determine color based on score
//   const getScoreColor = (score) => {
//     if (score < 0) return "bg-red-500"
//     if (score < 25) return "bg-orange-500"
//     if (score < 75) return "bg-blue-500"
//     return "bg-green-500"
//   }

//   const getAssessmentBadge = (assessment) => {
//     const assessmentMap = {
//       Excellent: "bg-green-100 text-green-800",
//       Good: "bg-blue-100 text-blue-800",
//       Average: "bg-yellow-100 text-yellow-800",
//       Poor: "bg-orange-100 text-orange-800",
//       Critical: "bg-red-100 text-red-800",
//     }

//     return assessmentMap[assessment] || "bg-gray-100 text-gray-800"
//   }

//   useEffect(() => {
//     const storedResult = localStorage.getItem('candidateAffidavitData');

//     if (storedResult) {
//       try {
//         const data = JSON.parse(storedResult);
//         setCandidateData(data);
//         console.log("Retrieved summary:", data.summary);
//         console.log("Scoring Breakdown:", data.scoringBreakdown);
//         console.log("IPC Criminality Assessment:", data.ipcCriminalityAssessment);

//         // Example: accessing specific data
//         console.log("Candidate Name:", data.summary.fullName);
//         console.log("Criminal Score:", data.scoringBreakdown.criminalScore);
//         console.log("IPC Sections involved:");
//         data.ipcCriminalityAssessment.ipcSections.forEach(section => {
//           console.log(`- ${section.section}: ${section.offenseSummary} (${section.severityLevel})`);
//         });

//       } catch (err) {
//         console.error("Failed to parse stored candidate data", err);
//       }
//     } else {
//       console.log("No candidate data found in localStorage.");
//     }
//   }, []);

//   if (!candidateData) {
//     return <div className="p-6">Loading candidate data...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{candidateData.summary.fullName}</h1>
//             <div className="flex flex-wrap gap-2 mt-2">
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 Age: {candidateData.summary.age}
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 {candidateData.summary.constituency}
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                   />
//                 </svg>
//                 {candidateData.summary.partyAffiliation}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div
//               className={`${getScoreColor(candidateData.scoringBreakdown.totalScore)} text-white text-lg font-medium px-3 py-1.5 rounded-md`}
//             >
//               Score: {candidateData.scoringBreakdown.totalScore}
//             </div>
//             <div
//               className={`${getAssessmentBadge(candidateData.scoringBreakdown.assessment)} text-sm font-medium px-3 py-1.5 rounded-md`}
//             >
//               {candidateData.scoringBreakdown.assessment}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Summary */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-md p-6 h-full">
//             <h2 className="text-xl font-semibold mb-4">Candidate Summary</h2>

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Educational Background</h3>
//                 <p className="mt-1">{candidateData.summary.educationalBackground}</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Professional Experience</h3>
//                 <p className="mt-1">{candidateData.summary.professionalDetails}</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Election History</h3>
//                 <p className="mt-1">{candidateData.summary.electionExperience}</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Criminal Case Status</h3>
//                 <p className="mt-1">{candidateData.summary.criminalCaseStatus}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Middle Column - Score Breakdown */}
//         <div className="lg:col-span-1">
//           <ScoreBreakdownCard
//             criminalScore={candidateData.scoringBreakdown.criminalScore}
//             educationScore={candidateData.scoringBreakdown.educationScore}
//             financialScore={candidateData.scoringBreakdown.financialScore}
//             performanceScore={candidateData.scoringBreakdown.performanceScore}
//             totalScore={candidateData.scoringBreakdown.totalScore}
//           />
//         </div>

//         {/* Right Column - Legal Assessment */}
//         <div className="lg:col-span-1">
//           <LegalAssessmentCard
//             legalBackgroundJudgment={candidateData.ipcCriminalityAssessment.legalBackgroundJudgment}
//             ipcSections={candidateData.ipcCriminalityAssessment.ipcSections}
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex flex-wrap gap-3">
//         <button className="bg-[#6c63ff] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all flex items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//             />
//           </svg>
//           Download Report
//         </button>

//         <button className="border border-[#6c63ff] text-[#6c63ff] px-4 py-2 rounded-md hover:bg-[#6c63ff]/5 transition-all flex items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//             />
//           </svg>
//           Edit Assessment
//         </button>

//         <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-all flex items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           Request More Info
//         </button>
//       </div>
//     </div>
//   )
// }





// Ashish's code

// import { useEffect, useState } from "react";
// import ScoreBreakdownCard from "./score-breakdown-card.jsx";

// export default function CandidateProfile() {
//   const [candidateData, setCandidateData] = useState(null);
//   const [activeSection, setActiveSection] = useState("summary");
//   const [isLoading, setIsLoading] = useState(true);
//   const [animationDirection, setAnimationDirection] = useState("next");

//   // Determine color based on score
//   const getScoreColor = (score) => {
//     if (score < 0) return "bg-red-500";
//     if (score < 25) return "bg-orange-500";
//     if (score < 75) return "bg-blue-500";
//     return "bg-green-500";
//   };

//   const getScoreTextColor = (score) => {
//     if (score < 0) return "text-red-500";
//     if (score < 25) return "text-orange-500";
//     if (score < 75) return "text-blue-500";
//     return "text-green-500";
//   };

//   const getAssessmentBadge = (assessment) => {
//     const assessmentMap = {
//       Excellent: "bg-green-100 text-green-800",
//       Good: "bg-blue-100 text-blue-800",
//       Average: "bg-yellow-100 text-yellow-800",
//       Fair: "bg-yellow-100 text-yellow-800",
//       Poor: "bg-orange-100 text-orange-800",
//       Critical: "bg-red-100 text-red-800",
//     };

//     return assessmentMap[assessment] || "bg-gray-100 text-gray-800";
//   };

//   useEffect(() => {
//     const storedResult = localStorage.getItem("candidateAffidavitData");

//     if (storedResult) {
//       try {
//         const data = JSON.parse(storedResult);
//         setCandidateData(data);
//         setTimeout(() => setIsLoading(false), 800); // Simulate loading for demo
//       } catch (err) {
//         console.error("Failed to parse stored candidate data", err);
//         setIsLoading(false);
//       }
//     } else {
//       console.log("No candidate data found in localStorage.");
//       setIsLoading(false);
//     }
//   }, []);

//   // Navigation functions
//   const navigateTo = (section) => {
//     setAnimationDirection(
//       section === "summary"
//         ? "prev"
//         : section === "scores"
//         ? activeSection === "summary"
//           ? "next"
//           : "prev"
//         : "next"
//     );
//     setActiveSection(section);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-6">
//         <div className="w-full max-w-6xl">
//           <div className="text-center mb-12">
//             <div className="inline-block p-4 rounded-full bg-white shadow-md mb-4">
//               <div className="w-16 h-16 border-4 border-[#6c63ff] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-2">
//               Analyzing Candidate Data
//             </h1>
//             <p className="text-slate-500">
//               Please wait while we process the information...
//             </p>
//           </div>

//           <div className="space-y-4 max-w-md mx-auto">
//             <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-[#6c63ff] rounded-full animate-pulse"
//                 style={{ width: "75%" }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-sm text-slate-400">
//               <span>Analyzing resume</span>
//               <span>Generating insights</span>
//               <span>Finalizing</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!candidateData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
//           <div className="text-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-12 mx-auto text-red-500 mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//             <h2 className="text-xl font-bold text-gray-800 mb-2">
//               No Candidate Data Found
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Please upload a candidate resume or affidavit to generate an
//               assessment.
//             </p>
//             <button className="bg-[#6c63ff] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">
//               Upload Candidate Data
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { summary, scoringBreakdown, ipcCriminalityAssessment } = candidateData;

//   // Define the sections
//   const sections = [
//     {
//       id: "summary",
//       title: "Candidate Summary",
//       icon: "📋",
//       description: "Overview of candidate background and qualifications",
//     },
//     {
//       id: "scores",
//       title: "Score Breakdown",
//       icon: "📊",
//       description:
//         "Detailed analysis of candidate scores across key categories",
//     },
//     {
//       id: "legal",
//       title: "Legal Assessment",
//       icon: "⚖️",
//       description: "Evaluation of legal background and potential concerns",
//     },
//   ];

//   // Render the Candidate Summary section
//   const renderCandidateSummary = () => (
//     <div className="bg-white rounded-xl shadow-lg p-6 h-full">
//       <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//         <span className="text-2xl mr-2">📋</span> Candidate Summary
//       </h2>

//       <div className="space-y-6">
//         <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-[#6c63ff]">
//           <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-1 text-[#6c63ff]"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//             Personal Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Full Name</p>
//               <p className="font-medium">{summary.fullName}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Age</p>
//               <p className="font-medium">{summary.age}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Constituency</p>
//               <p className="font-medium">{summary.constituency}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Party Affiliation</p>
//               <p className="font-medium">{summary.partyAffiliation}</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-lg border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//             <h3 className="text-sm font-medium text-gray-700 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-1 text-[#6c63ff]"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M12 14l9-5-9-5-9 5 9 5z" />
//                 <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
//                 />
//               </svg>
//               Educational Background
//             </h3>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-700">{summary.educationalBackground}</p>
//           </div>
//         </div>

//         <div className="rounded-lg border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//             <h3 className="text-sm font-medium text-gray-700 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-1 text-[#6c63ff]"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//               Professional Experience
//             </h3>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-700">{summary.professionalDetails}</p>
//           </div>
//         </div>

//         <div className="rounded-lg border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//             <h3 className="text-sm font-medium text-gray-700 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-1 text-[#6c63ff]"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               Election History
//             </h3>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-700">{summary.electionExperience}</p>
//           </div>
//         </div>

//         <div className="rounded-lg border border-gray-200 overflow-hidden">
//           <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//             <h3 className="text-sm font-medium text-gray-700 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-1 text-[#6c63ff]"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
//                 />
//               </svg>
//               Criminal Case Status
//             </h3>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-700">{summary.criminalCaseStatus}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render the Legal Assessment section
//   const renderLegalAssessment = () => (
//     <div className="bg-white rounded-xl shadow-lg p-6 h-full">
//       <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//         <span className="text-2xl mr-2">⚖️</span> Legal Assessment
//       </h2>

//       <div className="space-y-6">
//         <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
//           <div className="flex items-start">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <p className="text-gray-700">
//               {ipcCriminalityAssessment.legalBackgroundJudgment}
//             </p>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg font-medium text-gray-800 mb-4">
//             IPC Sections
//           </h3>
//           <div className="space-y-4">
//             {ipcCriminalityAssessment.ipcSections.map((section, index) => (
//               <div
//                 key={index}
//                 className="rounded-lg border border-gray-200 overflow-hidden"
//               >
//                 <div
//                   className={`px-4 py-3 border-b border-gray-200 flex justify-between items-center ${
//                     section.severityLevel === "Serious"
//                       ? "bg-red-50"
//                       : section.severityLevel === "Moderate"
//                       ? "bg-orange-50"
//                       : "bg-yellow-50"
//                   }`}
//                 >
//                   <h4 className="font-medium text-gray-800">
//                     Section {section.section}
//                   </h4>
//                   <span
//                     className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
//                       section.severityLevel === "Serious"
//                         ? "bg-red-100 text-red-800"
//                         : section.severityLevel === "Moderate"
//                         ? "bg-orange-100 text-orange-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {section.severityLevel}
//                   </span>
//                 </div>
//                 <div className="p-4">
//                   <p className="text-gray-700 mb-2">{section.offenseSummary}</p>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <span>
//                       Maximum punishment:{" "}
//                       {section.maximumPunishment || "Not specified"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm py-4 px-6">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <h1 className="text-2xl font-bold text-gray-900">
//               {summary.fullName}
//             </h1>
//             <div className="flex flex-wrap gap-2 mt-2">
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 Age: {summary.age}
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 {summary.constituency}
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                   />
//                 </svg>
//                 {summary.partyAffiliation}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div
//               className={`${getScoreColor(
//                 scoringBreakdown.totalScore
//               )} text-white text-lg font-medium px-3 py-1.5 rounded-md`}
//             >
//               Score: {scoringBreakdown.totalScore}
//             </div>
//             <div
//               className={`${getAssessmentBadge(
//                 scoringBreakdown.assessment
//               )} text-sm font-medium px-3 py-1.5 rounded-md`}
//             >
//               {scoringBreakdown.assessment}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="flex-grow flex flex-col p-6">
//         <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
//           {/* Section navigation */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {sections.map((section) => (
//               <button
//                 key={section.id}
//                 onClick={() => navigateTo(section.id)}
//                 className={`p-4 rounded-lg transition-all ${
//                   activeSection === section.id
//                     ? "bg-white shadow-md border-l-4 border-[#6c63ff]"
//                     : "bg-white/50 hover:bg-white hover:shadow-sm"
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className="text-2xl mr-3">{section.icon}</span>
//                   <div className="text-left">
//                     <h3
//                       className={`font-medium ${
//                         activeSection === section.id
//                           ? "text-[#6c63ff]"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {section.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {section.description}
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* Section content with animation */}
//           <div className="relative flex-grow bg-transparent rounded-xl overflow-hidden">
//             <div
//               className={`absolute inset-0 transition-all duration-500 transform ${
//                 animationDirection === "next"
//                   ? activeSection === "summary"
//                     ? "translate-x-0"
//                     : "-translate-x-full opacity-0"
//                   : activeSection === "summary"
//                   ? "translate-x-0"
//                   : "translate-x-full opacity-0"
//               }`}
//               style={{ zIndex: activeSection === "summary" ? 10 : 0 }}
//             >
//               {renderCandidateSummary()}
//             </div>
//             <div
//               className={`absolute inset-0 transition-all duration-500 transform ${
//                 animationDirection === "next"
//                   ? activeSection === "scores"
//                     ? "translate-x-0"
//                     : activeSection === "summary"
//                     ? "translate-x-full opacity-0"
//                     : "-translate-x-full opacity-0"
//                   : activeSection === "scores"
//                   ? "translate-x-0"
//                   : activeSection === "summary"
//                   ? "-translate-x-full opacity-0"
//                   : "translate-x-full opacity-0"
//               }`}
//               style={{ zIndex: activeSection === "scores" ? 10 : 0 }}
//             >
//               <ScoreBreakdownCard />
//             </div>
//             <div
//               className={`absolute inset-0 transition-all duration-500 transform ${
//                 animationDirection === "next"
//                   ? activeSection === "legal"
//                     ? "translate-x-0"
//                     : "translate-x-full opacity-0"
//                   : activeSection === "legal"
//                   ? "translate-x-0"
//                   : "-translate-x-full opacity-0"
//               }`}
//               style={{ zIndex: activeSection === "legal" ? 10 : 0 }}
//             >
//               {renderLegalAssessment()}
//             </div>
//           </div>

//           {/* Navigation controls */}
//           <div className="flex justify-between items-center mt-6">
//             <button
//               onClick={() => {
//                 setAnimationDirection("prev");
//                 setActiveSection((prev) => {
//                   if (prev === "summary") return "legal";
//                   if (prev === "scores") return "summary";
//                   return "scores";
//                 });
//               }}
//               className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-gray-700 hover:bg-[#6c63ff]/10 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>

//             <div className="flex space-x-2">
//               {sections.map((section, index) => (
//                 <button
//                   key={section.id}
//                   onClick={() => navigateTo(section.id)}
//                   className={`w-2.5 h-2.5 rounded-full transition-all ${
//                     activeSection === section.id
//                       ? "bg-[#6c63ff] w-8"
//                       : "bg-gray-300 hover:bg-gray-400"
//                   }`}
//                   aria-label={`Go to ${section.title}`}
//                 ></button>
//               ))}
//             </div>

//             <button
//               onClick={() => {
//                 setAnimationDirection("next");
//                 setActiveSection((prev) => {
//                   if (prev === "summary") return "scores";
//                   if (prev === "scores") return "legal";
//                   return "summary";
//                 });
//               }}
//               className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-gray-700 hover:bg-[#6c63ff]/10 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Footer with action buttons */}
//       <footer className="bg-white py-4 px-6 shadow-inner">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0 flex items-center">
//             <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center mr-2">
//               <svg
//                 className="w-3 h-3 mr-1"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M12 2L2 7L12 12L22 7L12 2Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M2 17L12 22L22 17"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M2 12L12 17L22 12"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               Powered by Gemini AI
//             </span>
//             <span className="text-xs text-gray-500">
//               Analysis completed in 2.3 seconds
//             </span>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button className="bg-[#6c63ff] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                 />
//               </svg>
//               Download Report
//             </button>

//             <button className="border border-[#6c63ff] text-[#6c63ff] px-4 py-2 rounded-md hover:bg-[#6c63ff]/5 transition-all flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                 />
//               </svg>
//               Edit Assessment
//             </button>

//             <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-all flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               Request More Info
//             </button>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


"use client"

import { useEffect, useState } from "react"
import ScoreBreakdownCard from "./score-breakdown-card.jsx"

export default function CandidateProfile() {
  const [candidateData, setCandidateData] = useState(null)
  const [activeSection, setActiveSection] = useState("summary")
  const [isLoading, setIsLoading] = useState(true)
  const [animationDirection, setAnimationDirection] = useState("next")

  // Determine color based on score
  const getScoreColor = (score) => {
    if (score < 0) return "bg-red-500"
    if (score < 25) return "bg-orange-500"
    if (score < 75) return "bg-blue-500"
    return "bg-green-500"
  }

  const getScoreTextColor = (score) => {
    if (score < 0) return "text-red-500"
    if (score < 25) return "text-orange-500"
    if (score < 75) return "text-blue-500"
    return "text-green-500"
  }

  const getAssessmentBadge = (assessment) => {
    const assessmentMap = {
      Excellent: "bg-green-100 text-green-800",
      Good: "bg-blue-100 text-blue-800",
      Average: "bg-yellow-100 text-yellow-800",
      Fair: "bg-yellow-100 text-yellow-800",
      Poor: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    }

    return assessmentMap[assessment] || "bg-gray-100 text-gray-800"
  }

  useEffect(() => {
    const storedResult = localStorage.getItem("candidateAffidavitData")

    if (storedResult) {
      try {
        const data = JSON.parse(storedResult)
        setCandidateData(data)
        setTimeout(() => setIsLoading(false), 800) // Simulate loading for demo
      } catch (err) {
        console.error("Failed to parse stored candidate data", err)
        setIsLoading(false)
      }
    } else {
      console.log("No candidate data found in localStorage.")
      setIsLoading(false)
    }
  }, [])

  // Navigation functions
  const navigateTo = (section) => {
    setAnimationDirection(
      section === "summary" ? "prev" : section === "scores" ? (activeSection === "summary" ? "next" : "prev") : "next",
    )
    setActiveSection(section)
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "1rem",
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  border: "4px solid #6c63ff",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "0.5rem",
              }}
            >
              Analyzing Candidate Data
            </h1>
            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
              }}
            >
              Please wait while we process the information...
            </p>
          </div>

          <div
            style={{
              marginTop: "2rem",
              maxWidth: "28rem",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                height: "0.5rem",
                backgroundColor: "#e2e8f0",
                borderRadius: "9999px",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#6c63ff",
                  borderRadius: "9999px",
                  width: "75%",
                  animation: "pulse 1.5s infinite",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.875rem",
                color: "#94a3b8",
              }}
            >
              <span>Analyzing resume</span>
              <span>Generating insights</span>
              <span>Finalizing</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    )
  }

  if (!candidateData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            maxWidth: "28rem",
            width: "100%",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "3rem",
                width: "3rem",
                margin: "0 auto",
                color: "#ef4444",
                marginBottom: "1rem",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "0.5rem",
              }}
            >
              No Candidate Data Found
            </h2>
            <p
              style={{
                color: "#64748b",
                marginBottom: "1.5rem",
              }}
            >
              Please upload a candidate resume or affidavit to generate an assessment.
            </p>
            <button
              style={{
                backgroundColor: "#6c63ff",
                color: "white",
                padding: "0.625rem 1rem",
                borderRadius: "0.375rem",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 5px rgba(108, 99, 255, 0.2)",
              }}
            >
              Upload Candidate Data
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { summary, scoringBreakdown, ipcCriminalityAssessment } = candidateData

  // Define the sections
  const sections = [
    {
      id: "summary",
      title: "Candidate Summary",
      icon: "📋",
      description: "Overview of candidate background and qualifications",
    },
    {
      id: "scores",
      title: "Score Breakdown",
      icon: "📊",
      description: "Detailed analysis of candidate scores across key categories",
    },
    {
      id: "legal",
      title: "Legal Assessment",
      icon: "⚖️",
      description: "Evaluation of legal background and potential concerns",
    },
  ]

  // Render the Candidate Summary section
  const renderCandidateSummary = () => (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        height: "100%",
        overflow: "auto",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #f1f5f9",
          paddingBottom: "12px",
        }}
      >
        <span style={{ fontSize: "24px", marginRight: "12px" }}>📋</span> Candidate Summary
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f7ff",
            borderRadius: "12px",
            padding: "20px",
            borderLeft: "4px solid #6c63ff",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "18px",
                width: "18px",
                marginRight: "8px",
                color: "#6c63ff",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Personal Information
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>Full Name</p>
              <p style={{ fontWeight: "600", color: "#334155" }}>{summary.fullName}</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>Age</p>
              <p style={{ fontWeight: "600", color: "#334155" }}>{summary.age}</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>Constituency</p>
              <p style={{ fontWeight: "600", color: "#334155" }}>{summary.constituency}</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "4px" }}>Party Affiliation</p>
              <p style={{ fontWeight: "600", color: "#334155" }}>{summary.partyAffiliation}</p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#334155",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                  color: "#6c63ff",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
              Educational Background
            </h3>
          </div>
          <div style={{ padding: "16px", backgroundColor: "white" }}>
            <p style={{ color: "#334155", lineHeight: "1.6" }}>{summary.educationalBackground}</p>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#334155",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                  color: "#6c63ff",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Professional Experience
            </h3>
          </div>
          <div style={{ padding: "16px", backgroundColor: "white" }}>
            <p style={{ color: "#334155", lineHeight: "1.6" }}>{summary.professionalDetails}</p>
          </div>
        </div>

        {/* Election History Section */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#334155",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                  color: "#6c63ff",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Election History
            </h3>
          </div>
          <div style={{ padding: "16px", backgroundColor: "white" }}>
            <p style={{ color: "#334155", lineHeight: "1.6" }}>{summary.electionExperience}</p>
          </div>
        </div>

        {/* Criminal Case Status Section */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#334155",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                  color: "#6c63ff",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              Criminal Case Status
            </h3>
          </div>
          <div style={{ padding: "16px", backgroundColor: "white" }}>
            <p style={{ color: "#334155", lineHeight: "1.6" }}>{summary.criminalCaseStatus}</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Render the Legal Assessment section
  const renderLegalAssessment = () => (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        height: "100%",
        overflow: "auto",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #f1f5f9",
          paddingBottom: "12px",
        }}
      >
        <span style={{ fontSize: "24px", marginRight: "12px" }}>⚖️</span> Legal Assessment
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fffbeb",
            borderRadius: "12px",
            padding: "20px",
            borderLeft: "4px solid #eab308",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: "20px",
              width: "20px",
              color: "#eab308",
              marginRight: "12px",
              marginTop: "2px",
              flexShrink: 0,
            }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p style={{ color: "#334155", lineHeight: "1.6", fontSize: "15px" }}>
            {ipcCriminalityAssessment.legalBackgroundJudgment}
          </p>
        </div>

        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            IPC Sections
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {ipcCriminalityAssessment.ipcSections.map((section, index) => (
              <div
                key={index}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor:
                      section.severityLevel === "Serious"
                        ? "#fef2f2"
                        : section.severityLevel === "Moderate"
                          ? "#fff7ed"
                          : "#fefce8",
                  }}
                >
                  <h4 style={{ fontWeight: "600", color: "#1e293b", fontSize: "15px" }}>Section {section.section}</h4>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      backgroundColor:
                        section.severityLevel === "Serious"
                          ? "#fee2e2"
                          : section.severityLevel === "Moderate"
                            ? "#ffedd5"
                            : "#fef9c3",
                      color:
                        section.severityLevel === "Serious"
                          ? "#b91c1c"
                          : section.severityLevel === "Moderate"
                            ? "#c2410c"
                            : "#854d0e",
                    }}
                  >
                    {section.severityLevel}
                  </span>
                </div>
                <div style={{ padding: "16px", backgroundColor: "white" }}>
                  <p style={{ color: "#334155", marginBottom: "12px", lineHeight: "1.6" }}>{section.offenseSummary}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                      color: "#64748b",
                      backgroundColor: "#f8fafc",
                      padding: "8px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        height: "16px",
                        width: "16px",
                        marginRight: "8px",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Maximum punishment: {section.maximumPunishment || "Not specified"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            "@media (min-width: 768px)": {
              flexDirection: "row",
            },
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "4px",
              }}
            >
              {summary.fullName}
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#475569",
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "16px",
                    width: "16px",
                    marginRight: "6px",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Age: {summary.age}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#475569",
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "16px",
                    width: "16px",
                    marginRight: "6px",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {summary.constituency}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#475569",
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "16px",
                    width: "16px",
                    marginRight: "6px",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {summary.partyAffiliation}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor:
                  scoringBreakdown.totalScore < 0
                    ? "#ef4444"
                    : scoringBreakdown.totalScore < 25
                      ? "#f97316"
                      : scoringBreakdown.totalScore < 75
                        ? "#3b82f6"
                        : "#22c55e",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Score: {scoringBreakdown.totalScore}
            </div>
            <div
              style={{
                backgroundColor:
                  scoringBreakdown.assessment === "Excellent"
                    ? "#dcfce7"
                    : scoringBreakdown.assessment === "Good"
                      ? "#dbeafe"
                      : scoringBreakdown.assessment === "Average" || scoringBreakdown.assessment === "Fair"
                        ? "#fef9c3"
                        : scoringBreakdown.assessment === "Poor"
                          ? "#ffedd5"
                          : "#fee2e2",
                color:
                  scoringBreakdown.assessment === "Excellent"
                    ? "#166534"
                    : scoringBreakdown.assessment === "Good"
                      ? "#1e40af"
                      : scoringBreakdown.assessment === "Average" || scoringBreakdown.assessment === "Fair"
                        ? "#854d0e"
                        : scoringBreakdown.assessment === "Poor"
                          ? "#9a3412"
                          : "#b91c1c",
                fontSize: "14px",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              {scoringBreakdown.assessment}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Section navigation */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => navigateTo(section.id)}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  backgroundColor: activeSection === section.id ? "white" : "rgba(255, 255, 255, 0.7)",
                  boxShadow:
                    activeSection === section.id ? "0 10px 25px rgba(0, 0, 0, 0.08)" : "0 4px 6px rgba(0, 0, 0, 0.02)",
                  borderLeft: activeSection === section.id ? "4px solid #6c63ff" : "none",
                  textAlign: "left",
                  cursor: "pointer",
                  border:
                    activeSection === section.id ? "1px solid rgba(0, 0, 0, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "28px",
                      marginRight: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: activeSection === section.id ? "rgba(108, 99, 255, 0.1)" : "transparent",
                    }}
                  >
                    {section.icon}
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <h3
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: activeSection === section.id ? "#6c63ff" : "#334155",
                        marginBottom: "4px",
                      }}
                    >
                      {section.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Section content with animation */}
          <div
            style={{
              position: "relative",
              flexGrow: 1,
              backgroundColor: "transparent",
              borderRadius: "0.75rem",
              overflow: "hidden",
              minHeight: "400px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transition: "all 0.5s ease",
                transform:
                  animationDirection === "next"
                    ? activeSection === "summary"
                      ? "translateX(0)"
                      : "translateX(-100%)"
                    : activeSection === "summary"
                      ? "translateX(0)"
                      : "translateX(100%)",
                opacity: activeSection === "summary" ? 1 : 0,
                zIndex: activeSection === "summary" ? 10 : 0,
              }}
            >
              {renderCandidateSummary()}
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transition: "all 0.5s ease",
                transform:
                  animationDirection === "next"
                    ? activeSection === "scores"
                      ? "translateX(0)"
                      : activeSection === "summary"
                        ? "translateX(100%)"
                        : "translateX(-100%)"
                    : activeSection === "scores"
                      ? "translateX(0)"
                      : activeSection === "summary"
                        ? "translateX(-100%)"
                        : "translateX(100%)",
                opacity: activeSection === "scores" ? 1 : 0,
                zIndex: activeSection === "scores" ? 10 : 0,
              }}
            >
              <ScoreBreakdownCard />
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transition: "all 0.5s ease",
                transform:
                  animationDirection === "next"
                    ? activeSection === "legal"
                      ? "translateX(0)"
                      : "translateX(100%)"
                    : activeSection === "legal"
                      ? "translateX(0)"
                      : "translateX(-100%)",
                opacity: activeSection === "legal" ? 1 : 0,
                zIndex: activeSection === "legal" ? 10 : 0,
              }}
            >
              {renderLegalAssessment()}
            </div>
          </div>

          {/* Navigation controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: "12px",
              borderRadius: "12px",
            }}
          >
            <button
              onClick={() => {
                setAnimationDirection("prev")
                setActiveSection((prev) => {
                  if (prev === "summary") return "legal"
                  if (prev === "scores") return "summary"
                  return "scores"
                })
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                color: "#334155",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "20px",
                  width: "20px",
                }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => navigateTo(section.id)}
                  style={{
                    width: activeSection === section.id ? "32px" : "10px",
                    height: "10px",
                    borderRadius: "9999px",
                    transition: "all 0.3s ease",
                    backgroundColor: activeSection === section.id ? "#6c63ff" : "#cbd5e1",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={`Go to ${section.title}`}
                ></button>
              ))}
            </div>

            <button
              onClick={() => {
                setAnimationDirection("next")
                setActiveSection((prev) => {
                  if (prev === "summary") return "scores"
                  if (prev === "scores") return "legal"
                  return "summary"
                })
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                color: "#334155",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "20px",
                  width: "20px",
                }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Footer with action buttons */}
      <footer
        style={{
          backgroundColor: "white",
          padding: "16px 24px",
          boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            "@media (min-width: 768px)": {
              flexDirection: "row",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                fontSize: "12px",
                fontWeight: "600",
                padding: "6px 10px",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                marginRight: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <svg
                style={{
                  width: "12px",
                  height: "12px",
                  marginRight: "4px",
                }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Powered by Gemini AI
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Analysis completed in 2.3 seconds
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <button
              style={{
                backgroundColor: "#6c63ff",
                color: "white",
                padding: "10px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 6px rgba(108, 99, 255, 0.2)",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Report
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                color: "#6c63ff",
                padding: "10px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                border: "1px solid #6c63ff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Assessment
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                color: "#334155",
                padding: "10px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                border: "1px solid #cbd5e1",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "18px",
                  width: "18px",
                  marginRight: "8px",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Request More Info
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

