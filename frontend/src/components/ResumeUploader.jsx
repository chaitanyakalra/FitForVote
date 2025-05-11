import { useState } from "react";
import axios from "axios";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await axios.post("http://localhost:3001/api/evaluate", formData);
    setResult(res.data.result);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleUpload}>
        Upload & Evaluate
      </button>
      <pre className="mt-4 bg-gray-100 p-2 text-sm">{result}</pre>
    </div>
  );
}
