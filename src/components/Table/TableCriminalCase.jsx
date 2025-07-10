import React, { useState } from 'react';
import SearchField from '../Input/SearchField';
import Button  from '../Button/Button'; 
import AddCriminalCase from '../Form/AddCriminalCase';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import CriminalCaseCardMobile from '../Card/CriminalCaseCardMobile';
import DeleteModal from '../Modal/DeleteModal';
import { getStatusStyle } from '../../helper/helper';

const TableCriminalCase = () => {
  const [ addCase, setAddCase ] = useState(false);
  const [ deleteModal, setDeleteModal ] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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


  // const tableData = Array(9).fill({
  //   caseNumber: "CR-001",
  //   originalDocketNumber: "ODN-001",
  //   title: "People vs. John Doe",
  //   accused: "John Doe",
  //   complainant: "Jane Smith",
  //   nature: "Theft",
  //   dateFiled: "2023-01-15",
  //   assignedBranch: "Branch 1",
  //   caseStatus: "On Going",
  //   decision: "Guilty",
  //   dateOfDecision: "2023-12-01",
  //   assignedJudge: "Judge Smith",
  //   noticeOfAppeal: "Filed",
  //   dateForwarded: "2024-01-05",
  //   latestStatus: "Awaiting Appeal",
  // });

  const tableData = [
    {
      caseNumber: "CR-001",
      originalDocketNumber: "ODN-001",
      title: "People vs. John Doe",
      accused: "John Doe",
      complainant: "Jane Smith",
      nature: "Theft",
      dateFiled: "2023-01-15",
      assignedBranch: "Branch 1",
      caseStatus: "On Going",
      decision: "Guilty",
      dateOfDecision: "2023-12-01",
      assignedJudge: "Judge Smith",
      noticeOfAppeal: "Filed",
      dateForwarded: "2024-01-05",
      latestStatus: "Awaiting Appeal",
    },
    {
      caseNumber: "CR-001",
      originalDocketNumber: "ODN-001",
      title: "People vs. John Doe",
      accused: "John Doe",
      complainant: "Jane Smith",
      nature: "Theft",
      dateFiled: "2023-01-15",
      assignedBranch: "Branch 1",
      caseStatus: "Resolved",
      decision: "Guilty",
      dateOfDecision: "2023-12-01",
      assignedJudge: "Judge Smith",
      noticeOfAppeal: "Filed",
      dateForwarded: "2024-01-05",
      latestStatus: "Awaiting Appeal",
    },
    {
      caseNumber: "CR-001",
      originalDocketNumber: "ODN-001",
      title: "People vs. John Doe",
      accused: "John Doe",
      complainant: "Jane Smith",
      nature: "Theft",
      dateFiled: "2023-01-15",
      assignedBranch: "Branch 1",
      caseStatus: "Pending",
      decision: "Guilty",
      dateOfDecision: "2023-12-01",
      assignedJudge: "Judge Smith",
      noticeOfAppeal: "Filed",
      dateForwarded: "2024-01-05",
      latestStatus: "Awaiting Appeal",
    }
  ]

  return (
    <>
      {
        !isMobile && (
          <div className="h-full w-full border border-gray-300 rounded-x flex flex-col">
            <section className='p-4 flex flex-col gap-4 '>
              <div className="flex justify-between items-center gap-2 ">
                <section className='flex gap-2 w-md'>
                  <SearchField />
                </section>
                <section className='flex gap-2'>
                  <Button 
                    onClick={() => setAddCase(true)}
                    buttonText="Add Case" 
                  />
                </section>
              </div>
            </section>

            <section className='flex-1 px-4 overflow-y-auto '>
              <div className='max-h-lh'>
                <div className="rounded-md ">
                  <table className="min-w-full divide-y divide-gray-200">
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
                      {tableData.map((row, index) => (
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
                </div>
              </div>
            </section>
            { 
              addCase && (
                <AddCriminalCase onClose={() => setAddCase(false)}/>
              )
            }
            {
              deleteModal && (
                <DeleteModal onCancel={() => setDeleteModal(false)} onConfirm={() => setDeleteModal(false)}/>
              )
            }
          </div>
        )
      }

      {
        isMobile && (
          <section className="space-y-4">
            <div className="flex flex-col gap-4 justify-between items-center mb-4">
              <SearchField />
              <Button 
                onClick={() => setAddCase(true)} 
                buttonText="Add" 
                className="text-sm px-3 py-1"
              />
            </div>

            {tableData.map((row, index) => (
              <CriminalCaseCardMobile
                key={index}
                data={row}
                onEdit={() => console.log('Edit', row.caseNumber)}
                onDelete={() => console.log('Delete', row.caseNumber)}
              />
            ))}

            {addCase && <AddCriminalCase onClose={() => setAddCase(false)} />}
          </section>
        )
      }
    </>
  );
};

export default TableCriminalCase;
