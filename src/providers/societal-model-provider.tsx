// "use client";
// import { Impact } from "@/enums/Impact";
// import { SocietalInputEnum } from "@/enums/SocietalInputEnum";
// import { InputNumber } from "@/types/InputNumber";

// import { SocietalInputs } from "@/types/societal/societal-inputs";
// import { SocietalResults } from "@/types/societal/societal-results";
// import { createContext, useContext, useMemo, useState } from "react";

// interface SocietalModelProviderContextType {
//   societalInputs: SocietalInputs;
//   setDefaultValues: (inputs: SocietalInputs) => void;
//   setSocietalInput: (
//     inputType: SocietalInputEnum,
//     input?: InputNumber,
//     impact?: Impact,
//     comment?: string
//   ) => void;
//   modelResults?: SocietalResults;
//   setModelResults: (results?: SocietalResults) => void;
// }

// const SocietalModelProviderContext = createContext<
//   SocietalModelProviderContextType | undefined
// >(undefined);

// function SocietalModelProvider({ children }: { children: React.ReactNode }) {
//   const [modelResults, setModelResults] = useState<
//     SocietalResults | undefined
//   >();
//   const [societalInputs, setSocietalInputs] = useState<SocietalInputs>({
//     customerSatisfaction: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     customerAffordability: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     companyCulture: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     communityImplications: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     knowledgeSharingAcrossTheSupplyChain: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     shareholderValue: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     guidingPrinciplesAlignment: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     publicPerception: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     workplaceCreation: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//     healthAndSafety: {
//       value: 0,
//       impact: Impact.NEUTRAL,
//       comment: undefined,
//     },
//   });

//   const setSocietalInput = (
//     inputType: SocietalInputEnum,
//     input?: InputNumber,
//     impact?: Impact,
//     comment?: string
//   ) => {
//     // console.log("Setting input", inputType, input, impact, comment);
//     switch (inputType) {
//       case SocietalInputEnum.CUSTOMER_SATISFACTION:
//         console.log("Setting input", inputType, input, impact, comment);
//         setSocietalInputs((prev) => ({
//           ...prev,
//           customerSatisfaction: {
//             value: input != undefined ? input : prev.customerSatisfaction.value,
//             comment:
//               comment != undefined
//                 ? comment
//                 : prev.customerSatisfaction?.comment,
//             impact: impact ? impact : prev.customerSatisfaction.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.CUSTOMER_AFFORDABILITY:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           customerAffordability: {
//             value:
//               input != undefined ? input : prev.customerAffordability.value,
//             comment:
//               comment != undefined
//                 ? comment
//                 : prev.customerAffordability?.comment,
//             impact: impact ? impact : prev.customerAffordability.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.COMPANY_CULTURE:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           companyCulture: {
//             value: input != undefined ? input : prev.companyCulture.value,
//             comment:
//               comment != undefined ? comment : prev.companyCulture?.comment,
//             impact: impact ? impact : prev.companyCulture.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.COMMUNITY_IMPLICATIONS:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           communityImplications: {
//             value:
//               input != undefined ? input : prev.communityImplications.value,
//             comment:
//               comment != undefined
//                 ? comment
//                 : prev.communityImplications?.comment,
//             impact: impact ? impact : prev.communityImplications.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.KNOWLEDGE_SHARING_ACROSS_THE_SUPPLY_CHAIN:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           knowledgeSharingAcrossTheSupplyChain: {
//             value:
//               input != undefined
//                 ? input
//                 : prev.knowledgeSharingAcrossTheSupplyChain.value,
//             comment:
//               comment != undefined
//                 ? comment
//                 : prev.knowledgeSharingAcrossTheSupplyChain?.comment,
//             impact: impact
//               ? impact
//               : prev.knowledgeSharingAcrossTheSupplyChain.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.SHAREHOLDER_VALUE:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           shareholderValue: {
//             value: input != undefined ? input : prev.shareholderValue.value,
//             comment:
//               comment != undefined ? comment : prev.shareholderValue?.comment,
//             impact: impact ? impact : prev.shareholderValue.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.GUIDING_PRINCIPLES_ALIGNMENT:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           guidingPrinciplesAlignment: {
//             value:
//               input != undefined
//                 ? input
//                 : prev.guidingPrinciplesAlignment.value,
//             comment:
//               comment != undefined
//                 ? comment
//                 : prev.guidingPrinciplesAlignment?.comment,
//             impact: impact ? impact : prev.guidingPrinciplesAlignment.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.PUBLIC_PERCEPTION:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           publicPerception: {
//             value: input != undefined ? input : prev.publicPerception.value,
//             comment:
//               comment != undefined ? comment : prev.publicPerception?.comment,
//             impact: impact ? impact : prev.publicPerception.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.WORKPLACE_CREATION:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           workplaceCreation: {
//             value: input != undefined ? input : prev.workplaceCreation.value,
//             comment:
//               comment != undefined ? comment : prev.workplaceCreation?.comment,
//             impact: impact ? impact : prev.workplaceCreation.impact,
//           },
//         }));
//         break;
//       case SocietalInputEnum.HEALTH_AND_SAFETY:
//         setSocietalInputs((prev) => ({
//           ...prev,
//           healthAndSafety: {
//             value: input != undefined ? input : prev.healthAndSafety.value,
//             comment:
//               comment != undefined ? comment : prev.healthAndSafety?.comment,
//             impact: impact ? impact : prev.healthAndSafety.impact,
//           },
//         }));
//         break;
//     }
//   };

//   const setDefaultValues = (inputs: SocietalInputs) => {
//     setSocietalInputs(inputs);
//   };

//   // Use useMemo to memoize the context value
//   const contextValue = useMemo(
//     () => ({
//       societalInputs,
//       setDefaultValues,
//       setSocietalInput,
//       modelResults,
//       setModelResults,
//     }),
//     [societalInputs, modelResults] // Only re-compute the memoized value when financialInputRanges changes
//   );

//   return (
//     <SocietalModelProviderContext.Provider value={contextValue}>
//       {children}
//     </SocietalModelProviderContext.Provider>
//   );
// }

// export const useSocietalModel = () => {
//   const context = useContext(SocietalModelProviderContext);
//   if (!context) {
//     throw new Error(
//       "useSocietalModel must be used within a SocietalModelProviderContext"
//     );
//   }
//   return context;
// };

// export default SocietalModelProvider;
