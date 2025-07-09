import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SearchField from "../../components/Input/SearchField";
import Button from "../Button/Button";
import AddCriminalCase from "../Form/AddCriminalCase";
import IconButton from "../Button/IconButton";
import { BsFilterLeft } from "react-icons/bs";
import { GoDownload } from "react-icons/go";
import useCriminalCaseStore from "../../store/cirminalCaseStore";
import { useMediaQuery } from "react-responsive";

const CriminalCaseTable = () => {
  const [addCase, setAddCase] = React.useState(false);
  const [searchTerm, setSearchTermLocal] = useState("");

  const {
    cases,
    fetchMoreCases,
    resetCases,
    loading,
    setSearchTerm,
    downloadCriminalCase,
    hasMore,
  } = useCriminalCaseStore();

  const { ref, inView } = useInView({ threshold: 1.0 });

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Initial load
  useEffect(() => {
    resetCases();
    fetchMoreCases();
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (inView && !loading && hasMore) {
      fetchMoreCases();
    }
  }, [inView, loading, hasMore]);

  // 🔍 Trigger new search
  useEffect(() => {
    setSearchTerm(searchTerm);
    fetchMoreCases();
  }, [searchTerm]);

  return (
    <div>
      <div className="mx-auto bg-white rounded-lg p-4 sm:p-6 border border-gray-300">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <section className="flex sm:flex-row gap-2 sm:items-center">
            <SearchField
              value={searchTerm}
              onchange={(e) => setSearchTermLocal(e.target.value)}
            />
            <IconButton Icon={BsFilterLeft} />
          </section>
          <section className="flex sm:flex-row gap-2 sm:items-center">
            <Button buttonText="Add Case" onClick={() => setAddCase(true)} />
            <IconButton Icon={GoDownload} onClick={downloadCriminalCase} />
          </section>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary-color text-white sticky top-0 z-10">
              <tr>
                {[
                  "Case No.",
                  "Defendant",
                  "Offense",
                  "Status",
                  "Date Filed",
                  "Court",
                  "Judge",
                  "Next Hearing",
                  "Action",
                ].map((heading, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-xs font-medium uppercase text-left"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-sm">{caseItem.caseNumber}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.defendant}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.offense}</td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        caseItem.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : caseItem.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{caseItem.dateFiled}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.court}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.judge}</td>
                  <td className="px-4 py-4 text-sm">{caseItem.nextHearing}</td>
                  <td className="px-4 py-4 text-sm">
                    <button className="text-blue-500 text-xs mr-2 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 text-xs hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-4 text-center text-gray-400"
                  >
                    Loading more...
                  </td>
                </tr>
              )}
              <tr ref={ref}>
                <td colSpan="9" className="h-1"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {addCase && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-xl bg-white rounded-lg shadow-lg">
            <AddCriminalCase onClose={() => setAddCase(false)} />
          </div>
        </section>
      )}
    </div>
  );
};

export default CriminalCaseTable;
