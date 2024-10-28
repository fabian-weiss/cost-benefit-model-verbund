import React from "react";
import ActionButton from "./ActionButton";
import "@/styles/model-header.css";

function ModelHeader(props: {
  title: string;
  buttonLabel: string;
  buttonCallback: () => void;
}) {
  return (
    <div className="fw-model-header">
      <h2>{props.title}</h2>
      <ActionButton
        label={props.buttonLabel}
        fillType={"solid"}
        onClick={() => props.buttonCallback()}
      />
    </div>
  );
}

export default ModelHeader;
