"use client";
import { DropdownEntryType } from "@/types/dropdown-entry-type";
import React, { useEffect, useRef, useState } from "react";
import "@/styles/dropdown.css";
import { VscChevronDown } from "react-icons/vsc";
import { DropdownInputType } from "@/types/dropdown-input-type";
import { impactToColor } from "@/utils/impact-to-color";

function Dropdown(props: DropdownInputType) {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuAbove, setMenuAbove] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      setMenuAbove(
        dropdownRect.bottom + dropdownRect.height > window.innerHeight
      );
    }
  };

  const handleClickOutside = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      menuVisible
    ) {
      // Click is outside the menu, so close it
      setMenuVisible(false);
    }
  };

  const handleOnItemClicked = (entry: DropdownEntryType, index: number) => {
    setMenuVisible(false);
    props.onSelect(entry, index);
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuVisible]);

  const bgColor = impactToColor(props.selectedEntry.impact).backgroundColor;
  const textColor = impactToColor(props.selectedEntry.impact).textColor;

  return (
    <div ref={dropdownRef} className="fw-dropdown-container">
      <div
        onClick={toggleMenu}
        className="fw-flex-center-start fw-pointer fw-dropdown-selected"
        style={{ gap: "5px", backgroundColor: bgColor, color: textColor }}
      >
        {props.selectedEntry.icon && props.selectedEntry.icon}
        <p>{props.selectedEntry.label ?? props.selectedEntry.impact}</p>
        <VscChevronDown style={{ marginLeft: "2px" }} size={18} />
      </div>
      {menuVisible && (
        <div
          ref={menuRef}
          className={`fw-dropdown-entry-list ${
            menuAbove && "fw-dropwdown-entry-list-above"
          }`}
        >
          {props.entries.map((entry, index) => (
            <div
              onClick={() => handleOnItemClicked(entry, index)}
              key={`dropdown-entry-${props.id}-${index}`}
              className="fw-dropdown-entry"
            >
              {entry.icon && entry.icon}
              <p>{entry.label ?? entry.impact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
