import { useState } from "react";

interface SignupData {
  name: string;
  email: string;
  password: string;
}
interface Signup {
  onChange: () => void;
  onSubmit: (data: SignupData) => void;
  onGuestRegister: () => void;
}

export default function SignupView({
  onChange,
  onSubmit,
  onGuestRegister,
}: Signup) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const handleSubmit = () => {
    if (
      email.trim() != "" &&
      name.trim() != "" &&
      password.trim() != "" &&
      password == cnfPassword
    )
      onSubmit({ name, email, password });
  };

  const handleNameField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (name != event.target.value) setName(event.target.value);
  };
  const handleEmailField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (email != event.target.value) setEmail(event.target.value);
  };
  const handlePasswordField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (password != event.target.value) setPassword(event.target.value);
  };
  const handleConformPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (cnfPassword != event.target.value) setCnfPassword(event.target.value);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Sign Up Card */}
          <div className="bg-gray-800 rounded-lg p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Sign Up</h1>
            </div>

            {/* Sign Up Form */}
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  onChange={handleNameField}
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  onChange={handleEmailField}
                  type="email"
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm Password
                </label>
                <input
                  onChange={handleConformPassword}
                  type="password"
                  className="block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                Sign Up
              </button>

              {/* Login and Guest links */}
              <div className="flex justify-between items-center text-sm">
                <a
                  onClick={onGuestRegister}
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Continue as Guest
                </a>
                <a
                  onClick={onChange}
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Already have an account?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
