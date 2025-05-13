// "use client"

// import { useEffect, useState } from "react"
// import IPCSectionList from "./ipc-section-list"

// export default function LegalAssessmentCard({ legalBackgroundJudgment, ipcSections }) {
//   const [expanded, setExpanded] = useState(true)


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
//       <div className="flex justify-between items-start mb-4">
//         <h2 className="text-xl font-semibold">Legal Assessment</h2>
//         <button onClick={() => setExpanded(!expanded)} className="text-gray-500 hover:text-gray-700">
//           {expanded ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           )}
//         </button>
//       </div>

//       <div className="flex items-start mb-4">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//           />
//         </svg>
//         <p className="text-sm">{legalBackgroundJudgment}</p>
//       </div>

//       {expanded && (
//         <div className="mt-4">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">IPC Sections:</h3>
//           <IPCSectionList ipcSections={ipcSections} />
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import IPCSectionList from "./ipc-section-list"

export default function LegalAssessmentCard({ legalBackgroundJudgment, ipcSections }) {
  const [expanded, setExpanded] = useState(true)

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
    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        Loading candidate data...
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        padding: "24px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1e293b",
          }}
        >
          Legal Assessment
        </h2>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            color: "#64748b",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#334155")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "20px",
                width: "20px",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "20px",
                width: "20px",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "16px",
          backgroundColor: "#fff7ed",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #ffedd5",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: "20px",
            width: "20px",
            color: "#f59e0b",
            marginTop: "2px",
            marginRight: "8px",
            flexShrink: "0",
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
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            color: "#78350f",
            margin: 0,
          }}
        >
          {legalBackgroundJudgment}
        </p>
      </div>

      {expanded && (
        <div style={{ marginTop: "16px" }}>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#64748b",
              marginBottom: "12px",
            }}
          >
            IPC Sections:
          </h3>
          <IPCSectionList ipcSections={ipcSections} />
        </div>
      )}
    </div>
  )
}
