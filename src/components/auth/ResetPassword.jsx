/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBus } from "react-icons/fa";
import { resetPassword } from "../api/AuthenticationApi";
import Loader from "../utils/Loader";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, secret_key } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    if (
      !email ||
      email.trim() === "" ||
      !secret_key ||
      secret_key.trim() === ""
    ) {
      navigate("/forgot-password/email");
    }
  }, [email, secret_key, navigate]);

  const validatePassword = (password) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[\W]/.test(password),
    };
    setPasswordRules(rules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!password || !confirmPassword) {
        toast.error("Please fill in both fields.");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        setIsLoading(false);
        return;
      }

      const allRulesPassed = Object.values(passwordRules).every(Boolean);
      if (!allRulesPassed) {
        toast.error("Password does not meet all rules.");
        setIsLoading(false);
        return;
      }

      const data = {
        email: email,
        secret_key,
        newPassword: password,
      };
      const result = await resetPassword(data);
      toast.success(result?.message || "Password reset successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Reset Password Error:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen md:bg-none bg-main">
      <div className="hidden md:block">
        <div className="h-full flex justify-center items-center">
          <img
            src="https://www.freeiconspng.com/uploads/bus-png-4.png"
            className="object-cover w-full h-1/2"
            alt="quiz-mine"
          />
        </div>
      </div>

      <div className="flex justify-center max-h-screen relative">
        <form
          className="border-primary border-solid border-2 rounded-lg h-fit my-auto p-5 w-full lg:w-2/3"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center">
            <FaBus className="text-3xl text-primary mr-2" />
            <span className="text-primary text-3xl text-center font-bold mb-0.5">
              Tap & Travel
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
            Reset Your Password
          </h2>

          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">
              New Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
              placeholder="Enter New Password"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="confirmPassword" className="font-bold text-lg">
              Confirm Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm New Password"
            />
          </div>

          {/* Password Rules */}
          <div className="text-sm text-gray-700 mb-4">
            <ul className="list-disc ml-5">
              <li
                className={
                  passwordRules.length ? "text-green-600" : "text-red-600"
                }
              >
                At least 8 characters
              </li>
              <li
                className={
                  passwordRules.uppercase ? "text-green-600" : "text-red-600"
                }
              >
                At least 1 uppercase letter
              </li>
              <li
                className={
                  passwordRules.number ? "text-green-600" : "text-red-600"
                }
              >
                At least 1 number
              </li>
              <li
                className={
                  passwordRules.specialChar ? "text-green-600" : "text-red-600"
                }
              >
                At least 1 special character
              </li>
            </ul>
          </div>

          <div className="mb-1">
            <button
              className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Reset Password"}
            </button>
          </div>

          <button
            type="button"
            className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full mt-2"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
