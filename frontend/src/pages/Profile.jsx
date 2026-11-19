import { Link, useNavigate } from "react-router-dom";
import ProfileField from "../components/ProfileField";
import Loading from "../components/Loading";
import { AppData } from "../context/AppContext";
import { api } from "../config/axios-config";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Profile = () => {

  const { user, isLoading, isAuth, setIsAuth, setUser } = AppData();

  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuth) {
      navigate("/login")
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-slate-300">
        <p className="text-sm text-slate-400">Please log in to view your profile.</p>
        <Link
          to="/login"
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formatDate = (isoString) =>
    isoString
      ? new Date(isoString).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  const handleLogout = async (e) => {

    try {
      const {data} = await api.get("/api/v1/logout");
      console.log(data) ;
      toast.success(data.message);
      setIsAuth(false);
      setUser(null);
    }
    catch(error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-12">
      <div className="w-full max-w-lg">
        {/* Top bar: Back to Home + Brand */}
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

        {/* Profile Card */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          {/* Avatar + Name + Role Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-600/20 text-2xl font-bold text-indigo-400 shadow-lg shadow-indigo-500/10">
              {initials}
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {user.name}
            </h1>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              {user.email}
            </p>

            <span className="mt-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              {user.role}
            </span>
          </div>

          {/* Account Details List */}
          <div className="mt-8 flex flex-col gap-3">
            <ProfileField label="Full Name" value={user.name} />
            <ProfileField label="Email Address" value={user.email} />
            <ProfileField label="Role" value={user.role.toUpperCase()} />
            <ProfileField label="User ID" value={user._id} mono />
            <ProfileField
              label="Joined Date"
              value={formatDate(user.createdAt)}
            />
            <ProfileField
              label="Last Updated"
              value={formatDate(user.updatedAt)}
            />
          </div>

          {/* Static Logout Button */}
          <button
            onClick={handleLogout}
            type="button"
            className="mt-6 w-full cursor-pointer rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-sm font-medium text-rose-400 transition-all duration-200 hover:border-rose-500/50 hover:bg-rose-500/20 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Logout
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;