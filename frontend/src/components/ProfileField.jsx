const ProfileField = ({ label, value, mono = false }) => {
  return (
    <div className="flex flex-col justify-between gap-1 rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-xs font-medium text-slate-400 sm:text-sm">
        {label}
      </span>
      <span
        className={`break-all text-xs font-medium text-slate-100 sm:text-right sm:text-sm ${
          mono ? "font-mono text-indigo-300" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default ProfileField;

