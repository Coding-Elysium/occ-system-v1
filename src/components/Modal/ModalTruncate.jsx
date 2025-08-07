const ModalTruncate = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <pre className="whitespace-pre-wrap text-gray-800 mb-4">{message}</pre>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalTruncate;
