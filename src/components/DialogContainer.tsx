"use client";
import "@/styles/dialog.css";
import OutsideClickHandler from "./OutsideClickHandler";
import { useResultDialog } from "@/providers/model-result-provider";

function DialogContainer(props: {
  children: React.ReactNode;
  title: string;
  body?: string;
}) {
  const dialogContext = useResultDialog();
  return (
    <div className="fw-dialog-container">
      <OutsideClickHandler
        onOutsideClick={() => dialogContext.handleShowDialog(false, undefined)}
      >
        <div className="fw-dialog-wrapper">
          <div>
            <h3>{props.title}</h3>
            {props.body && (
              <p className="fw-text-disabled fw-fs12">{props.body}</p>
            )}
          </div>
          {props.children}
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export default DialogContainer;
