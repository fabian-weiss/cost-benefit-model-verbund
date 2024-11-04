/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect } from "react";

function OutsideClickHandler(props: {
  children: React.ReactNode[] | React.ReactNode;
  onOutsideClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (wrapperRef.current) {
  //     wrapperRef.current.scrollTop = 0;
  //   }
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        !props.disabled
      ) {
        // Click occurred outside the element
        props.onOutsideClick();
      }
    };

    // Attach the event listener on component mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.onOutsideClick]);

  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default OutsideClickHandler;
