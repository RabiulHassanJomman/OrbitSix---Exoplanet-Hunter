// How It Works page component explaining the technical methodology of OrbitSix
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
 * - Technical details about the stacked ensemble architecture
 * - Performance metrics and results
 * - Model optimization approaches
 * - Explainability features
 */
const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Main content section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <h1 className="text-4xl font-bold mb-10 text-center">How It Works</h1>

          {/* Technical explanation sections */}
          <div className="space-y-10">
            {/* Section 1: Overview - Introduction to the ML approach */}
            <section className="bg-slate-800 rounded-lg p-8">
              <p className="text-lg text-gray-200 mb-4">
                Our solution addresses the challenge of manually identifying
                exoplanets by employing a sophisticated, multi-stage Machine
                Learning architecture known as a{" "}
                <span className="font-semibold">Stacked Ensemble</span>. This
                approach leverages the specialized predictive strengths of three
                models, each trained on data from a unique NASA mission, and
                combines their expertise to produce highly robust and accurate
                final classifications.
              </p>
            </section>

            {/* Section 2: Data Foundation and Pre-processing - Data preparation methodology */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Data Foundation and Pre-processing
              </h2>
              <p className="mb-2 text-gray-200">
                To build a reliable model, we utilized open-source data from
                three foundational NASA exoplanet missions:{" "}
                <span className="font-semibold">Kepler, TESS, and K2</span>.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Feature Integrity and Leakage Prevention
              </h3>
              <p className="mb-2 text-gray-300">
                Exoplanet datasets often contain metrics, scores, or flags (such
                as <code className="bg-slate-700 px-1 rounded">koi_score</code>{" "}
                or{" "}
                <code className="bg-slate-700 px-1 rounded">tfopwg_disp</code>)
                that are the result of previous manual human vetting or
                analysis. Including these metrics would cause{" "}
                <span className="font-semibold text-blue-400">
                  data leakage
                </span>
                , resulting in a model that merely mimics past human decisions
                rather than independently identifying exoplanets from raw
                observations.
              </p>
              <p className="mb-2 text-gray-300">
                We implemented a feature selection process for each dataset,
                systematically dropping all columns related to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>
                  <span className="font-semibold">
                    Identifiers and Metadata
                  </span>{" "}
                  (e.g., star names, id, observation dates).
                </li>
                <li>
                  <span className="font-semibold">
                    Any column indicating a prior vetting outcome
                  </span>
                  , disposition score, or uncertainty limit flags.
                </li>
              </ul>
              <p className="mb-2 text-gray-300">
                The resulting feature set for each model focuses exclusively on
                the fundamental, raw physical characteristics (e.g., orbital
                period, planetary radius, stellar temperature, etc.) of the star
                and its candidate.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Addressing Class Imbalance
              </h3>
              <p className="mb-2 text-gray-300">
                Exoplanet detection is a highly imbalanced classification
                problem, as confirmed exoplanets are significantly outnumbered
                by false positives in the training data. To prevent the models
                from being biased toward the majority "False Positive" class, we
                incorporated{" "}
                <span className="font-semibold">
                  Random Over Sampling (ROS)
                </span>{" "}
                within the training pipeline for each base model. This ensures
                the models receive a balanced mix of positive
                (Exoplanet/Candidate) and negative (False Positive) examples
                during the training process.
              </p>
            </section>

            {/* Section 3: Stacked Ensemble Architecture - Core ML model structure */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. The Stacked Ensemble Architecture
              </h2>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Level 1: Specialized Base Models
              </h3>
              <p className="mb-2 text-gray-300">
                We trained three high-performance{" "}
                <span className="font-semibold">
                  Light Gradient Boosting Machine (LightGBM)
                </span>{" "}
                classifiers, one dedicated to each mission dataset:
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
                By specializing the base models, we allow each one to deeply
                learn the unique noise characteristics and observational feature
                patterns specific to its mission, maximizing its predictive
                power.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Training using Cross-Validation (OOF Prediction)
              </h3>
              <p className="mb-2 text-gray-300">
                To train the final layer (the Meta-Learner) without introducing
                overfitting, we employed{" "}
                <span className="font-semibold">
                  Stratified K-Fold Cross-Validation
                </span>{" "}
                to generate{" "}
                <span className="font-semibold">
                  Out-of-Fold (OOF) predictions
                </span>
                :
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>Each base model was trained five times (5-Fold CV).</li>
                <li>
                  In each fold, the model predicted on the held-out portion of
                  the training data (the OOF data).
                </li>
                <li>
                  The final OOF prediction scores were concatenated, ensuring
                  that each data point in the training set received a prediction
                  from a model that had never seen that specific data point
                  during its training.
                </li>
              </ul>
              <h3 className="text-xl font-bold mt-6 mb-2">
                C. Level 2: The LightGBM Meta-Learner
              </h3>
              <p className="mb-2 text-gray-300">
                The OOF probabilities (prediction scores) from the three base
                models become the new input features for the final model—the{" "}
                <span className="font-semibold">Meta-Learner</span>.
              </p>
              <p className="mb-2 text-gray-300">
                We utilize a final non-linear{" "}
                <span className="font-semibold">LightGBM Classifier</span> as
                the Meta-Learner. Its task is to learn a non-linear, optimal
                weighting scheme for the three base model probabilities. This
                dynamic evaluation ensures the system utilizes the most reliable
                base prediction based on the specific characteristics of the
                candidate being analyzed. The output of the Meta-Learner is the
                final, high-confidence probability score.
              </p>
            </section>

            {/* Section 4: Performance Metrics and Results - Model evaluation and performance */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Performance Metrics and Results
              </h2>
              <p className="mb-2 text-gray-300">
                Our final model was rigorously evaluated on a held-out test set
                of{" "}
                <span className="font-semibold">4,248 candidate samples</span>{" "}
                to confirm its ability to generalize accurately.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Intermediate Model Performance (OOF AUC)
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Model</th>
                      <th className="px-3 py-2">OOF AUC Score</th>
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
                B. Final Stacked Ensemble Performance
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
                      <td className="px-3 py-2 font-semibold">ROC-AUC Score</td>
                      <td className="px-3 py-2">0.9543</td>
                      <td className="px-3 py-2">
                        Indicates a high level of separability and confidence in
                        candidate classification.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        ACCURACY Score
                      </td>
                      <td className="px-3 py-2">0.8981</td>
                      <td className="px-3 py-2">
                        Nearly 90% of all test samples were correctly
                        classified.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">
                C. Detailed Classification Report
              </h3>
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
                The high{" "}
                <span className="font-semibold">Recall for Class 1 (0.94)</span>{" "}
                is a critical result, meaning our model successfully identifies{" "}
                <span className="font-semibold">
                  94% of all true exoplanets/candidates
                </span>{" "}
                in the test set. This effectiveness in minimizing missed
                detections makes the model a highly reliable first-pass filter
                for astronomical data.
              </p>
            </section>

            {/* Section 5: Model Optimization and Approach - Development methodology and iterations */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Model Optimization and Approach
              </h2>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Initial Benchmarks
              </h3>
              <p className="mb-2 text-gray-300">
                We began by benchmarking several algorithms on individual
                mission datasets and quickly identified{" "}
                <span className="font-semibold">LightGBM</span> as the superior,
                most efficient classifier for this binary task.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Initial Approach: Unified Dataset
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
                      <td className="px-3 py-2 font-semibold">ROC-AUC Score</td>
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
                This was a strong starting point, but the single model struggled
                to optimally handle the unique noise and data structure
                differences inherent across the three missions.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                C. Second Iteration: Logistic Regression Stacking
              </h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full text-sm text-left border border-slate-700">
                  <thead className="bg-slate-700 text-gray-100">
                    <tr>
                      <th className="px-3 py-2">Metric</th>
                      <th className="px-3 py-2">
                        LR Stacked Ensemble Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-900">
                    <tr>
                      <td className="px-3 py-2 font-semibold">
                        Final Stacked ROC-AUC Score
                      </td>
                      <td className="px-3 py-2">0.9511</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-2 text-gray-300">
                This confirmed that specialization was critical, but the linear
                combination was still suboptimal.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                D. Final Approach: LightGBM Stacked Ensemble (V3)
              </h3>
              <p className="mb-2 text-gray-300">
                By replacing the linear Meta-Learner with a{" "}
                <span className="font-semibold">
                  non-linear LightGBM Meta-Learner
                </span>
                , we allowed the stack to dynamically evaluate the weights of
                each prediction and account for their non-linear relationships.
              </p>
              <p className="mb-2 text-gray-300">
                This resulted in the{" "}
                <span className="font-semibold">highest accuracy and AUC</span>{" "}
                among all our experiments (as detailed in Section 3).
              </p>
            </section>

            {/* Section 6: Explainability and User Insight (LLM Layer) - AI explanation system */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Explainability and User Insight (The LLM Layer)
              </h2>
              <p className="mb-2 text-gray-300">
                Following the Stacked Ensemble's classification, the system
                executes a final, crucial step to bridge the gap between
                algorithmic prediction and human understanding: generating an
                automated, comprehensive explanation for the result. This step
                is powered by a Large Language Model (LLM).
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                A. Feature Importance and Prompt Engineering
              </h3>
              <p className="mb-2 text-gray-300">
                To generate a meaningful explanation, key feature values, along
                with the final prediction confidence score and the
                classification outcome, are passed to the LLM via a specialized
                prompt.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-2">
                B. Automated Scientific Reasoning
              </h3>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>
                  <span className="font-semibold">Key Evidence:</span>{" "}
                  Highlighting which stellar or planetary properties drove the
                  classification. If it's a False Positive, LLM also explains
                  which type of False Positive case it is and why.
                </li>
                <li>
                  <span className="font-semibold">Mitigating Factors:</span>{" "}
                  Explaining why the model discounted potential false positive
                  indicators.
                </li>
                <li>
                  <span className="font-semibold">Mission Context:</span>{" "}
                  Integrating knowledge of the source mission (Kepler, TESS, or
                  K2) to provide context relevant to that mission's noise
                  characteristics or survey methodology.
                </li>
              </ul>
              <p className="mb-2 text-gray-300">
                This human-readable explanation serves two critical functions:
                it provides the user (such as an astronomer or citizen
                scientist) with a better{" "}
                <span className="font-semibold">
                  grasp of the data and the ML prediction
                </span>
                , and it establishes{" "}
                <span className="font-semibold">trust and transparency</span> in
                the final automated classification.
              </p>
            </section>

            {/* Section 7: Summary of Key Benefits - Final summary of advantages */}
            <section className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Summary of Key Benefits
              </h2>
              <ul className="list-disc list-inside text-gray-300 mb-2">
                <li>
                  <span className="font-semibold">High Accuracy</span>: Final
                  ROC-AUC score of <span className="text-blue-400">0.9543</span>{" "}
                  and accuracy of <span className="text-blue-400">90%</span>,
                  surpasses simpler baselines and competitive with published
                  researches, some of which used DL.
                </li>
                <li>
                  <span className="font-semibold">
                    Light-weight & Efficient
                  </span>
                  : Chose{" "}
                  <span className="font-semibold">
                    LightGBM over Deep Learning
                  </span>{" "}
                  due to hackathon time constraints and limited resources,
                  ensuring rapid training and inference without specialized
                  hardware.
                </li>
                <li>
                  <span className="font-semibold">Flexible and Scalable</span>:
                  Architecture can easily incorporate future mission datasets
                  (e.g., <span className="font-semibold">PLATO, ARIEL</span>) by
                  adding new specialized base models to the Level 1 stack.
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
