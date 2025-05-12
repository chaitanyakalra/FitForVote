"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import ResumeUploader from "@/components/resume-uploader"

export default function UploadPage() {
  const router = useRouter()
  const [isUploaded, setIsUploaded] = useState(false)

  const handleUploadSuccess = (candidateId) => {
    setIsUploaded(true)
    // Navigate to the candidate profile after successful upload
    setTimeout(() => {
      router.push(`/dashboard/candidate/${candidateId}`)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Resume Upload</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ResumeUploader onUploadSuccess={handleUploadSuccess} />

          {isUploaded && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              Upload successful! Redirecting to candidate profile...
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
