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
import SupremeCourtForm from "../components/Form/SupremeCourtForm";
import { formatDate } from "../helper/helper";

const CivilCaseView = () => {
  const [formFirstLevel, setFormFirstLevel] = useState(false);
  const [secondLevelForm, setSecondLevelForm] = useState(false);
  const [courtAppealForm, setCourtAppealForm] = useState(false);
  const [supremeCourtForm, setSupremeCourtForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [selectedCardFirstLevel, setSelectedCardFirstLevel] = useState(null);
  const [selectedCardSecondLevel, setSelectedCardSecondLevel] = useState(null);
  const [deleteFirstLevelModal, setDeleteFirstLevelModal] = useState(false);
  const [deleteSecondLevelModal, setDeleteSecondLevelModal] = useState(false);
  const [deleteCourtAppealModal, setDeleteCourtAppealModal] = useState(false);
  const [deleteSupremeCourtModal, setdeleteSupremeCourtModal] = useState(false);
  const [activeTab, setActiveTab] = useState("appeal");

  const {
    deleteDecision,
    deleteSecondLevel,
    deleteSupremeCourt,
    deleteCourtAppeal,
  } = useCivilCaseStore();

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
    setSelectedCardSecondLevel(null);
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
                  date={formatDate(item.date)}
                  onEdit={() => {
                    setEditData(item);
                    setFormFirstLevel(true);
                  }}
                  onDelete={() => {
                    setDeleteData(item);
                    setDeleteFirstLevelModal(true);
                  }}
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
                  subtitle={item.finality}
                  date={formatDate(item.judgement)}
                  onEdit={() => {
                    setEditData(item);
                    setSecondLevelForm(true);
                  }}
                  onDelete={() => {
                    setDeleteData(item);
                    setDeleteSecondLevelModal(true);
                  }}
                  onClickView={() => handleCardClickSecondLevel(item)}
                />
              ))}

              {selectedCardSecondLevel && (
                <Modal onClose={closeModal}>
                  <h2 className="text-xl font-bold">
                    {selectedCardSecondLevel?.decision}
                  </h2>
                  <p className="mt-2">{selectedCardSecondLevel?.finality}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedCardSecondLevel?.judgement)}
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

        <section>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "appeal"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("appeal")}
            >
              Court of Appeal
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "supreme"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("supreme")}
            >
              Supreme Court
            </button>
          </div>

          <div>
            {activeTab === "appeal" && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">
                    Decision Court of Appeal
                  </h1>
                  <section>
                    <Button
                      buttonText="Add"
                      onClick={() => setCourtAppealForm(true)}
                    />
                  </section>
                </div>
                {/* Your Court of Appeal Table Here */}
                <div className="rounded-md border border-gray-300 overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-primary-color text-white">
                        <tr>
                          <th className="px-4 py-2 text-left">
                            Date of Appeal 1
                          </th>
                          <th className="px-4 py-2 text-left">Decision</th>
                          <th className="px-4 py-2 text-left">Resolution</th>
                          <th className="px-4 py-2 text-left">Finality</th>
                          <th className="px-4 py-2 text-left">
                            Date of Appeal 2
                          </th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courtAppealsDetails.map((item, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2">
                              {formatDate(item.dateOfAppealOne)}
                            </td>
                            <td className="px-4 py-2">{item.decision}</td>
                            <td className="px-4 py-2">{formatDate(item.resolution)}</td>
                            <td className="px-4 py-2">{item.finality}</td>
                            <td className="px-4 py-2">
                              {formatDate(item.dateOfAppealTwo)}
                            </td>
                            <td className="px-4 py-3 flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditData(item);
                                  setCourtAppealForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>

                              <button
                                onClick={() => {
                                  setDeleteData(item);
                                  setDeleteCourtAppealModal(true);
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
                  </div>
                </div>
              </section>
            )}

            {activeTab === "supreme" && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">Supreme Court</h1>
                  <section>
                    <Button
                      buttonText="Add"
                      onClick={() => setSupremeCourtForm(true)}
                    />
                  </section>
                </div>
                {/* Your Supreme Court Table Here */}
                <div className="rounded-md border border-gray-300 overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-primary-color text-white">
                        <tr>
                          <th className="px-4 py-2 text-left">Decision</th>
                          <th className="px-4 py-2 text-left">Resolution</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supremeCourtDetails.map((item, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2">{item.decision}</td>
                            <td className="px-4 py-2">{formatDate(item.resolution)}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditData(item);
                                  setSupremeCourtForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>

                              <button
                                onClick={() => {
                                  setdeleteSupremeCourtModal(true);
                                  setDeleteData(item);
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
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>
      </main>

      {deleteFirstLevelModal && (
        <DeleteModal
          onConfirm={() => {
            deleteDecision({
              level: "firstlevel",
              id: deleteData._id,
              refetchUrl: "civilcase/read/decision/firstlevel",
              caseId: deleteData.case_id,
              updatedkey: "firstLevelDetails",
            });
            setDeleteFirstLevelModal(false);
          }}
          onCancel={() => setDeleteFirstLevelModal(false)}
        />
      )}

      {deleteSecondLevelModal && (
        <DeleteModal
          onConfirm={() => {
            deleteDecision({
              level: "secondlevel",
              id: deleteData._id,
              refetchUrl: "civilcase/read/decision/secondlevel",
              caseId: deleteData.case_id,
              updatedkey: "secondLevelDetails",
            });
            setDeleteSecondLevelModal(false);
          }}
          onCancel={() => setDeleteSecondLevelModal(false)}
        />
      )}

      {deleteCourtAppealModal && (
        <DeleteModal
          onConfirm={() => {
            deleteDecision({
              level: "courtappeals",
              id: deleteData._id,
              refetchUrl: "civilcase/read/decision/courtappeals",
              caseId: deleteData.case_id,
              updatedkey: "courtAppealsDetails",
            });
            setDeleteCourtAppealModal(false);
          }}
          onCancel={() => setDeleteCourtAppealModal(false)}
        />
      )}

      {deleteSupremeCourtModal && (
        <DeleteModal
          onConfirm={() => {
            deleteDecision({
              level: "supremecourt",
              id: deleteData._id,
              refetchUrl: "civilcase/read/decision/supremecourt",
              caseId: deleteData.case_id,
              updatedkey: "supremeCourtDetails",
            });
            setdeleteSupremeCourtModal(false);
          }}
          onCancel={() => setdeleteSupremeCourtModal(false)}
        />
      )}

      {formFirstLevel && (
        <FirstLevelForm
          data={editData}
          onClose={() => {
            setFormFirstLevel(false), setEditData(null);
          }}
          id={id}
        />
      )}

      {secondLevelForm && (
        <SecondLevelForm
          data={editData}
          onClose={() => {
            setSecondLevelForm(false), setEditData(null);
          }}
          id={id}
        />
      )}

      {courtAppealForm && (
        <CourtAppealForm
          data={editData}
          onClose={() => {
            setCourtAppealForm(false), setEditData(null);
          }}
          id={id}
        />
      )}

      {supremeCourtForm && (
        <SupremeCourtForm
          data={editData}
          onClose={() => {
            setSupremeCourtForm(false), setEditData(null);
          }}
          id={id}
        />
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
