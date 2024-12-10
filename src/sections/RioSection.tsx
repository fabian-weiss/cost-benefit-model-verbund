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
          "Assesses how well the initiative addresses data privacy and protects sensitive information. Factors include safeguarding against internal security threats such as data breaches and cyberattacks. Relevant measures involve ensuring compliance with privacy laws (e.g., GDPR), encrypting sensitive data, implementing secure access controls, and maintaining robust incident response mechanisms.",
        descriptionRows: [
          "Very Negative: Severe security breaches or failure to protect sensitive data, leading to legal repercussions or loss of user trust.",
          "Negative: Inconsistent security practices or partial non-compliance with privacy laws.",
          "Neutral: Basic privacy measures in place, with no major improvements or issues identified.",
          "Positive: Strong and reliable data protection practices that comply with legal requirements and foster trust.",
          "Very Positive: Cutting-edge privacy safeguards that exceed regulatory standards, demonstrating leadership in privacy protection.",
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
              impactToNumber(entry.impact),
              entry.impact
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
          "Ability to gain or sustain a competitive edge in the market through technological adoption, cost savings, and data value.",
      },
      detailedDescription: {
        header:
          "Assesses the project’s ability to create a competitive edge in the market. Factors include adoption potential for future technologies, expected cost reductions/increased efficiency, and the contribution to data as an asset. The evaluation considers whether the initiative aligns with market demands and provides long-term economic benefits.",
        descriptionRows: [
          "Very Negative: The initiative undermines market positioning or increases costs without significant returns.",
          "Negative: Minimal benefits with unclear or negative competitive outcomes.",
          "Neutral: Moderate improvements but limited contribution to market positioning.",
          "Positive: Clear economic benefits and competitive positioning with proactive technology adoption.",
          "Very Positive: Major competitive edge through significant cost savings, innovation, and contribution to strategic data assets.",
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
              impactToNumber(entry.impact),
              entry.impact
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
          // "Impact on long term resilience (e.g. employee retention, data access and maintenance).",
          "Ability to maintain stability and adapt to evolving technologies and market demands, supported by mature adoption levels and reliable resources.",
      },
      detailedDescription: {
        header:
          "Evaluates the project’s resilience by assessing technology adoption maturity, resource readiness, and vendor reliability. It reflects the initiative's ability to adapt to technological changes and maintain operational stability.",
        descriptionRows: [
          "Very Negative: High risks due to immature technologies, unprepared resources, or unreliable vendors.",
          "Negative: Limited resilience with insufficient preparation or dependencies on weak vendors.",
          "Neutral: Basic resilience measures with no major issues or improvements.",
          "Positive: Good resilience with stable vendor relationships and readiness for implementation.",
          "Very Positive: Exceptional readiness, mature technologies, and strong vendor support, ensuring long-term stability.",
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
              impactToNumber(entry.impact),
              entry.impact
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
          "Capacity to expand in size and functionality over time, supported by data infrastructure and skilled workforce.",
      },
      detailedDescription: {
        header:
          "Assesses the project’s scalability, focusing on its ability to expand in size and functionality over time. Key factors include the quality of data infrastructure, cloud adoption, and workforce skills.",
        descriptionRows: [
          "Very negative: Not Scalable, Unable to adapt to larger-scale operations or additional functionalities.",
          "Negative: Short-term Scalability, Limited capacity for expansion, suitable only for initial stages.",
          "Neutral: Some Long-term Scalability Potential, Scalable in specific areas but limited in scope.",
          "Positive: Scalable, Demonstrates clear potential for expansion and functional growth.",
          "Very positive: Very Scalable, Fully adaptable, supporting broad expansion in size and scope over time.",
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
              impactToNumber(entry.impact),
              entry.impact
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
          "Compliance with current and future legal regulations, including contractual and tax obligations.",
      },
      detailedDescription: {
        header:
          "Evaluates the project’s compliance with legal standards, including existing regulations, taxation, and contractual obligations. It also considers preparedness for future regulatory changes and how these factors impact the initiative.",
        descriptionRows: [
          "Very Negative: Significant non-compliance, legal violations, or risk of lawsuits.",
          "Negative: Partial compliance requiring corrective actions or posing moderate legal risks",
          "Neutral: Fully compliant but with no proactive measures for future regulations.",
          "Positive: Exceeds current legal requirements, incorporating proactive legal safeguards.",
          "Very Positive: Industry leader in legal compliance, anticipating future regulatory needs and setting benchmarks.",
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
              impactToNumber(entry.impact),
              entry.impact
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
    {
      id: "innovation",
      inputHeader: {
        label: "Innovation",
        description:
          "Degree of novelty in the project’s technology, processes, or business model.",
      },
      detailedDescription: {
        header:
          "Assesses the project’s degree of innovation, focusing on whether it drives meaningful changes to products, processes, or business models. Examples include groundbreaking features, real-time condition monitoring, and integration with cutting-edge technologies.",
        descriptionRows: [
          "Very Negative: No innovation; fully relies on outdated methods with no added value.",
          "Negative: Minor updates with minimal impact on products, processes, or business models.",
          "Neutral: Incremental changes that improve efficiency but lack transformative potential.",
          "Positive: Introduces noticeable innovations that enhance value and operations.",
          "Very Positive: Groundbreaking features that redefine products, processes, or business models.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.innovation.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.INNOVATION,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "innovation",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.INNOVATION,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(rioModelContext.rioInputs.innovation.value),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "otherRisks",
      inputHeader: {
        label: "Other Risks",
        description:
          "Mitigation of external risks, including reputational damage and environmental impacts.",
      },
      detailedDescription: {
        header:
          "Addresses risks beyond privacy and legal compliance, such as reputational damage and environmental risk reduction. These factors evaluate how well the project mitigates external risks.",
        descriptionRows: [
          "Very Negative: High reputational or environmental risks with insufficient mitigation.",
          "Negative: Moderate risks with limited controls in place.",
          "Neutral: Adequate controls that meet but do not exceed risk mitigation expectations.",
          "Positive: Effective measures to minimize risks and enhance sustainability.",
          "Very Positive: Demonstrates leadership in reducing environmental impact and safeguarding reputation.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          rioModelContext.rioInputs.otherRisks.comment,
          (comment) => {
            rioModelContext.setRioInput(
              RioInputEnum.OTHER_RISKS,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "otherRisks",
          onSelect(entry: DropdownEntryType) {
            rioModelContext.setRioInput(
              RioInputEnum.OTHER_RISKS,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(rioModelContext.rioInputs.otherRisks.value),
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
