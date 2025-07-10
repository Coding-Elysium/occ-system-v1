import React, { useState } from 'react';
import SearchField from '../Input/SearchField';
import IconButton from "../Button/IconButton";
import { BsFilterLeft } from 'react-icons/bs';
import Button  from '../Button/Button'; // You can replace this with your actual Button component
import AddCriminalCase from '../Form/AddCriminalCase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import CriminalCaseCardMobile from '../Card/CriminalCaseCardMobile';
import NewFolder from '../Card/NewFolder';

const TableNotarialReport = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      {
        !isMobile && (
          <div className="h-full w-full border border-gray-300 rounded-x flex flex-col">
            <section className='p-4 flex flex-col gap-4 '>
              <div className="flex justify-between items-center gap-2 ">
                <section className='flex gap-2 w-md'>
                  <SearchField />
                </section>
                <section className='flex gap-2'>
                  <Button 
                    onClick={() => setAddCase(true)}
                    buttonText="Add New Folder" 
                  />
                </section>
              </div>
            </section>
            
           <section className="flex-grow overflow-y-auto px-4 mb-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-h-52">
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                    <NewFolder />
                </div>
            </section>
          </div>
        )
      }

      {
        isMobile && (
          <section className="space-y-4">
            <div className="flex flex-col gap-4 justify-between items-center mb-4">
              <SearchField />
              <Button 
                onClick={() => setAddCase(true)} 
                buttonText="Add New Folder" 
                className="text-sm px-3 py-1"
              />
            </div>
          </section>
        )
      }
    </>
  );
};

export default TableNotarialReport;
