import { useState } from "react";

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChangeFunction,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-slate-300 sm:text-sm"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChangeFunction && onChangeFunction(e.target.value)}
          className={`w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
            isPasswordField ? "pr-16" : ""
          }`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-indigo-400 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
