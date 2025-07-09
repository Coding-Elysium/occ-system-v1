import React, { useState } from "react";
import InputField from "../Input/InputField";
import Button from "../Button/Button";
import ButtonCancel from "../Button/ButtonCancel";
import DropdownField from "../Input/DropdownField";

const AddCriminalCase = ({ onAddCase, onClose }) => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    defendant: "",
    offense: "",
    status: "Pending",
    dateFiled: "",
    court: "",
    judge: "",
    nextHearing: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newCase = { ...formData, id: Date.now().toString() };
    // onAddCase(newCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 font-inter">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header - not scrollable */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Add Criminal Case
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition cursor-pointer"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 space-y-4 flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Case Number"
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              handleChange={handleChange}
              placeholder="Enter Case Number"
              required
            />

            <InputField
              label="Defendant"
              type="text"
              name="defendant"
              value={formData.defendant}
              handleChange={handleChange}
              placeholder="Enter Defendant Name"
              required
            />

            <InputField
              label="Offense"
              type="text"
              name="offense"
              value={formData.offense}
              handleChange={handleChange}
              placeholder="Enter Offense"
              required
            />

            <DropdownField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "In Progress", label: "In Progress" },
                { value: "Closed", label: "Closed" },
              ]}
            />

            <InputField
              label="Date Filed"
              type="date"
              name="dateFiled"
              value={formData.dateFiled}
              handleChange={handleChange}
              required
            />

            <InputField
              label="Court"
              type="text"
              name="court"
              value={formData.court}
              handleChange={handleChange}
              placeholder="Enter Court"
              required
            />

            <InputField
              label="Judge"
              type="text"
              name="judge"
              value={formData.judge}
              handleChange={handleChange}
              placeholder="Enter Judge Name"
              required
            />

            <InputField
              label="Next Hearing Date"
              type="date"
              name="nextHearing"
              value={formData.nextHearing}
              handleChange={handleChange}
            />

            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-end justify-end gap-3 sm:gap-4">
              <ButtonCancel buttonText="Cancel" />
              <Button buttonText="Add Criminal Case" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddCriminalCase;
