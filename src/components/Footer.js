/**
 * Footer Component
 *
 * Simple footer component that displays copyright information for the OrbitSix application
 * and provides a clear link to the GitHub repository.
 * This component is used across all pages to maintain consistent branding.
 *
 * Features:
 * - Copyright notice with current year
 * - Link to GitHub repository
 * - Centered layout with proper spacing
 * - Consistent styling with the rest of the application
 */

const Footer = () => {
  // Replace with your actual GitHub repository URL
  const GITHUB_URL = "https://github.com/OrbitSix";

  // Dummy component for demonstration if react-icons isn't set up
  const FaGithub = () => (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.418 2.867 8.163 6.845 9.48.5.092.682-.217.682-.483 0-.237-.008-.887-.015-1.745-2.783.606-3.375-1.341-3.375-1.341-.454-1.157-1.11-1.464-1.11-1.464-.908-.62.068-.608.068-.608 1.004.07 1.53.965 1.53.965.892 1.528 2.342 1.087 2.91.826.092-.64.35-1.087.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.026-2.687-.103-.255-.445-1.27.098-2.656 0 0 .837-.27 2.743 1.027A9.585 9.585 0 0112 7.749c.813 0 1.625.11 2.39.324 1.905-1.297 2.743-1.027 2.743-1.027.543 1.386.2 2.4.098 2.656.636.703 1.026 1.597 1.026 2.687 0 3.842-2.337 4.686-4.563 4.935.359.309.678.919.678 1.85 0 1.339-.012 2.421-.012 2.75 0 .267.18.577.688.484C20.134 20.178 23 16.435 23 12.017 23 6.484 18.523 2 13 2h-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <footer className="bg-slate-900 text-white py-8 mt-16 flex justify-center items-center">
      <div className="flex items-center space-x-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          aria-label="Link to OrbitSix GitHub Repository"
        >
          {/* GitHub Icon */}
          <FaGithub />
          <span>View on **GitHub**</span>
        </a>
        {/* Copyright Information */}
        <div className="text-gray-400 text-sm">
          © 2024 OrbitSix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;