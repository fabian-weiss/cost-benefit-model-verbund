"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { RioInputEnum } from "@/enums/RioInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { rioModel } from "@/models/rio-model/rio-model";
import { useComment } from "@/providers/comment-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import { useRioModel } from "@/providers/rio-model-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { InputGroupType } from "@/types/input-group-type";
import { RioResults } from "@/types/rio/rio-results";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";

function RioSection() {
  const rioModelContext = useRioModel();
  const resultsDialogContext = useResultDialog();
  const commentDialogContext = useComment();

  const inputGroups: InputGroupType[] = [
    {
      id: "privacy",
      inputHeader: {
        label: RioInputEnum.PRIVACY,
        description: "Impact on privacy (e.g. preventing data breaches).",
      },
      detailedDescription: {
        header:
          "Assesses how the initiative affects data privacy and the protection of user information. Examples include data encryption (e.g., ensuring secure storage of personal data), user consent (e.g., clear opt-in mechanisms), compliance with privacy laws (e.g., GDPR), anonymization (e.g., protecting user identities), and third-party sharing (e.g., limiting data access to external parties).",
        descriptionRows: [
          "Very Negative: Severe breaches of privacy or failure to protect user data, resulting in legal repercussions.",
          "Negative: Noticeable lapses in privacy practices or non-compliance with privacy regulations.",
          "Neutral: No impact on privacy or no major improvements, just standard privacy measures in place.",
          "Positive: Strong privacy practices that comply with regulations and enhance user trust.",
          "Very Positive: Leading-edge privacy standards that exceed regulatory requirements and build exceptional user trust.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.privacy.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.PRIVACY,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "privacy",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.PRIVACY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(rioModelContext.rioInputs.privacy.value),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "marketAdvantage",
      inputHeader: {
        label: "Market Advantage",
        description:
          "Impact on market advantage (e.g. new technologies, expected cost reduction).",
      },
      detailedDescription: {
        header:
          "Evaluates how the initiative impacts the company’s competitive position in the market. Examples include differentiation (e.g., unique product features), customer loyalty (e.g., strong brand following), speed to market (e.g., introducing new offerings faster than competitors), and market share growth (e.g., increasing dominance in key sectors).",
        descriptionRows: [
          "Very Negative: Major loss in market position, reduced customer base, or failure to stay competitive.",
          "Negative: Noticeable decrease in market position or a failure to capitalize on emerging trends.",
          "Neutral: No significant impact on market advantage or position.",
          "Positive: Gaining an edge over competitors, expanding market share, or creating new differentiators.",
          "Very Positive: Dominating the market, setting trends, and achieving significant competitive advantages over industry peers.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.marketAdvantage.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.MARKET_ADVANTAGE,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "marketAdvantage",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.MARKET_ADVANTAGE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              rioModelContext.rioInputs.marketAdvantage.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "longTermResilience",
      inputHeader: {
        label: "Long Term Resilience",
        description:
          "Impact on long term resilience (e.g. employee retention, data access and maintenance).",
      },
      detailedDescription: {
        header:
          "Assesses the ability of the initiative to withstand challenges over time and adapt to changing circumstances. Examples include crisis preparedness (e.g., risk mitigation strategies), resource management (e.g., flexible supply chains), technological adaptation (e.g., ability to integrate new tech), and organizational agility (e.g., quick decision-making processes).",
        descriptionRows: [
          "Very Negative: Vulnerable to long-term risks, unable to adapt to future challenges, or high likelihood of failure in a crisis.",
          "Negative: Some long-term weaknesses that could hinder growth or sustainability, or limited flexibility in adapting to change.",
          "Neutral: Neutral in terms of long-term resilience, maintaining current performance without significant risks or benefits.",
          "Positive: Demonstrates resilience through risk mitigation, adaptability, and strong forward planning.",
          "Very Positive: Highly resilient, with clear strategies for overcoming challenges and consistently adapting to future market and environmental conditions.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.longTermResilience.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.LONG_TERM_RESILIENCE,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "longTermResilience",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.LONG_TERM_RESILIENCE,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              rioModelContext.rioInputs.longTermResilience.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "longTermScalability",
      inputHeader: {
        label: "Long Term Scalability",
        description:
          "Impact on long term scalability (e.g. contribution in meeting an overall goal).",
      },
      detailedDescription: {
        header:
          "Measures the ability of the initiative to scale effectively and sustainably over time. Examples include infrastructure readiness (e.g., scalable IT systems), process optimization (e.g., automating repetitive tasks), market expansion (e.g., ability to enter new geographies or segments), and resource availability (e.g., access to talent or capital).",
        descriptionRows: [
          "Very Negative: Inability to scale due to resource constraints, outdated systems, or inefficient processes.",
          "Negative: Some scalability challenges, such as difficulty in managing growth or limited expansion opportunities.",
          "Neutral: Neutral impact, no significant hurdles to scalability but also no clear path for growth.",
          "Positive: Effective scaling mechanisms, with optimized processes and infrastructure ready to handle growth.",
          "Very Positive: Clear scalability potential with robust systems, resources, and strategies in place to support massive growth.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.longTermScalability.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.LONG_TERM_SUSTAINABILITY,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "longTermScalability",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.LONG_TERM_SUSTAINABILITY,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              rioModelContext.rioInputs.longTermScalability.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "legalRequirements",
      inputHeader: {
        label: "Legal Requirements",
        description:
          "Impact on legal requirements (e.g. workforce related, tax related).",
      },
      detailedDescription: {
        header:
          "Evaluates how well the initiative meets or exceeds legal requirements, both existing and anticipated. Examples include compliance with regulations (e.g., adhering to industry-specific laws), taxation (e.g., ensuring proper tax compliance), contractual obligations (e.g., meeting the terms of agreements), and anticipated future regulations (e.g., preparing for upcoming legal frameworks).",
        descriptionRows: [
          "Very Negative: Significant legal violations, exposure to lawsuits, or failure to comply with regulations.",
          "Negative: Non-compliance with some legal requirements or need for corrective actions.",
          "Neutral: Fully compliant but not exceeding legal requirements.",
          "Positive: Meets or exceeds legal requirements with additional proactive legal protections in place.",
          "Very Positive: Leading in legal compliance, anticipating future regulations and setting industry standards for legal practices.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.legalRequirements.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.LEGAL_REQUIREMENTS,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "legalRequirements",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.LEGAL_REQUIREMENTS,
              impactToNumber(entry.impact)
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              rioModelContext.rioInputs.legalRequirements.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
  ];

  const handleModelResult = () => {
    const result: RioResults = rioModel(rioModelContext.rioInputs);
    // const r = financialResults(financialModelContext.financialInputRanges);
    //   financialModelContext.setModelResults(r);
    //   resultsDialogContext.handleShowDialog(true, DialogType.FINANCIAL_MODEL);
    rioModelContext.setModelResults(result);
    resultsDialogContext.handleShowDialog(true, DialogType.RIO_MODEL);
    console.log("Rio model results: ", result);
    //return result;
  };
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="RIO (Risk, Innovation, Opportunity) Model"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelResult()}
      />
      <InputGrid inputGroups={inputGroups} id={"rio-model"} />
      {/* {societalModelContext.modelResults && (
        <p>{JSON.stringify(societalModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default RioSection;
