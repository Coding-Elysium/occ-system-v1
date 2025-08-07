import React, { useState } from "react";
import ModalTruncate from "./ModalTruncate";
import InputField from "../Input/InputField";
import Button from "../Button/Button";

const MessagePreviewer = ({content, onClose}) => {
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <section className="flex flex-col gap-4">
           <InputField
              name="message"
              value={content}
              handleChange={handleChange}
              placeholder="Type your message here..."
              label="Message"
              isTextArea={true}
              rows={6}
            />
            <section>
              <Button onClick={onClose} buttonText='Cancel'/>
            </section>
        </section>
       


        {showModal && (
          <ModalTruncate
            message={content}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MessagePreviewer;
