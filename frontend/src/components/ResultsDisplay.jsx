"use client"
import { FiDownload, FiRefreshCw } from "react-icons/fi"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

const ResultsDisplay = ({ results, onReEvaluate }) => {
  const { name, role, summary, scores } = results

  const chartData = {
    labels: ["Skills", "Experience", "Education"],
    datasets: [
      {
        data: [scores.skills, scores.experience, scores.education],
        backgroundColor: ["rgba(138, 43, 226, 0.7)", "rgba(94, 23, 235, 0.7)", "rgba(156, 39, 176, 0.7)"],
        borderColor: ["rgba(138, 43, 226, 1)", "rgba(94, 23, 235, 1)", "rgba(156, 39, 176, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  }

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    alert("Downloading evaluation PDF...")
  }

  const getScoreEmoji = (score) => {
    if (score >= 90) return "🌟"
    if (score >= 80) return "😊"
    if (score >= 70) return "👍"
    if (score >= 60) return "🙂"
    return "🤔"
  }

  return (
    <div className="results-display">
      <h2>Evaluation Results</h2>

      <div className="candidate-info">
        <h3>{name}</h3>
        <p className="candidate-role">{role}</p>
      </div>

      <div className="results-grid">
        <div className="summary-section">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>

        <div className="chart-section">
          <div className="chart-container">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="overall-score">
              <span className="score-number">{scores.overallFit}</span>
              <span className="score-emoji">{getScoreEmoji(scores.overallFit)}</span>
            </div>
          </div>
          <p className="chart-label">Overall Fit Score</p>
        </div>
      </div>

      <div className="scores-table">
        <h3>Detailed Scores</h3>
        <div className="score-row">
          <div className="score-label">Skills Match</div>
          <div className="score-bar-container">
            <div className="score-bar" style={{ width: `${scores.skills}%` }}></div>
          </div>
          <div className="score-value">{scores.skills}%</div>
        </div>

        <div className="score-row">
          <div className="score-label">Experience</div>
          <div className="score-bar-container">
            <div className="score-bar" style={{ width: `${scores.experience}%` }}></div>
          </div>
          <div className="score-value">{scores.experience}%</div>
        </div>

        <div className="score-row">
          <div className="score-label">Education</div>
          <div className="score-bar-container">
            <div className="score-bar" style={{ width: `${scores.education}%` }}></div>
          </div>
          <div className="score-value">{scores.education}%</div>
        </div>

        <div className="score-row overall-row">
          <div className="score-label">Overall Fit</div>
          <div className="score-bar-container">
            <div className="score-bar" style={{ width: `${scores.overallFit}%` }}></div>
          </div>
          <div className="score-value">{scores.overallFit}%</div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="download-button" onClick={handleDownloadPDF}>
          <FiDownload /> Download Evaluation
        </button>
        <button className="reevaluate-button" onClick={onReEvaluate}>
          <FiRefreshCw /> Re-evaluate
        </button>
      </div>
    </div>
  )
}

export default ResultsDisplay
