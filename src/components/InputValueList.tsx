"use client";
import { ValueType } from "@/enums/ValueType";
import "@/styles/input-value-list.css";
import { DynamicFinancialInput } from "@/types/financials/dynamic-financial-input";
import { formatToEuro } from "@/utils/format-to-euro";
import { MdOutlineCancel } from "react-icons/md";

function InputValueList(props: {
  values: number[];
  dynamicValues?: DynamicFinancialInput[];
  removeCallback?: (value: number) => void;
  removeCallbackDynamic?: (value: DynamicFinancialInput) => void;
  valueType: ValueType;
  suffix?: string;
  prefix?: string;
}) {
  const sortedValues = () => {
    return props.values.sort((a, b) => a - b);
  };
  const sortedDynamicValues = () => {
    // console.log(`dynamicValues: ${props.dynamicValues}`);
    return props.dynamicValues?.sort((a, b) => a.year - b.year);
  };

  const handleRemove = (value: number | DynamicFinancialInput) => {
    if (props.removeCallback) {
      props.removeCallback(value as number);
    } else if (props.removeCallbackDynamic) {
      props.removeCallbackDynamic(value as DynamicFinancialInput);
    }
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
          onClick={() => handleRemove(value)}
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
      {sortedDynamicValues()?.map((value, index) => (
        <div
          onClick={() => handleRemove(value)}
          key={`input-value-entry-${index}`}
          className="fw-input-value"
        >
          <MdOutlineCancel size={12} />
          <p>
            {props.prefix ? `${props.prefix} ` : ""}
            {getFormattedValue(value.amount)}
            {props.suffix ? ` ${props.suffix} ${value.year}` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InputValueList;
