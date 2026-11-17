import { useState } from "react";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";

const Register = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name)
    console.log(email)
    console.log(password)
  }
  return (
    <AuthCard
      title="Create an Account"
      subtitle="Fill in your details below to get started"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          value={name}
          onChangeFunction={setName}
        />

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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChangeFunction={setPassword}
        />

        <button
          type="submit"
          className="mt-2 w-full cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Register
        </button>
      </form>
    </AuthCard>
  );
};

export default Register;
