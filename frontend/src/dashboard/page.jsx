"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import CandidateList from "@/components/candidate-list"
import { mockCandidates } from "@/lib/mock-data"

export default function Dashboard() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setCandidates(mockCandidates)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
        <CandidateList candidates={candidates} loading={loading} />
      </div>
    </DashboardLayout>
  )
}
