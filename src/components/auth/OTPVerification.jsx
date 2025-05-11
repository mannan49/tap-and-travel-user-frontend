/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaBus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../api/AuthenticationApi";
import Button from "../blocks/Button";

function OTPVerification({
  apiUrl,
  sendOtpApiUrl,
  bottomMessage = "Already have an account? ",
  onSuccess,
  email,
}) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;

    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (otp[index] !== "") {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index),
          "",
          ...prevOtp.slice(index + 1),
        ]);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
      }
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    if (/^[0-9]+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp((prevOtp) => [...newOtp, ...prevOtp.slice(newOtp.length)]);
      if (newOtp.length === otp.length) {
        inputRefs.current[otp.length - 1].focus();
      }
    }
  };

  const handleFocus = (e) => e.target.select();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOtp({
        apiUrl,
        email,
        otp: otpValue,
      });

      if (result.success) {
        toast.success(result?.data?.message);
        if (onSuccess) onSuccess(result);
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const result = await sendOtp({ sendOtpApiUrl, email });
      if (result.success) {
        toast.success("A new OTP has been sent to your email.");
        setResendTimer(60);
        setCanResend(false);
      } else {
        toast.error(result?.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen bg-main">
      <div className="hidden md:block">
        <div className="h-full flex justify-center items-center">
          <img
            src="https://www.freeiconspng.com/uploads/bus-png-4.png"
            className="object-cover w-full h-1/2"
            alt="quiz-mine"
          />
        </div>
      </div>

      <div className="flex justify-center max-h-screen">
        <form
          className="border-primary border-solid border-2 w-full lg:w-2/3 rounded-lg h-fit my-auto px-4 lg:px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center">
            <FaBus className="text-2xl text-primary mr-2" />
            <span className="text-primary text-2xl text-center font-bold mb-0.5">
              Tap & Travel
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
            Journey Bright, Day or Night
          </h2>

          <p className="text-center text-[15px] text-slate-500 mb-4">
            Enter the 6-digit verification code sent to your email.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={handleFocus}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            ))}
          </div>

          <div className="flex justify-center items-center mb-4 text-sm">
            <p
              className={`mr-2 ${canResend ? "text-primary" : "text-gray-400"}`}
            >
              Resend Available in 00:{resendTimer.toString().padStart(2, "0")}{" "}
              s,
            </p>

            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-primary font-semibold underline"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-400 font-semibold underline cursor-not-allowed">
                Resend OTP
              </span>
            )}
          </div>

          <Button type="submit" className="mt-2 text-xl" isLoading={isLoading}>
            Verify OTP
          </Button>

          <h3 className="text-lg text-center mt-4">
            {bottomMessage}
            <NavLink to="/login" className="font-bold underline italic">
              Login Page
            </NavLink>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
