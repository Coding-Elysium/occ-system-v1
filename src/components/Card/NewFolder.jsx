import React from 'react';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NewFolder = ({ title = "New Folder", path = "/" }) => {
  return (
    <Link to={path}>
      <section className="cursor-pointer p-4 bg-white rounded-lg transition duration-300 border border-gray-300 h-40 flex flex-col items-center justify-center">
        <FaFolder size={40} className="text-yellow-500 mb-2" />
        <h2 className="text-center font-medium text-gray-800 truncate w-full px-2">
          {title}
        </h2>
      </section>
    </Link>
  );
};

export default NewFolder;
