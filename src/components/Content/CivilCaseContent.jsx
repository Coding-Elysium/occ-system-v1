import React, { useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useCivilCaseStore from "../../store/CivilCaseStore";

const CivilCaseContent = () => {
  const tableHeaders = [
    { key: "bookNumber", label: "Book Number" },
    { key: "docketNumber", label: "Docket Number" },
    { key: "petitioner", label: "Petitioner" },
    { key: "respondents", label: "Respondents" },
    { key: "nature", label: "Nature" },
    { key: "action", label: "Action" },
  ];

  const { fetchCases, cases } = useCivilCaseStore();

  useEffect(() => {
    fetchCases();
  }, [cases]);

  return (
    <table className="w-full table-auto divide-y divide-gray-200">
      <thead className="bg-primary-color text-white sticky top-0 z-10 text-xs">
        <tr>
          {tableHeaders.map((header) => (
            <th
              key={header.key}
              className="px-4 py-3 text-left font-medium uppercase"
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-sm text-gray-700 h-full">
        {cases.map((civilCase, index) => (
          <tr key={index}>
            <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
              {civilCase.bookNumber}
            </td>
            <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
              {civilCase.docketNumber}
            </td>
            <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
              {civilCase.petitioner}
            </td>
            <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
              {civilCase.respondents.join(", ")}
            </td>
            <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
              {civilCase.nature}
            </td>
            <td className="px-4 py-3 flex items-center gap-2">
              <button
                onClick={() => console.log("View case", civilCase.id)}
                className="text-green-600 hover:text-green-800"
                title="View"
              >
                <FaEye />
              </button>
              <button
                onClick={() => console.log("Edit case", civilCase.id)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => console.log("Delete case", civilCase.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CivilCaseContent;
