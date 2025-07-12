import React, { useState } from "react";
import InputField from "./InputField";
import Button from "../Button/Button";

const DynamicInputFields = ({ onChange }) => {
  const [inputs, setInputs] = useState([""]);

  const handleChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
    onChange && onChange(updatedInputs);
  };

  const handleAdd = () => {
    const updatedInputs = [...inputs, ""];
    setInputs(updatedInputs);
    onChange && onChange(updatedInputs);
  };

  const handleRemove = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    onChange && onChange(updatedInputs);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <label className="text-lg font-semibold">Respondents</label>

      {inputs.map((value, index) => (
        <div key={index} className="flex gap-2 items-center">
          <InputField
            withLabel={false}
            type="text"
            value={value}
            handleChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Respondent ${index + 1}`}
          />
          {inputs.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 bg-primary-color text-white rounded hover:bg-blue-700"
      >
        + Add Respondent
      </button>
    </div>
  );
};

export default DynamicInputFields;
