import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../api/AuthenticationApi";
import { apiBaseUrl } from "../api/settings";
import { FaBus } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";

const ForgotEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendOtp({
        sendOtpApiUrl: `${apiBaseUrl}/user/forgot-password/send-otp`,
        email,
      });

      if (result.success) {
        toast.success(result?.data?.message || "OTP sent successfully!");
        navigate("/forgot-password/otp", { state: { email } });
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Send OTP Error:", error.message);
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
            className="object-cover w-full"
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
          <h2 className="text-xl italic font-bold text-center mb-4">
            Journey Bright, Day or Night
          </h2>

          <div className="mb-4 flex flex-col">
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

          <div className="mb-1">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full"
            >
              {isLoading ? <Loader /> : "Send OTP"}
            </button>
          </div>

          <div className="flex gap-2 items-center mt-2">
            <h1 className="italic">Remember Your Password, then </h1>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="underline italic"
            >
              Login Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotEmail;
