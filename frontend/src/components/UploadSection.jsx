"use client"

import { useState, useRef } from "react"
import { FiUpload, FiFile, FiCheckCircle } from "react-icons/fi"

const UploadSection = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file) => {
    // Check if file is PDF
    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file only")
      return false
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit")
      return false
    }

    setFileError("")
    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        processFile(file)
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        processFile(file)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const processFile = (file) => {
    setUploadedFile(file)
    setIsUploading(true)

    // Simulate file upload process
    setTimeout(() => {
      setIsUploading(false)
      onFileUpload(file)
    }, 1500)
  }

  return (
    <div className="upload-section">
      <h2>Resume Upload</h2>
      <p>Upload your resume to get an AI-powered evaluation</p>

      <div
        className={`upload-dropzone ${dragActive ? "active" : ""} ${isUploading ? "uploading" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleChange} className="file-input" />

        {!uploadedFile && !isUploading && (
          <div className="upload-content">
            <FiUpload className="upload-icon" />
            <p>Drag & drop your resume here or</p>
            <button className="upload-button" onClick={handleButtonClick}>
              Browse Files
            </button>
            <p className="upload-hint">PDF only, max 5MB</p>
          </div>
        )}

        {uploadedFile && !isUploading && (
          <div className="upload-success">
            <FiFile className="file-icon" />
            <p>{uploadedFile.name}</p>
            <FiCheckCircle className="check-icon" />
          </div>
        )}

        {isUploading && (
          <div className="upload-loading">
            <div className="spinner"></div>
            <p>Uploading resume...</p>
          </div>
        )}
      </div>

      {fileError && <p className="error-message">{fileError}</p>}
    </div>
  )
}

export default UploadSection
