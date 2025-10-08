// Main landing page component with ML model interface for exoplanet detection
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LightCurveChart from "../components/LightCurveChart";
import {
  deleteLightcurve,
  fetchReason,
  lightcurveImageUrl,
  manualPredict,
  uploadCSV,
  uploadRaw,
} from "../services/api";

/**
 * LandingPage Component
 *
 * This is the main landing page of the OrbitSix application that provides
 * the primary interface for users to interact with the ML model for exoplanet detection.
 *
 * Features:
 * - Hero section with call-to-action
 * - Multiple data input methods (manual, CSV, dataset, raw light curve)
 * - Interactive parameter controls for manual input
 * - Analysis simulation with loading states
 * - Results display with exoplanet detection information
 * - Responsive design with modern UI
 */
const LandingPage = () => {
  // State management for file uploads and analysis
  const [selectedFile, setSelectedFile] = useState(null); // Selected file for upload
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Loading state during analysis
  const [showResults, setShowResults] = useState(false); // Controls results display
  const [selectedInputMethod, setSelectedInputMethod] = useState("manual"); // Current input method
  const [showReasoning, setShowReasoning] = useState(false); // State for showing/hiding reasoning section
  const [lightCurveData, setLightCurveData] = useState([]); // Mock or backend-provided light curve
  const [predictionId, setPredictionId] = useState(null);
  const [predictionVerdict, setPredictionVerdict] = useState(null);
  const [predictionScore, setPredictionScore] = useState(null);
  const [predictionError, setPredictionError] = useState("");
  const [reasonText, setReasonText] = useState("");
  const [lightcurveUrl, setLightcurveUrl] = useState("");
  const [csvDragging, setCsvDragging] = useState(false);
  const [rawDragging, setRawDragging] = useState(false);
  const [resetNotice, setResetNotice] = useState("");
  const [confirmSwitchOpen, setConfirmSwitchOpen] = useState(false);
  const [pendingMethod, setPendingMethod] = useState(null);

  /**
   * Scrolls to the data input section when "Try The Tool" button is clicked
   */
  const scrollToSection = () => {
    const element = document.getElementById("data-input-menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Manual data input state - Contains all planetary and stellar parameters
  const [manualData, setManualData] = useState({
    // Planetary and Orbital Parameters
    k_ror: 0.05, // Radius ratio (planet radius / star radius)
    pl_prad_re: 2.0, // Planetary radius in Earth radii
    pl_orbper_days: 10.0, // Orbital period in days
    pl_insol_flux: 100.0, // Planetary insolation flux
    pl_depth_ppm: 1000.0, // Transit depth in parts per million
    pl_trandur_hrs: 3.0, // Transit duration in hours
    koi_impact: 0.5, // Impact parameter
    pl_tranmid_bjd: 2455000.0, // Planetary transit midpoint in BJD
    // Stellar Properties
    st_teff_k: 5778.0, // Stellar effective temperature in Kelvin
    st_rad_rsun: 1.0, // Stellar radius in solar radii
    k_srho: 1.4, // Stellar density in g/cm³
    st_mag_tess: 10.0, // Stellar magnitude in TESS band
    // Data Quality and Confidence
    koi_model_snr: 20.0, // Model signal-to-noise ratio
  });

  // Dataset selection state - For existing dataset analysis
  const [datasetOptions, setDatasetOptions] = useState({
    selectedDataset: "kepler-11", // Currently selected dataset
    searchByName: "", // Search term for planet name
    searchByDate: "", // Search term for discovery date
    filters: {
      planetRadius: true, // Filter by planet radius
      discoveryYear: false, // Filter by discovery year
      addFilter: false, // Additional filter option
    },
  });

  /**
   * Handles file upload for CSV and raw light curve data
   * @param {Event} event - File input change event
   */
  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const setFileFromDrop = (file, mode) => {
    if (!file) return;
    const name = file.name.toLowerCase();
    if (mode === "csv") {
      if (!(name.endsWith(".csv") || name.endsWith(".txt"))) {
        setPredictionError("Please drop a CSV (.csv/.txt) file");
        return;
      }
    }
    if (mode === "raw") {
      if (
        !(
          name.endsWith(".fits") ||
          name.endsWith(".fit") ||
          name.endsWith(".fz")
        )
      ) {
        setPredictionError("Please drop a FITS file (.fits/.fit/.fz)");
        return;
      }
    }
    setPredictionError("");
    setSelectedFile(file);
  };

  const actuallyChangeInputMethod = (method) => {
    // reset previous results/state when switching input methods
    if (
      showResults ||
      predictionId ||
      predictionVerdict ||
      lightcurveUrl ||
      predictionError ||
      (Array.isArray(lightCurveData) && lightCurveData.length > 0)
    ) {
      setResetNotice(
        "Previous results have been cleared after switching input method."
      );
      window.clearTimeout(actuallyChangeInputMethod.__t);
      actuallyChangeInputMethod.__t = window.setTimeout(
        () => setResetNotice(""),
        4000
      );
    }
    setSelectedInputMethod(method);
    setSelectedFile(null);
    setIsAnalyzing(false);
    setShowResults(false);
    setLightCurveData([]);
    setPredictionError("");
    setPredictionId(null);
    setPredictionVerdict(null);
    setPredictionScore(null);
    setReasonText("");
    setLightcurveUrl("");
  };

  const requestChangeInputMethod = (method) => {
    const hasResults =
      showResults ||
      predictionId ||
      predictionVerdict ||
      lightcurveUrl ||
      predictionError ||
      (Array.isArray(lightCurveData) && lightCurveData.length > 0);
    if (hasResults) {
      setPendingMethod(method);
      setConfirmSwitchOpen(true);
      return;
    }
    actuallyChangeInputMethod(method);
  };

  /**
   * Handles the analysis process based on selected input method
   * Prepares data for ML model and simulates analysis
   */
  const handleAnalysis = async () => {
    // Validate file selection for CSV input method
    if (selectedInputMethod === "csv" && !selectedFile) return;

    setIsAnalyzing(true);
    setShowResults(false);
    setLightCurveData([]);
    setPredictionError("");
    setPredictionId(null);
    setPredictionVerdict(null);
    setPredictionScore(null);
    setReasonText("");
    setLightcurveUrl("");

    // Prepare data for ML model based on input method
    const analysisData =
      selectedInputMethod === "manual"
        ? {
            inputType: "manual",
            parameters: {
              k_ror: manualData.k_ror,
              pl_prad_re: manualData.pl_prad_re,
              pl_orbper_days: manualData.pl_orbper_days,
              pl_insol_flux: manualData.pl_insol_flux,
              pl_depth_ppm: manualData.pl_depth_ppm,
              pl_trandur_hrs: manualData.pl_trandur_hrs,
              koi_impact: manualData.koi_impact,
              pl_tranmid_bjd: manualData.pl_tranmid_bjd,
              st_teff_k: manualData.st_teff_k,
              st_rad_rsun: manualData.st_rad_rsun,
              k_srho: manualData.k_srho,
              st_mag_tess: manualData.st_mag_tess,
              koi_model_snr: manualData.koi_model_snr,
            },
          }
        : selectedInputMethod === "dataset"
        ? {
            inputType: "dataset",
            parameters: {
              selectedDataset: datasetOptions.selectedDataset,
              searchByName: datasetOptions.searchByName,
              searchByDate: datasetOptions.searchByDate,
              filters: datasetOptions.filters,
            },
          }
        : {
            inputType: "file",
            file: selectedFile,
          };

    console.log("Data prepared for ML model:", analysisData);

    // For existing dataset input, load a mock light curve dataset for now
    if (selectedInputMethod === "dataset") {
      // Realistic periodic transit with correlated (red) noise and white noise
      const totalDays = 7;
      const samples = 700; // finer cadence for scatter
      const dt = totalDays / samples;
      const period = 2.0; // days
      const t0 = 1.1; // phase offset so transits appear near 1.1, 3.1, 5.1...
      const depth = 0.0065; // ~0.65% depth
      const duration = 0.14; // days (total transit duration)
      const ingressWidth = 0.06; // days (smoothing for ingress/egress)

      // Build red noise via simple exponential smoothing (AR(1)) plus white noise
      const redNoise = new Array(samples + 1);
      let rn = 0;
      const alpha = 0.92; // correlation strength
      for (let i = 0; i <= samples; i++) {
        const wn = (Math.random() - 0.5) * 0.0006; // white noise component
        rn = alpha * rn + (1 - alpha) * wn * 8; // ensure noticeable but small
        redNoise[i] = rn + wn;
      }

      const transitProfile = (time) => {
        // distance from nearest mid-transit in days
        const phase = (((time - t0) % period) + period) % period; // 0..period
        const d = Math.abs(phase - period / 2);
        const half = duration / 2;
        if (d >= half) return 0; // out of transit
        // inside: flat bottom with smoothed ingress/egress using cosine/smoothstep blend
        if (d <= half - ingressWidth) return 1; // full depth
        const x = (d - (half - ingressWidth)) / ingressWidth; // 0..1 in edge
        const s = 0.5 * (1 + Math.cos(Math.PI * x)); // cosine ramp from 1->0
        return s;
      };

      const mock = Array.from({ length: samples + 1 }, (_, i) => {
        const t = i * dt; // 0..7
        const baseline = 1.0;
        const transit = transitProfile(t);
        const outlier =
          Math.random() < 0.01 ? (Math.random() - 0.5) * 0.001 : 0; // rare small outliers
        const flux = baseline - depth * transit + redNoise[i] + outlier;
        return { time: t, flux };
      });

      setLightCurveData(mock);
    }

    try {
      if (selectedInputMethod === "manual") {
        const payload = {
          radius_ratio: manualData.k_ror,
          planetary_radius: manualData.pl_prad_re,
          orbital_period: manualData.pl_orbper_days,
          insolation_flux: manualData.pl_insol_flux,
          transit_depth: manualData.pl_depth_ppm,
          transit_duration: manualData.pl_trandur_hrs,
          impact_parameter: manualData.koi_impact,
          transit_midpoint: manualData.pl_tranmid_bjd,
          stellar_temp: manualData.st_teff_k,
          stellar_radius: manualData.st_rad_rsun,
          stellar_density: manualData.k_srho,
          stellar_mag_tess: manualData.st_mag_tess,
          stellar_mass: null,
          stellar_logg: null,
          stellar_metallicity: null,
          transit_depth_err: null,
          model_snr: manualData.koi_model_snr,
        };
        const res = await manualPredict(payload);
        setPredictionId(res.id || null);
        setPredictionVerdict(res.verdict || null);
        setPredictionScore(typeof res.score === "number" ? res.score : null);

        console.log(predictionId);
      } else if (selectedInputMethod === "csv") {
        if (!selectedFile) {
          throw new Error("Please select a file to upload");
        }
        const name = selectedFile.name.toLowerCase();
        const isCsv = name.endsWith(".csv") || name.endsWith(".txt");
        if (!isCsv) {
          throw new Error("Please upload a CSV file (.csv/.txt)");
        }
        const res = await uploadCSV(selectedFile);
        if (res.res) {
          const totalExoplanets = res.res.filter(
            (v) => v === "Exoplanet"
          ).length;
          const totalCandidates = res.res.length;
          setPredictionVerdict(
            `Found ${totalExoplanets} potential exoplanets out of ${totalCandidates} candidates`
          );
          setPredictionScore(totalExoplanets / totalCandidates);
        }
      } else if (selectedInputMethod === "raw") {
        if (!selectedFile) {
          throw new Error("Please select a file to upload");
        }
        const name = selectedFile.name.toLowerCase();
        const isFits =
          name.endsWith(".fits") ||
          name.endsWith(".fit") ||
          name.endsWith(".fz");
        if (!isFits) {
          throw new Error(
            "Please upload a FITS light curve file (.fits/.fit/.fz)"
          );
        }
        const res = await uploadRaw(selectedFile);
        setPredictionId(res.id || null);
        setPredictionVerdict(res.verdict || null);
        setPredictionScore(typeof res.score === "number" ? res.score : null);
        if (res.id) {
          setLightcurveUrl(lightcurveImageUrl(res.id));
        }
      }

      setShowResults(true);
      setShowReasoning(false);
    } catch (err) {
      setPredictionError(err?.message || "Prediction failed");
      setShowResults(true);
    } finally {
      setIsAnalyzing(false);
    }


  };

  /**
   * Updates manual data parameters when user adjusts sliders or inputs
   * @param {string} parameter - The parameter name to update
   * @param {number} value - The new value for the parameter
   */
  const handleManualDataChange = (parameter, value) => {
    setManualData((prev) => ({
      ...prev,
      [parameter]: value,
    }));
  };

  /**
   * Updates dataset selection options
   * @param {string} field - The field to update
   * @param {any} value - The new value for the field
   */
  const handleDatasetChange = (field, value) => {
    setDatasetOptions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Updates filter options for dataset selection
   * @param {string} filterName - The filter name to update
   * @param {boolean} checked - Whether the filter is enabled
   */
  const handleFilterChange = (filterName, checked) => {
    setDatasetOptions((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterName]: checked,
      },
    }));
  };

  // Available datasets for selection
  const availableDatasets = [
    { value: "kepler-11", label: "Kepler-11 System" },
    { value: "kepler-186", label: "Kepler-186 System" },
    { value: "trappist-1", label: "TRAPPIST-1 System" },
    { value: "proxima-centauri", label: "Proxima Centauri System" },
    { value: "k2-18", label: "K2-18 System" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements - Animated planet-like shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      <Header />

      {confirmSwitchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setConfirmSwitchOpen(false)}
          />
          <div className="relative bg-slate-800 border border-slate-700 rounded-lg w-full max-w-md mx-auto p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Switch input method?</h3>
            <p className="text-sm text-gray-300 mb-6">
              Switching input method will clear the previous results. Continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setConfirmSwitchOpen(false);
                }}
                className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white"
              >
                No
              </button>
              <button
                onClick={() => {
                  const target = pendingMethod;
                  setConfirmSwitchOpen(false);
                  setPendingMethod(null);
                  if (target) {
                    actuallyChangeInputMethod(target);
                  }
                }}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Yes, switch
              </button>
            </div>
          </div>
        </div>
      )}

      {resetNotice && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          role="status"
          aria-live="polite"
        >
          <div className="shadow-lg bg-amber-100/95 text-amber-900 border border-amber-300 rounded-md px-5 py-3 text-sm">
            {resetNotice}
          </div>
        </div>
      )}

      {/* Hero Section - Main call-to-action area */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Use our Machine Learning model.
            <br />
            Predict <span className="text-blue-500">Exoplanet.</span>
          </h1>

          {/* Description text */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Team OrbitSix is presenting you a Machine Learning model to check
            whether data lead us to Exoplanet or not. Here your data will speak
            louder than before. Choose what type of Input method you want to use
            and Get Started!
          </p>

          {/* Call-to-action button */}
          <button
            onClick={scrollToSection}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-semibold text-lg uppercase tracking-wide"
          >
            Try The Tool
          </button>
        </div>
      </section>

      {/* Data Input Section - Main interface for data input methods */}
      <section id="data-input-menu" className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <h2 className="text-3xl font-bold text-center mb-12">
            How would you like to input your data?
          </h2>

          {/* Input method selection cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Manual Data Input Card */}
            <div
              onClick={() => requestChangeInputMethod("manual")}
              className={`bg-slate-800 border-2 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer ${
                selectedInputMethod === "manual"
                  ? "border-blue-500"
                  : "border-slate-700"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  selectedInputMethod === "manual" ? "text-blue-400" : ""
                }`}
              >
                Manual Data Input
              </h3>
              <p className="text-gray-400 text-sm">Enter data manually.</p>
            </div>

            {/* CSV File Upload Card */}
            <div
              onClick={() => requestChangeInputMethod("csv")}
              className={`bg-slate-800 border-2 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer ${
                selectedInputMethod === "csv"
                  ? "border-blue-500"
                  : "border-slate-700"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  selectedInputMethod === "csv" ? "text-blue-400" : ""
                }`}
              >
                CSV File Upload
              </h3>
              <p className="text-gray-400 text-sm">Upload a CSV file.</p>
            </div>

            {/* Existing Dataset Card */}
            <div
              onClick={() => requestChangeInputMethod("dataset")}
              className={`bg-slate-800 border-2 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer ${
                selectedInputMethod === "dataset"
                  ? "border-blue-500"
                  : "border-slate-700"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  selectedInputMethod === "dataset" ? "text-blue-400" : ""
                }`}
              >
                Existing Dataset
              </h3>
              <p className="text-gray-400 text-sm">Select from presets.</p>
            </div>

            {/* Raw Light Curve Data Card */}
            <div
              onClick={() => requestChangeInputMethod("raw")}
              className={`bg-slate-800 border-2 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer ${
                selectedInputMethod === "raw"
                  ? "border-blue-500"
                  : "border-slate-700"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  selectedInputMethod === "raw" ? "text-blue-400" : ""
                }`}
              >
                Raw Light Curve Data
              </h3>
              <p className="text-gray-400 text-sm">
                Upload raw light curve data.
              </p>
            </div>
          </div>

          {/* Manual Data Input Interface - Interactive parameter controls */}
          {selectedInputMethod === "manual" && (
            <>
              {/* Instructions for manual input */}
              <div className="text-center mb-8">
                <p className="text-gray-400 text-lg">
                  Use range sliders or input fields to provide values for each
                  parameter. These parameters will be used by our ML model to
                  predict the presence of exoplanets. Adjust the values based on
                  your observational data.
                </p>
              </div>

              {/* Manual input form container */}
              <div className="bg-slate-800 rounded-lg p-8">
                {/* Planetary and Orbital Parameters Section */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-2">
                    Planetary and Orbital Parameters
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Radius Ratio */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Radius Ratio (k_ror)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.001"
                          max="0.2"
                          step="0.001"
                          value={manualData.k_ror}
                          onChange={(e) =>
                            handleManualDataChange(
                              "k_ror",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.001</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.k_ror.toFixed(3)}
                          </span>
                          <span>0.2</span>
                        </div>
                      </div>
                    </div>

                    {/* Planetary Radius */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Planetary Radius (pl_prad_re) - Earth radii
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.1"
                          max="30"
                          step="0.1"
                          value={manualData.pl_prad_re}
                          onChange={(e) =>
                            handleManualDataChange(
                              "pl_prad_re",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.pl_prad_re.toFixed(1)} R⊕
                          </span>
                          <span>30</span>
                        </div>
                      </div>
                    </div>

                    {/* Orbital Period */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Orbital Period (pl_orbper_days) - days
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.1"
                          max="730"
                          step="0.1"
                          value={manualData.pl_orbper_days}
                          onChange={(e) =>
                            handleManualDataChange(
                              "pl_orbper_days",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.pl_orbper_days.toFixed(1)} days
                          </span>
                          <span>730</span>
                        </div>
                      </div>
                    </div>

                    {/* Planetary Insolation Flux */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Planetary Insolation Flux (pl_insol_flux)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.1"
                          max="10000"
                          step="0.1"
                          value={manualData.pl_insol_flux}
                          onChange={(e) =>
                            handleManualDataChange(
                              "pl_insol_flux",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.pl_insol_flux.toFixed(1)}
                          </span>
                          <span>10000</span>
                        </div>
                      </div>
                    </div>

                    {/* Transit Depth */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Transit Depth (pl_depth_ppm) - ppm
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="50000"
                          step="1"
                          value={manualData.pl_depth_ppm}
                          onChange={(e) =>
                            handleManualDataChange(
                              "pl_depth_ppm",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.pl_depth_ppm.toFixed(0)} ppm
                          </span>
                          <span>50000</span>
                        </div>
                      </div>
                    </div>

                    {/* Transit Duration */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Transit Duration (pl_trandur_hrs) - hours
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.1"
                          max="24"
                          step="0.1"
                          value={manualData.pl_trandur_hrs}
                          onChange={(e) =>
                            handleManualDataChange(
                              "pl_trandur_hrs",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.pl_trandur_hrs.toFixed(1)} hrs
                          </span>
                          <span>24</span>
                        </div>
                      </div>
                    </div>

                    {/* Impact Parameter */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Impact Parameter (koi_impact)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="1.5"
                          step="0.01"
                          value={manualData.koi_impact}
                          onChange={(e) =>
                            handleManualDataChange(
                              "koi_impact",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.koi_impact.toFixed(2)}
                          </span>
                          <span>1.5</span>
                        </div>
                      </div>
                    </div>

                    {/* Planetary Transit Midpoint */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Planetary Transit Midpoint (pl_tranmid_bjd) - BJD
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="2454000"
                          max="2460000"
                          step="0.1"
                          value={manualData.pl_tranmid_bjd}
                          onChange={(e) =>
                            handleManualDataChange(
                              "pl_tranmid_bjd",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>2454000</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.pl_tranmid_bjd.toFixed(1)}
                          </span>
                          <span>2460000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stellar Properties Section */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-purple-400 mb-6 border-b border-slate-700 pb-2">
                    Stellar Properties
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Stellar Effective Temperature */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Stellar Effective Temperature (st_teff_k) - K
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="2500"
                          max="10000"
                          step="10"
                          value={manualData.st_teff_k}
                          onChange={(e) =>
                            handleManualDataChange(
                              "st_teff_k",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>2500</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.st_teff_k.toFixed(0)} K
                          </span>
                          <span>10000</span>
                        </div>
                      </div>
                    </div>

                    {/* Stellar Radius */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Stellar Radius (st_rad_rsun) - Solar radii
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.01"
                          value={manualData.st_rad_rsun}
                          onChange={(e) =>
                            handleManualDataChange(
                              "st_rad_rsun",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.st_rad_rsun.toFixed(2)} R☉
                          </span>
                          <span>5</span>
                        </div>
                      </div>
                    </div>

                    {/* Stellar Density */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Stellar Density (k_srho) - g/cm³
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.01"
                          max="10"
                          step="0.01"
                          value={manualData.k_srho}
                          onChange={(e) =>
                            handleManualDataChange(
                              "k_srho",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0.01</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.k_srho.toFixed(2)} g/cm³
                          </span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>

                    {/* Stellar Magnitude */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Stellar Magnitude (st_mag_tess) - TESS mag
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="5"
                          max="20"
                          step="0.1"
                          value={manualData.st_mag_tess}
                          onChange={(e) =>
                            handleManualDataChange(
                              "st_mag_tess",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>5</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.st_mag_tess.toFixed(1)} mag
                          </span>
                          <span>20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Quality and Confidence Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-green-400 mb-6 border-b border-slate-700 pb-2">
                    Data Quality and Confidence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Model Signal-to-Noise Ratio */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Model Signal-to-Noise Ratio (koi_model_snr)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="500"
                          step="0.1"
                          value={manualData.koi_model_snr}
                          onChange={(e) =>
                            handleManualDataChange(
                              "koi_model_snr",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>1</span>
                          <span className="text-blue-400 font-medium">
                            {manualData.koi_model_snr.toFixed(1)}
                          </span>
                          <span>500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analyze Button */}
                <div className="text-center">
                  <button
                    onClick={handleAnalysis}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Analyze Data
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Existing Dataset Interface */}
          {selectedInputMethod === "dataset" && (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-400 text-lg">
                  Run our model on existing datasets (KOI, TOI, etc.). You will
                  get ideas about how well our model is working on different
                  existing datasets.
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-8">
                {/* Dataset Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Select a Dataset
                  </label>
                  <select
                    value={datasetOptions.selectedDataset}
                    onChange={(e) =>
                      handleDatasetChange("selectedDataset", e.target.value)
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {availableDatasets.map((dataset) => (
                      <option key={dataset.value} value={dataset.value}>
                        {dataset.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Search by Name */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Search by Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Kepler-11b"
                        value={datasetOptions.searchByName}
                        onChange={(e) =>
                          handleDatasetChange("searchByName", e.target.value)
                        }
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Search by Discovery Date */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Search by Discovery Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="date"
                        value={datasetOptions.searchByDate}
                        onChange={(e) =>
                          handleDatasetChange("searchByDate", e.target.value)
                        }
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Options */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">
                    Select columns to search
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={datasetOptions.filters.planetRadius}
                        onChange={(e) =>
                          handleFilterChange("planetRadius", e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm bg-blue-600 px-3 py-1 rounded-full">
                        Planet Radius
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={datasetOptions.filters.discoveryYear}
                        onChange={(e) =>
                          handleFilterChange("discoveryYear", e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm bg-slate-700 px-3 py-1 rounded-full">
                        Discovery Year
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={datasetOptions.filters.addFilter}
                        onChange={(e) =>
                          handleFilterChange("addFilter", e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-blue-400">
                        Add Filter
                      </span>
                    </label>
                  </div>
                </div>

                {/* Analyze Button */}
                <div className="text-center">
                  <button
                    onClick={handleAnalysis}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                  >
                    Analyze Data
                  </button>
                </div>
              </div>
            </>
          )}

          {/* CSV File Upload Interface */}
          {selectedInputMethod === "csv" && (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-400 text-lg">
                  Upload a CSV file containing desired data. Make sure the
                  column names and row data types almost match with the standard
                  datasets (KOI, TOI, etc). If that’s not the case, don’t worry,
                  we will process your data but the accuracy may not be the true
                  depiction of your original data. We will provide you another
                  CSV file having the predictions.
                </p>
              </div>
              <div
                className={`bg-slate-800 rounded-lg p-12 text-center border-2 border-dashed ${
                  csvDragging
                    ? "border-blue-500 bg-slate-800/70"
                    : "border-slate-600"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCsvDragging(true);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCsvDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCsvDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCsvDragging(false);
                  const file = e.dataTransfer?.files?.[0];
                  setFileFromDrop(file, "csv");
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
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
                  <h3 className="text-xl font-semibold mb-2">
                    Upload a CSV file
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Drag and drop or click to upload.
                  </p>

                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
                    Select File
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                    />
                  </label>

                  {selectedFile && (
                    <div className="mt-4">
                      <p className="text-green-400">
                        Selected: {selectedFile.name}
                      </p>
                      <button
                        onClick={handleAnalysis}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Start Analysis
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Raw Light Curve Data Interface */}
          {selectedInputMethod === "raw" && (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-400 text-lg">
                  Upload a FITS light curve file from Kepler, K2, or TESS. We
                  will analyze it and tell you whether the object of interest is
                  an exoplanet.
                </p>
              </div>
              <div
                className={`bg-slate-800 rounded-lg p-12 text-center border-2 border-dashed ${
                  rawDragging
                    ? "border-blue-500 bg-slate-800/70"
                    : "border-slate-600"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRawDragging(true);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRawDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRawDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRawDragging(false);
                  const file = e.dataTransfer?.files?.[0];
                  setFileFromDrop(file, "raw");
                }}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Upload a FITS file
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or Drag and Drop the file here
                  </p>
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept=".fits,.fit,.fz,application/fits,image/fits"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {selectedFile && (
                    <div className="mt-4">
                      <p className="text-green-400">
                        Selected: {selectedFile.name}
                      </p>
                      <button
                        onClick={handleAnalysis}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Start Analysis
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Results Section - Displays analysis results and loading states */}
      {(isAnalyzing || showResults) && (
        <section className="relative py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Results</h2>

            {isAnalyzing && (
              <div className="bg-slate-800 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                  <span className="text-lg">Analyzing Data...</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full animate-pulse"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  This may take a few minutes.
                </p>
              </div>
            )}

            {showResults && (
              <div className="bg-slate-800 rounded-lg p-8">
                {/* Header with Verdict, Confidence, and Toggle Button */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-200 mb-2">
                      Verdict: {predictionVerdict || "-"}
                    </h2>
                    <p className="text-xl font-bold text-gray-300">
                      Confidence:{" "}
                      {predictionScore != null
                        ? Math.round(predictionScore * 100)
                        : "-"}
                      %
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      console.log(predictionId);

                      const next = !showReasoning;
                      setShowReasoning(next);
                      if (next && predictionId && !reasonText) {
                        try {
                          const r = await fetchReason(predictionId);
                          setReasonText(r?.reason || "");
                        } catch (e) {
                          setReasonText("Could not fetch reasoning.");
                        }
                      }
                    }}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      showReasoning
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {showReasoning ? "CLOSE REASONING" : "VIEW REASONING"}
                  </button>
                </div>

                {predictionError && (
                  <div className="mb-6 text-red-400">{predictionError}</div>
                )}

                {/* Raw light curve image (for raw uploads) */}
                {selectedInputMethod === "raw" &&
                  predictionId &&
                  lightcurveUrl && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-200 mb-4">
                        Light Curve
                      </h3>
                      <img
                        src={lightcurveUrl}
                        alt="Light curve"
                        className="w-full max-w-3xl rounded border border-slate-700"
                      />
                      <div className="mt-3">
                        <button
                          onClick={async () => {
                            if (!predictionId) return;
                            try {
                              await deleteLightcurve(predictionId);
                              setLightcurveUrl("");
                            } catch (_) {}
                          }}
                          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded"
                        >
                          Delete Light Curve
                        </button>
                      </div>
                    </div>
                  )}

                {/* Light curve rendered for existing dataset input */}
                {selectedInputMethod === "dataset" &&
                  lightCurveData.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-200 mb-4">
                        Light Curve (Existing Dataset)
                      </h3>
                      <LightCurveChart
                        data={lightCurveData}
                        width={760}
                        height={360}
                        showPoints={true}
                        xDomain={[0, 7]}
                        yDomain={[0.992, 1.002]}
                      />
                    </div>
                  )}

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
                    {predictionId && reasonText && (
                      <div className="mb-6 text-gray-300 whitespace-pre-line">
                        {reasonText}
                      </div>
                    )}

                    {!reasonText && (
                      <div className="space-y-6 text-gray-300">
                        {/* Ideal Planetary Parameters */}
                        <div>
                          <h4 className="text-lg font-bold mb-3">
                            1. Ideal Planetary Parameters
                          </h4>
                          <ul className="space-y-3 ml-4">
                            <li>
                              <strong>Planet Radius (koi_prad):</strong> The
                              derived radius is{" "}
                              {selectedInputMethod === "manual"
                                ? manualData.pl_prad_re
                                : "1.16"}{" "}
                              Earth radii. This is a perfect size for a small,
                              terrestrial 'super-Earth' type planet and is a
                              strong indicator of a planetary nature.
                            </li>
                            <li>
                              <strong>Transit Depth (koi_depth):</strong> The
                              depth of{" "}
                              {selectedInputMethod === "manual"
                                ? manualData.pl_depth_ppm
                                : "131.1"}{" "}
                              ppm is very shallow, consistent with a small
                              planet transiting a Sun-like star. It is far too
                              shallow to be caused by a stellar companion.
                            </li>
                            <li>
                              <strong>
                                Signal-to-Noise Ratio (koi_model_snr):
                              </strong>{" "}
                              At{" "}
                              {selectedInputMethod === "manual"
                                ? manualData.koi_model_snr.toFixed(1)
                                : "50.6"}
                              , the signal is detected with extremely high
                              confidence. There is no doubt that a real,
                              periodic dimming event is occurring.
                            </li>
                            <li>
                              <strong>Impact Parameter (koi_impact):</strong>{" "}
                              The value of{" "}
                              {selectedInputMethod === "manual"
                                ? manualData.koi_impact.toFixed(3)
                                : "0.051"}{" "}
                              is very close to zero, indicating a central
                              transit across the star's disk. This typically
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
                                The koi_dicco_msky offset is 0.29 ± 0.20
                                arcseconds, a deviation of only 1.45-sigma from
                                the target's position.
                              </li>
                              <li>
                                The koi_dikco_msky offset is 0.21 ± 0.21
                                arcseconds, a deviation of just 1.0-sigma.
                              </li>
                            </ul>
                            <p className="mt-3">
                              These measurements are not statistically
                              significant, suggesting the transit signal
                              originates from the target star.
                            </p>
                          </div>
                        </div>

                        {/* Conclusion */}
                        <div className="space-y-4">
                          <p>
                            The data presents a compelling case for a genuine
                            exoplanet. This appears to be a small, Earth-sized
                            world on a{" "}
                            {selectedInputMethod === "manual"
                              ? manualData.pl_orbper_days.toFixed(1)
                              : "3.7"}
                            -day orbit, with strong and clean signals, and no
                            significant issues found by automated vetting tests.
                          </p>
                          <p>
                            The "FALSE POSITIVE" disposition is inexplicable
                            based on the data provided. This might be due to
                            external information not included in this dataset,
                            such as high-resolution follow-up imaging, radial
                            velocity measurements, or subtle artifacts in raw
                            light curve data.
                          </p>
                          <p>
                            Based solely on the provided information, this
                            object should be considered a "high-priority
                            PLANETARY CANDIDATE." The available evidence does
                            not support the given disposition.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;
