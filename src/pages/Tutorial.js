// Tutorial page component for OrbitSix exoplanet detection platform
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * Tutorial Component
 *
 * This page provides an educational carousel explaining how exoplanets are verified
 * using the transit light curve method, step by step.
 */
const Tutorial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Introduction to Transit Method",
      content:
        "When a planet passes in front of its star, it blocks a tiny fraction of the star's light. This creates a small dip in the star's brightness that we can detect from Earth. These dips, called transits, are like a planet casting a shadow on its star.",
      visual: "transit-intro",
    },
    {
      id: 1,
      title: "Confirming Consistency",
      content:
        "A real exoplanet will create the same dip pattern repeatedly, like clockwork. If we see the same brightness drop happening at regular intervals, it strongly suggests we're seeing a planet orbiting its star. The more transits we observe, the more confident we become.",
      visual: "consistency",
    },
    {
      id: 2,
      title: "Filtering False Positives: Binary Stars",
      content:
        "Sometimes what looks like a planet transit is actually two stars orbiting each other. When one star passes in front of the other, it can create a similar dip in brightness. However, binary star eclipses are usually much deeper and have different timing patterns.",
      visual: "binary-stars",
    },
    {
      id: 3,
      title: "Our Tool Overview",
      content:
        "This tool leverages machine learning to automatically identify exoplanets from NASA’s open-source datasets (Kepler, K2, TESS). Users can upload new observational data or manually enter parameters like orbital period, transit duration, and planetary radius. The AI model analyzes the data and classifies it as a confirmed exoplanet, candidate, or false positive. The web interface allows researchers and enthusiasts to interact with the model, view classification results, monitor model accuracy, and optionally tweak settings or retrain the model with new data. It simplifies the discovery process, turning complex astronomical datasets into actionable insights.",
      visual: "tool-overview",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderVisual = (visualType) => {
    switch (visualType) {
      case "transit-intro":
        return (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/images/transit_light_curve.png"
                  alt="Scientific diagram showing a planet transiting a star with corresponding light curve graph"
                  className="w-80 h-45 object-cover rounded-lg mb-4 border border-slate-500"
                />
                <p className="text-blue-400 font-semibold text-lg">
                  Transit Light Curve Example
                </p>
                <p className="text-sm text-gray-400">
                  Star, planet, and light curve diagram
                </p>
              </div>
            </div>
          </div>
        );
      case "consistency":
        return (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/images/periodic_transit.png"
                  alt="Light curve graph showing three periodic dips in brightness with annotations for orbital period, transit duration, and transit depth"
                  className="w-80 h-45 object-cover rounded-lg mb-1 border border-slate-500"
                />
                <p className="text-green-400 font-semibold text-lg">
                  Multiple Periodic Transits
                </p>
                <p className="text-sm text-gray-400">
                  Consistent timing strengthens confidence
                </p>
              </div>
            </div>
          </div>
        );
      case "binary-stars":
        return (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/images/binary_star_transit.png"
                  alt="Light curve graph showing periodic dips characteristic of binary star eclipses"
                  className="w-80 h-45 object-cover rounded-lg mb-4 border border-slate-500"
                />
                <p className="text-red-400 font-semibold text-lg">
                  Binary Star Eclipse
                </p>
                <p className="text-sm text-gray-400">
                  Two overlapping star signals
                </p>
              </div>
            </div>
          </div>
        );
      case "tool-overview":
        return (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/images/Bare Logo SVG.png"
                  alt="AI-powered exoplanet detection workflow diagram"
                  className="w-80 h-45 object-cover rounded-lg mb-4 border border-slate-500"
                />
                <p className="text-purple-400 font-semibold text-lg">
                  OrbitSix
                </p>
                <p className="text-sm text-gray-400">
                  Advanced machine learning for exoplanet detection
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            How Exoplanets Are <span className="text-blue-500">Verified</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Learn the step-by-step process of verifying exoplanets using the
            transit light curve method
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="relative py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-xl">
              {/* Slides */}
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <div className="bg-slate-800/50 rounded-xl p-8 mx-4">
                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-400">
                        {slide.title}
                      </h2>

                      {/* Content Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Visual Content */}
                        <div className="order-2 lg:order-1">
                          {renderVisual(slide.visual)}
                        </div>

                        {/* Text Content */}
                        <div className="order-1 lg:order-2">
                          <p className="text-lg text-gray-300 leading-relaxed">
                            {slide.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-700/90 hover:bg-slate-600/90 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-slate-600 shadow-lg"
              disabled={currentSlide === 0}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-700/90 hover:bg-slate-600/90 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-slate-600 shadow-lg"
              disabled={currentSlide === slides.length - 1}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              {/* Slide Indicators */}
              <div className="flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentSlide === index
                        ? "bg-blue-500 scale-125"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="text-sm text-gray-400">
                {currentSlide + 1} of {slides.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tutorial;
