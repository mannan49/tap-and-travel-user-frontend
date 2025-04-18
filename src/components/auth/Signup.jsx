/* eslint-disable no-unused-vars */
import { FaBus } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";
import { signUpUser } from "../api/AuthenticationApi";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = {
      email: email,
      password: password,
      name: name,
      phoneNumber: phone,
    };

    try {
      setIsLoading(true);
      const result = await signUpUser(data);
      if (result.success) {
        const { email, message } = result.data;
        localStorage.setItem("email", email);
        toast.success(message);
        navigate("/otp-verification");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen bg-main  lg:bg-none">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1543859184-17ac017dde53?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
          alt="signup-illustration"
        />
      </div>

      <div className="flex justify-center max-h-screen">
        <form
          className="border-primary border-solid border-2 w-full lg:w-2/3 rounded-lg h-fit my-auto px-4 lg:px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center">
            <FaBus className="text-2xl text-primary mr-2" />
            <span className="text-primary text-2xl text-center font-bold mb-0.5">
              Manzil
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
            Journey Bright, Day or Night
          </h2>

          <div className="flex space-x-2">
            <div className="w-full mb-1 flex flex-col">
              <label htmlFor="first-name" className="font-bold text-lg">
                Full Name :
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
                placeholder="Full Name"
              />
            </div>
          </div>

          <div className="mb-1 flex flex-col">
            <label htmlFor="email" className="font-bold text-lg">
              Email :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your E-mail"
            />
          </div>

          <div>
            <div className="mb-1 flex flex-col relative">
              <label htmlFor="password" className="font-bold text-lg">
                Password:
              </label>
              <input
                className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute  bottom-3 right-0 flex items-center px-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="mb-1 flex flex-col relative">
              <label htmlFor="confirm-password" className="font-bold text-lg">
                Confirm Password:
              </label>
              <input
                className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none pr-10"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute bottom-3 right-0 flex items-center px-3"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-1 flex flex-col">
            <label htmlFor="confirm-password" className="font-bold text-lg">
              Phone Number :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="number"
              name="phone-number"
              id="phone-number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone Number"
            />
          </div>

          <div>
            <div className="bg-primary my-2 border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
              <button
                className="text-main text-lg w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </button>
            </div>
            <h3 className="text-lg text-center">
              Already have an account, go to <br className="block md:hidden" />
              <NavLink to="/login" className=" font-bold underline italic">
                Login Page
              </NavLink>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
