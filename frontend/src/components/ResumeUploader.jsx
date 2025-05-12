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
 // ✅ correct key as per your backend
 // Adjust this if backend response format is different
    } catch (err) {
      console.error(err);
      setError("Failed to upload or parse resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Parse"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
