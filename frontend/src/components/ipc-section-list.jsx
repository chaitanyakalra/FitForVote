// import { useEffect, useState } from "react";

// export default function IPCSectionList() {

  
//   // Function to determine severity color
//   const getSeverityColor = (severity) => {
//     const severityMap = {
//       Serious: "bg-red-100 text-red-800 border-red-200",
//       Cognizable: "bg-amber-100 text-amber-800 border-amber-200",
//       "Non-Cognizable": "bg-blue-100 text-blue-800 border-blue-200",
//       Minor: "bg-green-100 text-green-800 border-green-200",
//     }

//     return severityMap[severity] || "bg-gray-100 text-gray-800 border-gray-200"
//   }

//   // Function to highlight IPC 302 in red
//   const highlightSection = (section) => {
//     if (section.includes("302")) {
//       return "text-red-600 font-semibold"
//     }
//     return ""
//   }

  
//   const [candidateData, setCandidateData] = useState(null);
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
//   const ipcSections = candidateData?.ipcCriminalityAssessment?.ipcSections || [];

//   return (
//     <div className="space-y-3">
//       {ipcSections.map((item, index) => (
//         <div key={index} className="border rounded-md p-3">
//           <div className="flex justify-between items-start mb-2">
//             <span className={`font-medium ${highlightSection(item.section)}`}>
//               Section {item.section}
//             </span>
//             <span className={`text-xs px-2 py-0.5 rounded border ${getSeverityColor(item.severityLevel)}`}>
//               {item.severityLevel}
//             </span>
//           </div>
//           <p className="text-sm text-gray-700">{item.offenseSummary}</p>
//         </div>
//       ))}
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"

export default function IPCSectionList() {
  // Function to determine severity color
  const getSeverityColor = (severity) => {
    const severityMap = {
      Serious: {
        bg: "#fee2e2",
        text: "#b91c1c",
        border: "#fecaca",
      },
      Cognizable: {
        bg: "#ffedd5",
        text: "#9a3412",
        border: "#fed7aa",
      },
      "Non-Cognizable": {
        bg: "#dbeafe",
        text: "#1e40af",
        border: "#bfdbfe",
      },
      Minor: {
        bg: "#dcfce7",
        text: "#166534",
        border: "#bbf7d0",
      },
    }

    return severityMap[severity] || { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" }
  }

  // Function to highlight IPC 302 in red
  const highlightSection = (section) => {
    if (section.includes("302")) {
      return { color: "#dc2626", fontWeight: "600" }
    }
    return { color: "#374151", fontWeight: "500" }
  }

  const [candidateData, setCandidateData] = useState(null)
  useEffect(() => {
    const storedResult = localStorage.getItem("candidateAffidavitData")

    if (storedResult) {
      try {
        const data = JSON.parse(storedResult)
        setCandidateData(data)
        console.log("Retrieved summary:", data.summary)
        console.log("Scoring Breakdown:", data.scoringBreakdown)
        console.log("IPC Criminality Assessment:", data.ipcCriminalityAssessment)

        // Example: accessing specific data
        console.log("Candidate Name:", data.summary.fullName)
        console.log("Criminal Score:", data.scoringBreakdown.criminalScore)
        console.log("IPC Sections involved:")
        data.ipcCriminalityAssessment.ipcSections.forEach((section) => {
          console.log(`- ${section.section}: ${section.offenseSummary} (${section.severityLevel})`)
        })
      } catch (err) {
        console.error("Failed to parse stored candidate data", err)
      }
    } else {
      console.log("No candidate data found in localStorage.")
    }
  }, [])

  if (!candidateData) {
    return <div style={{ padding: "24px" }}>Loading candidate data...</div>
  }
  const ipcSections = candidateData?.ipcCriminalityAssessment?.ipcSections || []

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {ipcSections.map((item, index) => {
        const severityColors = getSeverityColor(item.severityLevel)
        const sectionStyle = highlightSection(item.section)

        return (
          <div
            key={index}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "12px",
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontWeight: sectionStyle.fontWeight,
                  color: sectionStyle.color,
                  fontSize: "15px",
                }}
              >
                Section {item.section}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  padding: "2px 8px",
                  borderRadius: "16px",
                  backgroundColor: severityColors.bg,
                  color: severityColors.text,
                  border: `1px solid ${severityColors.border}`,
                  fontWeight: "500",
                }}
              >
                {item.severityLevel}
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#4b5563",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {item.offenseSummary}
            </p>
          </div>
        )
      })}
    </div>
  )
}
