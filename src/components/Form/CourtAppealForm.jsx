import React, { useState } from "react";
import InputField from "../Input/InputField";
import Button from "../Button/Button";
import ButtonCancel from "../Button/ButtonCancel";
import useCivilCaseStore from "../../store/CivilCaseStore";
import DynamicInputFields from "../Input/DynamicInputField";

const CourtAppealForm = ({ id, data, onClose }) => {
  const { add, updateDecision } = useCivilCaseStore();

  const [formData, setFormData] = useState({
    division: data?.division || "",
    dateOfAppeal: data?.dateOfAppeal ? data.dateOfAppeal.split("T")[0] : "",
    decision: data?.decision || "",
    finality: data?.finality || "",
    dateOfFinality: data?.dateOfFinality
      ? data.dateOfFinality.split("T")[0]
      : "",
    case_id: id,
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

    try {
      if (data?._id) {
        await updateDecision({
          path: "decision/courtappeals",
          updatedCase: data._id,
          data: formData,
          getEndPoint: `/read/decision/courtappeals/${id}`,
          updateKey: "courtAppealsDetails",
        });
      } else {
        await add({
          data: formData,
          endPoint: "/civilcase/add/decision/courtappeals",
          getEndPoint: `/read/decision/courtappeals/${id}`,
          updateKey: "courtAppealsDetails",
        });
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 font-inter">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Decision Court of Appeal
          </h2>
          <button
            onClick={() => {
              onClose();
            }}
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
            <InputField
              label="Select Division"
              type="text"
              name="division"
              value={formData.division}
              handleChange={handleChange}
              placeholder="Enter division"
              required
            />

            <InputField
              label="Date of Appeal"
              type="date"
              name="dateOfAppeal"
              value={formData.dateOfAppeal}
              handleChange={handleChange}
              placeholder="Enter Date of Appeal"
              required
            />

            <InputField
              label="Decision"
              type="date"
              name="decision"
              value={formData.decision}
              handleChange={handleChange}
              placeholder="Enter Decision"
              required
              isTextArea
            />

            <InputField
              label="Enter Finality"
              type="text"
              name="finality"
              value={formData.finality}
              handleChange={handleChange}
              placeholder="Enter Finality"
              required
            />

            <InputField
              label="Date of Finality"
              type="date"
              name="dateOfFinality"
              value={formData.dateOfFinality}
              handleChange={handleChange}
              placeholder="Enter Date of Appeal"
              required
            />

            <div className="sm:col-span-2 pt-4 flex gap-4 justify-end">
              <section>
                <ButtonCancel buttonText="Cancel" />
              </section>
              <section>
                <Button buttonText={data ? "Update" : "Add"} />
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourtAppealForm;
