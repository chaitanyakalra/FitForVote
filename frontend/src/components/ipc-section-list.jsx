import { useEffect, useState } from "react";

export default function IPCSectionList() {

  
  // Function to determine severity color
  const getSeverityColor = (severity) => {
    const severityMap = {
      Serious: "bg-red-100 text-red-800 border-red-200",
      Cognizable: "bg-amber-100 text-amber-800 border-amber-200",
      "Non-Cognizable": "bg-blue-100 text-blue-800 border-blue-200",
      Minor: "bg-green-100 text-green-800 border-green-200",
    }

    return severityMap[severity] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  // Function to highlight IPC 302 in red
  const highlightSection = (section) => {
    if (section.includes("302")) {
      return "text-red-600 font-semibold"
    }
    return ""
  }

  
  const [candidateData, setCandidateData] = useState(null);
  useEffect(() => {
    const storedResult = localStorage.getItem('candidateAffidavitData');

    if (storedResult) {
      try {
        const data = JSON.parse(storedResult);
        setCandidateData(data);
        console.log("Retrieved summary:", data.summary);
        console.log("Scoring Breakdown:", data.scoringBreakdown);
        console.log("IPC Criminality Assessment:", data.ipcCriminalityAssessment);

        // Example: accessing specific data
        console.log("Candidate Name:", data.summary.fullName);
        console.log("Criminal Score:", data.scoringBreakdown.criminalScore);
        console.log("IPC Sections involved:");
        data.ipcCriminalityAssessment.ipcSections.forEach(section => {
          console.log(`- ${section.section}: ${section.offenseSummary} (${section.severityLevel})`);
        });

      } catch (err) {
        console.error("Failed to parse stored candidate data", err);
      }
    } else {
      console.log("No candidate data found in localStorage.");
    }
  }, []);

  if (!candidateData) {
    return <div className="p-6">Loading candidate data...</div>;
  }
  const ipcSections = candidateData?.ipcCriminalityAssessment?.ipcSections || [];

  return (
    <div className="space-y-3">
      {ipcSections.map((item, index) => (
        <div key={index} className="border rounded-md p-3">
          <div className="flex justify-between items-start mb-2">
            <span className={`font-medium ${highlightSection(item.section)}`}>
              Section {item.section}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded border ${getSeverityColor(item.severityLevel)}`}>
              {item.severityLevel}
            </span>
          </div>
          <p className="text-sm text-gray-700">{item.offenseSummary}</p>
        </div>
      ))}
    </div>
  )
}
