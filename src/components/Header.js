// Header component for the OrbitSix application navigation
import { Link, useNavigate } from "react-router-dom";

/**
 * Header Component
 *
 * This component renders the top navigation bar for the OrbitSix application.
 * It includes the logo and navigation buttons for different pages.
 *
 * Features:
 * - Responsive logo that links to home page
 * - Navigation buttons for Home, How it Works, and Team pages
 * - Hover effects and smooth transitions
 * - Fixed positioning with high z-index to stay on top
 */
function Header() {
  // React Router hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo section - Clickable link to home page */}
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/Bare Logo SVG.png"
            alt="OrbitSix"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Navigation menu - Buttons for different pages */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {/* Home button - Navigate to landing page */}
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </button>

          {/* How it Works button - Navigate to technical explanation page */}
          <button
            onClick={() => navigate("/how-it-works")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            How it Works
          </button>

          {/* Team button - Navigate to team information page */}
          <button
            onClick={() => navigate("/team")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Team
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
