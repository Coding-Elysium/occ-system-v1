import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFileInvoice,
  FaLock,
  FaCubes,
  FaWpforms,
  FaBalanceScale,
  FaGavel,
  FaScroll,
  FaRegFileAlt,
  FaStamp,
} from 'react-icons/fa';

const sections = [
  {
    title: 'MENU',
    items: [
      { name: 'Dashboards', icon: FaTachometerAlt, path: '/' },
    ],
  },
  {
    title: 'CASES',
    items: [
      { name: 'Civil Cases', icon: FaBalanceScale, path: '/civilCase' },       
      { name: 'Criminal Cases', icon: FaLock, path: '/criminalCase' },    
      { name: 'Special Proceeding', icon: FaGavel, path: '/specialProceeding' },       
      { name: 'LRC', icon: FaScroll, path: '/lrc' },       
      { name: 'Extrajudicial Settlement', icon: FaRegFileAlt, path: '/extrajudicialSettlement' },       
      { name: 'Writ of Execution', icon: FaStamp, path: '/writOfExecution' },         
    ],
  },
  {
    title: 'REPORTS',
    items: [
      { name: 'Notarial Reports', icon: FaFileInvoice, path: '/notarialReports' }, 
    ],
  },
];


const LeftNavigation = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-300 px-4 py-6 overflow-y-auto">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.items.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition 
                      ${
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default LeftNavigation;
