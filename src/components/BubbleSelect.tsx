import "@/styles/bubble-select.css";
import { BubbleType } from "@/types/bubble-type";

function BubbleSelect(props: {
  bubbles: BubbleType[];
  selectedBubble: BubbleType;
  setSelectedBubble: (bubble: BubbleType) => void;
  header?: string;
  description?: string;
}) {
  return (
    <div className="fw-bubble-select-container">
      {props.header && <p>{props.header}</p>}
      {props.description && (
        <p className="fw-fs12 fw-text-disabled">{props.description}</p>
      )}
      <div className="fw-bubble-select-wrapper">
        {props.bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`fw-bubble-select ${
              bubble.id == props.selectedBubble.id ? "selected" : ""
            }`}
            onClick={() => props.setSelectedBubble(bubble)}
          >
            <p>{bubble.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BubbleSelect;
