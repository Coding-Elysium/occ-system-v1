import React, { useState } from 'react';
import SearchField from '../Input/SearchField';
import IconButton from "../Button/IconButton";
import { BsFilterLeft } from 'react-icons/bs';
import Button  from '../Button/Button'; // You can replace this with your actual Button component
import AddCriminalCase from '../Form/AddCriminalCase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import CriminalCaseCardMobile from '../Card/CriminalCaseCardMobile';

const TableCriminalCase = () => {
  const [ addCase, setAddCase ] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const tableHeaders = [
    { key: "caseNumber", label: "Case No." },
    { key: "defendant", label: "Defendant" },
    { key: "offense", label: "Offense" },
    { key: "status", label: "Status" },
    { key: "dateFiled", label: "Date Filed" },
    { key: "court", label: "Court" },
    { key: "judge", label: "Judge" },
    { key: "nextHearing", label: "Next Hearing" },
    { key: "action", label: "Action" },
  ];

  const tableData = Array(12).fill({
    caseNumber: "CR-001",
    defendant: "John Doe",
    offense: "Theft",
    status: "Finished",
    dateFiled: "2023-01-15",
    court: "District Court",
    judge: "Judge Smith",
    nextHearing: "2024-07-20",
    action: "View",
  });

  return (
    <>
      {
        !isMobile && (
          <div className="h-full w-full border border-gray-300 rounded-x flex flex-col">
            <section className='p-4 flex flex-col gap-4 '>
              <div className="flex justify-between items-center gap-2 ">
                <section className='flex gap-2 w-md'>
                  <SearchField />
                  <IconButton Icon={BsFilterLeft} />
                </section>
                <section className='flex gap-2'>
                  <Button 
                    onClick={() => setAddCase(true)}
                    buttonText="Add Case" 
                  />
                  <IconButton 
                    Icon={BsFilterLeft} 
                    className="border border-gray-300 rounded-md p-2 hover:bg-gray-100"
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
                          <td className="px-4 py-3">{row.caseNumber}</td>
                          <td className="px-4 py-3">{row.defendant}</td>
                          <td className="px-4 py-3">{row.offense}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-4 py-1 rounded-full text-xs font-medium ${
                                {
                                  pending: 'bg-yellow-100 text-yellow-800',
                                  finished: 'bg-green-100 text-green-800',
                                  closed: 'bg-red-100 text-red-800',
                                  'in progress': 'bg-blue-100 text-blue-800',
                                }[row.status.toLowerCase()] || 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">{row.dateFiled}</td>
                          <td className="px-4 py-3">{row.court}</td>
                          <td className="px-4 py-3">{row.judge}</td>
                          <td className="px-4 py-3">{row.nextHearing}</td>
                          <td className="px-4 py-3 flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
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
