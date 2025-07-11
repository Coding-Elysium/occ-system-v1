import React, { useState } from "react";
import InputField from "../Input/InputField";
import Button from "../Button/Button";
import ButtonCancel from "../Button/ButtonCancel";
import DropdownField from "../Input/DropdownField";
import useCriminalCaseStore from "../../store/CriminalCaseStore";

const AddCriminalCase = ({ onAddCase, onClose }) => {
  const { addCase } = useCriminalCaseStore();

  const [formData, setFormData] = useState({
    caseNumber: "",
    originalDocketNumber: "",
    title: "",
    accused: "",
    complainant: "",
    nature: "",
    dateFiled: "",
    assignedBranch: "",
    caseStatus: "",
    decision: "",
    dateOfDecision: "",
    assignedJudge: "",
    noticeOfAppeal: "",
    dateForwarded: "",
    latestStatus: "",
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
    addCase(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 font-inter">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
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

        <div className="overflow-y-auto px-4 sm:px-6 py-4 flex-1">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
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
              label="Original Docket Number"
              type="text"
              name="originalDocketNumber"
              value={formData.originalDocketNumber}
              handleChange={handleChange}
              placeholder="Enter Docket Number"
            />

            <InputField
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              handleChange={handleChange}
              placeholder="Enter Case Title"
            />

            <InputField
              label="Accused"
              type="text"
              name="accused"
              value={formData.accused}
              handleChange={handleChange}
              placeholder="Enter Accused"
            />

            <InputField
              label="Complainant"
              type="text"
              name="complainant"
              value={formData.complainant}
              handleChange={handleChange}
              placeholder="Enter Complainant"
            />

            <InputField
              label="Nature"
              type="text"
              name="nature"
              value={formData.nature}
              handleChange={handleChange}
              placeholder="Enter Nature"
            />

            <InputField
              label="Date Filed"
              type="date"
              name="dateFiled"
              value={formData.dateFiled}
              handleChange={handleChange}
            />

            <InputField
              label="Assigned Branch"
              type="text"
              name="assignedBranch"
              value={formData.assignedBranch}
              handleChange={handleChange}
              placeholder="Enter Assigned Branch"
            />

            <DropdownField
              label="Case Status"
              name="caseStatus"
              value={formData.caseStatus}
              onChange={handleChange}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "On Going", label: "On Going" },
                { value: "Resolved", label: "Resolved" },
              ]}
            />

            <InputField
              label="Decision"
              type="text"
              name="decision"
              value={formData.decision}
              handleChange={handleChange}
              placeholder="Enter Decision"
            />

            <InputField
              label="Date of Decision"
              type="date"
              name="dateOfDecision"
              value={formData.dateOfDecision}
              handleChange={handleChange}
            />

            <InputField
              label="Assigned Judge"
              type="text"
              name="assignedJudge"
              value={formData.assignedJudge}
              handleChange={handleChange}
              placeholder="Enter Judge Name"
            />

            <InputField
              label="Notice of Appeal"
              type="text"
              name="noticeOfAppeal"
              value={formData.noticeOfAppeal}
              handleChange={handleChange}
              placeholder="Enter Notice of Appeal"
            />

            <InputField
              label="Date Forwarded"
              type="date"
              name="dateForwarded"
              value={formData.dateForwarded}
              handleChange={handleChange}
            />

            <InputField
              label="Latest Status"
              type="text"
              name="latestStatus"
              value={formData.latestStatus}
              handleChange={handleChange}
              placeholder="Enter Latest Status"
            />

            <div className="sm:col-span-2 pt-4 flex gap-4 justify-end">
              <section>
                <ButtonCancel buttonText="Cancel" />
              </section>
              <section>
                <Button buttonText="Add Criminal Case" />
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCriminalCase;
