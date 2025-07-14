import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import AddCivilCase from "../Form/AddCivilCase";
import { Link } from "react-router-dom";
import DeleteModal from "../Modal/DeleteModal";
import useCivilCaseStore from "../../store/CivilCaseStore";

const CivilCaseContent = ({ cases, selectedCases, setSelectedCases }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const { deleteCase } = useCivilCaseStore();

  const tableHeaders = [
    { key: "bookNumber", label: "Book Number" },
    { key: "docketNumber", label: "Docket Number" },
    { key: "status", label: "Status" },
    { key: "petitioner", label: "Petitioner" },
    { key: "respondents", label: "Respondents" },
    { key: "nature", label: "Nature" },
    { key: "branch", label: "Branch" },
    { key: "action", label: "Action" },
  ];

  const isSelected = (id) => selectedCases.includes(id);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCases(cases.map((c) => c._id));
    } else {
      setSelectedCases([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCases((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteData = async () => {
    if (selectedCase?._id) {
      await deleteCase(selectedCase._id);
      setSelectedCase(null); 
    }
  };


  return (
    <>
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-primary-color text-white sticky top-0 z-10 text-xs">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={
                  selectedCases.length === cases.length && cases.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
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
            <tr
              key={index}
              className={isSelected(civilCase._id) ? "bg-gray-100" : ""}
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={isSelected(civilCase._id)}
                  onChange={() => handleCheckboxChange(civilCase._id)}
                />
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                {civilCase.bookNumber}
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                {civilCase.docketNumber}
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                {civilCase.status}
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                {civilCase.petitioner.join(", ")}
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                {civilCase.respondents.join(", ")}
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                {civilCase.nature}
              </td>
              <td className="px-4 py-3 truncate overflow-hidden whitespace-nowrap max-w-[150px]">
                39
              </td>
              <td className="px-4 py-3 flex items-center gap-2">
                <Link to={`/civilcase/${civilCase._id}`}>
                  <button
                    onClick={() => setEditModal(true)}
                    className="text-green-600 hover:text-green-800"
                    title="View"
                  >
                    <FaEye />
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setSelectedCase(civilCase);
                    setEditModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => {
                    setSelectedCase(civilCase);
                    setDeleteModal(true);
                  }}
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
      {editModal && (
        <AddCivilCase
          onClose={() => {
            setEditModal(false);
            setSelectedCase(null);
          }}
          cases={cases}
          selectedCase={selectedCase}
          btnTextRight="Save Civil Case"
          title="Edit Civil Case"
        />
      )}
      {deleteModal && (
        <DeleteModal
          onConfirm={() => {
            handleDeleteData();
            setDeleteModal(false);
          }}
          onCancel={() => {
            setDeleteModal(false);
            setSelectedCase(null);
          }}
        />
      )}
    </>
  );
};

export default CivilCaseContent;
