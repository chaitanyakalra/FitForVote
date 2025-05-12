export default function SummaryCard({ name, constituency, party, totalScore, assessment }) {
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
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
          <div className={`${getScoreColor(totalScore)} text-white text-sm font-medium px-2.5 py-1 rounded`}>
            {totalScore}
          </div>
        </div>
  
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600 text-sm">{constituency}</span>
          </div>
  
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
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
            <span className="text-gray-600 text-sm">{party}</span>
          </div>
        </div>
  
        <div className="flex items-center justify-between mt-4">
          <span className={`${getAssessmentBadge(assessment)} text-xs font-medium px-2.5 py-1 rounded`}>
            {assessment}
          </span>
  
          <button className="text-[#6c63ff] hover:text-[#5a52d5] text-sm font-medium flex items-center">
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
  