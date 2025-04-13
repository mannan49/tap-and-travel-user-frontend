const SeatLegend = () => {
  const legendItems = [
    { color: "bg-green-500", label: "Male" },
    { color: "bg-pink-500", label: "Female" },
    { color: "bg-gray-600", label: "Available" },
  ];

  return (
    <div className="flex md:flex-col gap-4 m-4">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded ${item.color}`} />
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
