import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LeftNavigation from "../LeftNavigation/LeftNavigation";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setOpenNav(true)}
            className="text-gray-700 hover:text-black focus:outline-none"
            title="Open Navigation"
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-lg font-semibold">
            Office of the Clerk of Court
          </h1>
        </div>
      </header>

      {openNav && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpenNav(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-md z-50 transform transition-transform duration-300 ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpenNav(false)}
            className="text-gray-600 hover:text-black focus:outline-none"
            title="Close Navigation"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <LeftNavigation />
      </aside>
    </>
  );
};

export default Header;
