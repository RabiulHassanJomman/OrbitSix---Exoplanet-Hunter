/**
 * Footer Component
 *
 * Simple footer component that displays copyright information for the OrbitSix application.
 * This component is used across all pages to maintain consistent branding.
 *
 * Features:
 * - Copyright notice with current year
 * - Centered layout with proper spacing
 * - Consistent styling with the rest of the application
 */
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-16 flex justify-center items-center">
      <div className="text-gray-400 text-sm">
        © 2024 OrbitSix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
