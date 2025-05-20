"use client";
import "@/styles/toggle-switch.css";

function ToggleSwitch(props: {
  onStateChanged?: (isChecked: boolean) => void;
  isChecked: boolean;
  title: string;
  description?: string;
}) {
  //const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle = () => {
    const newState = !props.isChecked;
    // setIsChecked(newState);
    if (props.onStateChanged) {
      props.onStateChanged(newState);
    }
  };

  return (
    <div className="fw-toggle-switch-container">
      <div className="fw-toggle-switch-text-wrapper">
        <p>{props.title}</p>
        <p className="fw-fs12 fw-text-disabled">{props.description}</p>
      </div>
      <label className="fw-toggle-switch">
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={handleToggle}
        />
        <span className="fw-slider"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
