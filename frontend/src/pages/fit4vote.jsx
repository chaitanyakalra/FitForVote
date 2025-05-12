"use client"

import { useState } from "react"
import UploadSection from "./UploadSection"
import StepperPanel from "./StepperPanel"
import ResultsDisplay from "./ResultsDisplay"
import "./fitforvote.css"

const FitForVote = () => {
  const [file, setFile] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile)
    setIsUploaded(true)
    setIsProcessing(true)

    // Simulate backend processing
    setTimeout(() => {
      setCurrentStep(1) // Move to Evaluating step

      // Simulate evaluation step
      setTimeout(() => {
        setCurrentStep(2) // Move to Summarizing step

        // Simulate summarizing step
        setTimeout(() => {
          setCurrentStep(3) // Move to Scoring step

          // Simulate scoring completion
          setTimeout(() => {
            setResults({
              name: "John Doe",
              role: "Senior Software Engineer",
              summary:
                "Experienced software engineer with 7+ years in full-stack development. Strong expertise in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading development teams.",
              scores: {
                skills: 85,
                experience: 90,
                education: 75,
                overallFit: 83,
              },
            })
            setIsProcessing(false)
          }, 2000)
        }, 2000)
      }, 2000)
    }, 1000)
  }

  const handleReEvaluate = () => {
    setFile(null)
    setIsUploaded(false)
    setCurrentStep(0)
    setResults(null)
  }

  return (
    <div className="fitforvote-container">
      <div className="fitforvote-header">
        <h1>FitForVote</h1>
        <p>Resume Evaluation System</p>
      </div>

      <div className="fitforvote-content">
        {!isUploaded && <UploadSection onFileUpload={handleFileUpload} />}

        {isUploaded && !results && <StepperPanel currentStep={currentStep} />}

        {results && <ResultsDisplay results={results} onReEvaluate={handleReEvaluate} />}
      </div>
    </div>
  )
}

export default FitForVote
