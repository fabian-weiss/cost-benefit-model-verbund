import { ResultInterpretation } from "@/enums/ResultInterpretation";
import { resultToColor } from "@/utils/result-to-color";
import React from "react";

function ResultEntry(props: {
  factor: string;
  value: string;
  resultInterpretation?: ResultInterpretation;
  description?: string;
  isSmall?: boolean;
}) {
  const color: string = resultToColor(
    props.resultInterpretation ?? ResultInterpretation.NEUTRAL
  );

  return (
    <div>
      <p
        className={`${props.isSmall ? "fw-fs12" : ""}`}
        style={{ color: color }}
      >
        <span
          className={`fw-text-bold ${props.isSmall ? "fw-fs12" : ""}`}
        >{`${props.factor}:`}</span>
        {` ${props.value}`}
      </p>
      {props.description && (
        <p className="fw-fs12 fw-text-disabled">{props.description}</p>
      )}
    </div>
  );
}

export default ResultEntry;
