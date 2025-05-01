import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../components/api/settings";
import OTPVerification from "../components/auth/OTPVerification";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { initializeStore } from "../store/intializeStore";
import { useDispatch } from "react-redux";

const SignupOtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail || storedEmail.trim() === "") {
      navigate("/signup");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSuccess = async (result) => {
    const { data } = result;
    window.localStorage.setItem("token", data?.token);
    await initializeStore(dispatch);
    toast.success(data.message);
    navigate("/");
  };

  return (
    <OTPVerification
      apiUrl={`${apiBaseUrl}/user/verify-otp`}
      sendOtpApiUrl={`${apiBaseUrl}/user/resend-otp`}
      bottomMessage="I already have an account, "
      onSuccess={handleSuccess}
      email={email}
    />
  );
};

export default SignupOtpPage;
