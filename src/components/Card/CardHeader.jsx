import React, { useEffect, useState } from 'react';
import { FaWallet, FaBoxOpen, FaTruck, FaTimesCircle } from 'react-icons/fa';
import useCriminalCaseStore from '../../store/cirminalCaseStore';

const CardHeader = () => {
  const { pending, countPendings, cases, close, countClose, countAllCases, allCases, countInProgress, inProgress} = useCriminalCaseStore();

  useEffect(() => {
    countPendings();
    countClose();
    countAllCases();
    countInProgress();
  }, [cases]);

  const stats = [
    {
      title: 'Finished',
      value: allCases,
      icon: <FaWallet className="text-blue-500" />,
      bg: 'bg-blue-100',
    },
    {
      title: 'Pending',
      value: pending,
      icon: <FaBoxOpen className="text-purple-500" />,
      bg: 'bg-purple-100',
    },
    {
      title: 'Closed',
      value: close,
      icon: <FaTruck className="text-green-500" />,
      bg: 'bg-green-100',
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: <FaTimesCircle className="text-red-500" />,
      bg: 'bg-red-100',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-tr-sm border border-gray-300">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.bg} mb-4`}>
            {stat.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
          <p className="text-sm text-gray-500">{stat.title}</p>
        </div>
      ))}
    </section>
  );
};

export default CardHeader;
