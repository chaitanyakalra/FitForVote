import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResumeUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  // Load saved result from localStorage on component mount
  useEffect(() => {
    const storedStorageKey = localStorage.getItem(
      "candidateAffidavitStorageKey"
    );
    const storedResult = localStorage.getItem("candidateAffidavitData");

    if (storedStorageKey && storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
        if (onUploadSuccess) {
          onUploadSuccess(storedStorageKey); // Pass the actual storage key
        }
      } catch (parseError) {
        console.error("Error parsing saved result:", parseError);
        // Clear invalid stored data
        localStorage.removeItem("candidateAffidavitStorageKey");
        localStorage.removeItem("candidateAffidavitData");
      }
    }
  }, [onUploadSuccess]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    // Validate file type
    if (
      !file.type.includes("pdf") &&
      !file.type.includes("msword") &&
      !file.type.includes("document")
    ) {
      setError("Please upload a PDF or Word document.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/evaluate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Store both the storage key and the parsed data
      const { storageKey, parsed } = res.data;

      // Save to localStorage
      localStorage.setItem("candidateAffidavitStorageKey", storageKey);
      localStorage.setItem("candidateAffidavitData", JSON.stringify(parsed));

      setResult(parsed);

      if (onUploadSuccess) {
        onUploadSuccess(storageKey);
        const response = await fetch(
          "http://localhost:3001/save/save-analysis",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to save analysis to database"
          );
        }

        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to upload or parse resume."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to clear stored data
  const clearStoredData = () => {
    localStorage.removeItem("candidateAffidavitStorageKey");
    localStorage.removeItem("candidateAffidavitData");
    setResult(null);
    setFile(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Upload Candidate Resume</h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${
          dragActive ? "border-[#6c63ff] bg-[#6c63ff]/5" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-400 mb-4"
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

        <p className="text-lg mb-2">Drag and drop your resume here</p>
        <p className="text-sm text-gray-500 mb-4">or</p>

        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <label
          htmlFor="resume-upload"
          className="bg-[#6c63ff] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-90 transition-all"
        >
          Browse Files
        </label>

        <p className="text-xs text-gray-500 mt-4">
          Accepted formats: PDF, DOC, DOCX
        </p>
      </div>

      {file && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#6c63ff] mr-2"
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
            <span className="truncate max-w-xs">{file.name}</span>
          </div>
          <button
            onClick={() => setFile(null)}
            className="text-red-500 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          className="bg-[#6c63ff] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
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
            className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-all"
          >
            Clear Data
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
