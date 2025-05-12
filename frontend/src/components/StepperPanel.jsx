"use client"
import { motion } from "framer-motion"

const StepperPanel = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Evaluating", description: "Evaluating candidate profile..." },
    { id: 2, name: "Summarizing", description: "Summarizing key strengths and experience..." },
    { id: 3, name: "Scoring", description: "Formatting and scoring profile..." },
  ]

  const getProgressPercentage = () => {
    if (currentStep === 0) return 0
    if (currentStep === 1) return 33
    if (currentStep === 2) return 66
    if (currentStep === 3) return 100
    return 0
  }

  return (
    <div className="stepper-panel">
      <h2>Processing Resume</h2>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="progress-percentage">{getProgressPercentage()}%</div>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`step ${currentStep === index + 1 ? "active" : ""} ${currentStep > index + 1 ? "completed" : ""}`}
          >
            <div className="step-indicator">
              {currentStep > index + 1 ? (
                <div className="step-check">✓</div>
              ) : (
                <div className="step-number">{step.id}</div>
              )}
              {currentStep === index + 1 && (
                <motion.div
                  className="pulse-ring"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              )}
            </div>

            <div className="step-content">
              <h3 className="step-title">{step.name}</h3>
              {currentStep === index + 1 && (
                <motion.p
                  className="step-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.description}
                  <motion.span
                    className="animated-dots"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    ...
                  </motion.span>
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepperPanel
