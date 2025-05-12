// import { useState } from "react";
// import axios from "axios";

// export default function ResumeUploader() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       const res = await axios.post("http://localhost:3001/api/evaluate", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setResult(res.data.parsed);
//  // ✅ correct key as per your backend
//  // Adjust this if backend response format is different
//     } catch (err) {
//       console.error(err);
//       setError("Failed to upload or parse resume.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
//       <button
//         className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700"
//         onClick={handleUpload}
//         disabled={loading}
//       >
//         {loading ? "Uploading..." : "Upload & Parse"}
//       </button>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       {result && (
//         <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
//           {JSON.stringify(result, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved result from localStorage on component mount
  useEffect(() => {
    const storedStorageKey = localStorage.getItem('candidateAffidavitStorageKey');
    const storedResult = localStorage.getItem('candidateAffidavitData');

    if (storedStorageKey && storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (parseError) {
        console.error("Error parsing saved result:", parseError);
        // Clear invalid stored data
        localStorage.removeItem('candidateAffidavitStorageKey');
        localStorage.removeItem('candidateAffidavitData');
      }
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }
    
    // Validate file type
    if (!file.type.includes("pdf") && 
        !file.type.includes("msword") && 
        !file.type.includes("document")) {
      setError("Please upload a PDF or Word document.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post("http://localhost:3001/api/evaluate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Store both the storage key and the parsed data
      const { storageKey, parsed } = res.data;
      
      // Save to localStorage
      localStorage.setItem('candidateAffidavitStorageKey', storageKey);
      localStorage.setItem('candidateAffidavitData', JSON.stringify(parsed));
      console.log("Stored data:", parsed);
      
      setResult(parsed);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to upload or parse resume.");
    } finally {
      setLoading(false);
    }
  };

  // Function to clear stored data
  const clearStoredData = () => {
    localStorage.removeItem('candidateAffidavitStorageKey');
    localStorage.removeItem('candidateAffidavitData');
    setResult(null);
  };
  
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Candidate Affidavit Analyzer</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Upload Affidavit</label>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="w-full border border-gray-300 rounded p-2"
        />
        <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
      </div>
      
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        onClick={handleUpload} 
        disabled={loading || !file}
      >
        {loading ? "Processing..." : "Analyze Affidavit"}
      </button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Candidate Analysis</h2>
          <div className="bg-gray-50 p-4 rounded border">
            {/* Candidate Summary Section */}
            <div className="mb-4">
              <h3 className="font-bold text-lg">Candidate Summary</h3>
              <p><strong>Name:</strong> {result.summary.fullName}</p>
              <p><strong>Age:</strong> {result.summary.age}</p>
              <p><strong>Constituency:</strong> {result.summary.constituency}</p>
              <p><strong>Party:</strong> {result.summary.partyAffiliation}</p>
            </div>

            {/* Scoring Breakdown Section */}
            <div className="mb-4">
              <h3 className="font-bold text-lg">Scoring Breakdown</h3>
              <p><strong>Total Score:</strong> {result.scoringBreakdown.totalScore}/100</p>
              <p><strong>Assessment:</strong> {result.scoringBreakdown.assessment}</p>
              <div className="pl-4">
                <p>Criminal Score: {result.scoringBreakdown.criminalScore}</p>
                <p>Financial Score: {result.scoringBreakdown.financialScore}</p>
                <p>Education Score: {result.scoringBreakdown.educationScore}</p>
                <p>Performance Score: {result.scoringBreakdown.performanceScore}</p>
              </div>
            </div>

            {/* IPC Criminality Assessment Section */}
            <div className="mb-4">
              <h3 className="font-bold text-lg">IPC Criminality Assessment</h3>
              <p><strong>Legal Background Judgment:</strong> {result.ipcCriminalityAssessment.legalBackgroundJudgment}</p>
              <h4 className="font-semibold mt-2">IPC Sections:</h4>
              <ul className="list-disc pl-5">
                {result.ipcCriminalityAssessment.ipcSections.map((section, index) => (
                  <li key={index}>
                    <strong>Section {section.section}:</strong> {section.offenseSummary} 
                    <span className="ml-2 text-sm text-gray-600">(Severity: {section.severityLevel})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([JSON.stringify(result, null, 2)], {type: "application/json"});
                  element.href = URL.createObjectURL(file);
                  element.download = `${result.summary.fullName.replace(/\s/g, "_")}_analysis.json`;
                  document.body.appendChild(element);
                  element.click();
                }} 
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Download JSON
              </button>
              <button 
                onClick={clearStoredData}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Clear Stored Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}