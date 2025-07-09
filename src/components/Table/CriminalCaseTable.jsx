import React, { useState } from 'react';
import SearchField from "../../components/Input/SearchField";
import Button from '../Button/Button';
import AddCriminalCase from '../Form/AddCriminalCase';
import IconButton from '../Button/IconButton';
import { BsFilterLeft } from 'react-icons/bs';
import { GoDownload } from "react-icons/go";
import * as XLSX from 'xlsx';

const CriminalCaseTable = () => {
  const [addCase, setAddCase] = useState(false);

  const [cases, setCases] = useState([
    {
      id: '1',
      caseNumber: 'CR-2023-001',
      defendant: 'John Doe',
      offense: 'Theft',
      status: 'Pending',
      dateFiled: '2023-01-15',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-07-20',
    },
    {
      id: '2',
      caseNumber: 'CR-2023-002',
      defendant: 'Jane Smith',
      offense: 'Assault',
      status: 'Closed',
      dateFiled: '2023-02-01',
      court: 'Municipal Trial Court',
      judge: 'Hon. Jose Reyes',
      nextHearing: 'N/A',
    },
    {
      id: '3',
      caseNumber: 'CR-2023-003',
      defendant: 'Peter Jones',
      offense: 'Fraud',
      status: 'In Progress',
      dateFiled: '2023-03-10',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-08-05',
    },
    {
      id: '4',
      caseNumber: 'CR-2023-004',
      defendant: 'Alice Brown',
      offense: 'Drug Possession',
      status: 'Pending',
      dateFiled: '2023-04-22',
      court: 'Regional Trial Court',
      judge: 'Hon. David Lee',
      nextHearing: '2024-07-25',
    },
    {
      id: '5',
      caseNumber: 'CR-2023-005',
      defendant: 'Robert White',
      offense: 'Homicide',
      status: 'In Progress',
      dateFiled: '2023-05-01',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-09-10',
    },
    {
      id: '5',
      caseNumber: 'CR-2023-005',
      defendant: 'Robert White',
      offense: 'Homicide',
      status: 'In Progress',
      dateFiled: '2023-05-01',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-09-10',
    },
    {
      id: '5',
      caseNumber: 'CR-2023-005',
      defendant: 'Robert White',
      offense: 'Homicide',
      status: 'In Progress',
      dateFiled: '2023-05-01',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-09-10',
    },
    {
      id: '5',
      caseNumber: 'CR-2023-005',
      defendant: 'Robert White',
      offense: 'Homicide',
      status: 'In Progress',
      dateFiled: '2023-05-01',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-09-10',
    },
    {
      id: '5',
      caseNumber: 'CR-2023-005',
      defendant: 'Robert White',
      offense: 'Homicide',
      status: 'In Progress',
      dateFiled: '2023-05-01',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-09-10',
    },
    {
      id: '5',
      caseNumber: 'CR-2023-005',
      defendant: 'Robert White',
      offense: 'Homicide',
      status: 'In Progress',
      dateFiled: '2023-05-01',
      court: 'Regional Trial Court',
      judge: 'Hon. Maria Santos',
      nextHearing: '2024-09-10',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter((caseItem) =>
    Object.values(caseItem).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const downloadCriminalCase = () => {
    const sheetData = [
      [
        "Case No.",
        "Defendant",
        "Offense",
        "Status",
        "Date Filed",
        "Court",
        "Judge",
        "Next Hearing"
      ],
      ...cases.map(caseItem => [
        caseItem.caseNumber,
        caseItem.defendant,
        caseItem.offense,
        caseItem.status,
        caseItem.dateFiled,
        caseItem.court,
        caseItem.judge,
        caseItem.nextHearing
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    const maxColWidths = sheetData[0].map((_, colIdx) =>
      Math.max(...sheetData.map(row => (row[colIdx] ? row[colIdx].toString().length : 10)))
    );

    worksheet["!cols"] = maxColWidths.map(w => ({ wch: w + 5 }));

    worksheet["!freeze"] = { xSplit: 0, ySplit: 1 };

    Object.keys(worksheet).forEach(cell => {
      if (!cell.startsWith("!")) {
        const cellRef = XLSX.utils.decode_cell(cell);
        if (cellRef.r === 0) {
          worksheet[cell].s = {
            font: { bold: true },
            alignment: { vertical: "center", horizontal: "center" }
          };
        } else {
          worksheet[cell].s = {
            alignment: { vertical: "center", horizontal: "left" }
          };
        }
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Criminal Cases");

    XLSX.writeFile(workbook, "criminal_cases.xlsx", {
      cellStyles: true
    });
  };

  return (
    <div>
      <div className="mx-auto bg-white rounded-lg p-6 border border-gray-300">

        <div className="mb-6 flex items-center justify-between">
          <section className='flex items-center gap-2 '>
            <SearchField onchange={(e) => setSearchTerm(e.target.value)}/>
            <IconButton Icon={BsFilterLeft}/>
          </section>
         <section className='flex items-center gap-2'>
          <Button buttonText='Add Case' onClick={() => setAddCase(true)}/>
          <IconButton Icon={GoDownload} onClick={downloadCriminalCase}/>
         </section>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary-color text-white">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg"
                >
                  Case No.
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Defendant
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Offense
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Date Filed
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Court
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Judge
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Next Hearing
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider  rounded-tr-lg"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem, index) => (
                  <tr
                    key={caseItem.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {caseItem.caseNumber}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {caseItem.defendant}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {caseItem.offense}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          caseItem.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : caseItem.status === 'Closed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {caseItem.dateFiled}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {caseItem.court}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {caseItem.judge}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {caseItem.nextHearing}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm flex items-center gap-2">
                      <button
                        onClick={() => console.log('Edit', caseItem.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs px-2 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => console.log('Delete', caseItem.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-xs px-2 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                    No cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addCase && (
        <section className='z-1 absolute'>
          <AddCriminalCase 
            onClose={() => setAddCase(false)}
          />
        </section>
      )}
    </div>
  );
};

export default CriminalCaseTable;
