import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 font-inter"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg mx-4 md:mx-0 bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
