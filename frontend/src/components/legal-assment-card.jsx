"use client"

import { useState } from "react"
import IPCSectionList from "./ipc-section-list"

export default function LegalAssessmentCard({ legalBackgroundJudgment, ipcSections }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Legal Assessment</h2>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-500 hover:text-gray-700">
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex items-start mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-sm">{legalBackgroundJudgment}</p>
      </div>

      {expanded && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">IPC Sections:</h3>
          <IPCSectionList ipcSections={ipcSections} />
        </div>
      )}
    </div>
  )
}
