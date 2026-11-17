import { Link } from "react-router-dom";

const AuthCard = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        {/* Top bar: Brand logo + Back to Home link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400"
          >
            &larr; Back to Home
          </Link>

          <Link
            to="/"
            className="text-base font-bold tracking-tight text-white transition-colors hover:text-indigo-400 sm:text-lg"
          >
            Auth<span className="text-indigo-500">System</span>
          </Link>
        </div>

        {/* Main Glass Card */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {children}

          {footerText && footerLinkTo && (
            <p className="mt-6 text-center text-xs text-slate-400 sm:text-sm">
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AuthCard;

