import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CriminalCaseCardMobile = ({ data, onEdit, onDelete }) => {
  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      finished: 'bg-green-100 text-green-800',
      closed: 'bg-red-100 text-red-800',
      'in progress': 'bg-blue-100 text-blue-800',
    };
    return styles[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-2">
      <div className="text-sm"><strong>Case No:</strong> {data.caseNumber}</div>
      <div className="text-sm"><strong>Defendant:</strong> {data.defendant}</div>
      <div className="text-sm"><strong>Offense:</strong> {data.offense}</div>
      <div className="text-sm">
        <strong>Status:</strong>{" "}
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(data.status)}`}>
          {data.status}
        </span>
      </div>
      <div className="text-sm"><strong>Date Filed:</strong> {data.dateFiled}</div>
      <div className="text-sm"><strong>Court:</strong> {data.court}</div>
      <div className="text-sm"><strong>Judge:</strong> {data.judge}</div>
      <div className="text-sm"><strong>Next Hearing:</strong> {data.nextHearing}</div>
      <div className="flex gap-4 pt-2">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 text-lg">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800 text-lg">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CriminalCaseCardMobile;
