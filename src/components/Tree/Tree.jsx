import React, { useEffect, useRef, useState } from "react";
import "./Tree.sass";
import RadioButton from "../RadioButton/RadioButton";
import CheckboxButton from "../CheckboxButton/CheckboxButton";

function Tree(props) {
  const [isExpanded, setIsExpanded] = useState(!props.parentNode.isExpanded);
  const [childrenHeight, setChildrenHeight] = useState("auto");
  const [unCollapsedHeight, setUncollapsedHeight] = useState("auto");

  const childrenRef = useRef(null);

  useEffect(() => {
    setChildrenHeight(childrenRef.current.clientHeight);
    setUncollapsedHeight(childrenRef.current.clientHeight);
  }, []);

  return (
    <div
      className={`node ${props.isFirstNode ? "node-first" : ""} ${
        props.parentNode.children.length === 0 ? "childless" : ""
      }`}
    >
      <div className="linesContainer">
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (!isExpanded) {
              setChildrenHeight(unCollapsedHeight);
            } else {
              setChildrenHeight(0);
            }
          }}
          className="flex-row"
        >
          {
            {
              radioNode: <RadioButton isPlus={!isExpanded} />,
              checkboxNode: <CheckboxButton isPlus={!isExpanded} />,
              node: "",
            }[props.parentNode.type]
          }
        </div>
        <div className="align-left">
          <p>{props.parentNode.line1}</p>
          <p>{props.parentNode.line2}</p>
        </div>
      </div>

      <div
        style={{
          maxHeight: !isExpanded ? childrenHeight : unCollapsedHeight,
          transition: "all 0.5s",
          overflowY: "hidden",
        }}
        ref={childrenRef}
        className={"children"}
      >
        {props.parentNode.children.map((child, i) => (
          <Tree parentNode={child} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Tree;
