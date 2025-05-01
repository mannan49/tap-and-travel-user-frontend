import { useLocation, useNavigate } from "react-router-dom";
import OTPVerification from "../components/auth/OTPVerification";
import { apiBaseUrl } from "../components/api/settings";
import { useEffect } from "react";

const ForgotOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email || email.trim() === "") {
      navigate("/forgot-password/email");
    }
  }, [email, navigate]);

  const handleSuccess = (result) => {
    const secretKey = result?.data?.secret_key || "";
    navigate("/forgot-password/reset", {
      state: { secret_key: secretKey, email },
    });
  };

  return (
    <OTPVerification
      apiUrl={`${apiBaseUrl}/user/forgot-password/verify-otp`}
      sendOtpApiUrl={`${apiBaseUrl}/user/forgot-password/send-otp`}
      bottomMessage="Oh! I Remember My Password "
      onSuccess={handleSuccess}
      email={email}
    />
  );
};

export default ForgotOtpPage;
