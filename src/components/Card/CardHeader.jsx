import React, { useEffect } from "react";
import { FaWallet, FaBoxOpen, FaTruck, FaTimesCircle } from "react-icons/fa";

const CardHeader = () => {
  const stats = [
    {
      title: "Total",
      value: "100",
      icon: <FaWallet className="text-blue-500 text-2xl" />,
      bg: "bg-blue-100",
    },
    {
      title: "Pending",
      value: "100",
      icon: <FaBoxOpen className="text-purple-500 text-2xl" />,
      bg: "bg-purple-100",
    },
    {
      title: "On Going",
      value: "100",
      icon: <FaTruck className="text-green-500 text-2xl" />,
      bg: "bg-green-100",
    },
    {
      title: "Resolved",
      value: "100",
      icon: <FaTimesCircle className="text-red-500 text-2xl" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-4 rounded-lg border border-gray-300 gap-4"
        >
          <section
            className={`${stat.bg} flex items-center justify-center rounded-full w-12 h-12 sm:w-14 sm:h-14`}
          >
            {stat.icon}
          </section>

          <section>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              {stat.value}
            </h3>
            <p className="text-sm sm:text-base text-gray-500">{stat.title}</p>
          </section>
        </div>
      ))}
    </section>
  );
};

export default CardHeader;
