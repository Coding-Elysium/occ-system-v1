import React from 'react';
import Button from '../Button/Button';
import ButtonCancel from '../Button/ButtonCancel';

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h2>
        <div className="flex justify-end gap-4">
        <section>
          <ButtonCancel onClick={onCancel} buttonText='No'/>
        </section>
        <section>
          <Button onClick={onConfirm} buttonText='Yes'/>
        </section>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
