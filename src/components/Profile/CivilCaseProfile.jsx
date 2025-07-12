import React from "react";

const CivilCaseProfile = () => {
  return (
    <section className="w-[400px] h-[500px] mx-auto border border-gray-300 rounded-md p-6 bg-white shadow-md overflow-y-auto">
      <h2 className="text-2xl font-bold border-gray-300 mb-4 border-b pb-2">
        Civil Case Profile
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-600 font-semibold">Book Number:</p>
          <p className="text-gray-900">NV-001</p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Petitioner:</p>
          <p className="text-gray-900">Petition</p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Respondents:</p>
          <ul className="list-disc list-inside ml-4 text-gray-900">
            <li>John Carlo Abanes</li>
            {/* {data.respondents.map((name, index) => (
              <li key={index}>{name}</li>
            ))} */}
          </ul>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Nature:</p>
          <p className="text-gray-900">Nature</p>
        </div>
      </div>
    </section>
  );
};

export default CivilCaseProfile;
