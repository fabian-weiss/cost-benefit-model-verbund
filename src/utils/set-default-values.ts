"use client";
import { Impact } from "@/enums/Impact";
import { ProjectType } from "@/enums/ProjectType";
import { v4 } from "uuid";
import { DynamicInputEnum } from "@/enums/DynamicInputEnum";
import { useSocietalStore } from "@/stores/useSocietalStore";
import { useEnvironmentalStore } from "@/stores/useEnvironmentalStore";
import { useRioStore } from "@/stores/useRioStore";
import { useFinancialStore } from "@/stores/useFinancialStore";
import { useOverviewStore } from "@/stores/useOverviewStore";

export const useSetDefaultValues = () => {
  const societalContext = useSocietalStore();
  const environmentalContext = useEnvironmentalStore();
  const rioContext = useRioStore();
  const overviewContext = useOverviewStore();
  const financialContext = useFinancialStore();

  const setDefaultValues = () => {
    societalContext.setDefaultValues({
      customerSatisfaction: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "Project is for internal use, does not affect customers",
      },
      customerAffordability: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "Project is for internal use, does not affect customers",
      },
      companyCulture: {
        value: 1,
        impact: Impact.POSITIVE,
        comment: "Employees work more efficient",
      },
      shareholderValue: {
        value: 1,
        impact: Impact.POSITIVE,
        comment: "Risk reductions",
      },
      publicPerception: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "Does not affect public",
      },
      knowledgeSharingAcrossTheSupplyChain: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "Does not affect contractors",
      },
      communityImplications: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "Does not affect community",
      },

      guidingPrinciplesAlignment: {
        value: 1,
        impact: Impact.POSITIVE,
        comment: "Improves work conditions of employees",
      },
      workplaceCreation: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "Does not affect number of positions",
      },
      healthAndSafety: {
        value: 2,
        impact: Impact.VERY_POSITIVE,
        comment: "Employees do not have to work in risky environments",
      },
    });
    environmentalContext.setDefaultValues({
      unSustainableGoals: {
        value: 2,
        impact: Impact.VERY_POSITIVE,
        comment:
          "Innovation and Infrastructure (SDG 9)  Responsible Consumption and Production (SDG 12)",
      },
      wasteProduction: {
        value: 1,
        impact: Impact.POSITIVE,
        comment:
          "Over its lifetime, there is some e-waste (batteries, electronics) to consider, but offset by reducing the frequent use of paper forms, protective gear, and possibly vehicles.",
      },
      biodiversity: {
        value: 1,
        impact: Impact.POSITIVE,
        comment:
          "Faster detection of leaks or anomalies can prevent environmental damage, which in turn helps protect local flora and fauna.",
      },
      pollution: {
        value: 1,
        impact: Impact.POSITIVE,
        comment:
          "Fewer vehicle trips means reduced air emissions (CO₂, NOₓ, particulate matter). Quick detection of gas or fluid leaks helps prevent contamination of soil or water.",
      },
      sustainableEneryIntegration: {
        value: 1,
        impact: Impact.POSITIVE,
        comment:
          "Predictive maintenance facilitated by constant monitoring may help optimize energy usage in the plant and for the charging Verbund uses renewable energy.",
      },
      energyEfficiency: {
        value: 1,
        impact: Impact.POSITIVE,
        comment:
          "Frees up human inspectors for more specialized tasks instead of repeatedly traveling physically to the same locations.",
      },
      meetingEnvironmentalRegulations: {
        value: 1,
        impact: Impact.POSITIVE,
        comment:
          "Enhanced monitoring and documentation assist in staying within permitted emission and safety thresholds.",
      },
    });
    rioContext.setDefaultValues({
      privacy: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "",
      },
      marketAdvantage: {
        value: 1,
        impact: Impact.POSITIVE,
        comment: "",
      },
      longTermResilience: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "",
      },
      longTermScalability: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "",
      },
      legalRequirements: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "",
      },
      innovation: {
        value: 2,
        impact: Impact.VERY_POSITIVE,
        comment: "",
      },
      otherRisks: {
        value: 0,
        impact: Impact.NEUTRAL,
        comment: "",
      },
    });
    overviewContext.handleOverviewInput({
      projectTitle: "Zerberus",
      projectDescription:
        "Zerberus is a project that aims to improve the safety of employees in the workplace by utilizing roboters.",
      projectOwner: "John Doe",
      budget: 2000000,
      projectType: ProjectType.DEFAULT,
    });
    financialContext.setDefaultValues({
      initialInvestment: [1000],
      annualOperatingCosts: [100000],
      annualOperatingCostsGrowthRate: [-0.05],
      firstAnnualOperatingCostsYear: [1],
      annualMaintenanceCosts: [20000],
      annualMaintenanceCostsGrowthRate: [0.02],
      firstAnnualMaintenanceCostsYear: [1],
      trainingCosts: [10000],
      annualRevenue: [150000],
      annualRevenueGrowthRate: [0.1],
      firstRevenueGeneratingYear: [1],
      annualCostSavings: [0],
      annualCostSavingsGrowthRate: [0],
      firstCostSavingYear: [1],
      projectDuration: [5],
      riskFactor: [0.02],
      discountRate: [0.0633],
    });
    financialContext.addDynamicInput({
      id: v4(),
      type: DynamicInputEnum.COSTS,
      year: 3,
      amount: 10000,
    });
    financialContext.addDynamicInput({
      id: v4(),
      type: DynamicInputEnum.COSTS,
      year: 1,
      amount: 50000,
    });
    financialContext.addDynamicInput({
      id: v4(),
      type: DynamicInputEnum.REVENUES,
      year: 3,
      amount: 30000,
    });
  };

  return { setDefaultValues };
};
