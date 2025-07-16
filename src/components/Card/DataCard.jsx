import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const DataCard = ({
  title = "Title",
  subtitle = "subtitle",
  date = "January 07, 1999",
  onEdit,
  onDelete,
  onClickView,
}) => {
  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-4 hover:shadow transition bg-white">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
          A
        </div>
        <div className="flex-1 min-w-0">
          <h2
            className="text-base font-semibold text-gray-800 truncate"
            title={title}
          >
            {title}
          </h2>
          <p className="text-sm text-gray-500 truncate" title={subtitle}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Date: <span className="font-medium text-gray-800">{date}</span>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          className="text-red-600 hover:text-red-800"
          title="Delete"
          onClick={onClickView}
        >
          <FaEye size={16} />
        </button>
        <button
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
          onClick={onEdit}
        >
          <FaEdit size={16} />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          title="Delete"
          onClick={onDelete}
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default DataCard;
