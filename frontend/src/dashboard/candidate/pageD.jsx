"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import CandidateProfile from "@/components/candidate-profile"
import { mockCandidates } from "@/lib/mock-data"

export default function CandidatePage() {
  const params = useParams()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call with the ID
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const foundCandidate = mockCandidates.find((c) => c.id === params.id) || mockCandidates[0]
      setCandidate(foundCandidate)
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return <DashboardLayout>{candidate && <CandidateProfile candidate={candidate} />}</DashboardLayout>
}
