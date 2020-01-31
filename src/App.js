import React, { useRef, useEffect, useState, useCallback } from "react";
import "./styles.css";

const Resizer = ({ children, width = "inherit" }) => {
  let active;
  const parent = useRef(null);
  const resizeEventStart = event => {
    active = event.target;
    debugger;
    console.log(active);
  };

  const resizeEventMove = () => {
    if (active) {
      console.log("move");
    }
  };

  const resizeEventEnd = () => {
    active = null;
    console.log("end");
  };

  const [resizeWidth, setResizeWidth] = useState(width);
  const resizeContainer = useRef(null);

  useEffect(() => {
    debugger;
    const rc = resizeContainer.current;
    parent.current = resizeContainer.current.parentNode;
    resizeContainer.current.addEventListener("mousedown", resizeEventStart);
    window.addEventListener("mousemove", resizeEventMove);
    window.addEventListener("mouseup", resizeEventEnd);
    return () => {
      rc.removeEventListener("mousedown", resizeEventStart);
      window.removeEventListener("mousemove", resizeEventMove);
      window.addEventListener("mouseup", resizeEventEnd);
    };
  });

  return (
    <React.Fragment>
      <div style={{ width: resizeWidth }}>{children}</div>
      <div className="separator" ref={resizeContainer} />
    </React.Fragment>
  );
};

export default function App() {
  const leftContainer = useRef(null);
  const rightContainer = useRef(null);

  useEffect(() => {});

  return (
    <div className="main-container">
      <Resizer width="200px">
        <div ref={leftContainer} />
      </Resizer>
      <Resizer>
        <div ref={rightContainer} />
      </Resizer>
    </div>
  );
}
