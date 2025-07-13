import React from "react";

const CivilCaseProfile = () => {
  return (
    <main className="flex flex-col gap-4">
      <section className=" bg-white border border-gray-300 rounded-md overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-400 h-32"></div>

        <div className="py-6 text-center sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Theft
          </h2>
          <p className="text-sm sm:text-base text-gray-500">Nature</p>
        </div>
      </section>
      <section className="grid-cols-1 md:grid-cols-4 grid gap-4">
        <div className="border border-gray-300 rounded-lg px-6 py-4 bg-white">
          <p className="text-2xl font-semibold text-gray-900">BN-001</p>
          <p className="text-sm text-gray-500">Book Number</p>
        </div>
        <div className="border border-gray-300 rounded-lg px-6 py-4 bg-white">
          <p className="text-2xl font-semibold text-gray-900">1</p>
          <p className="text-sm text-gray-500">Docket Number</p>
        </div>
        <div className="border border-gray-300 rounded-lg px-6 py-4 bg-white">
          <p className="text-2xl font-semibold text-gray-900">
            John Carlo Abanes
          </p>
          <p className="text-sm text-gray-500">Petition</p>
        </div>
        <div className="border border-gray-300 rounded-lg px-6 py-4 bg-white">
          <p className="text-2xl font-semibold text-gray-900">1</p>
          <p className="text-sm text-gray-500">Number of Respondents</p>
        </div>
      </section>
    </main>
  );
};

export default CivilCaseProfile;
