import React, { useState } from "react";

const HARDCODED_EMAIL = "staff@clinic.com";
const HARDCODED_PASSWORD = "123456";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onLogin();
        }, 1000);
      } else {
        setError("Invalid credentials");
      }
    }, 1200);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Avatar */}
        <div className="absolute left-1/2 -top-12 transform -translate-x-1/2 z-10">
          <div className="w-24 h-24 rounded-full bg-white shadow flex items-center justify-center overflow-hidden border-4 border-white">
            {/* Simple SVG avatar */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" r="30" fill="#E0E7FF" />
              <ellipse cx="30" cy="23" rx="10" ry="10" fill="#94A3B8" />
              <ellipse cx="30" cy="47" rx="16" ry="10" fill="#CBD5E1" />
            </svg>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-2xl pt-16 pb-8 px-8 flex flex-col gap-4 relative z-0"
        >
          <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">
            Sign In
          </h2>
          <p className="text-center text-gray-500 mb-4 text-sm">
            Sign In to manage all your devices
          </p>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-5 translate-y-1/2 text-gray-400 text-lg"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {/* <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-blue-600 opacity-60 cursor-not-allowed">
              Forgot password?
            </span>
          </div> */}
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          {success && (
            <div className="text-green-600 mb-2 text-sm">Login successful!</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold text-lg mt-2"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white inline-block align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
          {/* <div className="text-center text-gray-500 text-sm mt-2">
            Do not have an account?{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              Sign Up
            </span>
          </div> */}
        </form>
      </div>
    </div>
  );
}
