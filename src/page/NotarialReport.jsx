import React from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import { useMediaQuery } from "react-responsive";
import NotarialReportMain from "../components/MainComponents/NotarialReportMain";

const NotarialReport = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {!isMobile && (
        <section className="h-full gap-6 flex flex-col">
          <DashboardHeader />
          <NotarialReportMain />
        </section>
      )}
      {isMobile && (
        <section className="gap-6 flex flex-col">
          <DashboardHeader />
          <NotarialReportMain />
        </section>
      )}
    </>
  );
};

export default NotarialReport;
