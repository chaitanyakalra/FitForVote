// export default function SummaryCard({ name, constituency, party, totalScore, assessment }) {
//     // Determine color based on score
//     const getScoreColor = (score) => {
//       if (score < 0) return "bg-red-500"
//       if (score < 25) return "bg-orange-500"
//       if (score < 75) return "bg-blue-500"
//       return "bg-green-500"
//     }
  
//     const getAssessmentBadge = (assessment) => {
//       const assessmentMap = {
//         Excellent: "bg-green-100 text-green-800",
//         Good: "bg-blue-100 text-blue-800",
//         Average: "bg-yellow-100 text-yellow-800",
//         Poor: "bg-orange-100 text-orange-800",
//         Critical: "bg-red-100 text-red-800",
//       }
  
//       return assessmentMap[assessment] || "bg-gray-100 text-gray-800"
//     }
  
//     return (
//       <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
//           <div className={`${getScoreColor(totalScore)} text-white text-sm font-medium px-2.5 py-1 rounded`}>
//             {totalScore}
//           </div>
//         </div>
  
//         <div className="space-y-2 mb-4 flex-grow">
//           <div className="flex items-start">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span className="text-gray-600 text-sm">{constituency}</span>
//           </div>
  
//           <div className="flex items-start">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//               />
//             </svg>
//             <span className="text-gray-600 text-sm">{party}</span>
//           </div>
//         </div>
  
//         <div className="flex items-center justify-between mt-4">
//           <span className={`${getAssessmentBadge(assessment)} text-xs font-medium px-2.5 py-1 rounded`}>
//             {assessment}
//           </span>
  
//           <button className="text-[#6c63ff] hover:text-[#5a52d5] text-sm font-medium flex items-center">
//             View Details
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 ml-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     )
//   }
  

"use client"

export default function SummaryCard({ name, constituency, party, totalScore, assessment }) {
  // Determine color based on score
  const getScoreColor = (score) => {
    if (score < 0) return "#ef4444"
    if (score < 25) return "#f97316"
    if (score < 75) return "#3b82f6"
    return "#22c55e"
  }

  const getAssessmentBadge = (assessment) => {
    const assessmentMap = {
      Excellent: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
      Good: { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" },
      Average: { bg: "#fef9c3", text: "#854d0e", border: "#fef08a" },
      Poor: { bg: "#ffedd5", text: "#9a3412", border: "#fed7aa" },
      Critical: { bg: "#fee2e2", text: "#b91c1c", border: "#fecaca" },
    }

    return assessmentMap[assessment] || { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" }
  }

  const badgeColors = getAssessmentBadge(assessment)
  const scoreColor = getScoreColor(totalScore)

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        padding: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s ease",
        border: "1px solid #f1f5f9",
      }}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontWeight: "700",
            fontSize: "18px",
            color: "#1e293b",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </h3>
        <div
          style={{
            backgroundColor: scoreColor,
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            padding: "4px 10px",
            borderRadius: "4px",
            boxShadow: `0 2px 4px ${scoreColor}40`,
          }}
        >
          {totalScore}
        </div>
      </div>

      <div
        style={{
          marginBottom: "16px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: "20px",
              width: "20px",
              color: "#94a3b8",
              marginRight: "8px",
              marginTop: "2px",
              flexShrink: 0,
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span
            style={{
              color: "#475569",
              fontSize: "14px",
            }}
          >
            {constituency}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: "20px",
              width: "20px",
              color: "#94a3b8",
              marginRight: "8px",
              marginTop: "2px",
              flexShrink: 0,
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
          <span
            style={{
              color: "#475569",
              fontSize: "14px",
            }}
          >
            {party}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "16px",
          paddingTop: "16px",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <span
          style={{
            backgroundColor: badgeColors.bg,
            color: badgeColors.text,
            fontSize: "12px",
            fontWeight: "500",
            padding: "4px 10px",
            borderRadius: "16px",
            border: `1px solid ${badgeColors.border}`,
          }}
        >
          {assessment}
        </span>

        <button
          style={{
            color: "#6c63ff",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: "4px",
            transition: "color 0.2s ease, background-color 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#5a52d5"
            e.currentTarget.style.backgroundColor = "rgba(108, 99, 255, 0.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6c63ff"
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: "16px",
              width: "16px",
              marginLeft: "4px",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
