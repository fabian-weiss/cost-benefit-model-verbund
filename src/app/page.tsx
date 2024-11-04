import EnvironmentalSection from "@/sections/EnvironmentalSection";
import ExecutionSection from "@/sections/ExecutionSection";
import FinancialSection from "@/sections/FinancialSection";
import HeaderSection from "@/sections/HeaderSection";
import RioSection from "@/sections/RioSection";
import SocietalSection from "@/sections/SocietalSection";
import React from "react";

function Home() {
  return (
    <>
      <HeaderSection
        title={"Beyond Financial Specs"}
        body={
          "Cost Benefit Model for digital projects by Anya, Elina, Eni, Fabian, Kira, and Melissa. In cooperation with WU and VERBUND"
        }
      />
      <FinancialSection />
      <SocietalSection />
      <EnvironmentalSection />
      <RioSection />
      <ExecutionSection />
    </>
  );
}

export default Home;
