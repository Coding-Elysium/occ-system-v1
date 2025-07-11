import React from "react";

const IconButton = ({
  buttonText = "Button",
  onClick,
  Icon = null,
  iconSize = 24,
  iconColor = "gray",
}) => {
  return (
    <button
      className="p-2 border border-gray-300 rounded-md font-semibold cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      {Icon && <Icon size={iconSize} color={iconColor} />}
    </button>
  );
};

export default IconButton;
