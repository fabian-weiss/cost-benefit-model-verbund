"use client";
import "@/styles/dialog.css";
import OutsideClickHandler from "./OutsideClickHandler";
import { PiXBold } from "react-icons/pi";
import { useEffect, useRef } from "react";

function DialogContainer(props: {
  children: React.ReactNode;
  title?: string;
  body?: string;
  fullscreen?: boolean;
  closeDialog: () => void;
}) {
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
        disabled={props.fullscreen == true}
        onOutsideClick={() => props.closeDialog()}
        // className={`fw-h100`}
        className="fw-dialog-center"
      >
        {props.fullscreen && (
          <PiXBold
            size={28}
            className="fw-dialog-close"
            onClick={() => props.closeDialog()}
          />
        )}
        <div
          className={`fw-dialog-wrapper ${
            props.fullscreen ? "fullscreen" : ""
          }`}
        >
          {!props.fullscreen && (
            <PiXBold
              size={28}
              className="fw-dialog-close"
              onClick={() => props.closeDialog()}
            />
          )}
          <div>
            {props.title && <h2 className="fw-dialog-title">{props.title}</h2>}
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
