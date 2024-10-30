"use client";
import { ValueType } from "@/enums/ValueType";
import "@/styles/input-value-list.css";
import { formatToEuro } from "@/utils/format-to-euro";
import { get } from "http";
import { MdOutlineCancel } from "react-icons/md";

function InputValueList(props: {
  values: number[];
  removeCallback: (value: number) => void;
  valueType: ValueType;
  suffix?: string;
  prefix?: string;
}) {
  const sortedValues = () => {
    return props.values.sort((a, b) => a - b);
  };

  const getFormattedValue = (value: number) => {
    if (props.valueType === ValueType.CURRENCY) {
      return formatToEuro(value);
    } else if (props.valueType === ValueType.PERCENTAGE) {
      return `${(value * 100).toFixed(2)}`;
    } else {
      return value;
    }
  };
  return (
    <div className="fw-input-value-list">
      {sortedValues().map((value, index) => (
        <div
          onClick={() => props.removeCallback(value)}
          key={`input-value-entry-${index}`}
          className="fw-input-value"
        >
          <MdOutlineCancel size={12} />
          <p>
            {props.prefix ? `${props.prefix} ` : ""}
            {getFormattedValue(value)}
            {props.suffix ? ` ${props.suffix}` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InputValueList;
