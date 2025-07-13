import React, { useEffect, useState } from "react";
import SearchField from "../Input/SearchField";
import IconButton from "../Button/IconButton";
import Button from "../Button/Button"; // You can replace this with your actual Button component
import { useMediaQuery } from "react-responsive";
import CivilCaseContent from "../Content/CivilCaseContent";
import AddCivilCase from "../Form/AddCivilCase";
import ButtonCancel from "../Button/ButtonCancel";
import useCivilCaseStore from "../../store/CivilCaseStore";
import SetStatus from "../Form/SetStatus";

const CivilCaseMain = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [addCase, setAddCase] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCases, setSelectedCases] = useState([]);

  const { fetchCases, cases } = useCivilCaseStore();

  useEffect(() => {
    fetchCases();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  const filteredCases = cases.filter((item) => {
    const petitionerMatch = item.petitioner?.some((p) =>
      p.toLowerCase().includes(searchQuery)
    );

    const respondentsMatch = item.respondents?.some((r) =>
      r.toLowerCase().includes(searchQuery)
    );

    return (
      item.bookNumber?.toLowerCase().includes(searchQuery) ||
      item.docketNumber?.toString().includes(searchQuery) ||
      petitionerMatch ||
      respondentsMatch ||
      item.nature?.toLowerCase().includes(searchQuery)
    );
  });

  console.log(selectedCases);

  return (
    <>
      {!isMobile && (
        <div className="h-full w-full border border-gray-300 rounded-x flex flex-col">
          <section className="p-4 flex flex-col gap-4 ">
            <div className="flex justify-between items-center gap-2 ">
              <section className="flex gap-2 w-md">
                <SearchField onchange={(e) => handleSearch(e.target.value)} />
              </section>
              <section className="flex gap-2">
                {selectedCases.length > 0 && (
                  <ButtonCancel
                    onClick={() => setEditStatus(true)}
                    buttonText="Edit Status"
                  />
                )}
                <section className="flex gap-2">
                  <Button
                    onClick={() => setAddCase(true)}
                    buttonText="Add Civil Case"
                  />
                </section>
              </section>
            </div>
          </section>

          <section className="overflow-y-auto overflow-x-auto px-4 mb-4 h-full">
            <div className="max-h-52">
              <CivilCaseContent
                cases={filteredCases}
                selectedCases={selectedCases}
                setSelectedCases={setSelectedCases}
              />
            </div>
          </section>

          {addCase && (
            <>
              <AddCivilCase onClose={() => setAddCase(false)} />
            </>
          )}

          {editStatus && (
            <>
              <SetStatus
                onClose={() => setEditStatus(false)}
                selectedIds={selectedCases}
              />
            </>
          )}
        </div>
      )}

      {isMobile && (
        <section className="space-y-4">
          <div className="flex flex-col gap-4 justify-between items-center mb-4">
            <SearchField />
            <Button
              onClick={() => setAddCase(true)}
              buttonText="Add Case"
              className="text-sm px-3 py-1"
            />
          </div>
          {addCase && (
            <>
              <AddCivilCase
                onClose={() => setAddCase(false)}
                onAddCase={() => setAddCase(false)}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default CivilCaseMain;
