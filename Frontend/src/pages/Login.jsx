import { Link, useNavigate } from "react-router-dom";
import ai from "/ai.svg";
import AnimatedBtn from "../components/AnimatedBtn/AnimatedBtn";
import { useState } from "react";
import { apiClient } from "../config/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    console.log(form);

    apiClient
      .post('/api/auth/login', {
        email: form.email,
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
        
        navigate("/chat");
        console.log(res);
      })
      .catch((err) => {
        console.log("Login error:", err);
        console.log("Error response:", err.response?.data);
        alert(`Login failed: ${err.response?.data?.message || err.message}`);
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
            Welcome back to Nova AI! Please sign in to continue.
          </p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-2xl bg-black/30 border border-[#3c6e71]/30 shadow-2xl shadow-[#549295]/20 rounded-2xl !p-6 md:!p-8">
          <h2 className="text-2xl font-bold text-white text-center !mb-6">
            Sign In
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 !mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
                placeholder="Enter your email"
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
                name="password"
                className="w-full !px-4 !py-3 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-[#3c6e71]/50 transition-all"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Forgot Password */}
            {/* <div className="text-right">
              <a
                href="#"
                className="text-sm text-[#3c6e71] hover:text-[#549295] transition-colors"
              >
                Forgot password?
              </a>
            </div> */}

            {/* Login Button */}
            <div className="w-full flex justify-center">
              <AnimatedBtn className="!mt-7" type="submit" disabled={submitting}>
                {submitting ? "Signing in..." : "Sign in"}
              </AnimatedBtn>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center !my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="!px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#3c6e71] hover:text-[#549295] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
