import LoadingDots from "./LoadingDots";

function ActionButton(props: {
  label: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  fillType: "outlined" | "solid" | "none";
  fullWidth?: boolean;
  className?: string;
}) {
  const getButtonFilledClass = (): string | undefined => {
    if (props.fillType === "outlined") {
      return "fw-button__outlined";
    } else if (props.fillType === "solid") {
      return "fw-button__solid";
    } else {
      return "fw-button__ghost";
    }
  };
  return (
    <button
      disabled={props.disabled || props.loading}
      type={props.type}
      onClick={props.onClick}
      className={`fw-button fw-button__filled ${getButtonFilledClass()} ${
        props.className ? props.className : ""
      } ${props.fullWidth ? "fw-button__full-width" : ""}`}
    >
      {props.loading ? <LoadingDots /> : <>{props.label}</>}
    </button>
  );
}

export default ActionButton;
