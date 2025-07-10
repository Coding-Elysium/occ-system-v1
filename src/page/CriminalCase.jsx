import React from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import TableCriminalCase from "../components/Table/TableCriminalCase";
import { useMediaQuery } from "react-responsive";

const CriminalCase = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {
        !isMobile && (
          <section className="h-full gap-6 flex flex-col">
            <DashboardHeader />
            <TableCriminalCase />
          </section>
        )
      }
      {
        isMobile && (
          <section className="gap-6 flex flex-col">
            <DashboardHeader />
            <TableCriminalCase />
          </section>
        )
      }
    </>
  );
};

export default CriminalCase;
