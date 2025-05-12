export const mockCandidates = [
    {
      id: "candidate-1",
      summary: {
        age: 52,
        constituency: "Varanasi (Uttar Pradesh)",
        criminalCaseStatus: "Pending cases under investigation and charges framed. No convictions.",
        educationalBackground:
          "Completed Class 10 (Secondary School Certificate) from Uttar Pradesh Madhyamik Shiksha Parishad.",
        electionExperience:
          "Contested 2017 Assembly elections independently (3,800 votes, 1.5%) and 2022 Panchayat elections for Zila Parishad ward (127 votes).",
        fullName: "Ravi Pratap Singh",
        partyAffiliation: "Pragati Jan Shakti Party (Registered, Unrecognized)",
        professionalDetails:
          "Owns multiple agricultural and commercial properties. Involved in real estate and security contracting. Annual income (as per ITR): ₹8.3 Lakhs. Movable assets: ₹14.7 Crores. Immovable Assets: ₹23.5 Crores. Liabilities: ₹1.2 Crores",
      },
      scoringBreakdown: {
        assessment: "Poor",
        criminalScore: -15,
        educationScore: 2,
        financialScore: 0,
        performanceScore: 2,
        totalScore: -11,
      },
      ipcCriminalityAssessment: {
        ipcSections: [
          {
            offenseSummary: "Murder",
            section: "IPC 302",
            severityLevel: "Serious",
          },
          {
            offenseSummary: "Criminal Intimidation",
            section: "IPC 506",
            severityLevel: "Cognizable",
          },
          {
            offenseSummary: "Cheating",
            section: "IPC 420",
            severityLevel: "Cognizable",
          },
          {
            offenseSummary: "Forgery for the purpose of cheating",
            section: "IPC 467, 468",
            severityLevel: "Cognizable",
          },
        ],
        legalBackgroundJudgment:
          "The candidate's legal background poses a significant concern due to serious charges like murder and cheating being under investigation or with charges framed. While the candidate claims these are politically motivated, the severity of the accusations warrants attention.",
      },
    },
    {
      id: "candidate-2",
      summary: {
        age: 45,
        constituency: "Mumbai South (Maharashtra)",
        criminalCaseStatus: "No pending cases or convictions.",
        educationalBackground: "MBA from IIM Ahmedabad, B.Tech from IIT Bombay.",
        electionExperience:
          "Contested 2019 Lok Sabha elections (245,000 votes, 28.3%) and 2021 Municipal Corporation elections (12,450 votes, 52.3%).",
        fullName: "Priya Sharma",
        partyAffiliation: "Indian National Congress",
        professionalDetails:
          "Former CEO of a technology startup. Annual income: ₹42.6 Lakhs. Movable assets: ₹3.2 Crores. Immovable Assets: ₹8.7 Crores. Liabilities: ₹1.8 Crores",
      },
      scoringBreakdown: {
        assessment: "Excellent",
        criminalScore: 20,
        educationScore: 18,
        financialScore: 15,
        performanceScore: 12,
        totalScore: 65,
      },
      ipcCriminalityAssessment: {
        ipcSections: [],
        legalBackgroundJudgment: "The candidate has a clean legal record with no pending cases or convictions.",
      },
    },
    {
      id: "candidate-3",
      summary: {
        age: 38,
        constituency: "Chennai Central (Tamil Nadu)",
        criminalCaseStatus: "One pending case related to protest participation. No convictions.",
        educationalBackground: "Ph.D in Public Policy from Delhi University, Masters in Political Science.",
        electionExperience: "First-time candidate, previously worked as a political advisor.",
        fullName: "Karthik Subramanian",
        partyAffiliation: "Dravida Munnetra Kazhagam",
        professionalDetails:
          "Professor at a leading university. Annual income: ₹18.5 Lakhs. Movable assets: ₹1.2 Crores. Immovable Assets: ₹4.3 Crores. Liabilities: ₹0.8 Crores",
      },
      scoringBreakdown: {
        assessment: "Good",
        criminalScore: 10,
        educationScore: 20,
        financialScore: 12,
        performanceScore: 8,
        totalScore: 50,
      },
      ipcCriminalityAssessment: {
        ipcSections: [
          {
            offenseSummary: "Unlawful Assembly",
            section: "IPC 143",
            severityLevel: "Non-Cognizable",
          },
        ],
        legalBackgroundJudgment:
          "The candidate has one pending case related to participation in a political protest. The charge is relatively minor and appears to be related to political activism rather than personal misconduct.",
      },
    },
    {
      id: "candidate-4",
      summary: {
        age: 62,
        constituency: "Patna Sahib (Bihar)",
        criminalCaseStatus: "Three pending cases related to financial irregularities. No convictions.",
        educationalBackground: "Bachelor of Commerce from Patna University.",
        electionExperience: "Three-term MLA, contested 2014 and 2019 Lok Sabha elections.",
        fullName: "Rajesh Kumar",
        partyAffiliation: "Bharatiya Janata Party",
        professionalDetails:
          "Businessman with interests in construction and hospitality. Annual income: ₹32.1 Lakhs. Movable assets: ₹8.7 Crores. Immovable Assets: ₹15.3 Crores. Liabilities: ₹4.2 Crores",
      },
      scoringBreakdown: {
        assessment: "Average",
        criminalScore: -5,
        educationScore: 8,
        financialScore: 5,
        performanceScore: 15,
        totalScore: 23,
      },
      ipcCriminalityAssessment: {
        ipcSections: [
          {
            offenseSummary: "Cheating",
            section: "IPC 420",
            severityLevel: "Cognizable",
          },
          {
            offenseSummary: "Criminal Breach of Trust",
            section: "IPC 406",
            severityLevel: "Cognizable",
          },
        ],
        legalBackgroundJudgment:
          "The candidate has pending cases related to financial irregularities which raise some concerns about ethical conduct. However, these are still under investigation and no convictions have been made.",
      },
    },
  ]
  