import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * HowItWorks Component
 *
 * This component provides a detailed technical explanation of how the OrbitSix
 * machine learning model works for exoplanet detection. It covers the entire
 * pipeline from data preprocessing to final predictions.
 *
 * Features:
 * - Comprehensive explanation of the ML methodology
 * - Technical details about the dual-model stacked ensemble architecture
 * - Performance metrics and results for both models
 * - Model optimization approaches
 * - Explainability features via LLM integration
 */
const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Main content section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <h1 className="text-4xl font-bold mb-10 text-center">
            How OrbitSix Works
          </h1>

          {/* Technical explanation sections */}
          <div className="space-y-10">
            {/* Section 1: Dual-Model Architecture */}
            <section className="bg-slate-800 rounded-lg p-8">
              <p className="text-lg text-gray-200 mb-4">
                OrbitSix addresses the challenge of identifying exoplanets using
                a{" "}
                <span className="font-semibold">
                  flexible, dual-model Machine Learning architecture
                </span>{" "}
                built on a sophisticated{" "}
                <span className="font-semibold">Stacked Ensemble</span>{" "}
                framework. This approach leverages specialized models trained on
                data from NASA missions (Kepler, TESS, K2) and dynamically
                selects the appropriate model based on input data, ensuring
                optimal performance across diverse use cases.
              </p>
            </section>

            {/* Section 2: Dual-Model Architecture Details */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. A Dual-Model Architecture for Maximum Flexibility
              </h2>
              <p className="mb-2 text-gray-200">
                Unlike approaches focused on homogeneous datasets, OrbitSix
                handles heterogeneous data with two pre-trained models:
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. The Full-Feature Model 💯
              </h3>
              <p className="mb-2 text-gray-300">
                Our{" "}
                <span className="font-semibold">
                  primary, highest-accuracy model
                </span>{" "}
                uses a comprehensive set of dozens of observational features for
                maximum predictive power.
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">When it’s used:</span> For CSV
                file uploads and selections from mission datasets (Kepler, TESS,
                K2) where a complete feature set is available.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. The Reduced-Feature Model ⚡
              </h3>
              <p className="mb-2 text-gray-300">
                A{" "}
                <span className="font-semibold">
                  streamlined, lightweight model
                </span>{" "}
                trained on ~14 key features (e.g., planet radius, orbital
                period, transit depth, stellar temperature) for scenarios with
                limited data.
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">When it’s used:</span> For
                manual user input and raw light curve file uploads where
                providing a full feature set is impractical.
              </p>
              <p className="mb-2 text-gray-300">
                Both models share the same Stacked Ensemble design, ensuring
                consistent logic and strong performance across input types.
              </p>
            </section>

            {/* Section 3: Data Foundation and Pre-processing */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Data Foundation and Pre-processing
              </h2>
              <p className="mb-2 text-gray-200">
                OrbitSix is built on open-source data from three NASA exoplanet
                missions:{" "}
                <span className="font-semibold">Kepler, TESS, and K2</span>,
                providing the raw observations critical for robust model
                training.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Feature Integrity and Leakage Prevention
              </h3>
              <p className="mb-2 text-gray-300">
                Exoplanet datasets often include metrics like{" "}
                <code className="bg-slate-700 px-1 rounded">koi_score</code> or{" "}
                <code className="bg-slate-700 px-1 rounded">tfopwg_disp</code>{" "}
                from prior human vetting. Including these risks{" "}
                <span className="font-semibold text-blue-400">
                  data leakage
                </span>
                , causing the model to mimic past judgments rather than learning
                from raw data.
              </p>
              <p className="mb-2 text-gray-300">We excluded:</p>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>
                  <span className="font-semibold">
                    Identifiers and Metadata
                  </span>{" "}
                  (e.g., star names, IDs, observation dates).
                </li>
                <li>
                  <span className="font-semibold">Prior vetting outcomes</span>{" "}
                  or disposition scores, including confidence metrics and flags.
                </li>
              </ul>
              <p className="mb-2 text-gray-300">
                The resulting feature set focuses on raw astrophysical
                properties (e.g., orbital period, stellar radius, temperature,
                transit depth).
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Addressing Class Imbalance
              </h3>
              <p className="mb-2 text-gray-300">
                Exoplanet detection is highly imbalanced, with false positives
                outnumbering confirmed exoplanets. We used{" "}
                <span className="font-semibold">
                  Random Over Sampling (ROS)
                </span>{" "}
                to balance the training data, ensuring unbiased learning.
              </p>
            </section>

            {/* Section 4: Stacked Ensemble Architecture */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. The Stacked Ensemble Architecture
              </h2>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Level 1: Specialized Base Models
              </h3>
              <p className="mb-2 text-gray-300">
                We trained three{" "}
                <span className="font-semibold">
                  Light Gradient Boosting Machine (LightGBM)
                </span>{" "}
                classifiers, each dedicated to a NASA mission dataset:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Model</th>
                      <th className="px-3 py-2">Mission Data</th>
                      <th className="px-3 py-2">Parameter Tuning</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        Kepler Base Model
                      </td>
                      <td className="px-3 py-2">Kepler</td>
                      <td className="px-3 py-2">
                        Standard LGBM (500 estimators, 0.03 learning rate)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">K2 Base Model</td>
                      <td className="px-3 py-2">K2</td>
                      <td className="px-3 py-2">
                        Standard LGBM (500 estimators, 0.03 learning rate)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        TESS Base Model
                      </td>
                      <td className="px-3 py-2">TESS</td>
                      <td className="px-3 py-2">
                        Custom LGBM (1,000 estimators, 0.015 learning rate)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-2 text-gray-300">
                Specialization allows each model to learn unique noise
                characteristics and feature distributions of its mission’s data.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Training using Cross-Validation (OOF Prediction)
              </h3>
              <p className="mb-2 text-gray-300">
                To prevent overfitting, we used{" "}
                <span className="font-semibold">
                  Stratified K-Fold Cross-Validation
                </span>{" "}
                (5-Fold) to generate{" "}
                <span className="font-semibold">
                  Out-of-Fold (OOF) predictions
                </span>
                . Each base model predicts on unseen data, and these OOF scores
                are used as input for the Meta-Learner.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                C. Level 2: The LightGBM Meta-Learner
              </h3>
              <p className="mb-2 text-gray-300">
                The OOF probabilities from the base models are fed into a{" "}
                <span className="font-semibold">LightGBM Meta-Learner</span>,
                which learns a{" "}
                <span className="font-semibold">
                  non-linear weighting scheme
                </span>{" "}
                to combine predictions dynamically, optimizing accuracy for each
                sample.
              </p>
            </section>

            {/* Section 5: Model Optimization and Experimental Evolution */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Model Optimization and Experimental Evolution
              </h2>
              <p className="mb-2 text-gray-300">
                Our final Stacked Ensemble was the product of iterative
                experimentation and benchmarking.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Initial Benchmark: Unified Model
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Metric</th>
                      <th className="px-3 py-2">Unified Model Performance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">ROC-AUC</td>
                      <td className="px-3 py-2">0.9376</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">Accuracy</td>
                      <td className="px-3 py-2">0.87</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-2 text-gray-300">
                This model struggled to generalize across mission-specific data
                variations.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Iteration 2: Logistic Regression Stack
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Metric</th>
                      <th className="px-3 py-2">LR Stacked Ensemble</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">ROC-AUC</td>
                      <td className="px-3 py-2">0.9511</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-2 text-gray-300">
                Mission-specific models with a Logistic Regression Meta-Learner
                improved performance but were limited by linear combination.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                C. Final Approach: LightGBM Stacked Ensemble (V3)
              </h3>
              <p className="mb-2 text-gray-300">
                Replacing the linear meta-layer with a{" "}
                <span className="font-bold">
                  {" "}
                  non-linear LightGBM Meta-Learner
                </span>{" "}
                further boosted performance to{" "}
                <span className="font-semibold">ROC-AUC 0.9543</span>,
                confirming the advantage of dynamic weighting and mission
                specialization.
              </p>
            </section>

            {/* Section 6: Performance Metrics and Results */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Performance Metrics and Results
              </h2>
              <p className="mb-2 text-gray-300">
                Both models were evaluated on a held-out test set of{" "}
                <span className="font-semibold">4,248 candidate samples</span>.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Intermediate (OOF) Base Model Performance
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Model</th>
                      <th className="px-3 py-2">OOF ROC-AUC</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">K2 Base Model</td>
                      <td className="px-3 py-2">0.9926</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        Kepler Base Model
                      </td>
                      <td className="px-3 py-2">0.9728</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        TESS Base Model
                      </td>
                      <td className="px-3 py-2">0.8849</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Final Stacked Ensemble (Full-Feature Model)
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Metric</th>
                      <th className="px-3 py-2">Result</th>
                      <th className="px-3 py-2">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">ROC-AUC</td>
                      <td className="px-3 py-2">0.9543</td>
                      <td className="px-3 py-2">
                        High separability and strong classification confidence
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">Accuracy</td>
                      <td className="px-3 py-2">0.8981</td>
                      <td className="px-3 py-2">
                        Nearly 90% of test samples correctly classified
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Class</th>
                      <th className="px-3 py-2">Precision</th>
                      <th className="px-3 py-2">Recall</th>
                      <th className="px-3 py-2">F1-Score</th>
                      <th className="px-3 py-2">Support</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        0 (False Positive)
                      </td>
                      <td className="px-3 py-2">0.87</td>
                      <td className="px-3 py-2">0.81</td>
                      <td className="px-3 py-2">0.84</td>
                      <td className="px-3 py-2">1381</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        1 (Exoplanet/Candidate)
                      </td>
                      <td className="px-3 py-2">0.91</td>
                      <td className="px-3 py-2">0.94</td>
                      <td className="px-3 py-2">0.93</td>
                      <td className="px-3 py-2">2867</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        Weighted Average
                      </td>
                      <td className="px-3 py-2">0.90</td>
                      <td className="px-3 py-2">0.90</td>
                      <td className="px-3 py-2">0.90</td>
                      <td className="px-3 py-2">4248</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-2 text-gray-300">
                High <span className="font-semibold">Recall (0.94)</span>{" "}
                ensures{" "}
                <span className="font-semibold">94% of true exoplanets</span>{" "}
                are identified, minimizing missed detections.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                C. Reduced-Feature Model Performance
              </h3>
              <p className="mb-2 text-gray-300">
                Despite fewer inputs, it maintains excellent predictive power:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Metric</th>
                      <th className="px-3 py-2">Result</th>
                      <th className="px-3 py-2">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">ROC-AUC</td>
                      <td className="px-3 py-2">0.9151</td>
                      <td className="px-3 py-2">
                        Very good separability using minimal data
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">Accuracy</td>
                      <td className="px-3 py-2">0.8545</td>
                      <td className="px-3 py-2">
                        Over 85% accuracy on limited features
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Class</th>
                      <th className="px-3 py-2">Precision</th>
                      <th className="px-3 py-2">Recall</th>
                      <th className="px-3 py-2">F1-Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        0 (False Positive)
                      </td>
                      <td className="px-3 py-2">0.79</td>
                      <td className="px-3 py-2">0.75</td>
                      <td className="px-3 py-2">0.77</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        1 (Exoplanet/Candidate)
                      </td>
                      <td className="px-3 py-2">0.88</td>
                      <td className="px-3 py-2">0.91</td>
                      <td className="px-3 py-2">0.89</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        Weighted Average
                      </td>
                      <td className="px-3 py-2">0.85</td>
                      <td className="px-3 py-2">0.85</td>
                      <td className="px-3 py-2">0.85</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7: Explainability and User Insight */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Explainability and User Insight (The LLM Layer)
              </h2>
              <p className="mb-2 text-gray-300">
                OrbitSix enhances transparency by using a{" "}
                <span className="font-semibold">
                  Large Language Model (LLM)
                </span>{" "}
                to convert predictions into human-readable scientific
                explanations.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Feature-to-Explanation Pipeline
              </h3>
              <p className="mb-2 text-gray-300">
                Key feature values, prediction probabilities, and classification
                results are fed into a structured LLM prompt for interpretation.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Automated Scientific Reasoning
              </h3>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>
                  <span className="font-semibold">Key Evidence:</span>{" "}
                  Highlights features driving the classification (e.g., “A
                  shallow transit depth and long orbital period indicate an
                  exoplanet-like signature”).
                </li>
                <li>
                  <span className="font-semibold">
                    False Positive Reasoning:
                  </span>{" "}
                  Explains likely causes of false positives (e.g., “consistent
                  with an eclipsing binary”).
                </li>
                <li>
                  <span className="font-semibold">Mission Context:</span>{" "}
                  Provides background on the source mission (Kepler, TESS, or
                  K2).
                </li>
                <li>
                  <span className="font-semibold">Mitigating Factors:</span>{" "}
                  Explains why potential confounders were discounted.
                </li>
              </ul>
              <p className="mb-2 text-gray-300">
                This ensures{" "}
                <span className="font-semibold">
                  transparency, interpretability, and user trust
                </span>{" "}
                in the classification process.
              </p>
            </section>

            {/* Section 8: Summary of Key Benefits */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Summary of Key Benefits
              </h2>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>
                  <span className="font-semibold">High Accuracy:</span> ROC-AUC
                  of <span className="text-blue-400">0.9543</span> and accuracy
                  of <span className="text-blue-400">90%</span>, competitive
                  with deep learning approaches.
                </li>
                <li>
                  <span className="font-semibold">
                    Lightweight and Efficient:
                  </span>{" "}
                  Uses <span className="font-semibold">LightGBM</span> for rapid
                  training and inference, ideal for limited resources.
                </li>
                <li>
                  <span className="font-semibold">Flexible and Scalable:</span>{" "}
                  Modular design supports future mission data (e.g.,{" "}
                  <span className="font-semibold">PLATO, ARIEL</span>).
                </li>
                <li>
                  <span className="font-semibold">User-Transparent:</span>{" "}
                  LLM-driven explanations provide scientifically grounded
                  insights.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;