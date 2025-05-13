// import { useEffect, useRef, useState } from "react"

// export default function ScoreBreakdownCard({
//   criminalScore,
//   educationScore,
//   financialScore,
//   performanceScore,
//   totalScore,
// }) {
//   const canvasRef = useRef(null)

//   // Function to get color based on score
//   const getScoreColor = (score) => {
//     if (score < 0) return "#ef4444" // red-500
//     if (score < 25) return "#f97316" // orange-500
//     if (score < 75) return "#3b82f6" // blue-500
//     return "#22c55e" // green-500
//   }

//   // Function to get background color based on score
//   const getScoreBackgroundColor = (score) => {
//     if (score < 0) return "#fee2e2" // red-100
//     if (score < 25) return "#ffedd5" // orange-100
//     if (score < 75) return "#dbeafe" // blue-100
//     return "#dcfce7" // green-100
//   }

//   // Draw radar chart
//   useEffect(() => {
//     if (!canvasRef.current) return

//     const ctx = canvasRef.current.getContext("2d")
//     const centerX = canvasRef.current.width / 2
//     const centerY = canvasRef.current.height / 2
//     const radius = Math.min(centerX, centerY) - 30

//     // Clear canvas
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

//     // Draw background
//     ctx.beginPath()
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
//     ctx.fillStyle = "#f8fafc" // slate-50
//     ctx.fill()

//     // Draw radar grid
//     const levels = 4
//     for (let i = 1; i <= levels; i++) {
//       ctx.beginPath()
//       ctx.arc(centerX, centerY, (radius / levels) * i, 0, 2 * Math.PI)
//       ctx.strokeStyle = "#e2e8f0" // slate-200
//       ctx.stroke()
//     }

//     // Draw radar axes
//     const categories = ["Criminal", "Education", "Financial", "Performance"]
//     const angles = [Math.PI / 2, Math.PI, (Math.PI * 3) / 2, 0] // Top, Left, Bottom, Right

//     for (let i = 0; i < categories.length; i++) {
//       const angle = angles[i]

//       // Draw axis line
//       ctx.beginPath()
//       ctx.moveTo(centerX, centerY)
//       ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
//       ctx.strokeStyle = "#cbd5e1" // slate-300
//       ctx.stroke()

//       // Draw axis label
//       ctx.fillStyle = "#64748b" // slate-500
//       ctx.font = "12px sans-serif"
//       ctx.textAlign = "center"
//       ctx.textBaseline = "middle"

//       const labelX = centerX + (radius + 20) * Math.cos(angle)
//       const labelY = centerY + (radius + 20) * Math.sin(angle)

//       ctx.fillText(categories[i], labelX, labelY)
//     }

//     // Normalize scores for radar chart (scale from -20 to 20 to 0 to 1)
//     const normalizeScore = (score) => {
//       // Clamp score between -20 and 20
//       const clampedScore = Math.max(-20, Math.min(20, score))
//       // Map from [-20, 20] to [0, 1]
//       return (clampedScore + 20) / 40
//     }

//     const scores = [
//       normalizeScore(criminalScore),
//       normalizeScore(educationScore),
//       normalizeScore(financialScore),
//       normalizeScore(performanceScore),
//     ]

//     // Draw radar data
//     ctx.beginPath()
//     for (let i = 0; i < scores.length; i++) {
//       const angle = angles[i]
//       const distance = scores[i] * radius

//       if (i === 0) {
//         ctx.moveTo(centerX + distance * Math.cos(angle), centerY + distance * Math.sin(angle))
//       } else {
//         ctx.lineTo(centerX + distance * Math.cos(angle), centerY + distance * Math.sin(angle))
//       }
//     }
//     ctx.closePath()
//     ctx.fillStyle = "rgba(108, 99, 255, 0.2)"
//     ctx.fill()
//     ctx.strokeStyle = "rgba(108, 99, 255, 0.8)"
//     ctx.lineWidth = 2
//     ctx.stroke()

//     // Draw data points
//     for (let i = 0; i < scores.length; i++) {
//       const angle = angles[i]
//       const distance = scores[i] * radius

//       ctx.beginPath()
//       ctx.arc(centerX + distance * Math.cos(angle), centerY + distance * Math.sin(angle), 5, 0, 2 * Math.PI)
//       ctx.fillStyle = "#6c63ff"
//       ctx.fill()
//     }
//   }, [criminalScore, educationScore, financialScore, performanceScore])

//   const [candidateData, setCandidateData] = useState(null);
//     useEffect(() => {
//       const storedResult = localStorage.getItem('candidateAffidavitData');

//       if (storedResult) {
//         try {
//           const data = JSON.parse(storedResult);
//           setCandidateData(data);
//           console.log("Retrieved summary:", data.summary);
//           console.log("Scoring Breakdown:", data.scoringBreakdown);
//           console.log("IPC Criminality Assessment:", data.ipcCriminalityAssessment);

//           // Example: accessing specific data
//           console.log("Candidate Name:", data.summary.fullName);
//           console.log("Criminal Score:", data.scoringBreakdown.criminalScore);
//           console.log("IPC Sections involved:");
//           data.ipcCriminalityAssessment.ipcSections.forEach(section => {
//             console.log(`- ${section.section}: ${section.offenseSummary} (${section.severityLevel})`);
//           });

//         } catch (err) {
//           console.error("Failed to parse stored candidate data", err);
//         }
//       } else {
//         console.log("No candidate data found in localStorage.");
//       }
//     }, []);

//     if (!candidateData) {
//       return <div className="p-6">Loading candidate data...</div>;
//     }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 h-full">
//       <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>

//       <div className="mb-6">
//         <canvas ref={canvasRef} width={300} height={300} className="mx-auto"></canvas>
//       </div>

//       <div className="space-y-3">
//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-medium">Criminal</span>
//             <span className="text-sm font-medium" style={{ color: getScoreColor(criminalScore) }}>
//               {criminalScore}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="h-2.5 rounded-full"
//               style={{
//                 width: `${Math.max(0, ((criminalScore + 20) / 40) * 100)}%`,
//                 backgroundColor: getScoreColor(criminalScore),
//               }}
//             ></div>
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-medium">Education</span>
//             <span className="text-sm font-medium" style={{ color: getScoreColor(educationScore) }}>
//               {educationScore}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="h-2.5 rounded-full"
//               style={{
//                 width: `${Math.max(0, ((educationScore + 20) / 40) * 100)}%`,
//                 backgroundColor: getScoreColor(educationScore),
//               }}
//             ></div>
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-medium">Financial</span>
//             <span className="text-sm font-medium" style={{ color: getScoreColor(financialScore) }}>
//               {financialScore}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="h-2.5 rounded-full"
//               style={{
//                 width: `${Math.max(0, ((financialScore + 20) / 40) * 100)}%`,
//                 backgroundColor: getScoreColor(financialScore),
//               }}
//             ></div>
//           </div>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-medium">Performance</span>
//             <span className="text-sm font-medium" style={{ color: getScoreColor(performanceScore) }}>
//               {performanceScore}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="h-2.5 rounded-full"
//               style={{
//                 width: `${Math.max(0, ((performanceScore + 20) / 40) * 100)}%`,
//                 backgroundColor: getScoreColor(performanceScore),
//               }}
//             ></div>
//           </div>
//         </div>

//         <div className="pt-3 mt-3 border-t">
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-bold">Total Score</span>
//             <span className="text-sm font-bold" style={{ color: getScoreColor(totalScore) }}>
//               {totalScore}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-3">
//             <div
//               className="h-3 rounded-full"
//               style={{
//                 width: `${Math.max(0, ((totalScore + 20) / 40) * 100)}%`,
//                 backgroundColor: getScoreColor(totalScore),
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

//BEFORE WORKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG

// import { useEffect, useRef, useState } from "react";

// export default function ScoreBreakdownCard() {
//   const canvasRef = useRef(null);
//   const [candidateData, setCandidateData] = useState(null);

//   // Score color utility
//   const getScoreColor = (score) => {
//     if (score < 0) return "#ef4444"; // red
//     if (score < 25) return "#f97316"; // orange
//     if (score < 75) return "#3b82f6"; // blue
//     return "#22c55e"; // green
//   };

//   useEffect(() => {
//     const storedResult = localStorage.getItem("candidateAffidavitData");
//     if (storedResult) {
//       try {
//         const data = JSON.parse(storedResult);
//         setCandidateData(data);
//       } catch (err) {
//         console.error("Failed to parse stored candidate data", err);
//       }
//     }
//   }, []);

//   // Radar Chart Drawing
//   useEffect(() => {
//     if (!candidateData || !canvasRef.current) return;

//     const ctx = canvasRef.current.getContext("2d");
//     const centerX = canvasRef.current.width / 2;
//     const centerY = canvasRef.current.height / 2;
//     const radius = Math.min(centerX, centerY) - 30;

//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//     // Background circle
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     ctx.fillStyle = "#f8fafc"; // slate-50
//     ctx.fill();

//     // Radar grid
//     const levels = 4;
//     for (let i = 1; i <= levels; i++) {
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, (radius / levels) * i, 0, 2 * Math.PI);
//       ctx.strokeStyle = "#e2e8f0"; // slate-200
//       ctx.stroke();
//     }

//     // Radar axes
//     const categories = ["Criminal", "Education", "Financial", "Performance"];
//     const angles = [Math.PI / 2, Math.PI, (Math.PI * 3) / 2, 0];

//     for (let i = 0; i < categories.length; i++) {
//       const angle = angles[i];
//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
//       ctx.strokeStyle = "#cbd5e1"; // slate-300
//       ctx.stroke();

//       ctx.fillStyle = "#64748b"; // slate-500
//       ctx.font = "12px sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";

//       const labelX = centerX + (radius + 20) * Math.cos(angle);
//       const labelY = centerY + (radius + 20) * Math.sin(angle);
//       ctx.fillText(categories[i], labelX, labelY);
//     }

//     const normalizeScore = (score) => (Math.max(-20, Math.min(20, score)) + 20) / 40;

//     const { criminalScore, educationScore, financialScore, performanceScore } = candidateData.scoringBreakdown;

//     const scores = [
//       normalizeScore(criminalScore),
//       normalizeScore(educationScore),
//       normalizeScore(financialScore),
//       normalizeScore(performanceScore),
//     ];

//     // Radar data shape
//     ctx.beginPath();
//     for (let i = 0; i < scores.length; i++) {
//       const angle = angles[i];
//       const distance = scores[i] * radius;
//       const x = centerX + distance * Math.cos(angle);
//       const y = centerY + distance * Math.sin(angle);

//       if (i === 0) ctx.moveTo(x, y);
//       else ctx.lineTo(x, y);
//     }
//     ctx.closePath();
//     ctx.fillStyle = "rgba(108, 99, 255, 0.2)";
//     ctx.fill();
//     ctx.strokeStyle = "rgba(108, 99, 255, 0.8)";
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     // Data points
//     for (let i = 0; i < scores.length; i++) {
//       const angle = angles[i];
//       const distance = scores[i] * radius;
//       const x = centerX + distance * Math.cos(angle);
//       const y = centerY + distance * Math.sin(angle);

//       ctx.beginPath();
//       ctx.arc(x, y, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "#6c63ff";
//       ctx.fill();
//     }
//   }, [candidateData]);

//   if (!candidateData) return <div className="p-6">Loading candidate data...</div>;

//   const { criminalScore, educationScore, financialScore, performanceScore, totalScore } = candidateData.scoringBreakdown;

//   const renderBar = (label, score) => (
//     <div>
//       <div className="flex justify-between items-center mb-1">
//         <span className="text-sm font-medium">{label}</span>
//         <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
//           {score}
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div
//           className="h-2.5 rounded-full"
//           style={{
//             width: `${Math.max(0, ((score + 20) / 40) * 100)}%`,
//             backgroundColor: getScoreColor(score),
//           }}
//         ></div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 h-full">
//       <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>

//       <div className="mb-6">
//         <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
//       </div>

//       <div className="space-y-3">
//         {renderBar("Criminal", criminalScore)}
//         {renderBar("Education", educationScore)}
//         {renderBar("Financial", financialScore)}
//         {renderBar("Performance", performanceScore)}

//         <div className="pt-3 mt-3 border-t">
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-bold">Total Score</span>
//             <span className="text-sm font-bold" style={{ color: getScoreColor(totalScore) }}>
//               {totalScore}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-3">
//             <div
//               className="h-3 rounded-full"
//               style={{
//                 width: `${Math.max(0, ((totalScore + 20) / 40) * 100)}%`,
//                 backgroundColor: getScoreColor(totalScore),
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";

// export default function ScoreBreakdownCard() {
//   const [candidateData, setCandidateData] = useState(null);
//   const [activeTab, setActiveTab] = useState("chart");

//   // Score color utility
//   const getScoreColor = (score) => {
//     if (score < 0) return "#ef4444"; // red
//     if (score < 25) return "#f97316"; // orange
//     if (score < 75) return "#3b82f6"; // blue
//     return "#22c55e"; // green
//   };

//   // Score label utility
//   const getScoreLabel = (score) => {
//     if (score < 0) return "Poor";
//     if (score < 25) return "Fair";
//     if (score < 75) return "Good";
//     return "Excellent";
//   };

//   useEffect(() => {
//     const storedResult = localStorage.getItem("candidateAffidavitData");
//     if (storedResult) {
//       try {
//         const data = JSON.parse(storedResult);
//         setCandidateData(data);
//       } catch (err) {
//         console.error("Failed to parse stored candidate data", err);
//       }
//     }
//   }, []);

//   if (!candidateData) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6 h-full flex items-center justify-center">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-8 w-48 bg-slate-200 rounded mb-4"></div>
//           <div className="h-64 w-64 bg-slate-100 rounded-full mb-6"></div>
//           <div className="space-y-3 w-full">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="h-4 bg-slate-100 rounded w-full"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const {
//     criminalScore,
//     educationScore,
//     financialScore,
//     performanceScore,
//     totalScore,
//   } = candidateData.scoringBreakdown;

//   const scores = [
//     { name: "Criminal", value: criminalScore, icon: "🔒" },
//     { name: "Education", value: educationScore, icon: "🎓" },
//     { name: "Financial", value: financialScore, icon: "💰" },
//     { name: "Performance", value: performanceScore, icon: "📈" },
//   ];

//   const renderScoreCard = (score) => {
//     const normalizedValue = Math.max(0, ((score.value + 20) / 40) * 100);
//     return (
//       <div
//         key={score.name}
//         className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md"
//       >
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <span className="text-xl">{score.icon}</span>
//             <h3 className="font-medium text-slate-700">{score.name}</h3>
//           </div>
//           <div className="flex items-center gap-1">
//             <span
//               className="text-sm font-semibold px-2 py-1 rounded-full"
//               style={{
//                 backgroundColor: `${getScoreColor(score.value)}20`,
//                 color: getScoreColor(score.value),
//               }}
//             >
//               {getScoreLabel(score.value)}
//             </span>
//           </div>
//         </div>
//         <div className="relative pt-1">
//           <div className="flex items-center justify-between mb-1">
//             <div></div>
//             <span
//               className="text-sm font-bold"
//               style={{ color: getScoreColor(score.value) }}
//             >
//               {score.value}
//             </span>
//           </div>
//           <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100">
//             <div
//               style={{
//                 width: `${normalizedValue}%`,
//                 backgroundColor: getScoreColor(score.value),
//               }}
//               className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500"
//             ></div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderGauge = () => {
//     // Calculate normalized total score (0-100)
//     const normalizedScore = Math.max(0, ((totalScore + 20) / 40) * 100);

//     // Calculate the angle for the gauge needle
//     const angle = (normalizedScore / 100) * 180 - 90;

//     return (
//       <div className="relative w-64 h-32 mx-auto mb-8">
//         {/* Gauge background */}
//         <div className="absolute w-full h-full overflow-hidden">
//           <div className="absolute bottom-0 w-full h-full rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20"></div>
//         </div>

//         {/* Gauge ticks */}
//         <div className="absolute bottom-0 w-full h-full">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute bottom-0 w-0.5 h-4 bg-slate-400"
//               style={{
//                 left: `${i * 25}%`,
//                 transform: `translateX(${
//                   i === 0 ? "0" : i === 4 ? "-100%" : "-50%"
//                 })`,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Gauge labels */}
//         <div className="absolute bottom-0 w-full">
//           <div className="absolute bottom-6 left-0 text-xs font-medium text-red-500">
//             -20
//           </div>
//           <div className="absolute bottom-6 left-1/4 text-xs font-medium text-orange-500 -translate-x-1/2">
//             -10
//           </div>
//           <div className="absolute bottom-6 left-1/2 text-xs font-medium text-blue-500 -translate-x-1/2">
//             0
//           </div>
//           <div className="absolute bottom-6 left-3/4 text-xs font-medium text-blue-500 -translate-x-1/2">
//             10
//           </div>
//           <div className="absolute bottom-6 right-0 text-xs font-medium text-green-500 -translate-x-full">
//             20
//           </div>
//         </div>

//         {/* Gauge needle */}
//         <div
//           className="absolute bottom-0 left-1/2 w-1 h-24 bg-slate-800 rounded-t-full origin-bottom transition-transform duration-1000"
//           style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
//         ></div>

//         {/* Gauge center point */}
//         <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white border-2 border-slate-800 rounded-full -translate-x-1/2 translate-y-1/2"></div>

//         {/* Score display */}
//         <div
//           className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl font-bold"
//           style={{ color: getScoreColor(totalScore) }}
//         >
//           {totalScore}
//         </div>
//       </div>
//     );
//   };

//   const renderBarChart = () => {
//     const maxBarHeight = 150;

//     return (
//       <div className="flex items-end justify-between h-48 gap-4 px-4 mb-8">
//         {scores.map((score) => {
//           const normalizedHeight = Math.max(
//             10,
//             ((score.value + 20) / 40) * maxBarHeight
//           );
//           return (
//             <div key={score.name} className="flex flex-col items-center">
//               <div
//                 className="w-12 rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2"
//                 style={{
//                   height: `${normalizedHeight}px`,
//                   backgroundColor: `${getScoreColor(score.value)}40`,
//                   borderBottom: `4px solid ${getScoreColor(score.value)}`,
//                 }}
//               >
//                 <span
//                   className="text-sm font-bold"
//                   style={{ color: getScoreColor(score.value) }}
//                 >
//                   {score.value}
//                 </span>
//               </div>
//               <div className="mt-2 text-xs font-medium text-slate-600">
//                 {score.name}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 h-full">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-slate-800">Score Breakdown</h2>
//         <div className="flex bg-slate-100 rounded-lg p-1">
//           <button
//             className={`px-3 py-1 text-sm rounded-md transition-all ${
//               activeTab === "chart"
//                 ? "bg-white shadow-sm text-slate-800"
//                 : "text-slate-500"
//             }`}
//             onClick={() => setActiveTab("chart")}
//           >
//             Chart
//           </button>
//           <button
//             className={`px-3 py-1 text-sm rounded-md transition-all ${
//               activeTab === "gauge"
//                 ? "bg-white shadow-sm text-slate-800"
//                 : "text-slate-500"
//             }`}
//             onClick={() => setActiveTab("gauge")}
//           >
//             Gauge
//           </button>
//         </div>
//       </div>

//       {activeTab === "chart" ? renderBarChart() : renderGauge()}

//       <div className="space-y-3 mt-6">
//         {scores.map(renderScoreCard)}

//         <div className="mt-6 pt-4 border-t border-slate-100">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="font-bold text-slate-800">Total Score</h3>
//             <span
//               className="text-sm font-semibold px-3 py-1 rounded-full"
//               style={{
//                 backgroundColor: `${getScoreColor(totalScore)}20`,
//                 color: getScoreColor(totalScore),
//               }}
//             >
//               {getScoreLabel(totalScore)}
//             </span>
//           </div>
//           <div className="relative pt-1">
//             <div className="flex items-center justify-between mb-1">
//               <div></div>
//               <span
//                 className="text-lg font-bold"
//                 style={{ color: getScoreColor(totalScore) }}
//               >
//                 {totalScore}
//               </span>
//             </div>
//             <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-100">
//               <div
//                 style={{
//                   width: `${Math.max(0, ((totalScore + 20) / 40) * 100)}%`,
//                   backgroundColor: getScoreColor(totalScore),
//                 }}
//                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500"
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react"

export default function ScoreBreakdownCard() {
  const [candidateData, setCandidateData] = useState(null)

  // Score color utility
  const getScoreColor = (score) => {
    if (score < 0) return "#ef4444" // red
    if (score < 25) return "#f97316" // orange
    if (score < 75) return "#3b82f6" // blue
    return "#22c55e" // green
  }

  // Score label utility
  const getScoreLabel = (score) => {
    if (score < 0) return "Poor"
    if (score < 25) return "Fair"
    if (score < 75) return "Good"
    return "Excellent"
  }

  useEffect(() => {
    const storedResult = localStorage.getItem("candidateAffidavitData")
    if (storedResult) {
      try {
        const data = JSON.parse(storedResult)
        setCandidateData(data)
      } catch (err) {
        console.error("Failed to parse stored candidate data", err)
      }
    }
  }, [])

  if (!candidateData) {
    return (
      <div className="max-h-96 overflow-y-auto pr-2"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          padding: "24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              height: "32px",
              width: "192px",
              backgroundColor: "#f1f5f9",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          ></div>
          <div
            style={{
              height: "256px",
              width: "256px",
              backgroundColor: "#f8fafc",
              borderRadius: "50%",
              marginBottom: "24px",
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  height: "16px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const { criminalScore, educationScore, financialScore, performanceScore, totalScore } = candidateData.scoringBreakdown

  const scores = [
    { name: "Criminal", value: criminalScore },
    { name: "Education", value: educationScore },
    { name: "Financial", value: financialScore },
    { name: "Performance", value: performanceScore },
  ]

  const renderBar = (label, score) => (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <span style={{ fontSize: "14px", fontWeight: "500" }}>{label}</span>
        <span style={{ fontSize: "14px", fontWeight: "500", color: getScoreColor(score) }}>{score}</span>
      </div>
      <div style={{ width: "100%", backgroundColor: "#e5e7eb", borderRadius: "9999px", height: "10px" }}>
        <div
          style={{
            height: "10px",
            borderRadius: "9999px",
            width: `${Math.max(0, ((score + 20) / 40) * 100)}%`,
            backgroundColor: getScoreColor(score),
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  )

  return (
    <div className="max-h-96 overflow-y-auto pr-2"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        padding: "24px",
        height: "100%",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "24px",
          borderBottom: "1px solid #f1f5f9",
          paddingBottom: "12px",
        }}
      >
        Score Breakdown
      </h2>

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "600" }}>Overall Assessment</span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                padding: "4px 12px",
                borderRadius: "16px",
                backgroundColor: `${getScoreColor(totalScore)}20`,
                color: getScoreColor(totalScore),
              }}
            >
              {getScoreLabel(totalScore)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: getScoreColor(totalScore),
              }}
            >
              {totalScore}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#475569",
          }}
        >
          Category Scores
        </h3>
        {scores.map((score) => renderBar(score.name, score.value))}
      </div>

      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>Total Score</h3>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "16px",
              backgroundColor: `${getScoreColor(totalScore)}20`,
              color: getScoreColor(totalScore),
            }}
          >
            {getScoreLabel(totalScore)}
          </span>
        </div>
        <div style={{ marginTop: "4px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <div></div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: getScoreColor(totalScore),
              }}
            >
              {totalScore}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "#e5e7eb",
              borderRadius: "9999px",
              height: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "12px",
                borderRadius: "9999px",
                width: `${Math.max(0, ((totalScore + 20) / 40) * 100)}%`,
                backgroundColor: getScoreColor(totalScore),
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
