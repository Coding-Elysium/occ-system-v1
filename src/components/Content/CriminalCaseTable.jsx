import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { getStatusStyle } from '../../helper/helper';

const CriminalCaseTable = ({ cases }) => {

  const tableHeaders = [
    { key: "caseNumber", label: "Case No." },
    { key: "originalDocketNumber", label: "Docket No." },
    { key: "title", label: "Title" },
    { key: "accused", label: "Accused" },
    { key: "complainant", label: "Complainant" },
    { key: "nature", label: "Nature" },
    { key: "dateFiled", label: "Date Filed" },
    { key: "assignedBranch", label: "Branch" },
    { key: "caseStatus", label: "Status" },
    { key: "decision", label: "Decision" },
    { key: "dateOfDecision", label: "Date of Decision" },
    { key: "assignedJudge", label: "Judge" },
    { key: "noticeOfAppeal", label: "Appeal" },
    { key: "dateForwarded", label: "Forwarded" },
    { key: "latestStatus", label: "Latest Status" },
    { key: "action", label: "Action" },
  ];


  return (
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-primary-color text-white sticky top-0 z-10 text-xs">
            <tr>
                {tableHeaders.map((header) => (
                    <th key={header.key} className="px-4 py-3 text-left font-medium uppercase">
                        {header.label}
                    </th>
                ))}
            </tr>
        </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700 h-full">
                {cases.map((row, index) => (
                    <tr key={index}>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.caseNumber}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.originalDocketNumber}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.title}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.accused}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.complainant}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.nature}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.dateFiled}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.assignedBranch}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                        <span className={`px-4 font-semibold py-1 rounded ${getStatusStyle(row.caseStatus)}`}>
                            {row.caseStatus}
                        </span>
                    </td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.decision}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.dateOfDecision}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.assignedJudge}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.noticeOfAppeal}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.dateForwarded}</td>
                    <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">{row.latestStatus}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                        <button onClick={() => setDeleteModal(true)} className="text-green-600 hover:text-green-800" title="View">
                            <FaEye />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800" title="Edit">
                            <FaEdit />
                        </button>
                        <button onClick={() => setDeleteModal(true)} className="text-red-600 hover:text-red-800" title="Delete">
                            <FaTrash />
                        </button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
  );
};

export default CriminalCaseTable;
