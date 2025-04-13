/* eslint-disable react/prop-types */
import { MdCancel } from "react-icons/md";
import { PiChairFill } from "react-icons/pi";

const SelectedSeat = ({ gender, seatNumber, onRemove }) => {
  const number = parseInt(seatNumber.split("-")[1]);
  const colorClass =
    gender?.toLowerCase() == "f"
      ? "pink-500"
      : gender?.toLowerCase() == "m"
      ? "green-500"
      : "primary";

  return (
    <div className="relative bg-white p-2 rounded-xl w-16 h-16 flex flex-col items-center justify-center shadow-md">
      {/* Cancel button */}
      <button
        className={`absolute -top-2 -right-2 text-${colorClass} rounded-full p-0.25 z-10`}
        onClick={onRemove}
      >
        <MdCancel size={20} />
      </button>

      {/* Number and chair stacked vertically */}
      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-5 h-5 rounded-full bg-${colorClass} text-primary text-xs flex items-center justify-center font-semibold`}
        >
          {number}
        </div>
        <PiChairFill className={`text-4xl text-${colorClass}`} />
      </div>
    </div>
  );
};

export default SelectedSeat;
