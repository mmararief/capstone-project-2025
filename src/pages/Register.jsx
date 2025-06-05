import React, { useState } from "react";
import axios from "axios";

// Mengambil API_BASE_URL dari variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferences: "",
    age: "",
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

    // Lakukan pengecekan apakah API_BASE_URL terdefinisi
    if (!API_BASE_URL) {
        setError("Konfigurasi API base URL tidak ditemukan. Harap periksa file .env Anda.");
        setIsLoading(false);
        console.error("VITE_API_BASE_URL is not defined in .env file or not prefixed correctly.");
        return;
    }


    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const ageNumber = parseInt(formData.age, 10);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      setError("Please enter a valid age.");
      setIsLoading(false);
      return;
    }

    const preferencesArray = formData.preferences
      .split(",")
      .map((pref) => pref.trim())
      .filter((pref) => pref !== "");

    const apiRequestBody = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      preferences: preferencesArray,
      age: ageNumber,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`, // Menggunakan API_BASE_URL dari .env
        apiRequestBody
      );

      const responseData = response.data;

      setSuccessMessage(
        `Registration successful! Welcome, ${responseData.name}. Your ID is ${responseData.id}.`
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        preferences: "",
        age: "",
      });

    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message ||
          `Error: ${err.response.status} - ${err.response.statusText}`
        );
      } else if (err.request) {
        setError("Registration failed. No response from server. Please try again.");
      } else {
        setError("Registration failed. An unexpected error occurred.");
      }
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#D6BD98]/30 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A3636] mb-2">
            Create an Account
          </h1>
          <p className="text-sm text-[#40534C]">
            Get started by filling out the form below.
          </p>
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
          {/* ... sisa input fields tetap sama ... */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              disabled={isLoading}
            />
          </div>

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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              placeholder="20"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="preferences"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Preferences (comma-separated)
            </label>
            <input
              type="text"
              id="preferences"
              name="preferences"
              placeholder="e.g., coding, music, sports"
              value={formData.preferences}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              disabled={isLoading}
            />
            <p className="mt-1 text-xs text-[#40534C]">
              Enter your preferences separated by commas.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A3636] hover:bg-[#40534C] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6BD98] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-sm text-center text-[#40534C]">
            Already have an account?{" "}
            <a href="/login" className="text-[#677D6A] font-medium hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}