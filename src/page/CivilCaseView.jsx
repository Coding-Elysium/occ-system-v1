import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useCivilCaseStore from "../store/CivilCaseStore";
import { FaBook, FaFileAlt, FaUserTie, FaUsers } from "react-icons/fa";

const CivilCaseView = () => {
  const { id } = useParams();
  const {
    caseDetails,
    fetchCasesById,
    fetchFirstLevel,
    firstLevelDetails,
    fetchSecondLevel,
    secondLevelDetails,
  } = useCivilCaseStore();

  useEffect(() => {
    if (id) {
      fetchCasesById(id);
      fetchFirstLevel(id);
      fetchSecondLevel(id);
    }
  }, [id]);

  if (!caseDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading case details...</p>
      </div>
    );
  }

  firstLevelDetails.map((item) => {
    console.log(`itemsss: ${item.remarks}`);
  });

  return (
    <section className="overflow-y-auto pb-10 h-[calc(100vh-4rem)] ">
      <div className="mb-4">
        <Link to="/civilcase" className="text-blue-600 text-sm hover:underline">
          ← Back to Civil Cases
        </Link>
      </div>

      <main className="flex flex-col gap-6">
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-500 rounded-lg shadow-lg text-white p-6">
          <h1 className="text-3xl font-bold">{caseDetails?.nature || "N/A"}</h1>
          <p className="text-sm mt-1 opacity-90">Nature of the Case</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CaseInfoCard
            icon={<FaBook className="text-blue-500" />}
            label="Book Number"
            value={caseDetails?.bookNumber}
          />
          <CaseInfoCard
            icon={<FaFileAlt className="text-green-500" />}
            label="Docket Number"
            value={caseDetails?.docketNumber}
          />
          <CaseInfoCard
            icon={<FaUserTie className="text-purple-500" />}
            label="Petitioner(s)"
            value={
              caseDetails?.petitioner?.length > 0
                ? caseDetails.petitioner.join(", ")
                : "N/A"
            }
          />
          <CaseInfoCard
            icon={<FaUserTie className="text-purple-500" />}
            label="Respondent(s)"
            value={
              caseDetails?.respondents?.length > 0
                ? caseDetails.respondents.join(", ")
                : "N/A"
            }
          />
        </section>
      </main>
      <section>
        <h1>First Level Decision</h1>
        {firstLevelDetails.map((item) => {
          return (
            <>
              <p>{item.remarks}</p>
              <p>{item.decision}</p>
              <p>{item.date}</p>
            </>
          );
        })}
      </section>

      <section>
        <h1>Second Level Decision</h1>
        {secondLevelDetails.map((item, key) => {
          return (
            <>
              <p>{item.decision}</p>
              <p>{item.judgement}</p>
              <p>{item.finality}</p>
            </>
          );
        })}
      </section>
    </section>
  );
};

const CaseInfoCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-md border border-gray-300 px-6 py-5 flex flex-col items-start gap-2">
    <div className="flex items-center gap-2 text-gray-800 text-xl font-semibold">
      {icon}
      <span>{value || "N/A"}</span>
    </div>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default CivilCaseView;
