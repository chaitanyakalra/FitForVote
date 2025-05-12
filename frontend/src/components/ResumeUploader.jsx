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


import { useState } from "react";
import axios from "axios";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      
      setResult(res.data.parsed);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to upload or parse resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resume Evaluator</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Upload Resume</label>
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
        {loading ? "Processing..." : "Evaluate Resume"}
      </button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Evaluation Results</h2>
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-bold text-lg">{result.full_name}</h3>
            <p className="text-sm">{result.email_address} • {result.phone_number}</p>
            
            <div className="mt-4">
              <h4 className="font-semibold">Score: <span className="text-blue-600">{result.evaluation_score}/10</span></h4>
              <p className="text-sm mt-1">{result.evaluation_justification}</p>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={() => setResult(null)} 
                className="text-sm text-gray-600 underline"
              >
                Clear Results
              </button>
              <button 
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([JSON.stringify(result, null, 2)], {type: "application/json"});
                  element.href = URL.createObjectURL(file);
                  element.download = `${result.full_name.replace(/\s/g, "_")}_evaluation.json`;
                  document.body.appendChild(element);
                  element.click();
                }} 
                className="text-sm text-blue-600 underline ml-4"
              >
                Download JSON
              </button>
            </div>
          </div>
          
          <details className="mt-4 border rounded">
            <summary className="p-2 bg-gray-50 cursor-pointer">View Full Details</summary>
            <pre className="p-4 overflow-auto text-sm max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}