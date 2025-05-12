
// import { useNavigate } from "react-router-dom"
// // import { Image } from "@/components/ui/image";
// export default function LandingPage() {
//   // const router = router()
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#f7f9fc] to-white">
//       <header className="bg-[#1b1f3a] text-white">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-[#6c63ff] rounded-md flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <span className="font-bold text-lg">CandidateScreen AI</span>
//           </div>
//           <nav>
//             <ul className="flex space-x-6">
//               <li>
//                 <a href="#features" className="hover:text-[#6c63ff] transition-colors">
//                   Features
//                 </a>
//               </li>
//               <li>
//                 <a href="#about" className="hover:text-[#6c63ff] transition-colors">
//                   About
//                 </a>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate("/dashboard")} className="bg-[#6c63ff] px-4 py-2 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105"
//                 >
//                   Dashboard
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       <main>
//         {/* Hero Section */}
//         <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-10 md:mb-0">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1b1f3a] leading-tight">
//               AI-Powered Candidate Eligibility Screening
//             </h1>
//             <p className="text-lg mb-8 text-gray-600 max-w-md">
//               Streamline your candidate evaluation process with our advanced AI system that analyzes resumes and
//               provides structured eligibility assessments.
//             </p>
//             <button
//               onClick={() => navigate("/upload")}              
//               className="bg-[#6c63ff] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
//             >
//               Start Screening
//             </button>
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <div className="relative w-full max-w-md h-80">
//               <img
//                 src="/placeholder.svg?height=320&width=400"
//                 alt="AI Screening Illustration"
//                 width={400}
//                 height={320}
//                 className="object-contain"
//               />

//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="bg-[#f7f9fc] py-16">
//           <div className="container mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-12 text-[#1b1f3a]">Key Features</h2>

//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105">
//                 <div className="w-12 h-12 bg-[#6c63ff] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-[#6c63ff]"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Resume Analysis</h3>
//                 <p className="text-gray-600">
//                   Advanced AI parsing of candidate resumes to extract relevant information automatically.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105">
//                 <div className="w-12 h-12 bg-[#6c63ff] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-[#6c63ff]"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Scoring System</h3>
//                 <p className="text-gray-600">
//                   Comprehensive scoring based on multiple factors including education, experience, and legal background.
//                 </p>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105">
//                 <div className="w-12 h-12 bg-[#6c63ff] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-[#6c63ff]"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
//                 <p className="text-gray-600">
//                   Comprehensive candidate profiles with visual breakdowns of scores and assessments.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* About Section */}
//         <section id="about" className="py-16">
//           <div className="container mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-12 text-[#1b1f3a]">About Our System</h2>

//             <div className="max-w-3xl mx-auto text-center">
//               <p className="text-lg text-gray-600 mb-8">
//                 Our AI-powered candidate eligibility screening system uses a multi-agent framework to assess candidates
//                 based on structured criteria. The system analyzes resumes, extracts relevant information, and provides
//                 comprehensive evaluations to help you make informed decisions.
//               </p>

//               <button
//                 onClick={() => navigate("/upload")} 
//                 className="bg-[#6c63ff] text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
//               >
//                 Try It Now
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="bg-[#1b1f3a] text-white py-8">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-4 md:mb-0">
//               <span className="font-bold text-lg">CandidateScreen AI</span>
//               <p className="text-sm text-gray-400 mt-1">© 2025 All Rights Reserved</p>
//             </div>

//             <div className="flex space-x-4">
//               <a href="#" className="hover:text-[#6c63ff] transition-colors">
//                 Privacy Policy
//               </a>
//               <a href="#" className="hover:text-[#6c63ff] transition-colors">
//                 Terms of Service
//               </a>
//               <a href="#" className="hover:text-[#6c63ff] transition-colors">
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fc] to-white">
      <header className="bg-[#1b1f3a] text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#6c63ff] rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-lg">CandidateScreen AI</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#features" className="hover:text-[#6c63ff] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#6c63ff] transition-colors">
                  About
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard")} 
                  className="bg-[#6c63ff] px-4 py-2 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105"
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1b1f3a] leading-tight">
              AI-Powered Candidate Eligibility Screening
            </h1>
            <p className="text-lg mb-8 text-gray-600 max-w-md">
              Streamline your candidate evaluation process with our advanced AI system that analyzes resumes and
              provides structured eligibility assessments.
            </p>
            <button
              onClick={() => navigate("/upload")}              
              className="bg-[#6c63ff] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Screening
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-80">
              {/* Fixed image path to use standard public asset approach */}
              <img
                src="/api/placeholder/400/320"
                alt="AI Screening Illustration"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-[#f7f9fc] py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1b1f3a]">Key Features</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105">
                <div className="w-12 h-12 bg-[#6c63ff] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#6c63ff]"
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
                </div>
                <h3 className="text-xl font-semibold mb-2">Resume Analysis</h3>
                <p className="text-gray-600">
                  Advanced AI parsing of candidate resumes to extract relevant information automatically.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105">
                <div className="w-12 h-12 bg-[#6c63ff] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#6c63ff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Scoring System</h3>
                <p className="text-gray-600">
                  Comprehensive scoring based on multiple factors including education, experience, and legal background.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105">
                <div className="w-12 h-12 bg-[#6c63ff] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#6c63ff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
                <p className="text-gray-600">
                  Comprehensive candidate profiles with visual breakdowns of scores and assessments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1b1f3a]">About Our System</h2>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-8">
                Our AI-powered candidate eligibility screening system uses a multi-agent framework to assess candidates
                based on structured criteria. The system analyzes resumes, extracts relevant information, and provides
                comprehensive evaluations to help you make informed decisions.
              </p>

              <button
                onClick={() => navigate("/upload")} 
                className="bg-[#6c63ff] text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
              >
                Try It Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1b1f3a] text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-lg">CandidateScreen AI</span>
              <p className="text-sm text-gray-400 mt-1">© 2025 All Rights Reserved</p>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#6c63ff] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#6c63ff] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#6c63ff] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
