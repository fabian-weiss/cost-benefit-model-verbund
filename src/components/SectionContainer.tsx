import React from "react";
interface SectionContainerProps {
  children: React.ReactNode | React.ReactNode[];
  background?: string;
  sectionClasses?: string;
  contentClasses?: string;
  id?: string;
  margin?: boolean;
}
function SectionContainer(props: SectionContainerProps) {
  return (
    <div
      id={props.id}
      className={`fw-section-container ${props.sectionClasses} ${
        props.margin ? "fw-section-margin" : ""
      }`}
    >
      <div className={`fw-content-container ${props.contentClasses}`}>
        {props.children}
      </div>
    </div>
  );
}

// Assign a display name for debugging purposes
//SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
