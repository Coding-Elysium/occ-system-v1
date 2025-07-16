import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCivilCaseStore from "../store/CivilCaseStore";
import {
  FaBook,
  FaEdit,
  FaEye,
  FaFileAlt,
  FaTrash,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import FirstLevelForm from "../components/Form/FirstLevelForm";
import SecondLevelForm from "../components/Form/SecondLevelForm";
import CourtAppealForm from "../components/Form/CourtAppealForm";
import AddCard from "../components/Card/AddCard";
import DataCard from "../components/Card/DataCard";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import DeleteModal from "../components/Modal/DeleteModal";

const CivilCaseView = () => {
  const [formFirstLevel, setFormFirstLevel] = useState(false);
  const [secondLevelForm, setSecondLevelForm] = useState(false);
  const [courtAppealForm, setCourtAppealForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedCardFirstLevel, setSelectedCardFirstLevel] = useState(null);
  const [selectedCardSecondLevel, setSelectedCardSecondLevel] = useState(null);
  const [deleteModal, setDeletemodal] = useState(false);

  const { id } = useParams();
  const {
    caseDetails,
    fetchCasesById,
    fetchFirstLevel,
    firstLevelDetails,
    fetchSecondLevel,
    secondLevelDetails,
    fetchCourtAppeals,
    courtAppealsDetails,
    fetchSupremeCourt,
    supremeCourtDetails,
    clearCaseData,
  } = useCivilCaseStore();

  useEffect(() => {
    if (id) {
      fetchCasesById(id);
      fetchFirstLevel(id);
      fetchSecondLevel(id);
      fetchCourtAppeals(id);
      fetchSupremeCourt(id);
    }

    return () => {
      clearCaseData();
    };
  }, [
    id,
    fetchCasesById,
    fetchFirstLevel,
    fetchSecondLevel,
    fetchCourtAppeals,
    fetchSupremeCourt,
    clearCaseData,
  ]);

  if (!caseDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading case details...</p>
      </div>
    );
  }

  const handleCardClickFirstLevel = (item) => {
    setSelectedCardFirstLevel(item);
  };

  const handleCardClickSecondLevel = (item) => {
    setSelectedCardSecondLevel(item);
  };

  const closeModal = () => {
    setSelectedCardFirstLevel(null);
  };

  return (
    <section className="overflow-y-auto pb-10 h-[calc(100vh-4rem)] ">
      <div className="mb-4">
        <Link
          to="/civilcase"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Civil Cases
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

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <AddCard
              title="Add First Level"
              onclick={() => {
                setFormFirstLevel(true);
              }}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
              {firstLevelDetails.map((item) => (
                <DataCard
                  title={item.decision}
                  subtitle={item.remarks}
                  date={item.date}
                  onEdit={() => {
                    setEditData(item);
                    setFormFirstLevel(true);
                  }}
                  onDelete={() => setDeletemodal(true)}
                  onClickView={() => handleCardClickFirstLevel(item)}
                />
              ))}

              {selectedCardFirstLevel && (
                <Modal onClose={closeModal}>
                  <h2 className="text-xl font-bold">
                    {selectedCardFirstLevel.decision}
                  </h2>
                  <p className="mt-2">{selectedCardFirstLevel.remarks}</p>
                  <p className="text-sm text-gray-500">
                    {selectedCardFirstLevel.date}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </Modal>
              )}
            </div>
          </div>

          <div>
            <AddCard
              title="Add Second Level"
              onclick={() => {
                setSecondLevelForm(true);
              }}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
              {secondLevelDetails.map((item) => (
                <DataCard
                  title={item.decision}
                  subtitle={item.judgemet}
                  date={item.finality}
                  onEdit={() => console.log("Edit clicked")}
                  onDelete={() => console.log("Delete clicked")}
                  onClickView={() => handleCardClickSecondLevel(item)}
                />
              ))}

              {selectedCardSecondLevel && (
                <Modal onClose={closeModal}>
                  <h2 className="text-xl font-bold">
                    {selectedCardFirstLevel.decision}
                  </h2>
                  <p className="mt-2">{selectedCardFirstLevel.judgemet}</p>
                  <p className="text-sm text-gray-500">
                    {selectedCardFirstLevel.finality}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </Modal>
              )}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Decision Court of Appeal</h1>
            <section>
              <Button
                buttonText="Add First Level Decision"
                onClick={() => {}}
              />
            </section>
          </div>
          <div className="rounded-md overflow-hidden">
            <table class="min-w-full table-auto">
              <thead class="bg-primary-color text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Date of Appeal</th>
                  <th className="px-4 py-2 text-left">Decision</th>
                  <th className="px-4 py-2 text-left">Resolution</th>
                  <th className="px-4 py-2 text-left">Finality</th>
                  <th className="px-4 py-2 text-left">Date of Appeal</th>
                </tr>
              </thead>
              {courtAppealsDetails.map((item) => (
                <tbody className="overflow-y-scroll">
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-1">{item.dateOfAppealOne}</td>
                    <td className="px-4 py-1">{item.decision}</td>
                    <td className="px-4 py-1">{item.resolution}</td>
                    <td className="px-4 py-1">{item.finality}</td>
                    <td className="px-4 py-1">{item.dateOfAppealTwo}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </section>
      </main>

      {deleteModal && (
        <DeleteModal
          onConfirm={() => setDeletemodal(false)}
          onCancel={() => setDeletemodal(false)}
        />
      )}

      {formFirstLevel && (
        <FirstLevelForm
          data={editData}
          onClose={() => setFormFirstLevel(false)}
          id={id}
        />
      )}

      {secondLevelForm && (
        <SecondLevelForm onClose={() => setSecondLevelForm(false)} id={id} />
      )}

      {courtAppealForm && (
        <CourtAppealForm onClose={() => setCourtAppealForm(false)} id={id} />
      )}
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
