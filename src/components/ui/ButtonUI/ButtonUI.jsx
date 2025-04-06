import React from "react";
import "./ButtonUI.css";
import { useNavigate } from "react-router-dom";

export default function ButtonUI(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.navigate);
  };

  if (props.bgColor) {
    return (
      <button className="button-ui" style={{ backgroundColor: props.bgColor, ...props.style }} onClick={handleClick}>
        {props.content}
      </button>
    );
  } else {
    return (
      <button className="button-ui" style={props.style} onClick={handleClick}>
        {props.content}
      </button>
    );
  }
}
