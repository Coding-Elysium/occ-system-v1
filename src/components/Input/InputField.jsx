import React from "react";

const InputField = ({
  type = "text",
  name,
  value,
  handleChange,
  placeholder = "Enter text",
  label = "Input Label",
  withLabel = true,
}) => {
  return (
    <div className="w-full">
      {withLabel && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
