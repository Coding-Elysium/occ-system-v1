import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { formatDate } from "../../helper/helper";

const DataCard = ({
  title = "Title",
  subtitle = "Subtitle",
  decision,
  date,
  onEdit,
  onDelete,
  onClickView,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col gap-2 border border-gray-300 rounded-sm p-4 bg-white transition duration-200">
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="hover:bg-gray-200 cursor-pointer text-gray-600 hover:text-gray-900 p-1 rounded-full"
        >
          <FaEllipsisV size={16} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 ">
            <button
              onClick={() => {
                onClickView();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              View
            </button>
            <button
              onClick={() => {
                onEdit();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h2
          className="text-base font-semibold text-gray-800 truncate"
          title={title}
        >
          {title}
        </h2>
        <p className="text-sm text-gray-500 truncate" title={subtitle}>
          {subtitle}
        </p>
        <p className="text-sm text-gray-500 truncate" title={decision}>
          {decision}
        </p>
      </div>

      <div className="text-sm text-gray-600 mt-1">
        Date:{" "}
        <span className="font-medium text-gray-800">{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default DataCard;
