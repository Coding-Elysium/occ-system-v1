import React, { useState } from "react";
import InputField from "../Input/InputField";
import Button from "../Button/Button";
import ButtonCancel from "../Button/ButtonCancel";
import DropdownField from "../Input/DropdownField";
import useCivilCaseStore from "../../store/CivilCaseStore"; // <-- import your store

const SetStatus = ({ onClose, selectedIds }) => {
  const { updateStatus } = useCivilCaseStore();

  const [formData, setFormData] = useState({
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.status || selectedIds.length === 0) {
      alert("Please select a status and at least one case.");
      return;
    }

    try {
      await updateStatus({
        ids: selectedIds,
        status: formData.status,
      });
      onClose();
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 font-inter">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Set Status
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

        <div className="overflow-y-auto px-4 sm:px-6 py-4 flex-1 gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <DropdownField
              label="Case Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: "", label: "--- Select Status ---" },
                { value: "withdrawn", label: "Withdrawn" },
                { value: "dismissed", label: "Dismissed" },
                { value: "archived", label: "Archived" },
                { value: "appealed case", label: "Appealed Case" },
              ]}
            />
            <div className="sm:col-span-2 pt-4 flex gap-4 justify-end">
              <section onClick={onClose}>
                <ButtonCancel buttonText="Cancel" />
              </section>
              <section>
                <Button buttonText="Set Status" />
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetStatus;
