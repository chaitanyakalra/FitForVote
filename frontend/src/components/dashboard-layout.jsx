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


"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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

      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "256px" : "80px",
          flexGrow: 1,
          padding: "24px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  )
}
