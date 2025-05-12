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
import { useEffect, useRef, useState } from "react";

export default function ScoreBreakdownCard() {
  const canvasRef = useRef(null);
  const [candidateData, setCandidateData] = useState(null);

  // Score color utility
  const getScoreColor = (score) => {
    if (score < 0) return "#ef4444"; // red
    if (score < 25) return "#f97316"; // orange
    if (score < 75) return "#3b82f6"; // blue
    return "#22c55e"; // green
  };

  useEffect(() => {
    const storedResult = localStorage.getItem("candidateAffidavitData");
    if (storedResult) {
      try {
        const data = JSON.parse(storedResult);
        setCandidateData(data);
      } catch (err) {
        console.error("Failed to parse stored candidate data", err);
      }
    }
  }, []);

  // Radar Chart Drawing
  useEffect(() => {
    if (!candidateData || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#f8fafc"; // slate-50
    ctx.fill();

    // Radar grid
    const levels = 4;
    for (let i = 1; i <= levels; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / levels) * i, 0, 2 * Math.PI);
      ctx.strokeStyle = "#e2e8f0"; // slate-200
      ctx.stroke();
    }

    // Radar axes
    const categories = ["Criminal", "Education", "Financial", "Performance"];
    const angles = [Math.PI / 2, Math.PI, (Math.PI * 3) / 2, 0];

    for (let i = 0; i < categories.length; i++) {
      const angle = angles[i];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
      ctx.strokeStyle = "#cbd5e1"; // slate-300
      ctx.stroke();

      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(categories[i], labelX, labelY);
    }

    const normalizeScore = (score) => (Math.max(-20, Math.min(20, score)) + 20) / 40;

    const { criminalScore, educationScore, financialScore, performanceScore } = candidateData.scoringBreakdown;

    const scores = [
      normalizeScore(criminalScore),
      normalizeScore(educationScore),
      normalizeScore(financialScore),
      normalizeScore(performanceScore),
    ];

    // Radar data shape
    ctx.beginPath();
    for (let i = 0; i < scores.length; i++) {
      const angle = angles[i];
      const distance = scores[i] * radius;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(108, 99, 255, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(108, 99, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < scores.length; i++) {
      const angle = angles[i];
      const distance = scores[i] * radius;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#6c63ff";
      ctx.fill();
    }
  }, [candidateData]);

  if (!candidateData) return <div className="p-6">Loading candidate data...</div>;

  const { criminalScore, educationScore, financialScore, performanceScore, totalScore } = candidateData.scoringBreakdown;

  const renderBar = (label, score) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium" style={{ color: getScoreColor(score) }}>
          {score}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${Math.max(0, ((score + 20) / 40) * 100)}%`,
            backgroundColor: getScoreColor(score),
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>

      <div className="mb-6">
        <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
      </div>

      <div className="space-y-3">
        {renderBar("Criminal", criminalScore)}
        {renderBar("Education", educationScore)}
        {renderBar("Financial", financialScore)}
        {renderBar("Performance", performanceScore)}

        <div className="pt-3 mt-3 border-t">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold">Total Score</span>
            <span className="text-sm font-bold" style={{ color: getScoreColor(totalScore) }}>
              {totalScore}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${Math.max(0, ((totalScore + 20) / 40) * 100)}%`,
                backgroundColor: getScoreColor(totalScore),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
