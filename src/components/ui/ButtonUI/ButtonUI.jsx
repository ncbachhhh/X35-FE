import React from "react";
import "./ButtonUI.css";

export default function ButtonUI(props) {
  if (props.bgColor) {
    return (
      <button className="button-ui" style={{ backgroundColor: props.bgColor }}>
        {props.content}
      </button>
    );
  } else {
    return <button className="button-ui">{props.content}</button>;
  }
}
