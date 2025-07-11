import React from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import CriminalCaseMain from "../components/MainComponents/CriminalCaseMain";
import { useMediaQuery } from "react-responsive";

const CriminalCase = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {!isMobile && (
        <section className="h-full gap-6 flex flex-col">
          <DashboardHeader />
          <CriminalCaseMain />
        </section>
      )}
      {isMobile && (
        <section className="gap-6 flex flex-col">
          <DashboardHeader />
          <CriminalCaseMain />
        </section>
      )}
    </>
  );
};

export default CriminalCase;
