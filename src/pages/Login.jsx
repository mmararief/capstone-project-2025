import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#D6BD98]/30 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A3636] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#40534C]">Sign in to your account</p>
        </div>

        <form className="space-y-5">
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
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#40534C]">
              <input
                type="checkbox"
                className="w-4 h-4 border border-[#D6BD98] rounded bg-[#F5F5F5] focus:ring-2 focus:ring-[#677D6A]"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-[#677D6A] hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A3636] hover:bg-[#40534C] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6BD98]"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-[#40534C]">
            Don’t have an account?{" "}
            <a href="#" className="text-[#677D6A] font-medium hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
