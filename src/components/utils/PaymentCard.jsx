/* eslint-disable no-unused-vars */
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { apiBaseUrl } from "../api/settings";
import OrderSummary from "../payment/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import StripeWrapper from "../payment/StripeWrapper";
import CheckOutForm from "../payment/CheckOutForm";
import { fetchTickets, generateTicket } from "../../store/slices/ticketsSlice";
import toast from "react-hot-toast";

const PaymentCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { busId } = useParams();
  const buses = useSelector((state) => state.buses.data);
  const selectedBus = buses.find((bus) => bus._id === busId);
  const user = useSelector((state) => state.user.data);
  const selectedSeats = location.state?.reservedSeats;

  const handlePaymentSuccess = async (paymentIntent) => {
    console.log("Payment succeeded:", paymentIntent);

    if (!selectedSeats || selectedSeats.length === 0) {
      console.error("No seats selected.");
      return;
    }

    try {
      const seatUpdateBody = {
        busId: selectedBus._id,
        seatsData: selectedSeats.map((seat) => ({
          seatNumber: seat.seatNumber,
          booked: true,
          email: user.email,
          gender: seat.gender,
        })),
      };
      const seatUpdateResponse = await fetch(
        `${apiBaseUrl}/bus/update-seat-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(seatUpdateBody),
        }
      );
      if (!seatUpdateResponse.ok) {
        const error = await seatUpdateResponse.json();
        throw new Error(error.message || "Seat update failed");
      }
      const ticketBody = {
        tickets: selectedSeats.map((seat) => ({
          userId: user._id,
          busId: selectedBus._id,
          seatNumber: seat.seatNumber,
        })),
      };

      console.log("Ticket body", ticketBody);

      const result = await dispatch(generateTicket(ticketBody)).unwrap();
      console.log("Tickets generated successfully:", result);

      await dispatch(fetchTickets({ userId: user._id })).unwrap();

      toast.success("Tickets booked successfully!");
      navigate("/bookings");
    } catch (err) {
      console.error("Error during ticket booking:", err);
      toast.error(err.message || "Something went wrong while booking.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div>
        <StripeWrapper>
          <CheckOutForm
            amount={selectedBus.fare.actualPrice}
            busId={selectedBus._id}
            userId={user._id}
            adminId={selectedBus.adminId}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </StripeWrapper>
      </div>
      <OrderSummary className="rounded-xl" selectedSeats={selectedSeats} />
    </div>
  );
};

export default PaymentCard;
