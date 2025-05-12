"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import SummaryCard from "./summary-card.jsx"

export default function CandidateList({ candidates, loading }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAssessment, setFilterAssessment] = useState("")

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.summary.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.summary.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.summary.partyAffiliation.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAssessment =
      filterAssessment === "" || candidate.scoringBreakdown.assessment.toLowerCase() === filterAssessment.toLowerCase()

    return matchesSearch && matchesAssessment
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6c63ff]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#6c63ff] focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium">Filter by assessment:</label>
          <select
            value={filterAssessment}
            onChange={(e) => setFilterAssessment(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6c63ff] focus:border-transparent"
          >
            <option value="">All</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg text-gray-600">No candidates found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, index) => (
            <Link href={`/dashboard/candidate/${candidate.id}`} key={candidate.id || index}>
              <div className="h-full">
                <SummaryCard
                  name={candidate.summary.fullName}
                  constituency={candidate.summary.constituency}
                  party={candidate.summary.partyAffiliation}
                  totalScore={candidate.scoringBreakdown.totalScore}
                  assessment={candidate.scoringBreakdown.assessment}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
