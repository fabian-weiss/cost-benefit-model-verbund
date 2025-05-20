import EnvironmentalSection from "@/sections/EnvironmentalSection";
import ExecutionSection from "@/sections/ExecutionSection";
import FinancialSection from "@/sections/FinancialSection";
import HeaderSection from "@/sections/HeaderSection";
import { HydrationGate } from "@/sections/HydrationGate";
import OverviewSection from "@/sections/OverviewSection";
import RioSection from "@/sections/RioSection";
import SocietalSection from "@/sections/SocietalSection";
import React from "react";

function Home() {
  return (
    <HydrationGate>
      <HeaderSection
        title={"Beyond Financial Specs"}
        body={
          "Cost Benefit Model for digital projects by Anya, Elina, Eni, Fabian, Kira, and Melissa. In cooperation with WU and VERBUND."
        }
      />
      <OverviewSection />
      <FinancialSection />
      <SocietalSection />
      <EnvironmentalSection />
      <RioSection />
      <ExecutionSection />
    </HydrationGate>
  );
}

export default Home;
