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
  const [showReasoning, setShowReasoning] = useState(false); // State for showing/hiding reasoning section

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
              {/* Header with Verdict, Confidence, and Toggle Button */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-200 mb-2">
                    Verdict:{" "}
                    {results.exoplanetDetected ? "Exoplanet" : "No Exoplanet"}
                  </h2>
                  <p className="text-xl font-bold text-gray-300">
                    Confidence: {(results.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <button
                  onClick={() => setShowReasoning(!showReasoning)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    showReasoning
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {showReasoning ? "CLOSE REASONING" : "VIEW REASONING"}
                </button>
              </div>

              {/* Reasoning Section - Shows when button is clicked */}
              {showReasoning && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-200 mb-4">
                    Reasoning:
                  </h3>
                  <p className="text-gray-400 italic mb-6">
                    This is purely AI-assisted reasoning. So you shouldn't
                    expect the reasoning as flawless.
                  </p>

                  <div className="space-y-6 text-gray-300">
                    {/* Ideal Planetary Parameters */}
                    <div>
                      <h4 className="text-lg font-bold mb-3">
                        1. Ideal Planetary Parameters
                      </h4>
                      <ul className="space-y-3 ml-4">
                        <li>
                          <strong>Planet Radius (koi_prad):</strong> The derived
                          radius is {results.planetRadius} Earth radii. This is
                          a perfect size for a small, terrestrial 'super-Earth'
                          type planet and is a strong indicator of a planetary
                          nature.
                        </li>
                        <li>
                          <strong>Transit Depth (koi_depth):</strong> The depth
                          of {(results.transitDepth * 1000000).toFixed(1)} ppm
                          is very shallow, consistent with a small planet
                          transiting a Sun-like star. It is far too shallow to
                          be caused by a stellar companion.
                        </li>
                        <li>
                          <strong>
                            Signal-to-Noise Ratio (koi_model_snr):
                          </strong>{" "}
                          At 50.6, the signal is detected with extremely high
                          confidence. There is no doubt that a real, periodic
                          dimming event is occurring.
                        </li>
                        <li>
                          <strong>Impact Parameter (koi_impact):</strong> The
                          value of 0.051 is very close to zero, indicating a
                          central transit across the star's disk. This typically
                          produces a clean, flat-bottomed 'U-shaped' light
                          curve, which is a hallmark of a genuine planetary
                          transit.
                        </li>
                      </ul>
                    </div>

                    {/* Lack of Evidence for False Positive */}
                    <div>
                      <h4 className="text-lg font-bold mb-3">
                        2. Lack of Evidence for a False Positive
                      </h4>
                      <p className="mb-3">
                        Common causes for false positives are not present in
                        this case.
                      </p>
                      <div className="ml-4">
                        <strong>Centroid Analysis:</strong> Key tests for a
                        background eclipsing binary (BEB) show:
                        <ul className="mt-2 space-y-2 ml-4">
                          <li>
                            The koi_dicco_msky offset is 0.29 ± 0.20 arcseconds,
                            a deviation of only 1.45-sigma from the target's
                            position.
                          </li>
                          <li>
                            The koi_dikco_msky offset is 0.21 ± 0.21 arcseconds,
                            a deviation of just 1.0-sigma.
                          </li>
                        </ul>
                        <p className="mt-3">
                          These measurements are not statistically significant,
                          suggesting the transit signal originates from the
                          target star.
                        </p>
                      </div>
                    </div>

                    {/* Conclusion */}
                    <div className="space-y-4">
                      <p>
                        The data presents a compelling case for a genuine
                        exoplanet. This appears to be a small, Earth-sized world
                        on a {results.orbitalPeriod}-day orbit, with strong and
                        clean signals, and no significant issues found by
                        automated vetting tests.
                      </p>
                      <p>
                        The "FALSE POSITIVE" disposition is inexplicable based
                        on the data provided. This might be due to external
                        information not included in this dataset, such as
                        high-resolution follow-up imaging, radial velocity
                        measurements, or subtle artifacts in raw light curve
                        data.
                      </p>
                      <p>
                        Based solely on the provided information, this object
                        should be considered a "high-priority PLANETARY
                        CANDIDATE." The available evidence does not support the
                        given disposition.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analysis;
