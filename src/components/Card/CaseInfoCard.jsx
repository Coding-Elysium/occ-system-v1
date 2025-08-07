import React from 'react'

const CaseInfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full p-6 flex flex-col justify-center items-center text-center transition-transform transform hover:scale-105">
        <div className="flex items-center justify-center gap-4 mb-4">
            {icon && <div className="text-blue-500 text-2xl">{icon}</div>}  
            <span className="text-xl font-bold text-gray-800">{value || "N/A"}</span>
        </div>
        <p className="text-lg text-gray-600 font-semibold">{label}</p>
    </div>
  )
}

export default CaseInfoCard
