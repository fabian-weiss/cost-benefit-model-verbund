"use client";

import InputGrid from "@/components/InputGrid";
import ModelHeader from "@/components/ModelHeader";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { SocietalInputEnum } from "@/enums/SocietalInputEnum";
import { impactEntries } from "@/lib/impact-categories";
import { societalModel } from "@/models/societal-model/societal-model";
import { useComment } from "@/providers/comment-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import { InputGroupType } from "@/types/input-group-type";
import { SocietalResults } from "@/types/societal/societal-results";
import { impactToNumber } from "@/utils/impact-to-number";
import { numberToImpact } from "@/utils/number-to-impact";

function SocietalSection() {
  const societalModelContext = useSocietalModel();
  const resultsDialogContext = useResultDialog();
  const commentDialogContext = useComment();

  const inputGroups: InputGroupType[] = [
    {
      id: "customerSatisfaction",
      inputHeader: {
        label: SocietalInputEnum.CUSTOMER_SATISFACTION,
        description:
          "Impact on customer satisfaction (e.g. ease of use, essentiality).",
      },
      detailedDescription: {
        header:
          "Measures how the initiative affects customer experiences and their overall satisfaction. Examples include ease of use (e.g., intuitive apps, user-friendly portals), accessibility (e.g., services available for remote or underserved areas), speed of customer support (e.g., faster resolution of inquiries or complaints), and reliability (e.g., fewer outages, accurate billing).",
        descriptionRows: [
          "Very Negative: Frequent outages, long wait times for support, or widespread billing errors causing high customer dissatisfaction.",
          "Negative: Noticeable increase in complaints or delays in resolving issues.",
          "Neutral: No measurable change in customer experience or satisfaction.",
          "Positive: Improved support times, clearer billing processes, or enhanced customer tools.",
          "Very Positive: Significant improvements, such as innovative tools for energy management or a drastic reduction in complaints.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.customerSatisfaction.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CUSTOMER_SATISFACTION,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "customerSatisfaction",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CUSTOMER_SATISFACTION,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.customerSatisfaction.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "customerAffordability",
      inputHeader: {
        label: SocietalInputEnum.CUSTOMER_AFFORDABILITY,
        description: "Impact on customer affordability.",
      },
      detailedDescription: {
        header:
          "Evaluates how the initiative influences the affordability of services for customers. Examples include pricing structure (e.g., introducing lower-cost tariffs or dynamic pricing), payment flexibility (e.g., installment plans for bills), cost savings (e.g., energy-efficient solutions), and accessibility (e.g., subsidies for low-income households).",
        descriptionRows: [
          "Very Negative: Significant price increases making services unaffordable for 20%+ of customers.",
          "Negative: Noticeable affordability issues affecting 10-20% of customers.",
          "Neutral: No changes to pricing or customer affordability.",
          "Positive: Improved affordability through cost reductions or flexible payment plans benefiting 10-20% of customers.",
          "Very Positive: Dramatic affordability improvements or better access for underserved groups.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.customerAffordability.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CUSTOMER_AFFORDABILITY,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "customerAffordability",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.CUSTOMER_AFFORDABILITY,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.customerAffordability.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "companyCulture",
      inputHeader: {
        label: SocietalInputEnum.COMPANY_CULTURE,
        description: "Impact on company culture (e.g. team spirit).",
      },
      detailedDescription: {
        header:
          "Reflects how the initiative impacts employee established working practices, employee engagement and retention, sense of the community within organization, attitude to work. Examples include team spirit (e.g., better collaboration like virtual teams, stronger sense of purpose), work-life balance (e.g., flexible scheduling, 24/7 work approach), improved working processes (increased productivity and adaptability).",
        descriptionRows: [
          "Very Negative significant disruptions in workplace culture and employee engagement, causing confusion and resistance among employees.",
          "Negative: minor team dissatisfaction, increased stress or a sense of being overwhelmed.",
          "Neutral: No noticeable changes in culture or engagement.",
          "Positive: improved team dynamics,  and a more engaged workforce.",
          "Very Positive: Significant improvements in fostering flexibility, enhanced productivity, reduced turnover.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.companyCulture.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.COMPANY_CULTURE,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "companyCulture",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.COMPANY_CULTURE,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.companyCulture.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "shareholderValue",
      inputHeader: {
        label: "Shareholder Value",
        description: "Possible impact on  employees’ work practices",
      },
      detailedDescription: {
        header:
          "Examines how the initiative affects shareholder confidence and the company's market value. Examples include financial performance (e.g., increased revenue, reduced costs), strategic alignment (e.g., alignment with growth objectives), market perception (e.g., stronger brand equity), and risk management (e.g., reducing regulatory or operational risks).",
        descriptionRows: [
          "Very Negative: Substantial financial losses, loss of shareholder trust, or decline in market share.",
          "Negative: Minor financial setbacks or erosion of confidence.",
          "Neutral: No measurable impact on shareholder value or market perception.",
          "Positive: Improved financial metrics, better market standing, or reduced risks.",
          "Very Positive: Significant financial gains, strong shareholder confidence, or enhanced market leadership.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.shareholderValue.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.SHAREHOLDER_VALUE,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "shareholderValue",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.SHAREHOLDER_VALUE,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.shareholderValue.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "publicPerception",
      inputHeader: {
        label: "Public Perception",
        description:
          "Will the company’s reputation at a given point of time be protected from the negative public perception if the product/service underperforms.",
      },
      detailedDescription: {
        header:
          "Evaluates how the initiative affects the company's reputation and its image in the public eye. Examples include environmental stewardship (e.g., visible efforts toward renewable energy), social responsibility (e.g., supporting local causes, ethical operations), transparency (e.g., clear communication on pricing and initiatives), and media coverage (e.g., positive or negative press resulting from actions).",
        descriptionRows: [
          "Very Negative: Widespread criticism or negative media coverage leading to reputational damage.",
          "Negative: Noticeable public disapproval or perception of insensitivity to societal concerns.",
          "Neutral: No significant change in public opinion or visibility.",
          "Positive: Positive media coverage, improved public trust, or praise for corporate actions.",
          "Very Positive: Major boosts in reputation due to impactful actions, such as significant environmental or social contributions.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.publicPerception.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.PUBLIC_PERCEPTION,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "publicPerception",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.PUBLIC_PERCEPTION,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.publicPerception.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "knowledgeSharingAcrossTheSupplyChain",
      inputHeader: {
        label: SocietalInputEnum.KNOWLEDGE_SHARING_ACROSS_THE_SUPPLY_CHAIN,
        description:
          "To what extent will this digitalization project enhance knowledge sharing across our supply chain?",
      },
      detailedDescription: {
        header:
          "Assesses the initiative’s ability to facilitate the exchange of information, expertise, and innovation among stakeholders within the supply chain. Examples include training programs (e.g., providing skill development to suppliers), best practice dissemination (e.g., sharing sustainability practices), collaborative innovation (e.g., co-developing new technologies or methods), data transparency (e.g., open access to key operational metrics), and technical support (e.g., helping partners implement new systems or processes).",
        descriptionRows: [
          "Very Negative: Hinders knowledge sharing, creates information silos, or leads to a lack of trust and collaboration within the supply chain.",
          "Negative: Limited knowledge-sharing efforts, resulting in inefficiencies or missed opportunities for collaboration.",
          "Neutral: No significant impact on knowledge sharing, maintaining the status quo.",
          "Positive: Encourages effective knowledge exchange, improves transparency, and fosters collaborative growth among supply chain stakeholders.",
          "Very Positive: Sets new standards for supply chain collaboration, actively promotes innovation, and enhances knowledge sharing at all levels of the supply chain.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs
            .knowledgeSharingAcrossTheSupplyChain.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.KNOWLEDGE_SHARING_ACROSS_THE_SUPPLY_CHAIN,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "knowledgeSharingAcrossTheSupplyChain",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.KNOWLEDGE_SHARING_ACROSS_THE_SUPPLY_CHAIN,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs
                .knowledgeSharingAcrossTheSupplyChain.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "communityImplications",
      inputHeader: {
        label: SocietalInputEnum.COMMUNITY_IMPLICATIONS,
        description: "Negative externalities of production.",
      },
      detailedDescription: {
        header:
          "Assesses the initiative’s influence on the local and broader communities affected by the company’s operations. Examples include job creation (e.g., hiring in underserved regions), local investments (e.g., supporting infrastructure or education), environmental impact (e.g., reducing pollution in local areas), and engagement programs (e.g., partnerships with community organizations).",
        descriptionRows: [
          "Very Negative: Significant harm to communities, such as displacement, pollution, or loss of local jobs.",
          "Negative: Noticeable community concerns, such as minor environmental or economic disruptions.",
          "Neutral: No significant changes in community outcomes.",
          "Positive: Initiatives creating local benefits, such as new jobs, cleaner energy solutions, or educational partnerships.",
          "Very Positive: Strong contributions to community development, such as large-scale infrastructure improvements or highly impactful social programs.",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.communityImplications.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.COMMUNITY_IMPLICATIONS,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "communityImplications",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.COMMUNITY_IMPLICATIONS,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.communityImplications.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },

    {
      id: "guidingPrinciplesAlignment",
      inputHeader: {
        label: SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT,
        description:
          "Alignment of the product/service with mission, vision and values of Verbund.",
      },
      detailedDescription: {
        header:
          "Examines how the initiative aligns with the company’s mission, vision, and long-term goals. Examples include strategic fit (e.g., advancing renewable energy objectives), brand consistency (e.g., reflecting the company's core values), innovation alignment (e.g., promoting a forward-thinking approach), and employee and stakeholder alignment (e.g., fostering shared understanding of goals).",
        descriptionRows: [
          "Very Negative: Direct conflict with the company’s mission, causing confusion or reputational harm.",
          "Negative: Misalignment with key aspects of the vision or long-term goals.",
          "Neutral: No significant impact on the alignment with the company’s vision.",
          "Positive: Reinforces strategic goals, enhances brand identity, or advances the mission.",
          "Very Positive: Strong alignment, establishing the company as a leader in its vision (e.g., spearheading renewable energy adoption or groundbreaking innovation).",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.guidingPrinciplesAlignment
            .comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "guidingPrinciplesAlignment",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.guidingPrinciplesAlignment
                .value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
    {
      id: "healthAndSafety",
      inputHeader: {
        label: SocietalInputEnum.HEALTH_AND_SAFETY,
        description: "Impact on health and safety of stakeholders.",
      },
      detailedDescription: {
        header:
          "Focuses on identifying, mitigating and managing risks to occupational health and safety in both traditional and digital work environments. The cluster also considers the project’s alignment with existing VERBUND’s occupational Health & Safety Policy and regulations. Examples include equipment accidents and pollution-related health damages,  ergonomic and psychosocial challenges posed by digital work.",
        descriptionRows: [
          "Very negative: Significant harm to health and safety (frequent injuries, high stress levels); project does not align with VERBUND’s occupational Health & Safety Policy and regulations",
          "Negative: Noticeable but manageable risks",
          "Neutral: Project does not affect health & safety",
          "Positive: Clear positive effects on health and safety (improve workplace ergonomics or reduce stress)",
          "Very positive: Significant reduction in injuries, time in hazardous environment; significant improvement in well-being",
        ],
      },
      handleShowComments: () => {
        commentDialogContext.handleShowDialog(
          true,
          societalModelContext.societalInputs.healthAndSafety.comment,
          (comment) => {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.HEALTH_AND_SAFETY,
              undefined,
              undefined,
              comment
            );
          }
        );
      },
      dropdownFields: [
        {
          id: "healthAndSafety",
          onSelect(entry: DropdownEntryType) {
            societalModelContext.setSocietalInput(
              SocietalInputEnum.HEALTH_AND_SAFETY,
              impactToNumber(entry.impact),
              entry.impact
            );
          },
          selectedEntry: {
            impact: numberToImpact(
              societalModelContext.societalInputs.healthAndSafety.value
            ),
          },
          entries: impactEntries,
        },
      ],
    },
  ];

  const handleModelResult = () => {
    const result: SocietalResults = societalModel(
      societalModelContext.societalInputs
    );
    // const r = financialResults(financialModelContext.financialInputRanges);
    //   financialModelContext.setModelResults(r);
    //   resultsDialogContext.handleShowDialog(true, DialogType.FINANCIAL_MODEL);
    societalModelContext.setModelResults(result);
    resultsDialogContext.handleShowDialog(true, DialogType.SOCIETAL_MODEL);
    console.log("Societal model results: ", result);
    //return result;
  };
  return (
    <SectionContainer contentClasses="fw-model-container">
      <ModelHeader
        title="Societal"
        buttonLabel="Run Submodel"
        buttonCallback={() => handleModelResult()}
      />
      <InputGrid inputGroups={inputGroups} id={"societal-model"} />
      {/* {societalModelContext.modelResults && (
        <p>{JSON.stringify(societalModelContext.modelResults)}</p>
      )} */}
    </SectionContainer>
  );
}

export default SocietalSection;
