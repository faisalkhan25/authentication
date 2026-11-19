const Loading = ({ message = "Loading..." }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-950 px-4 text-slate-300"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-indigo-500" />
      {message && (
        <p className="text-xs font-medium text-slate-400 sm:text-sm">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;

