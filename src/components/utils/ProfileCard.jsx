import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className="mt-4 w-full flex justify-center items-center">
      {/* Image */}
      <div className="h-56 w-72 absolute flex justify-center items-center">
        <img
          className="object-cover h-20 w-20 rounded-full"
          src="https://images.unsplash.com/photo-1484608856193-968d2be4080e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
          alt="Profile"
        />
      </div>

      {/* Card */}
      <div className="h-56  mx-4 w-5/6 bg-primary rounded-3xl shadow-md sm:w-80 sm:mx-0">
        {/* Header */}
        <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
          <h1 className="text-main">Profile</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        {/* Info Section */}
        <div className="bg-main w-full rounded-3xl flex flex-col justify-around items-center">
          {/* Orders and Spent */}
          <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-ternary text-xs">Orders</h1>
              <h1 className="text-gray-600 text-sm">340</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-ternary text-xs">Spent</h1>
              <h1 className="text-gray-600 text-sm">$2,004</h1>
            </div>
          </div>

          {/* User Info */}
          <div className="w-full h-1/2 flex flex-col justify-center items-center">
            <h1 className="text-gray-700 font-bold">Aqsa Jameel</h1>
            <h1 className="text-ternary text-sm">New York, USA</h1>
          </div>
          <div>
            <label htmlFor="edit-username" className="text-ternary text-sm">
              Full Name
            </label>
            <div className="flex items-center border border-ternary_light rounded-md p-2 mb-4 bg-white ">
              <input
                type="text"
                placeholder="Aqsa Jameel"
                className="w-full px-2 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <div className="px-1  flex justify-center items-center gap-1">
                <MdEdit />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="edit-username" className="text-ternary text-sm">
              Email
            </label>
            <div className="flex items-center border border-ternary_light rounded-md p-2 mb-4 bg-white ">
              <input
                type="email"
                placeholder="aqsajameel@gmail.com"
                className="w-full px-2 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <div className="px-1  flex justify-center items-center gap-1">
                <MdEdit />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="edit-username" className="text-ternary text-sm">
              Password
            </label>
            <div className="flex items-center border border-ternary_light rounded-md p-2 mb-4 bg-white ">
              <input
                type="text"
                placeholder="**********"
                className="w-full px-2 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <div className="px-1  flex justify-center items-center gap-1">
                <FaRegEye />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="edit-username" className="text-ternary text-sm">
              Phone Number
            </label>
            <div className="flex items-center border border-ternary_light rounded-md p-2 mb-4 bg-white ">
              <input
                type="text"
                placeholder="03132567891"
                className="w-full px-2 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <div className="px-1  flex justify-center items-center gap-1">
                <MdEdit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
