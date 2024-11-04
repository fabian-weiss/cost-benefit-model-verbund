"use client";
import "@/styles/dialog.css";
import OutsideClickHandler from "./OutsideClickHandler";
import { useResultDialog } from "@/providers/model-result-provider";
import { PiXBold } from "react-icons/pi";
import { useEffect, useRef } from "react";

function DialogContainer(props: {
  children: React.ReactNode;
  title: string;
  body?: string;
  fullscreen?: boolean;
}) {
  const dialogContext = useResultDialog();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollBy(0, -10000);
    }
  }, []);
  return (
    <div
      ref={ref}
      className={`fw-dialog-container ${props.fullscreen ? "fullscreen" : ""}`}
    >
      <OutsideClickHandler
        disabled={props.fullscreen}
        onOutsideClick={() => dialogContext.handleShowDialog(false, undefined)}
      >
        {props.fullscreen && (
          <PiXBold
            size={28}
            className="fw-dialog-close"
            onClick={() => dialogContext.handleShowDialog(false, undefined)}
          />
        )}
        <div
          className={`fw-dialog-wrapper ${
            props.fullscreen ? "fullscreen" : ""
          }`}
        >
          <div>
            <h2>{props.title}</h2>
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
