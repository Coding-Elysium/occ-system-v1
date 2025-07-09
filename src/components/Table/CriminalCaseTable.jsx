import React, { useState } from 'react';
import SearchField from "../../components/Input/SearchField";
import Button from '../Button/Button';

const CriminalCaseTable = () => {
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
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter((caseItem) =>
    Object.values(caseItem).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="mx-auto bg-white rounded-lg p-6 border border-gray-300">

        <div className="mb-6 flex items-center justify-between">
          <SearchField onchange={(e) => setSearchTerm(e.target.value)}/>
          <Button buttonText='Add Case'/>
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
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-lg"
                >
                  Next Hearing
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
    </div>
  );
};

export default CriminalCaseTable;
