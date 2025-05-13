
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;

/**
 * Save a new candidate affidavit analysis
 * @param {Object} analysisData - The analysis data to save
 * @returns {Promise} - The API response
 */
export const saveAnalysis = async (analysisData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/candidate/save-analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analysisData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save analysis");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error saving analysis:", error);
    throw error;
  }
};

/**
 * Fetch all candidate analyses with pagination
 * @param {number} page - The page number to fetch
 * @param {number} limit - The number of results per page
 * @returns {Promise} - The API response
 */
export const fetchAllAnalyses = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/candidate/analyses?page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch analyses");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching analyses:", error);
    throw error;
  }
};

/**
 * Fetch a specific analysis by ID
 * @param {string} id - The analysis ID
 * @returns {Promise} - The API response
 */
export const fetchAnalysisById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/candidate/analysis/${id}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch analysis");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching analysis:", error);
    throw error;
  }
};

/**
 * Search analyses by various criteria
 * @param {Object} searchParams - The search parameters
 * @returns {Promise} - The API response
 */
export const searchAnalyses = async (searchParams) => {
  try {
    // Build query string from search parameters
    const queryParams = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });
    
    const response = await fetch(
      `${API_BASE_URL}/api/candidate/search?${queryParams.toString()}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to search analyses");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching analyses:", error);
    throw error;
  }
};