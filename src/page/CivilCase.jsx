import React from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import { useMediaQuery } from "react-responsive";
import CivilCaseMain from "../components/MainComponents/CivilCaseMain";

const CivilCase = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {
        !isMobile && (
          <section className="h-full gap-6 flex flex-col">
            <DashboardHeader />
            <CivilCaseMain />
          </section>
        )
      }
      {
        isMobile && (
          <section className="gap-6 flex flex-col">
            <DashboardHeader />
            <CivilCaseMain />
          </section>
        )
      }
    </>
  );
};

export default CivilCase;
