import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getStatusStyle } from "../../helper/helper";

const CriminalCaseCardMobile = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-2">
      <div className="text-sm">
        <strong>Case No:</strong> {data.caseNumber}
      </div>
      <div className="text-sm">
        <strong>Original Docket No.:</strong> {data.originalDocketNumber}
      </div>
      <div className="text-sm">
        <strong>Title:</strong> {data.title}
      </div>
      <div className="text-sm">
        <strong>Accused:</strong> {data.accused}
      </div>
      <div className="text-sm">
        <strong>Complainant:</strong> {data.comlpainant}
      </div>
      <div className="text-sm">
        <strong>Nature:</strong> {data.nature}
      </div>
      <div className="text-sm">
        <strong>Date Filed:</strong> {data.dateFiled}
      </div>
      <div className="text-sm">
        <strong>Assigned Branch:</strong> {data.assignedBranch}
      </div>
      <div className="text-sm">
        <strong>Case Status:</strong>{" "}
        <span
          className={`px-2 py-1 rounded ${getStatusStyle(data.caseStatus)}`}
        >
          {data.caseStatus}
        </span>
      </div>
      <div className="text-sm">
        <strong>Decision:</strong> {data.decision}
      </div>
      <div className="text-sm">
        <strong>Date of Decision:</strong> {data.dateOfDecision}
      </div>
      <div className="text-sm">
        <strong>Assigned Judge:</strong> {data.assignedJudge}
      </div>
      <div className="text-sm">
        <strong>Notice of Appeal:</strong> {data.noticeOfAppeal}
      </div>
      <div className="text-sm">
        <strong>Date Forwarded:</strong> {data.dateForwarded}
      </div>
      <div className="text-sm">
        <strong>Latest Status:</strong> {data.latestStatus}
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 text-lg"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 text-lg"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CriminalCaseCardMobile;
