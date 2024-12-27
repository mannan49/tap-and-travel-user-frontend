/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../api/AuthenticationApi";
import Loader from "../utils/Loader";
import { useDispatch } from "react-redux";
import { loginUser as loginUserAction } from "../../store/userSlice";
import { FaBus } from "react-icons/fa";
import { RiRfidFill } from "react-icons/ri";
import { RiRfidLine } from "react-icons/ri";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [userId, setUserId] = useState(null);
  const [rfidCardNumber, setRfidCardNumber] = useState("");

  const useRFIDScanner = (onScan) => {
    useEffect(() => {
      const handleKeyPress = (e) => {
        // Simulating RFID scanner input, typically reads as a sequence of characters
        if (!window.scannerBuffer) window.scannerBuffer = "";
        // Append the key press to a buffer
        if (e.key !== "Enter") {
          window.scannerBuffer += e.key;
        } else {
          // On Enter key, assume input is complete
          if (typeof onScan === "function") {
            onScan(window.scannerBuffer); // Trigger callback with the scanned UID
          }
          window.scannerBuffer = ""; // Clear buffer
        }
      };

      // Add event listener to capture input
      window.addEventListener("keypress", handleKeyPress);

      return () => {
        // Cleanup listener on unmount
        window.removeEventListener("keypress", handleKeyPress);
      };
    }, [onScan]);
  };

  useRFIDScanner((scannedUID) => {
    if (isScanning === false) {
      toast.error(`Please click On Scan Button to scan RFID card.`);
    }
    setRfidCardNumber(scannedUID);
    handleSubmit(scannedUID);
  });

  const handleSubmit = async (cardNumber) => {
    try {
      setIsLoading(true);
      let data;
      if (isScanning) {
        // RFID login logic
        `Scanning mein to aa gya: ${rfidCardNumber}`;
        if (!cardNumber) {
          toast.error(`Please scan your RFID card.`);
          setIsLoading(false);
          return;
        }

        data = { RFIDCardNumber: cardNumber };
      } else {
        // Email/password login logic
        if (!email || !password) {
          if (isScanning) {
            toast.error("Please enter both email and password.");
          }
          setIsLoading(false);
          return;
        }

        data = { email, password };
      }

      const result = await loginUser(data);

      if (result.success) {
        const { data } = result;
        window.localStorage.setItem("token", data.token);
        setUserId(data.userId);
        toast.success(data.message);
        dispatch(
          loginUserAction({
            email: data.email,
            password: data.password,
            userId: data.userId,
          })
        );
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(isScanning);

  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen bg-[url(https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGlnaHQlMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D)] md:bg-none bg-main">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1543859184-17ac017dde53?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
          alt="quiz-mine"
        />
      </div>

      <div className="flex justify-center max-h-screen relative">
        <form
          className={`border-primary border-solid border-2 rounded-lg h-fit my-auto p-5 w-full lg:w-2/3 ${
            isScanning ? "opacity-20 pointer-events-none" : ""
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-center justify-center">
            <FaBus className="text-3xl text-primary mr-2" />
            <span className="text-primary text-3xl text-center font-bold mb-0.5">
              Tap & Travel
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
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

          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">
              Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Your Password"
            />
          </div>

          <div className="mb-1">
            <div className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
              <button
                className="text-main text-xl w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Log In"}
              </button>
            </div>
          </div>
          {/* <button
            className="bg-primary text-main text-xl w-full border-2 border-solid rounded-full px-4 py-1 flex justify-center items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              setIsScanning(!isScanning);
            }}
          >
            Scan RFID Card <RiRfidFill className="text-2xl" />
          </button> */}
          <h1 className="italic"> Don&apos;t have an account yet, then :-</h1>
          <div className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
            <button
              className="text-main text-xl w-full"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </div>
        </form>

        {isScanning && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Scan Your RFID Card</h2>
              <div className="max-w-fit p-6 mx-auto rounded-full bg-gray-200 relative animate-scan-wrapper">
                <RiRfidLine size={50} className="text-primary mx-auto" />
              </div>
              <p>Waiting for RFID card input...</p>
              <button
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full"
                onClick={() => setIsScanning(false)}
              >
                Cancel
              </button>
            </div>
            <style jsx>{`
              @keyframes scanEffect {
                0% {
                  box-shadow: 0 0 0px rgba(0, 128, 255, 0.2);
                }
                50% {
                  box-shadow: 0 0 20px rgba(0, 128, 255, 0.8);
                }
                100% {
                  box-shadow: 0 0 0px rgba(0, 128, 255, 0.2);
                }
              }

              .animate-scan-wrapper {
                animation: scanEffect 1.5s infinite ease-in-out;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
