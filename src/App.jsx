import { Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import DashboardContent from "./components/dashboard/DashboardContent";
import CompaniesPage from "./pages/CompaniesPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
import OTPVerification from "./components/auth/OTPVerification";
import SeatSelectionPage from "./pages/SeatSelectionPage";
// import ProtectedRoute from "./components/utils/ProtectedRoute";
import Layout from "./components/utils/Layout";
// import MapView from "./components/gps/MapView";
import RiderMap from "./components/gps/RiderMap";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardContent />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payments/:id" element={<PaymentPage />} />
          <Route path="/seat-selection/:id" element={<SeatSelectionPage />} />
          <Route path="/map" element={<RiderMap />} />
          <Route path="/buses" element={<DashboardContent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
