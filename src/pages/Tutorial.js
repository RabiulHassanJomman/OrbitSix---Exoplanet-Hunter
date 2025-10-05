// Tutorial page component for OrbitSix exoplanet detection platform
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * Tutorial Component
 *
 * This page provides a comprehensive guide for novice users on how to use
 * the OrbitSix exoplanet detection platform. It includes step-by-step instructions,
 * explanations of parameters, and examples for each input method.
 */
const Tutorial = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: "🌌" },
    { id: "manual", title: "Manual Input", icon: "⚙️" },
    { id: "csv", title: "CSV Upload", icon: "📊" },
    { id: "dataset", title: "Existing Datasets", icon: "🗃️" },
    { id: "raw", title: "Raw Light Curves", icon: "📈" },
    { id: "results", title: "Understanding Results", icon: "📋" },
    { id: "tips", title: "Tips & Best Practices", icon: "💡" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How to Use <span className="text-blue-500">OrbitSix</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            A complete guide to using our machine learning model for exoplanet
            detection
          </p>
        </div>
      </section>

      {/* Tutorial Navigation */}
      <section className="relative py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="relative py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  🌌 What is OrbitSix?
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    OrbitSix is a machine learning-powered platform that helps
                    astronomers and researchers detect exoplanets from
                    observational data. Our AI model analyzes various stellar
                    and planetary parameters to determine whether observed
                    signals indicate the presence of an exoplanet.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        • <strong>Multiple Input Methods:</strong> Manual data
                        entry, CSV uploads, existing datasets, and raw light
                        curves
                      </li>
                      <li>
                        • <strong>AI-Powered Analysis:</strong> Advanced machine
                        learning model trained on thousands of exoplanet
                        candidates
                      </li>
                      <li>
                        • <strong>Detailed Results:</strong> Confidence scores
                        and detailed reasoning for each prediction
                      </li>
                      <li>
                        • <strong>User-Friendly Interface:</strong> Designed for
                        both experts and beginners
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">
                      How It Works:
                    </h3>
                    <ol className="space-y-3">
                      <li>
                        <strong>1. Choose Input Method:</strong> Select how you
                        want to provide your data
                      </li>
                      <li>
                        <strong>2. Enter/Upload Data:</strong> Provide the
                        necessary parameters or files
                      </li>
                      <li>
                        <strong>3. Run Analysis:</strong> Our AI model processes
                        your data
                      </li>
                      <li>
                        <strong>4. Review Results:</strong> Get predictions with
                        confidence scores and reasoning
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Manual Input Section */}
            {activeSection === "manual" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  ⚙️ Manual Data Input
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    The manual input method allows you to enter planetary and
                    stellar parameters directly using interactive sliders and
                    input fields.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      Required Parameters:
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-blue-400 mb-3">
                          Planetary Parameters:
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            • <strong>Radius Ratio:</strong> Planet radius /
                            Star radius (0.001-0.2)
                          </li>
                          <li>
                            • <strong>Planetary Radius:</strong> Size in Earth
                            radii (0.1-30 R⊕)
                          </li>
                          <li>
                            • <strong>Orbital Period:</strong> Time for one
                            orbit (0.1-730 days)
                          </li>
                          <li>
                            • <strong>Insolation Flux:</strong> Stellar energy
                            received (0.1-10000)
                          </li>
                          <li>
                            • <strong>Transit Depth:</strong> Light dimming
                            during transit (1-50000 ppm)
                          </li>
                          <li>
                            • <strong>Transit Duration:</strong> How long
                            transit lasts (0.1-24 hours)
                          </li>
                          <li>
                            • <strong>Impact Parameter:</strong> Transit
                            geometry (0-1.5)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-purple-400 mb-3">
                          Stellar Parameters:
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            • <strong>Effective Temperature:</strong> Star's
                            surface temperature (2500-10000 K)
                          </li>
                          <li>
                            • <strong>Stellar Radius:</strong> Star size in
                            solar radii (0.1-5 R☉)
                          </li>
                          <li>
                            • <strong>Stellar Density:</strong> Star's average
                            density (0.01-10 g/cm³)
                          </li>
                          <li>
                            • <strong>Stellar Magnitude:</strong> Brightness in
                            TESS band (5-20 mag)
                          </li>
                          <li>
                            • <strong>Signal-to-Noise:</strong> Data quality
                            measure (1-500)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-yellow-400">
                      💡 Tips for Manual Input:
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        • Use the sliders to adjust values - they show real-time
                        feedback
                      </li>
                      <li>
                        • Start with typical values and adjust based on your
                        observations
                      </li>
                      <li>
                        • Higher signal-to-noise ratios generally indicate
                        better data quality
                      </li>
                      <li>
                        • Transit depths between 100-1000 ppm are common for
                        Earth-sized planets
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* CSV Upload Section */}
            {activeSection === "csv" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  📊 CSV File Upload
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    Upload CSV files containing exoplanet candidate data. The
                    system will process your data and provide predictions for
                    each row.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      CSV Format Requirements:
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-blue-400 mb-2">
                          Required Columns:
                        </h4>
                        <div className="bg-slate-800 rounded p-4 font-mono text-sm">
                          k_ror, pl_prad_re, pl_orbper_days, pl_insol_flux,
                          pl_depth_ppm,
                          <br />
                          pl_trandur_hrs, koi_impact, pl_tranmid_bjd, st_teff_k,
                          <br />
                          st_rad_rsun, k_srho, st_mag_tess, koi_model_snr
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">
                      How to Upload:
                    </h3>
                    <ol className="space-y-3">
                      <li>
                        <strong>1. Prepare your CSV:</strong> Ensure it has the
                        required columns with proper data types
                      </li>
                      <li>
                        <strong>2. Click "Select File":</strong> Choose your CSV
                        file from your computer
                      </li>
                      <li>
                        <strong>3. Verify Selection:</strong> Check that the
                        correct file is selected
                      </li>
                      <li>
                        <strong>4. Start Analysis:</strong> Click "Start
                        Analysis" to process your data
                      </li>
                      <li>
                        <strong>5. Download Results:</strong> Get a new CSV with
                        predictions added
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Datasets Section */}
            {activeSection === "dataset" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  🗃️ Existing Datasets
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    Test our model on well-known exoplanet systems and compare
                    results with established findings.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      Available Datasets:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800 rounded p-4">
                        <h4 className="font-bold text-blue-400 mb-2">Kepler</h4>
                        <p className="text-sm">
                          A NASA space telescope mission that collected
                          long-duration, high-precision light curves to detect
                          exoplanets via transits.
                        </p>
                      </div>
                      <div className="bg-slate-800 rounded p-4">
                        <h4 className="font-bold text-blue-400 mb-2">K2</h4>
                        <p className="text-sm">
                          The extended Kepler mission that continued observing
                          different regions of the sky after the main spacecraft
                          lost some stability.
                        </p>
                      </div>
                      <div className="bg-slate-800 rounded p-4">
                        <h4 className="font-bold text-blue-400 mb-2">TESS</h4>
                        <p className="text-sm">
                          A NASA space telescope mission that conducted a
                          systematic survey of the sky for exoplanets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 border border-green-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      How to Use:
                    </h3>
                    <ol className="space-y-3">
                      <li>
                        <strong>1. Select Dataset:</strong> Choose from the
                        dropdown menu
                      </li>
                      <li>
                        <strong>2. Search Options:</strong> Filter by planet
                        name or discovery date
                      </li>
                      <li>
                        <strong>3. Apply Filters:</strong> Select which
                        parameters to include
                      </li>
                      <li>
                        <strong>4. Run Analysis:</strong> Get predictions for
                        the selected data
                      </li>
                      <li>
                        <strong>5. Compare Results:</strong> See how our model
                        performs on known systems
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Raw Light Curves Section */}
            {activeSection === "raw" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  📈 Raw Light Curve Data
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    Upload raw transit light curve data (flux vs. time) for
                    direct analysis of transit signals.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      Light Curve Format:
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-blue-400 mb-2">
                          Required CSV Columns:
                        </h4>
                        <div className="bg-slate-800 rounded p-4 font-mono text-sm">
                          time, flux, flux_error
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-purple-400 mb-2">
                          Example Format:
                        </h4>
                        <div className="bg-slate-800 rounded p-4 font-mono text-sm overflow-x-auto">
                          <pre>{`time,flux,flux_error
2455000.0,1.000,0.001
2455000.1,0.999,0.001
2455000.2,0.998,0.001
2455000.3,0.997,0.001`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-purple-400">
                      What We Analyze:
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        • <strong>Transit Shape:</strong> U-shaped vs V-shaped
                        light curves
                      </li>
                      <li>
                        • <strong>Transit Depth:</strong> Amount of light
                        blocked during transit
                      </li>
                      <li>
                        • <strong>Transit Duration:</strong> How long the
                        transit lasts
                      </li>
                      <li>
                        • <strong>Periodicity:</strong> Regularity of transit
                        events
                      </li>
                      <li>
                        • <strong>Noise Level:</strong> Data quality and signal
                        strength
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Understanding Results Section */}
            {activeSection === "results" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  📋 Understanding Results
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    Learn how to interpret the analysis results and understand
                    what they mean for your exoplanet candidate.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      Result Components:
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-slate-800 rounded p-4">
                        <h4 className="font-bold text-blue-400 mb-2">
                          Verdict
                        </h4>
                        <p className="text-sm">
                          The model's prediction: "Exoplanet" or "Not Exoplanet"
                        </p>
                      </div>

                      <div className="bg-slate-800 rounded p-4">
                        <h4 className="font-bold text-yellow-400 mb-2">
                          Confidence Score
                        </h4>
                        <p className="text-sm">
                          Percentage indicating how certain the model is
                          (0-100%)
                        </p>
                        <div className="mt-2">
                          <div className="text-xs text-gray-400">
                            • 90-100%: Very High Confidence
                            <br />
                            • 70-89%: High Confidence
                            <br />
                            • 50-69%: Moderate Confidence
                            <br />• Below 50%: Low Confidence
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800 rounded p-4">
                        <h4 className="font-bold text-purple-400 mb-2">
                          Detailed Reasoning
                        </h4>
                        <p className="text-sm">
                          AI-generated explanation of why the model made this
                          prediction
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">
                      Interpreting Confidence Scores:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <span>
                          <strong>90-100%:</strong> Very strong evidence for
                          exoplanet
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                        <span>
                          <strong>70-89%:</strong> Good evidence, worth further
                          investigation
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                        <span>
                          <strong>50-69%:</strong> Uncertain, needs more data
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                        <span>
                          <strong>Below 50%:</strong> Likely not an exoplanet
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tips & Best Practices Section */}
            {activeSection === "tips" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-400">
                  💡 Tips & Best Practices
                </h2>
                <div className="space-y-6 text-gray-300">
                  <div className="bg-green-900/30 border border-green-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">
                      ✅ Best Practices:
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        • <strong>Data Quality:</strong> Ensure your data is
                        clean and properly formatted
                      </li>
                      <li>
                        • <strong>Parameter Ranges:</strong> Use realistic
                        values within the specified ranges
                      </li>
                      <li>
                        • <strong>Multiple Methods:</strong> Try different input
                        methods to cross-validate results
                      </li>
                      <li>
                        • <strong>Compare with Known Systems:</strong> Test on
                        existing datasets first
                      </li>
                      <li>
                        • <strong>Review Reasoning:</strong> Always read the
                        detailed explanations
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-yellow-400">
                      ⚠️ Common Pitfalls:
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        • <strong>Unrealistic Parameters:</strong> Values
                        outside typical ranges may give poor results
                      </li>
                      <li>
                        • <strong>Poor Data Quality:</strong> Noisy or
                        incomplete data affects accuracy
                      </li>
                      <li>
                        • <strong>Misinterpretation:</strong> Remember this is a
                        prediction tool, not definitive proof
                      </li>
                      <li>
                        • <strong>Single Analysis:</strong> Don't rely on just
                        one result - analyze multiple times
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">
                      🔬 For Researchers:
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        • <strong>Use as Screening Tool:</strong> Identify
                        promising candidates for follow-up
                      </li>
                      <li>
                        • <strong>Combine with Other Methods:</strong> Use
                        alongside traditional analysis
                      </li>
                      <li>
                        • <strong>Document Results:</strong> Keep records of all
                        analyses and parameters used
                      </li>
                      <li>
                        • <strong>Share Findings:</strong> Contribute to the
                        exoplanet research community
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-purple-400">
                      📚 Learning Resources:
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        • <strong>NASA Exoplanet Archive:</strong> Official
                        database of confirmed exoplanets
                      </li>
                      <li>
                        • <strong>Kepler Mission Data:</strong> Extensive
                        dataset for practice and comparison
                      </li>
                      <li>
                        • <strong>TESS Data:</strong> Current mission data for
                        ongoing discoveries
                      </li>
                      <li>
                        • <strong>Exoplanet Research Papers:</strong> Stay
                        updated with latest findings
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tutorial;
