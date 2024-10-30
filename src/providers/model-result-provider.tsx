"use client";
import EnvironmentalResultsDialog from "@/dialogs/EnvironmentalResultsDialog";
import FinancialResultsDialog from "@/dialogs/FinancialResultsDialog";
import SocietalResultsDialog from "@/dialogs/SocietalResultsDialog";
import { DialogType } from "@/enums/DialogType";
import { handleBodyScroll } from "@/utils/handle-body-scroll";
import React, { createContext, useContext, useState } from "react";

type ModelResultContextType = {
  showDialog: boolean;
  handleShowDialog: (showDialog: boolean, dialogType?: DialogType) => void;
};

const ModelResultContext = createContext<ModelResultContextType | null>(null);

function ModelResultProvider(props: { children: React.ReactNode }) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<DialogType | undefined>();

  const handleShowDialog = (showDialog: boolean, dialogType?: DialogType) => {
    handleBodyScroll(!showDialog);
    setShowDialog(showDialog);
    if (dialogType) setDialogType(dialogType);
  };

  // Get dialog content based on dialogType
  const getDialog = (): React.ReactNode => {
    switch (dialogType) {
      case DialogType.COMPLETE_MODEL:
        return <div>COMPLETE_MODEL</div>;
      case DialogType.FINANCIAL_MODEL:
        return <FinancialResultsDialog />;
      case DialogType.ENVIRONMENTAL_MODEL:
        return <EnvironmentalResultsDialog />;
      case DialogType.SOCIETAL_MODEL:
        return <SocietalResultsDialog />;
      default:
        return <p>FFAIILLLL</p>;
    }
  };

  return (
    <ModelResultContext.Provider value={{ showDialog, handleShowDialog }}>
      {showDialog && getDialog()}
      {props.children}
    </ModelResultContext.Provider>
  );
}

export const useResultDialog = () => {
  const context = useContext(ModelResultContext);
  if (!context) {
    throw new Error(
      "useResultDialog must be used within a ModelResultProvider"
    );
  }
  return context;
};

export default ModelResultProvider;
