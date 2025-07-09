import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SearchField from "../../components/Input/SearchField";
import Button from '../Button/Button';
import AddCriminalCase from '../Form/AddCriminalCase';
import IconButton from '../Button/IconButton';
import { BsFilterLeft } from 'react-icons/bs';
import { GoDownload } from "react-icons/go";
import useCriminalCaseStore from '../../store/cirminalCaseStore';

const CriminalCaseTable = () => {
  const [addCase, setAddCase] = React.useState(false);
  const {
    cases,
    fetchMoreCases,
    resetCases,
    loading,
    setSearchTerm,
    downloadCriminalCase,
  } = useCriminalCaseStore();

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    resetCases();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchMoreCases();
    }
  }, [inView]);

  return (
    <div>
      <div className="mx-auto bg-white rounded-lg p-6 border border-gray-300">
        <div className="mb-6 flex items-center justify-between">
          <section className='flex items-center gap-2'>
            <SearchField onchange={(e) => setSearchTerm(e.target.value)} />
            <IconButton Icon={BsFilterLeft} />
          </section>
          <section className='flex items-center gap-2'>
            <Button buttonText='Add Case' onClick={() => setAddCase(true)} />
            <IconButton Icon={GoDownload} onClick={downloadCriminalCase} />
          </section>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 max-h-[600px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary-color text-white sticky top-0 z-1">
              <tr>
                {[
                  "Case No.", "Defendant", "Offense", "Status",
                  "Date Filed", "Court", "Judge", "Next Hearing", "Action"
                ].map((heading, idx) => (
                  <th key={idx} className="px-4 py-3 text-xs font-medium uppercase">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem, index) => (
                <tr key={caseItem.id}>
                  <td className="px-4 py-4 text-sm">{caseItem.caseNumber}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.defendant}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.offense}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-800'
                      : caseItem.status === 'Closed' ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{caseItem.dateFiled}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.court}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.judge}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.nextHearing}</td>
                  <td className="px-4 py-4 text-sm">
                    <button className="text-blue-500 text-xs mr-2">Edit</button>
                    <button className="text-red-500 text-xs">Delete</button>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan="9" className="px-4 py-4 text-center text-gray-400">Loading more...</td>
                </tr>
              )}
            </tbody>
          </table>
          <div ref={ref} className="h-1" />
        </div>
      </div>

      {addCase && (
        <section className='z-10 absolute'>
          <AddCriminalCase onClose={() => setAddCase(false)} />
        </section>
      )}
    </div>
  );
};

export default CriminalCaseTable;
