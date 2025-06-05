import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!API_BASE_URL) {
      setError(
        "Konfigurasi API base URL tidak ditemukan. Harap periksa file .env Anda."
      );
      setIsLoading(false);
      console.error(
        "VITE_API_BASE_URL is not defined in .env file or not prefixed correctly."
      );
      return;
    }

    const apiRequestBody = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        apiRequestBody
      );

      const responseData = response.data;

      if (responseData && responseData.token) {
        localStorage.setItem("authToken", responseData.token);
        setSuccessMessage("Login successful! Redirecting to gallery..."); 
        console.log("Login successful, token:", responseData.token);
        setFormData({ email: "", password: "" });

        setTimeout(() => {
          navigate("/gallery");
        }, 1500);

      } else {

        throw new Error("Login failed: Invalid response from server.");
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message ||
            `Error: ${err.response.status} - ${
              err.response.statusText || "Unknown server error"
            }`
        );
        console.error("Login error (response):", err.response.data);
      } else if (err.request) {
        setError("Login failed. No response from server. Please try again.");
        console.error("Login error (request):", err.request);
      } else {
        setError(err.message || "Login failed. An unexpected error occurred.");
        console.error("Login error (general):", err.message);
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#D6BD98]/30 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A3636] mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[#40534C]">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#40534C]">
              <input
                type="checkbox"
                name="rememberMe"
                className="w-4 h-4 border border-[#D6BD98] rounded bg-[#F5F5F5] focus:ring-2 focus:ring-[#677D6A]"
                disabled={isLoading}
              />
              Remember me
            </label>
            <a
              href="#" // Ganti dengan link ke halaman lupa password jika ada
              className="text-[#677D6A] hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A3636] hover:bg-[#40534C] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6BD98] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-sm text-center text-[#40534C]">
            Don’t have an account?{" "}
            <a
              href="/register" 
              className="text-[#677D6A] font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}