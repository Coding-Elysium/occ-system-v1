import React, { useState } from "react";
import SearchField from "../Input/SearchField";
import IconButton from "../Button/IconButton";
import Button from "../Button/Button"; // You can replace this with your actual Button component
import { useMediaQuery } from "react-responsive";
import CivilCaseContent from "../Content/CivilCaseContent";
import AddCivilCase from "../Form/AddCivilCase";

const CivilCaseMain = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [addCase, setAddCase] = useState(false);

  return (
    <>
      {!isMobile && (
        <div className="h-full w-full border border-gray-300 rounded-x flex flex-col">
          <section className="p-4 flex flex-col gap-4 ">
            <div className="flex justify-between items-center gap-2 ">
              <section className="flex gap-2 w-md">
                <SearchField />
              </section>
              <section className="flex gap-2">
                <Button
                  onClick={() => setAddCase(true)}
                  buttonText="Add Civil Case"
                />
              </section>
            </div>
          </section>

          <section className="overflow-y-auto overflow-x-auto px-4 mb-4 h-full">
            <div className="max-h-52">
              <CivilCaseContent />
            </div>
          </section>

          {addCase && (
            <>
              <AddCivilCase
                onClose={() => setAddCase(false)}
                onAddCase={() => setAddCase(false)}
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
            {/* <CivilCaseContent /> */}
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
