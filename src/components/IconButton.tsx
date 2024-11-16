import "@/styles/icon-button.css";
import { IconButtonType } from "@/types/icon-button-type";

function IconButton(props: IconButtonType) {
  return (
    <div
      onClick={props.disabled ? undefined : () => props.onClick()}
      className={`fw-icon-button ${props.className ? props.className : ""}`}
    >
      {props.icon}
    </div>
  );
}

export default IconButton;
