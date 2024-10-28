"use client";
import "@/styles/input-value-list.css";
import { formatToEuro } from "@/utils/format-to-euro";
import { MdOutlineCancel } from "react-icons/md";

function InputValueList(props: {
  values: number[];
  removeCallback: (value: number) => void;
  isCurrency?: boolean;
  suffix?: string;
}) {
  const sortedValues = () => {
    return props.values.sort((a, b) => a - b);
  };
  return (
    <div className="fw-input-value-list">
      {sortedValues().map((value, index) => (
        <div
          onClick={() => props.removeCallback(value)}
          key={`input-value-entry-${index}`}
          className="fw-input-value"
        >
          <MdOutlineCancel size={15} />
          <p>
            {props.isCurrency ? formatToEuro(value) : value}
            {props.suffix ? ` ${props.suffix}` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InputValueList;
