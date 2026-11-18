import { useState } from "react";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../main";
import { useNavigate } from "react-router-dom";
import { AppData } from "../context/AppContext";

const VerifyOtp = () => {

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAuth, fetchUser } = AppData();

  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{

      const {data} = await axios.post(`${server}/api/v1/verifyotp`, {email, otp}, {withCredentials: true});
      toast.success(data.message);
      localStorage.removeItem("email");

      setUser(data.user);
      setIsAuth(true);
      await fetchUser();

      navigate("/profile");

    }
    catch(err) {
      const backendMessage = err.response?.data?.message;
      const errorMessage = typeof backendMessage === "object" && backendMessage !== null
        ? Object.values(backendMessage).flat()[0]
        : backendMessage || err.message;

      toast.error(errorMessage);
    }

    setIsLoading(false);
  }
  return (
    <AuthCard
      title="Verify OTP"
      subtitle="Enter the 6-digit verification code sent to your email"
      footerText="Didn't receive the code?"
      footerLinkText="Back to Login"
      footerLinkTo="/login"
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4"
      >
        <FormInput
          id="otp"
          label="One-Time Password (OTP)"
          type="text"
          placeholder="Enter 6-digit OTP"
          autoComplete="one-time-code"
          value={otp}
          onChangeFunction={setOtp}
        />

        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </AuthCard>
  );
};

export default VerifyOtp;
