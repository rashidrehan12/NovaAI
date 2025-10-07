import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ai from "/ai.svg";
import AnimatedBtn from "../components/AnimatedBtn/AnimatedBtn";
import { apiClient } from "../config/api";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    console.log("Form data:", form);

    apiClient
      .post('/api/auth/register', {
        email: form.email,
        fullName: {
          firstName: form.firstname,
          lastName: form.lastname,
        },
        password: form.password,
      })
      .then((res) => {
        // Store authentication token
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        
        // Store user data
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        // Redirect to chat page after successful registration
        navigate("/chat");
        console.log(res);
      })
      .catch((err) => {
        console.error("Registration error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        alert(`Registration failed: ${err.response?.data?.message || err.message}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center !mb-8">
          <Link to="/">
            <div className="flex items-center justify-center gap-3 !mb-4 cursor-pointer">
              <h1 className="text-3xl md:text-4xl uppercase font-bold bg-gradient-to-r from-[#3c6e71] via-white to-[#3c6e71] bg-clip-text text-transparent">
                Nova
              </h1>
              <img src={ai} alt="Nova" className="w-8 h-8" />
            </div>
          </Link>
          <p className="text-gray-400 text-sm">
            Join the conversation and unlock the power of AI
          </p>
        </div>

        {/* Register Form */}
        <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 shadow-2xl shadow-[#549295]/20 rounded-2xl !p-6 md:!p-8">
          <h2 className="text-2xl font-bold text-white text-center !mb-6">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 !mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
                  placeholder="John"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 !mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
                  placeholder="Doe"
                  value={form.lastname}
                  onChange={handleChange}
                  name="lastname"
                  
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 !mt-2 !mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
                placeholder="john@example.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 !mt-2 !mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
                placeholder="Create a password"
                name="password"
                required
                value={form.password}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title=" Must contain at least one number, one special character, and be at least 8 characters long"
                onChange={handleChange}
                maxLength={32}
                minLength={8}
                
              />
              {/* <p className="text-xs text-gray-500 !mt-1">
                Password must be at least 8 characters
              </p> */}
            </div>

            {/* Register Button */}
            <div className="w-full flex justify-center">
              <AnimatedBtn className="!mt-7" type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Account"}
              </AnimatedBtn>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center !my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="!px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#3c6e71] hover:text-[#549295] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
