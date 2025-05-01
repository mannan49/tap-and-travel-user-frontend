/* eslint-disable no-unused-vars */
import { apiBaseUrl } from "./settings";

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json(); // Parse the JSON directly

    if (response.ok && data.token) {
      localStorage.setItem("token", data.token); // Store the token
      return { success: true, data }; // Return the success flag and data
    } else {
      console.error("Login failed", data.message);
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.error("Error while logging in:", err.message);
    return { success: false, message: err.message };
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      console.error("Signup failed:", data.message);
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.error("Error during signup:", err.message);
    return { success: false, message: err.message };
  }
};

export const sendOtp = async ({ sendOtpApiUrl, email }) => {
  try {
    const response = await fetch(sendOtpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data?.message || "Failed to send OTP" };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while sending OTP.",
    };
  }
};

export const verifyOtp = async ({ apiUrl, email, otp }) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email || localStorage.getItem("email"),
        otp: otp,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      console.error("OTP verification failed:", data.message);
      return {
        success: false,
        message: data.message || "OTP verification failed",
      };
    }
  } catch (error) {
    console.error("Error during OTP verification:", error.message);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await fetch(`${apiBaseUrl}/user/forgot-password/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Reset Password API Error:", error);
    return { success: false, message: "Something went wrong." };
  }
};
