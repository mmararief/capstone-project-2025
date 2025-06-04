import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi signup sukses
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#D6BD98]/30 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A3636] mb-2">
            Create Account
          </h1>
          <p className="text-sm text-[#40534C]">Sign up to get started</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              onChange={handleChange}
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
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              onChange={handleChange}
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
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              onChange={handleChange}
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
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] placeholder-[#40534C] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block mb-1 text-sm font-medium text-[#40534C]"
            >
              Favorite Destination Category
            </label>
            <select
              id="destination"
              name="destination"
              required
              className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#D6BD98] rounded-lg text-[#1A3636] focus:outline-none focus:ring-2 focus:ring-[#677D6A]"
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Cultural & Heritage">Cultural & Heritage</option>
              <option value="Urban & Modern">Urban & Modern</option>
              <option value="Nature & Recreation">Nature & Recreation</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A3636] hover:bg-[#40534C] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6BD98]"
          >
            Create Account
          </button>

          <p className="text-sm text-center text-[#40534C]">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#677D6A] font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
