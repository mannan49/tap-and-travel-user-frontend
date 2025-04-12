import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../api/AuthenticationApi";
import Loader from "../utils/Loader";
import { FaBus } from "react-icons/fa";
import { initializeStore } from "../../store/intializeStore";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!email || !password) {
        toast.error("Please enter both email and password.");
        setIsLoading(false);
        return;
      }

      const data = { email, password };
      const result = await loginUser(data);

      if (result.success) {
        const { data } = result;
        window.localStorage.setItem("token", data?.token);
        toast.success("Processing your login, please hold on...", {
          duration: 5000,
        });
        await initializeStore(dispatch);
        toast.success(data.message);
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

  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen md:bg-none bg-main">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1543859184-17ac017dde53?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
          alt="quiz-mine"
        />
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
            <button
              className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Log In"}
            </button>
          </div>

          <h1 className="italic"> Don&apos;t have an account yet, then :-</h1>
          <button
            type="button"
            className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
