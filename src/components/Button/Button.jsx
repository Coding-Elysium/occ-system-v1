import React from "react";

const Button = ({ buttonText = "Button", onClick, className = "" }) => {
  return (
    <button
      className="py-2 px-6 bg-primary-color w-full text-white rounded-md font-semibold cursor-pointer hover:bg-primary-color-hover"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
