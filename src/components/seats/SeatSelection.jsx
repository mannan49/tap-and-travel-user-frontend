/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../api/settings";
import SeatLegend from "./SeatLegend";
import SelectedSeat from "./SelectedSeat";

const SeatSelection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [busData, setBusData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSeat, setCurrentSeat] = useState(null);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/bus/${id}`);
        console.log("Response", response);
        setBusData(response.data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
        navigate("/");
      }
    };

    if (id) {
      fetchBusData();
    }
  }, [id, navigate]);

  const handleSeatClick = (seat) => {
    if (
      !seat.booked &&
      !selectedSeats.some((s) => s.seatNumber === seat.seatNumber)
    ) {
      // Show modal to confirm seat
      setCurrentSeat(seat);
      setShowModal(true);
    }
    console.log("Selected Seats",selectedSeats);
  };

  const handleInputChange = (field, value) => {
    setCurrentSeat((prevSeat) => ({
      ...prevSeat,
      [field]: value,
    }));
  };

  const handleConfirmSeat = () => {
    if (currentSeat.gender) {
      // Add the seat to selectedSeats
      setSelectedSeats((prevSeats) => [
        ...prevSeats,
        {
          ...currentSeat,
          name: currentSeat?.name,
          gender: currentSeat?.gender,
        },
      ]);
      setShowModal(false);
    } else {
      alert("Please select passenger gender.");
    }
  };

  const handleProceedToPayment = () => {
    // Ensure all fields are filled
    const allFieldsFilled = selectedSeats.every(
      (seat) => seat?.gender
    );
    if (allFieldsFilled) {
      navigate(`/payments/${id}`, { state: { reservedSeats: selectedSeats } });
    } else {
      alert("Please fill in all details for each selected seat.");
    }
  };

  const handleRemoveSeat = (seatNumberToRemove) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.filter((seat) => seat.seatNumber !== seatNumberToRemove)
    );
  };

  return (
    <div className="flex flex-col justify-around  items-start md:flex-row gap-4 mt-4 pb-8 mx-auto">
      <SeatLegend />
      <div className="bg-primary py-2 px-6 rounded-lg">
        <h2 className="text-2xl text-white text-center font-bold mb-6">
          Bus Seat Booking
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {busData?.seats.map((seat, index) => {
            if (index % 2 === 0) {
              const nextSeat = busData.seats[index + 1];
              return (
                <div key={seat.seatNumber} className="flex space-x-2">
                  <Seat seat={seat} onClick={() => handleSeatClick(seat)} />
                  {nextSeat && (
                    <Seat
                      seat={nextSeat}
                      onClick={() => handleSeatClick(nextSeat)}
                    />
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      {/* Selected Seat Forms */}
      <div>
        {selectedSeats.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-4 gap-4">
              {selectedSeats.map((seat) => (
                <SelectedSeat
                  key={seat.seatNumber}
                  gender={seat.gender}
                  seatNumber={seat.seatNumber}
                  onRemove={() => handleRemoveSeat(seat.seatNumber)}
                />
              ))}
            </div>
            <button
              onClick={handleProceedToPayment}
              className="m-4 px-6 py-2 bg-primary text-white rounded-2xl hover:bg-blue-500"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>

      {/* Modal for seat confirmation */}
      {showModal && currentSeat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="font-bold mb-4 text-center">
              To Confirm Seat # {parseInt(currentSeat.seatNumber.split("-")[1])}
            </h3>
            <div className="mb-4">
              <label className="block mb-2 text-sm">Gender</label>
              <select
                value={currentSeat.gender || ""}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmSeat}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Seat = ({ seat, onClick }) => {
  let seatColor = "bg-gray-500";

  if (seat.booked) {
    seatColor =
      seat?.gender?.toLowerCase() === "m" ? "bg-green-500" : "bg-pink-500";
  }

  const seatCursor = seat.booked ? "cursor-not-allowed" : "cursor-pointer";
  const seatNumber = parseInt(seat.seatNumber.split("-")[1]);

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center font-bold rounded text-white ${seatColor} ${seatCursor}`}
      onClick={!seat.booked ? onClick : undefined}
    >
      {seatNumber}
      {/* {seat.booked ? seat.gender : seatNumber} */}
    </div>
  );
};

export default SeatSelection;
