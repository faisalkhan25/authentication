import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import { server } from "../main";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const {data} = await axios.post(`${server}/api/v1/login`, {
        email,
        password,
      });
      localStorage.setItem("email", email);
      toast.success(data.message);
      navigate("/verifyotp");
      
    }catch(err) {
      const backendMessage = err.response?.data?.message;
      const errorMessage =
        typeof backendMessage === "object" && backendMessage !== null
          ? Object.values(backendMessage).flat()[0]
          : backendMessage || err.message;

      toast.error(errorMessage);
    }
    setLoading(false);
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Enter your email and password to sign in"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4"
      >
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChangeFunction={setEmail}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChangeFunction={setPassword}
        />

        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthCard>
  );
};

export default Login;
