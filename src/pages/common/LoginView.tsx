import React, { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

interface Login {
  onChange: () => void;
  onSubmit: (data: LoginData) => void;
}
export default function LoginView({ onChange, onSubmit }: Login) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (email != event.target.value) setEmail(event.target.value);
  };

  const handlePasswordField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (password != event.target.value) setPassword(event.target.value);
  };

  const handleonSubmit = () => {
    if (email.trim() != "" && password.trim() != "")
      onSubmit({ email, password });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Login Card */}
          <div className="bg-gray-800 rounded-lg p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Log In</h1>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  onChange={handleEmailField}
                  value={email}
                  className="block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  onChange={handlePasswordField}
                  type="password"
                  className="block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleonSubmit}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                Sign In
              </button>

              {/* Guest and Sign Up links */}
              <div className="flex justify-between items-center text-sm">
                <a
                  onClick={onChange}
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Sign up here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
