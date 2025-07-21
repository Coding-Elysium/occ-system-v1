import React from "react";
import bg from "../assets/lady_justice_bg.png";

const Dashboard = () => {
  return (
    <div className="pt-5 flex items-center justify-center min-h-screen">
      <img
        src={bg}
        alt="Lady Justice"
        className="opacity-30 w-auto h-[1000px] max-w-full max-h-full"
      />
    </div>
  );
};

export default Dashboard;
