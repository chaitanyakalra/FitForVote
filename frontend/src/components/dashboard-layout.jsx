// "use client";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useNavigate, useLocation } from "react-router-dom";

// export default function DashboardLayout({ children }) {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="min-h-screen bg-[#f7f9fc] flex">
//       {/* Sidebar */}
//       <div
//         className={`bg-[#1b1f3a] text-white transition-all duration-300 ${
//           isSidebarOpen ? "w-64" : "w-20"
//         } min-h-screen fixed`}
//       >
//         <div className="p-4 flex items-center justify-between">
//           {isSidebarOpen ? (
//             <span className="font-bold text-lg">CandidateScan</span>
//           ) : (
//             <span className="font-bold text-lg">CS</span>
//           )}
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {isSidebarOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 5l7 7-7 7M5 5l7 7-7 7"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         <nav className="mt-8">
//           <ul>
//             <li>
//               <a
//                 href="/dashboard"
//                 className="flex items-center py-3 px-4 hover:bg-[#2d3250] transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-3"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span>Dashboard</span>}
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center py-3 px-4 hover:bg-[#2d3250] transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-3"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span>Upload Resume</span>}
//               </a>
//             </li>
//             {/* <li>
//               <a
//                 href="/"
//                 className="flex items-center py-3 px-4 hover:bg-[#2d3250] transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-3"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span>Home</span>}
//               </a>
//             </li> */}
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 ${
//           isSidebarOpen ? "ml-64" : "ml-20"
//         } flex-1`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// // import { useNavigate, useLocation } from "react-router-dom";

// export default function DashboardLayout({ children }) {
//   const navigate = useNavigate()
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/save/analyses')
//       .then(response => {
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//           return response.json();
//         } else {
//           throw new Error('Unexpected response type: not JSON');
//         }
//       })
//       .then(data => {
//         console.log('Fetched data:', data);
//         setData(data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);
  

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f7f9fc",
//         display: "flex",
//       }}
//     >
//       {/* Sidebar */}
//       <div
//         style={{
//           backgroundColor: "#1b1f3a",
//           color: "white",
//           transition: "width 0.3s ease",
//           width: isSidebarOpen ? "256px" : "80px",
//           minHeight: "100vh",
//           position: "fixed",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div
//           style={{
//             padding: "16px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
//           }}
//         >
//           {isSidebarOpen ? (
//             <span
//               style={{
//                 fontWeight: "700",
//                 fontSize: "18px",
//                 letterSpacing: "0.5px",
//               }}
//             >
//               CandidateScan
//             </span>
//           ) : (
//             <span
//               style={{
//                 fontWeight: "700",
//                 fontSize: "18px",
//               }}
//             >
//               CS
//             </span>
//           )}
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={{
//               color: "white",
//               backgroundColor: "transparent",
//               border: "none",
//               cursor: "pointer",
//               padding: "4px",
//               borderRadius: "4px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "background-color 0.2s ease",
//             }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
//             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               style={{
//                 height: "24px",
//                 width: "24px",
//               }}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {isSidebarOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//               )}
//             </svg>
//           </button>
//         </div>

//         <nav style={{ marginTop: "32px" }}>
//           <ul
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//             }}
//           >
//             <li>
//               <a
//                 href="/dashboard"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   padding: "12px 16px",
//                   color: "white",
//                   textDecoration: "none",
//                   transition: "background-color 0.2s ease",
//                   borderLeft: "3px solid transparent",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = "#2d3250"
//                   e.currentTarget.style.borderLeftColor = "#6c63ff"
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "transparent"
//                   e.currentTarget.style.borderLeftColor = "transparent"
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   style={{
//                     height: "20px",
//                     width: "20px",
//                     marginRight: isSidebarOpen ? "12px" : "0",
//                     flexShrink: 0,
//                   }}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span>Dashboard</span>}
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   padding: "12px 16px",
//                   color: "white",
//                   textDecoration: "none",
//                   transition: "background-color 0.2s ease",
//                   borderLeft: "3px solid transparent",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = "#2d3250"
//                   e.currentTarget.style.borderLeftColor = "#6c63ff"
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "transparent"
//                   e.currentTarget.style.borderLeftColor = "transparent"
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   style={{
//                     height: "20px",
//                     width: "20px",
//                     marginRight: isSidebarOpen ? "12px" : "0",
//                     flexShrink: 0,
//                   }}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//                 {isSidebarOpen && <span>Upload Resume</span>}
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: isSidebarOpen ? "256px" : "80px",
//           flexGrow: 1,
//           padding: "24px",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   )
// }





"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_BACKEND_URL}/save/analyses`)
      .then((response) => {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          return response.json()
        } else {
          throw new Error("Unexpected response type: not JSON")
        }
      })
      .then((data) => {
        console.log("Fetched data:", data)
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  // Function to get badge color based on assessment
  const getBadgeColor = (assessment) => {
    switch (assessment.toLowerCase()) {
      case "excellent":
        return { bg: "#e7f5e7", text: "#2e7d32" }
      case "good":
        return { bg: "#e3f2fd", text: "#1976d2" }
      case "average":
        return { bg: "#fff9c4", text: "#f57f17" }
      case "poor":
        return { bg: "#ffebee", text: "#c62828" }
      default:
        return { bg: "#f5f5f5", text: "#757575" }
    }
  }

  // Function to get score color
  const getScoreColor = (score) => {
    if (score >= 70) return "#2196f3"
    if (score >= 40) return "#4caf50"
    if (score >= 0) return "#ff9800"
    return "#f44336"
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          backgroundColor: "#1b1f3a",
          color: "white",
          transition: "width 0.3s ease",
          width: isSidebarOpen ? "256px" : "80px",
          minHeight: "100vh",
          position: "fixed",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {isSidebarOpen ? (
            <span
              style={{
                fontWeight: "700",
                fontSize: "18px",
                letterSpacing: "0.5px",
              }}
            >
              CandidateScan
            </span>
          ) : (
            <span
              style={{
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              CS
            </span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "24px",
                width: "24px",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>

        <nav style={{ marginTop: "32px" }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <a
                href="/dashboard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  color: "white",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                  borderLeft: "3px solid #6c63ff",
                  backgroundColor: "#2d3250",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: isSidebarOpen ? "12px" : "0",
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {isSidebarOpen && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  color: "white",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                  borderLeft: "3px solid transparent",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d3250"
                  e.currentTarget.style.borderLeftColor = "#6c63ff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderLeftColor = "transparent"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: isSidebarOpen ? "12px" : "0",
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                {isSidebarOpen && <span>Upload Resume</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* SIdeBAR END */}

      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "256px" : "80px",
          flexGrow: 1,
          padding: "24px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1b1f3a", marginBottom: "8px" }}>
            Candidate Analysis Dashboard
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            View and analyze candidate profiles with detailed scoring and assessments
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #6c63ff",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p style={{ color: "#6b7280" }}>Loading candidate data...</p>
            </div>
          </div>
        ) : data && data.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
            {data.map((candidate) => (
              <div
                key={candidate._id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "1px solid #e5e7eb",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div style={{ padding: "20px", position: "relative" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                    }}
                  >
                    <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1b1f3a", marginBottom: "4px" }}>
                      {candidate.summary.fullName}
                    </h2>
                    <div
                      style={{
                        backgroundColor: getScoreColor(candidate.scoringBreakdown.totalScore),
                        color: "white",
                        fontWeight: "bold",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontSize: "14px",
                      }}
                    >
                      {candidate.scoringBreakdown.totalScore}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span style={{ fontSize: "14px", color: "#4b5563" }}>{candidate.summary.constituency}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <polyline points="17 11 19 13 23 9"></polyline>
                      </svg>
                      <span style={{ fontSize: "14px", color: "#4b5563" }}>{candidate.summary.partyAffiliation}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor: getBadgeColor(candidate.scoringBreakdown.assessment).bg,
                      color: getBadgeColor(candidate.scoringBreakdown.assessment).text,
                      marginBottom: "16px",
                    }}
                  >
                    {candidate.scoringBreakdown.assessment}
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Education
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
                      {candidate.summary.educationalBackground}
                    </p>

                    <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Criminal Status
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
                      {candidate.summary.criminalCaseStatus}
                    </p>

                    {candidate.ipcCriminalityAssessment.ipcSections.length > 0 && (
                      <div style={{ marginBottom: "12px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                          IPC Sections
                        </h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {candidate.ipcCriminalityAssessment.ipcSections.map((section, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: "#fee2e2",
                                color: "#b91c1c",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontSize: "12px",
                              }}
                            >
                              {section.section}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                      Professional Details
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b7280" }}>{candidate.summary.professionalDetails}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "16px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Criminal</div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: candidate.scoringBreakdown.criminalScore < 0 ? "#ef4444" : "#10b981",
                        }}
                      >
                        {candidate.scoringBreakdown.criminalScore}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Education</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>
                        {candidate.scoringBreakdown.educationScore}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Financial</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>
                        {candidate.scoringBreakdown.financialScore}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Performance</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>
                        {candidate.scoringBreakdown.performanceScore}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}>
            <p>No candidate data available</p>
          </div>
        )}
      </div>
    </div>
  )
}
