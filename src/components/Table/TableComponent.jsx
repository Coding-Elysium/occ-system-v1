import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatDate } from '../../helper/helper';
import ModalTruncate from '../Modal/ModalTruncate';
import MessagePreviewer from '../Modal/MessagePreviewer';

export const TableComponent = ({ title, columns, data, onEdit, onDelete }) => {
  const [truncateModal, setTruncateModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleShowTruncateModal = (text) => {
    setSelectedText(text);
    setTruncateModal(true);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-primary-color text-white">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2 text-left">{col.label}</th>
              ))}
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 max-w-xs truncate">
                      {col.key === "date" || col.key === "dateOfFinality" || col.key === "dateOfAppeal" ? (
                        formatDate(item[col.key])
                      ) : typeof item[col.key] === "string" && item[col.key].length > 30 ? (
                        <span
                          className="text-blue-600 hover:underline cursor-pointer"
                          title={item[col.key]}
                          onClick={() => handleShowTruncateModal(item[col.key])}
                        >
                          {item[col.key].slice(0, 30) + "..."}
                        </span>
                      ) : (
                        item[col.key] || "N/A"
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-2 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {truncateModal && (
        <MessagePreviewer
          content={selectedText}
          onClose={() => setTruncateModal(false)}
        />
      )}
    </div>
  );
};
