import ScoreBreakdownCard from "./score-breakdown-card.jsx"
import LegalAssessmentCard from "./legal-assment-card.jsx"

export default function CandidateProfile({ candidate }) {
  // Determine color based on score
  const getScoreColor = (score) => {
    if (score < 0) return "bg-red-500"
    if (score < 25) return "bg-orange-500"
    if (score < 75) return "bg-blue-500"
    return "bg-green-500"
  }

  const getAssessmentBadge = (assessment) => {
    const assessmentMap = {
      Excellent: "bg-green-100 text-green-800",
      Good: "bg-blue-100 text-blue-800",
      Average: "bg-yellow-100 text-yellow-800",
      Poor: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    }

    return assessmentMap[assessment] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{candidate.summary.fullName}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Age: {candidate.summary.age}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {candidate.summary.constituency}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                {candidate.summary.partyAffiliation}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`${getScoreColor(candidate.scoringBreakdown.totalScore)} text-white text-lg font-medium px-3 py-1.5 rounded-md`}
            >
              Score: {candidate.scoringBreakdown.totalScore}
            </div>
            <div
              className={`${getAssessmentBadge(candidate.scoringBreakdown.assessment)} text-sm font-medium px-3 py-1.5 rounded-md`}
            >
              {candidate.scoringBreakdown.assessment}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Candidate Summary</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Educational Background</h3>
                <p className="mt-1">{candidate.summary.educationalBackground}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Professional Experience</h3>
                <p className="mt-1">{candidate.summary.professionalDetails}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Election History</h3>
                <p className="mt-1">{candidate.summary.electionExperience}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Criminal Case Status</h3>
                <p className="mt-1">{candidate.summary.criminalCaseStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Score Breakdown */}
        <div className="lg:col-span-1">
          <ScoreBreakdownCard
            criminalScore={candidate.scoringBreakdown.criminalScore}
            educationScore={candidate.scoringBreakdown.educationScore}
            financialScore={candidate.scoringBreakdown.financialScore}
            performanceScore={candidate.scoringBreakdown.performanceScore}
            totalScore={candidate.scoringBreakdown.totalScore}
          />
        </div>

        {/* Right Column - Legal Assessment */}
        <div className="lg:col-span-1">
          <LegalAssessmentCard
            legalBackgroundJudgment={candidate.ipcCriminalityAssessment.legalBackgroundJudgment}
            ipcSections={candidate.ipcCriminalityAssessment.ipcSections}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="bg-[#6c63ff] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Report
        </button>

        <button className="border border-[#6c63ff] text-[#6c63ff] px-4 py-2 rounded-md hover:bg-[#6c63ff]/5 transition-all flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit Assessment
        </button>

        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-all flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Request More Info
        </button>
      </div>
    </div>
  )
}
