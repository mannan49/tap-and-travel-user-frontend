import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Failed to decode token", error);
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
