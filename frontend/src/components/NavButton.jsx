import { Link } from "react-router-dom";

const VARIANT_STYLES = {
  primary:
    "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50",
  secondary:
    "border border-slate-700 bg-slate-800/60 text-slate-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white",
};

const NavButton = ({ to, variant = "primary", className = "", children }) => {
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavButton;
