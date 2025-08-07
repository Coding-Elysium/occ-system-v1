import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCivilCaseStore from "../store/CivilCaseStore";
import { FaBook, FaUserTie, FaFileAlt, FaEdit, FaTrash } from "react-icons/fa";
import FirstLevelForm from "../components/Form/FirstLevelForm";
import SecondLevelForm from "../components/Form/SecondLevelForm";
import CourtAppealForm from "../components/Form/CourtAppealForm";
import SupremeCourtForm from "../components/Form/SupremeCourtForm";
import DeleteModal from "../components/Modal/DeleteModal";
import Button from "../components/Button/Button";
import { formatDate } from "../helper/helper";
import ModalTruncate from "../components/Modal/ModalTruncate";
import { TableComponent } from "../components/Table/TableComponent";
import CaseInfoCard from "../components/Card/CaseInfoCard";

const CivilCaseView = () => {
  const [activeTab, setActiveTab] = useState("firstLevel");
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [formFirstLevel, setFormFirstLevel] = useState(false);
  const [secondLevelForm, setSecondLevelForm] = useState(false);
  const [courtAppealForm, setCourtAppealForm] = useState(false);
  const [supremeCourtForm, setSupremeCourtForm] = useState(false);
  const [deleteFirstLevelModal, setDeleteFirstLevelModal] = useState(false);
  const [deleteSecondLevelModal, setDeleteSecondLevelModal] = useState(false);
  const [deleteCourtAppealModal, setDeleteCourtAppealModal] = useState(false);
  const [deleteSupremeCourtModal, setdeleteSupremeCourtModal] = useState(false);

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
    deleteDecision,
  } = useCivilCaseStore();

  useEffect(() => {
    if (id) {
      fetchCasesById(id);
      fetchFirstLevel(id);
      fetchSecondLevel(id);
      fetchCourtAppeals(id);
      fetchSupremeCourt(id);
    }
    return () => clearCaseData();
  }, [id]);

  if (!caseDetails) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading case details...</p>
      </div>
    );
  }

  const tabs = [
    { key: "firstLevel", label: "First Level Decision" },
    { key: "secondLevel", label: "Second Level Decision" },
    { key: "appeal", label: "Court of Appeals" },
    { key: "supreme", label: "Supreme Court" },
  ];

  const addButtonText = {
    firstLevel: "Add First Level",
    secondLevel: "Add Second Level",
    appeal: "Add Court of Appeals",
    supreme: "Add Supreme Court",
  };

  const openForm = {
    firstLevel: () => setFormFirstLevel(true),
    secondLevel: () => setSecondLevelForm(true),
    appeal: () => setCourtAppealForm(true),
    supreme: () => setSupremeCourtForm(true),
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="bg-white p-4 w-full border border-gray-200 rounded-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {caseDetails?.nature || "Civil Case"}
          </h1>
          <p className="text-sm text-gray-500">Nature of the Case</p>
        </div>
        {/* <Link
          to="/civilcase"
          className="text-blue-600 hover:underline text-sm"
        >
          Back to Civil Cases
        </Link> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 bg-white rounded-md border border-gray-300 p-4">
          <div className="border-b border-gray-200 mb-4 ">
            <nav className="flex items-center justify-between mb-4">
              <section className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`pb-2 text-sm font-medium cursor-pointer ${
                      activeTab === tab.key
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </section>
              <section>
                <Button
                  buttonText={addButtonText[activeTab]}
                  onClick={openForm[activeTab]}
                />
              </section>
            </nav>
          </div>

          <div className="overflow-x-auto">
            {activeTab === "firstLevel" && (
              <TableComponent
                title="First Level Decision"
                columns={[
                  { key: "courtOfOrigin", label: "Court of Origin" },
                  { key: "remarks", label: "Remarks" },
                  { key: "decision", label: "Decision" },
                  { key: "date", label: "Date" },
                ]}
                data={firstLevelDetails}
                onEdit={(item) => {
                  setEditData(item);
                  setFormFirstLevel(true);
                }}
                onDelete={(item) => {
                  setDeleteData(item);
                  setDeleteFirstLevelModal(true);
                }}
              />
            )}

            {activeTab === "secondLevel" && (
              <TableComponent
                title="Second Level Decision"
                columns={[
                  { key: "decision", label: "Decision" },
                  { key: "date", label: "Date" },
                ]}
                data={secondLevelDetails}
                onEdit={(item) => {
                  setEditData(item);
                  setSecondLevelForm(true);
                }}
                onDelete={(item) => {
                  setDeleteData(item);
                  setDeleteSecondLevelModal(true);
                }}
              />
            )}

            {activeTab === "appeal" && (
              <TableComponent
                title="Decision Court of Appeals"
                columns={[
                  { key: "date", label: "Date" },
                  { key: "division", label: "Division" },
                  { key: "decision", label: "Decision" },
                  { key: "finality", label: "Finality" },
                  { key: "dateOfFinality", label: "Date of Finality" },
                ]}
                data={courtAppealsDetails}
                onEdit={(item) => {
                  setEditData(item);
                  setCourtAppealForm(true);
                }}
                onDelete={(item) => {
                  setDeleteData(item);
                  setDeleteCourtAppealModal(true);
                }}
              />
            )}

            {activeTab === "supreme" && (
              <TableComponent
                title="Supreme Court"
                columns={[
                  { key: "date", label: "Date" },
                  { key: "decision", label: "Decision" },
                ]}
                data={supremeCourtDetails}
                onEdit={(item) => {
                  setEditData(item);
                  setSupremeCourtForm(true);
                }}
                onDelete={(item) => {
                  setDeleteData(item);
                  setdeleteSupremeCourtModal(true);
                }}
              />
            )}
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-4">
          <CaseInfoCard
            icon={<FaBook />}
            label="Book Number"
            value={caseDetails?.docketNumber}
          />
          <CaseInfoCard
            icon={<FaUserTie />}
            label="Petitioner(s)"
            value={caseDetails?.petitioner?.join(", ") || "N/A"}
          />
          <CaseInfoCard
            icon={<FaUserTie />}
            label="Respondent(s)"
            value={caseDetails?.respondents?.join(", ") || "N/A"}
          />
          <CaseInfoCard
            icon={<FaFileAlt />}
            label="Status"
            value={caseDetails?.status}
          />
          <CaseInfoCard
            icon={<FaFileAlt />}
            label="Branch"
            value={caseDetails?.branch}
          />
        </aside>
      </div>
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

      {deleteFirstLevelModal && (
        <DeleteModal
          onConfirm={() => {
            deleteDecision({
              level: "firstlevel",
              id: deleteData._id,
              refetchUrl: "civilcase/read/decision/firstlevel",
              caseId: deleteData.case_id,
              updateKey: "firstLevelDetails",
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
              updateKey: "secondLevelDetails",
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
              updateKey: "courtAppealsDetails",
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
              updateKey: "supremeCourtDetails",
            });
            setdeleteSupremeCourtModal(false);
          }}
          onCancel={() => setdeleteSupremeCourtModal(false)}
        />
      )}
    </section>
  );
};

export default CivilCaseView;
