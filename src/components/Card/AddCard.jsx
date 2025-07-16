import React from "react";

const AddCard = ({ title = "Add New", onclick }) => {
  return (
    <div
      onClick={onclick}
      className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-600">
          +
        </div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default AddCard;
