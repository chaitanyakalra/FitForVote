// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";



// export default function ResumeUploader({ onUploadSuccess }) {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const navigate = useNavigate();


//   useEffect(() => {
//     // Access the environment variable
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     console.log(backendUrl); // Should log the URL you set in the .env file
//     console.log("process", import.meta.env.VITE_BACKEND_URL);
//   }, []);

//   // Load saved result from localStorage on component mount
//   useEffect(() => {
//     const storedStorageKey = localStorage.getItem(
//       "candidateAffidavitStorageKey"
//     );
//     const storedResult = localStorage.getItem("candidateAffidavitData");

//     if (storedStorageKey && storedResult) {
//       try {
//         const parsedResult = JSON.parse(storedResult);
//         setResult(parsedResult);
//         if (onUploadSuccess) {
//           onUploadSuccess(storedStorageKey); // Pass the actual storage key
//         }
//       } catch (parseError) {
//         console.error("Error parsing saved result:", parseError);
//         // Clear invalid stored data
//         localStorage.removeItem("candidateAffidavitStorageKey");
//         localStorage.removeItem("candidateAffidavitData");
//       }
//     }
//   }, [onUploadSuccess]);

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file.");
//       return;
//     }

//     // Validate file type
//     if (
//       !file.type.includes("pdf") &&
//       !file.type.includes("msword") &&
//       !file.type.includes("document")
//     ) {
//       setError("Please upload a PDF or Word document.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/evaluate`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Store both the storage key and the parsed data
//       const { storageKey, parsed } = res.data;

//       // Save to localStorage
//       localStorage.setItem("candidateAffidavitStorageKey", storageKey);
//       localStorage.setItem("candidateAffidavitData", JSON.stringify(parsed));

//       setResult(parsed);

//       if (onUploadSuccess) {
//         onUploadSuccess(storageKey);
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/save/save-analysis`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(parsed),
//           }
//         );

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.error || "Failed to save analysis to database"
//           );
//         }

//         navigate("/profile");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.error || "Failed to upload or parse resume."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to clear stored data
//   const clearStoredData = () => {
//     localStorage.removeItem("candidateAffidavitStorageKey");
//     localStorage.removeItem("candidateAffidavitData");
//     setResult(null);
//     setFile(null);
//   };

//   return (
//     <div className="w-full">
//       <h2 className="text-xl font-semibold mb-4">Upload Candidate Resume</h2>

//       <div
//         className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${dragActive ? "border-[#6c63ff] bg-[#6c63ff]/5" : "border-gray-300"
//           }`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-12 w-12 mx-auto text-gray-400 mb-4"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//           />
//         </svg>

//         <p className="text-lg mb-2">Drag and drop your resume here</p>
//         <p className="text-sm text-gray-500 mb-4">or</p>

//         <input
//           type="file"
//           id="resume-upload"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="hidden"
//         />
//         <label
//           htmlFor="resume-upload"
//           className="bg-[#6c63ff] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-90 transition-all"
//         >
//           Browse Files
//         </label>

//         <p className="text-xs text-gray-500 mt-4">
//           Accepted formats: PDF, DOC, DOCX
//         </p>
//       </div>

//       {file && (
//         <div className="mb-4 p-3 bg-gray-50 rounded-md flex items-center justify-between">
//           <div className="flex items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-[#6c63ff] mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <span className="truncate max-w-xs">{file.name}</span>
//           </div>
//           <button
//             onClick={() => setFile(null)}
//             className="text-red-500 hover:text-red-700"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       )}

//       <div className="flex space-x-3">
//         <button
//           className="bg-[#6c63ff] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
//           onClick={handleUpload}
//           disabled={loading || !file}
//         >
//           {loading ? (
//             <>
//               <svg
//                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             "Analyze Resume"
//           )}
//         </button>

//         {result && (
//           <button
//             onClick={clearStoredData}
//             className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-all"
//           >
//             Clear Data
//           </button>
//         )}
//       </div>

//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
// import { config } from "dotenv"

export default function ResumeUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate()
  // const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [data, setData] = useState(null)
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Access the environment variable
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    console.log(backendUrl) // Should log the URL you set in the .env file
    console.log("process", import.meta.env.VITE_BACKEND_URL)
  }, [])

  // Load saved result from localStorage on component mount
  useEffect(() => {
    
    const storedStorageKey = localStorage.getItem("candidateAffidavitStorageKey")
    const storedResult = localStorage.getItem("candidateAffidavitData")

    if (storedStorageKey && storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult)
        setResult(parsedResult)
        if (onUploadSuccess) {
          
          onUploadSuccess(storedStorageKey) // Pass the actual storage key
        }
      } catch (parseError) {
        console.error("Error parsing saved result:", parseError)
        // Clear invalid stored data
        localStorage.removeItem("candidateAffidavitStorageKey")
        localStorage.removeItem("candidateAffidavitData")
      }
    }
  }, [onUploadSuccess])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {

    console.log("Fileupload ")
    if (!file) {
      setError("Please select a file.")
      return
    }

    // Validate file type
    if (!file.type.includes("pdf") && !file.type.includes("msword") && !file.type.includes("document")) {
      setError("Please upload a PDF or Word document.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    const formData = new FormData()
    formData.append("resume", file)

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/evaluate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Store both the storage key and the parsed data
      const { storageKey, parsed } = res.data

      // Save to localStorage
      localStorage.setItem("candidateAffidavitStorageKey", storageKey)
      localStorage.setItem("candidateAffidavitData", JSON.stringify(parsed))

      setResult(parsed)

      if (onUploadSuccess) {
       
        onUploadSuccess(storageKey)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/save/save-analysis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to save analysis to database")
        }

        navigate("/profile")
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Failed to upload or parse resume.")
    } finally {
      setLoading(false)
    }
  }

  // Function to clear stored data
  const clearStoredData = () => {
    localStorage.removeItem("candidateAffidavitStorageKey")
    localStorage.removeItem("candidateAffidavitData")
    setResult(null)
    setFile(null)
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

      {/* SIDEBAR END */}

      <div
        style={{
          marginLeft: isSidebarOpen ? "256px" : "80px",
          flexGrow: 1,
          padding: "24px",
          transition: "margin-left 0.3s ease",
        }}
      >

        <div style={{ }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#1e293b",
            }}
          >
            Upload Candidate Affidavit
          </h2>

          <div
            style={{
              border: `2px dashed ${dragActive ? "#6c63ff" : "#d1d5db"}`,
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "16px",
              transition: "all 0.3s ease",
              backgroundColor: dragActive ? "rgba(108, 99, 255, 0.05)" : "transparent",
              cursor: "pointer",
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "48px",
                width: "48px",
                margin: "0 auto 16px auto",
                color: "#9ca3af",
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

            <p
              style={{
                fontSize: "18px",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Drag and drop your resume here
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              or
            </p>

            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label
              htmlFor="resume-upload"
              style={{
                backgroundColor: "#6c63ff",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-block",
                fontWeight: "500",
                transition: "background-color 0.2s ease",
                boxShadow: "0 2px 4px rgba(108, 99, 255, 0.2)",
              }}
            >
              Browse Files
            </label>

            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "16px",
              }}
            >
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          {file && (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px",
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "#6c63ff",
                    marginRight: "8px",
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "280px",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {file.name}
                </span>
              </div>
              <button
                onClick={() => setFile(null)}
                style={{
                  color: "#ef4444",
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
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              style={{
                backgroundColor: loading || !file ? "#d1d5db" : "#6c63ff",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "500",
                border: "none",
                cursor: loading || !file ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.2s ease",
                boxShadow: loading || !file ? "none" : "0 2px 4px rgba(108, 99, 255, 0.2)",
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      marginRight: "8px",
                      height: "16px",
                      width: "16px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: "0.25" }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      style={{ opacity: "0.75" }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>

            {result && (
              <button
                onClick={clearStoredData}
                style={{
                  backgroundColor: "transparent",
                  color: "#ef4444",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  border: "1px solid #ef4444",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Clear Data
              </button>
            )}
          </div>

          {error && (
            <p
              style={{
                color: "#ef4444",
                marginTop: "8px",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>

      </div>

    </div>
  )
}
