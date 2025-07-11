import React, { useEffect, useState } from 'react';
import SearchField from '../Input/SearchField';
import Button  from '../Button/Button'; 
import AddCriminalCase from '../Form/AddCriminalCase';
import { useMediaQuery } from 'react-responsive';
import CriminalCaseCardMobile from '../Card/CriminalCaseCardMobile';
import DeleteModal from '../Modal/DeleteModal';
import useCriminalCaseStore from '../../store/CriminalCaseStore';
import CriminalCaseTable from '../Content/CriminalCaseTable';

const CriminalCaseMain = () => {
  const [ addCase, setAddCase ] = useState(false);
  const [ deleteModal, setDeleteModal ] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { cases, initializeCases } = useCriminalCaseStore();

  useEffect(() => {
    initializeCases();
  }, [])

  return (
    <>
      {
        !isMobile && (
          <div className="h-full border border-gray-300 rounded-x flex flex-col">
            <section className='p-4 flex flex-col gap-4 '>
              <div className="flex justify-between items-center gap-2 ">
                <section className='flex gap-2 w-md'>
                  <SearchField />
                </section>
                <section className='flex gap-2'>
                  <Button 
                    onClick={() => setAddCase(true)}
                    buttonText="Add Case" 
                  />
                </section>
              </div>
            </section>

            <section className='overflow-y-auto overflow-x-auto px-4 mb-4 h-full'>
              <div className='max-h-52'>
                <CriminalCaseTable cases={cases}/>
              </div>
            </section>
            { 
              addCase && (
                <AddCriminalCase onClose={() => setAddCase(false)}/>
              )
            }
            {
              deleteModal && (
                <DeleteModal onCancel={() => setDeleteModal(false)} onConfirm={() => setDeleteModal(false)}/>
              )
            }
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
                buttonText="Add" 
                className="text-sm px-3 py-1"
              />
            </div>

            {cases.map((row, index) => (
              <CriminalCaseCardMobile
                key={index}
                data={row}
                onEdit={() => console.log('Edit', row.caseNumber)}
                onDelete={() => console.log('Delete', row.caseNumber)}
              />
            ))}

            {addCase && <AddCriminalCase onClose={() => setAddCase(false)} />}
          </section>
        )
      }
    </>
  );
};

export default CriminalCaseMain;
