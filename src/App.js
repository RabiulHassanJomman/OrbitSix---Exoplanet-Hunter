// Main App component that handles routing for the OrbitSix exoplanet detection platform
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Analysis from "./pages/Analysis";
import HowItWorks from "./pages/HowItWorks";
import LandingPage from "./pages/LandingPage";
import Team from "./pages/Team";

/**
 * App Component
 *
 * This is the root component that sets up the routing structure for the OrbitSix application.
 * It uses React Router to handle navigation between different pages of the exoplanet detection platform.
 *
 * Routes:
 * - "/" - Landing page with ML model interface
 * - "/how-it-works" - Technical explanation of the ML approach
 * - "/team" - Team members information
 * - "/analysis" - Dedicated analysis tool page
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page - Main landing page with ML model interface */}
          <Route path="/" element={<LandingPage />} />

          {/* Technical explanation page - Details about the ML methodology */}
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Team page - Information about the development team */}
          <Route path="/team" element={<Team />} />

          {/* Analysis page - Dedicated tool for exoplanet analysis */}
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
