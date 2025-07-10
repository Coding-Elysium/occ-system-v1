import React from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import { useMediaQuery } from "react-responsive";
import TableNotarialReport from "../components/Table/TableNotarialReport";

const NotarialReport = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {
        !isMobile && (
          <section className="h-full gap-6 flex flex-col">
            <DashboardHeader />
            <TableNotarialReport />
          </section>
        )
      }
      {
        isMobile && (
          <section className="gap-6 flex flex-col">
            <DashboardHeader />
            <TableNotarialReport />
          </section>
        )
      }
    </>
  );
};

export default NotarialReport;
