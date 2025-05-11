import ResumeUploader from "./components/ResumeUploader.jsx";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-xl font-bold mb-4">🧠 Resume Evaluator</h1>
      <ResumeUploader />
    </div>
    </>
  )
}

export default App
