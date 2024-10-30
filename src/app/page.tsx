import EnvironmentalSection from "@/sections/EnvironmentalSection";
import FinancialSection from "@/sections/FinancialSection";
import HeaderSection from "@/sections/HeaderSection";
import SocietalSection from "@/sections/SocietalSection";
import React from "react";

function Home() {
  return (
    <>
      <HeaderSection
        title={"Cost Benefit Model"}
        body={
          "Cost Benefit Model beyond financial specs by Anya, Elina, Eni, Fabian, Kira, and Melissa. In cooperation with WU and VERBUND"
        }
      />
      <FinancialSection />
      <SocietalSection />
      <EnvironmentalSection />
    </>
  );
}

export default Home;
