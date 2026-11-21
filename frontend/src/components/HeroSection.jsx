import NavButton from "./NavButton";
import { AppData } from "../context/AppContext";

const HeroSection = () => {
  const { user, isAuth, isLoading } = AppData();
  const isAdmin = isAuth && user?.role === "admin";

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-16">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-10 md:p-12">
        <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 sm:px-3.5">
          JWT + OTP Verification
        </span>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl">
          Secure Authentication Made Simple
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
          Sign in to access your account or create a new profile with email
          verification and two-step OTP protection.
        </p>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          {!isLoading && isAdmin && (
            <NavButton
              to="/dashboard"
              variant="primary"
              className="w-full py-2.5 text-sm sm:w-auto sm:px-6"
            >
              Dashboard
            </NavButton>
          )}
          <NavButton
            to="/register"
            variant="primary"
            className="w-full py-2.5 text-sm sm:w-auto sm:px-6"
          >
            Register
          </NavButton>
          <NavButton
            to="/login"
            variant="secondary"
            className="w-full py-2.5 text-sm sm:w-auto sm:px-6"
          >
            Login
          </NavButton>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
