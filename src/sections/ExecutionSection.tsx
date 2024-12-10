"use client";
import ActionButton from "@/components/ActionButton";
import SectionContainer from "@/components/SectionContainer";
import { DialogType } from "@/enums/DialogType";
import { environmentalModel } from "@/models/environmental-model/environmental-model";
import { financialResults } from "@/models/financial-model/financial-results";
import { rioModel } from "@/models/rio-model/rio-model";
import { societalModel } from "@/models/societal-model/societal-model";
import { useEnvironmentalModel } from "@/providers/environmental-model-provider";
import { useFinancialModel } from "@/providers/financial-model-provider";
import { useResultDialog } from "@/providers/model-result-provider";
import { useRioModel } from "@/providers/rio-model-provider";
import { useSocietalModel } from "@/providers/societal-model-provider";
import { EnvironmentalResults } from "@/types/environmental/environmental-results";
import { FinancialResults } from "@/types/financials/financial-results";
import { SocietalResults } from "@/types/societal/societal-results";
import React from "react";

function ExecutionSection() {
  const rioModelContext = useRioModel();
  const environmentalModelContext = useEnvironmentalModel();
  const societalModelContext = useSocietalModel();
  const financialModelContext = useFinancialModel();
  const resultDialogContext = useResultDialog();

  const handleExecution = () => {
    // Execute the Environmental Model
    const environmentalResults: EnvironmentalResults = environmentalModel(
      environmentalModelContext.environmentalInputs
    );
    environmentalModelContext.setModelResults(environmentalResults);
    // Execute to Societal Model
    const societalResults: SocietalResults = societalModel(
      societalModelContext.societalInputs
    );
    societalModelContext.setModelResults(societalResults);
    // Execute the Financial Model
    const hasErrors: boolean = financialModelContext.validateInputs();
    if (!hasErrors) {
      const finResults: FinancialResults = financialResults(
        financialModelContext.financialInputRanges,
        financialModelContext.dynamicInputs
      );
      financialModelContext.setModelResults(finResults);
    } else {
      // If not all inputs are valid
      financialModelContext.setModelResults(undefined);
    }
    // Execute the RIO Model
    const rioResults = rioModel(rioModelContext.rioInputs);
    rioModelContext.setModelResults(rioResults);
    // Show dialog
    resultDialogContext.handleShowDialog(true, DialogType.COMPLETE_MODEL);
  };

  return (
    <SectionContainer>
      <ActionButton
        fullWidth
        label="Execute all models"
        onClick={handleExecution}
        fillType={"solid"}
      />
    </SectionContainer>
  );
}

export default ExecutionSection;
