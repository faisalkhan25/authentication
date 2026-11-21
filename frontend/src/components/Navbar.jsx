import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import { AppData } from "../context/AppContext";

const Navbar = () => {
  
  const { user, isAuth, isLoading } = AppData();
  const isAdmin = isAuth && user?.role === "admin";

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="shrink-0 text-base font-bold tracking-tight text-white transition-colors hover:text-indigo-400 sm:text-lg"
        >
          Auth<span className="text-indigo-500">System</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {!isLoading && isAdmin && (
            <NavButton to="/dashboard" variant="secondary">
              Dashboard
            </NavButton>
          )}
          <NavButton to="/login" variant="secondary">
            Login
          </NavButton>
          <NavButton to="/register" variant="primary">
            Register
          </NavButton>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
