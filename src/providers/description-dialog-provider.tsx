"use client";
import DescriptionDialog from "@/dialogs/DescriptionDialog";
import { DescriptionDialogType } from "@/types/description-dialog-type";
import { handleBodyScroll } from "@/utils/handle-body-scroll";
import React, { createContext, useContext, useState } from "react";

type DescriptionDialogContextType = {
  //showDialog: boolean;
  handleShowDialog: (
    showDialog: boolean,
    description: DescriptionDialogType
  ) => void;
};

const DescriptionDialogContext =
  createContext<DescriptionDialogContextType | null>(null);

function DescriptionDialogProvider(props: { children: React.ReactNode }) {
  const [dialogState, setDialogState] = useState<{
    show: boolean;
    description: DescriptionDialogType;
  }>({
    show: false,
    description: {
      header: "",
      descriptionRows: [],
    },
  });

  const handleShowDialog = (
    show: boolean,
    description: DescriptionDialogType
  ) => {
    handleBodyScroll(!show);
    setDialogState({ show, description });
  };

  return (
    <DescriptionDialogContext.Provider value={{ handleShowDialog }}>
      {dialogState.show && (
        <DescriptionDialog
          closeDialog={() =>
            handleShowDialog(false, {
              header: "",
              descriptionRows: [],
            })
          }
          description={dialogState.description}
        />
      )}
      {props.children}
    </DescriptionDialogContext.Provider>
  );
}

export const useDescriptionDialog = () => {
  const context = useContext(DescriptionDialogContext);
  if (!context) {
    throw new Error(
      "useDescriptionDialog must be used within a DescriptionDialogProvider"
    );
  }
  return context;
};

export default DescriptionDialogProvider;
