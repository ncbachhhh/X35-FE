import React from "react";
import "./ButtonUI.css";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../../APIs/user.api";

export default function ButtonUI(props) {
  const navigate = useNavigate();
  const carId = props.carId;

  const addCarRecent = async () => {
    const response = await UserAPI.addRecentCar(carId);
    if (response.isSuccess) {
      console.log("Add recent car success:", response.message);
    } else {
      console.error("Add recent car failed:", response.message);
    }
  };

  const handleClick = async () => {
    if (carId) {
      await addCarRecent();
    }
    navigate(props.navigate);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

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
