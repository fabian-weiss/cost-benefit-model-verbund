"use client";
import CommentDialog from "@/dialogs/CommentDialog";
import { handleBodyScroll } from "@/utils/handle-body-scroll";
import React, { createContext, useContext, useState } from "react";

type CommentContextType = {
  //showDialog: boolean;
  handleShowDialog: (
    showDialog: boolean,
    prevComment?: string,
    callback?: (comment?: string) => void
  ) => void;
  submitComment: (comment?: string) => void;
};

const CommentContext = createContext<CommentContextType | null>(null);

function CommentProvider(props: { children: React.ReactNode }) {
  const [dialogState, setDialogState] = useState<{
    show: boolean;
    comment?: string;
    callback?: (comment?: string) => void;
  }>({ show: false });

  const handleShowDialog = (
    show: boolean,
    comment?: string,
    callback?: (comment?: string) => void
  ) => {
    handleBodyScroll(!show);
    setDialogState({ show, comment, callback });
  };

  const submitComment = (comment?: string) => {
    if (dialogState.callback) {
      dialogState.callback(comment);
    }
    handleShowDialog(false);
  };

  return (
    <CommentContext.Provider value={{ handleShowDialog, submitComment }}>
      {dialogState.show && (
        <CommentDialog
          closeDialog={() => handleShowDialog(false)}
          comment={dialogState.comment}
          submitComment={submitComment}
        />
      )}
      {props.children}
    </CommentContext.Provider>
  );
}

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};

export default CommentProvider;
