// Analysis page component for the OrbitSix exoplanet detection tool
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * Analysis Component
 *
 * This component provides a dedicated interface for exoplanet analysis.
 * Users can select different data input methods and run analysis on their data.
 *
 * Features:
 * - Multiple data input options (manual, CSV, dataset, raw light curve)
 * - Analysis progress tracking with loading states
 * - Results display with exoplanet detection information
 * - Responsive design with interactive elements
 */
const Analysis = () => {
  // State management for the analysis interface
  const [selectedDataType, setSelectedDataType] = useState("csv"); // Currently selected data input method
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Loading state during analysis
  const [results, setResults] = useState(null); // Analysis results data

  /**
   * Handles the analysis process
   * Simulates ML model analysis with loading states and mock results
   */
  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setResults(null);

    // Simulate analysis process with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock results for demonstration
      setResults({
        exoplanetDetected: true,
        confidence: 0.89,
        planetRadius: 1.2,
        orbitalPeriod: 3.4,
        hostStar: "Kepler-442",
        transitDepth: 0.0012,
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Main content section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <h1 className="text-4xl font-bold mb-8 text-center">
            Exoplanet Analysis Tool
          </h1>

          {/* Data Input Section */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Select Your Data Input Method
            </h2>

            {/* Data input method selection buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Manual input option */}
              <button
                onClick={() => setSelectedDataType("manual")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedDataType === "manual"
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <h3 className="font-semibold mb-2">Manual Input</h3>
                <p className="text-sm text-gray-400">Enter data manually</p>
              </button>

              {/* CSV upload option */}
              <button
                onClick={() => setSelectedDataType("csv")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedDataType === "csv"
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <h3 className="font-semibold mb-2">CSV Upload</h3>
                <p className="text-sm text-gray-400">Upload CSV file</p>
              </button>

              {/* Existing dataset option */}
              <button
                onClick={() => setSelectedDataType("dataset")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedDataType === "dataset"
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <h3 className="font-semibold mb-2">Existing Dataset</h3>
                <p className="text-sm text-gray-400">Choose from presets</p>
              </button>

              {/* Raw light curve option */}
              <button
                onClick={() => setSelectedDataType("raw")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedDataType === "raw"
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <h3 className="font-semibold mb-2">Raw Light Curve</h3>
                <p className="text-sm text-gray-400">Raw observation data</p>
              </button>
            </div>

            {/* Dynamic description based on selected data type */}
            {selectedDataType === "dataset" && (
              <div className="bg-slate-700 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-center">
                  Run our model on existing datasets (KOI, TOI, etc.). You will
                  get ideas about how well our model is working on different
                  existing datasets.
                </p>
              </div>
            )}

            {selectedDataType === "raw" && (
              <div className="bg-slate-700 rounded-lg p-4 mb-6">
                <p className="text-gray-300 text-center">
                  Upload raw light curve data from telescopes or observation
                  missions. Our model will analyze the time-series photometric
                  data to detect potential exoplanet transits.
                </p>
              </div>
            )}

            {/* File Upload Area - Dynamic content based on selected data type */}
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-6">
              {/* Upload icon */}
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              {/* Dynamic title based on selected data type */}
              <h3 className="text-lg font-semibold mb-2">
                {selectedDataType === "csv"
                  ? "Upload CSV File"
                  : selectedDataType === "raw"
                  ? "Upload Light Curve Data"
                  : selectedDataType === "dataset"
                  ? "Select Dataset"
                  : "Enter Data"}
              </h3>

              {/* Dynamic description based on selected data type */}
              <p className="text-gray-400 mb-4">
                {selectedDataType === "csv"
                  ? "Drag and drop your CSV file or click to browse"
                  : selectedDataType === "raw"
                  ? "Upload your raw astronomical observation data"
                  : selectedDataType === "dataset"
                  ? "Choose from our curated datasets"
                  : "Input your data manually"}
              </p>

              {/* Dynamic button text based on selected data type */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                {selectedDataType === "dataset"
                  ? "Browse Datasets"
                  : "Select Files"}
              </button>
            </div>

            {/* Analysis start button */}
            <div className="text-center">
              <button
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {isAnalyzing ? "Analyzing..." : "Start Analysis"}
              </button>
            </div>
          </div>

          {/* Analysis Progress Section - Shows loading state during analysis */}
          {isAnalyzing && (
            <div className="bg-slate-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">
                Analysis in Progress
              </h2>
              <div className="space-y-4">
                {/* Loading spinner and status text */}
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
                  <span>Processing light curve data...</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full animate-pulse"
                    style={{ width: "75%" }}
                  ></div>
                </div>

                {/* Estimated time remaining */}
                <p className="text-gray-400 text-sm">
                  Estimated time remaining: 2-3 minutes
                </p>
              </div>
            </div>
          )}

          {/* Results Section - Displays analysis results when available */}
          {results && (
            <div className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column - Detection results and download */}
                <div className="space-y-6">
                  {/* Exoplanet detection results card */}
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-400">
                      ✓ Exoplanet Detected
                    </h3>
                    <div className="space-y-3">
                      {/* Confidence level */}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="font-semibold">
                          {(results.confidence * 100).toFixed(1)}%
                        </span>
                      </div>

                      {/* Planet radius */}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Planet Radius:</span>
                        <span className="font-semibold">
                          {results.planetRadius} Earth radii
                        </span>
                      </div>

                      {/* Orbital period */}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orbital Period:</span>
                        <span className="font-semibold">
                          {results.orbitalPeriod} days
                        </span>
                      </div>

                      {/* Host star */}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Host Star:</span>
                        <span className="font-semibold">
                          {results.hostStar}
                        </span>
                      </div>

                      {/* Transit depth */}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transit Depth:</span>
                        <span className="font-semibold">
                          {results.transitDepth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download report button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                    Download Full Report
                  </button>
                </div>

                {/* Right column - Visualizations */}
                <div className="space-y-6">
                  {/* Light curve visualization placeholder */}
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Light Curve Visualization
                    </h3>
                    <div className="h-48 bg-slate-600 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">Light Curve Chart</p>
                    </div>
                  </div>

                  {/* Planet visualization placeholder */}
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Planet Visualization
                    </h3>
                    <div className="h-32 bg-gradient-to-br from-blue-400 to-green-500 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-16 bg-slate-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analysis;
