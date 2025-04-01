import React from "react";
import ButtonUI from "../ButtonUI/ButtonUI";
import FormatDollar from "../../../helpers/FormatDollar.js";
import "./CarCard.css";

export default function CarCard(props) {
  const { car } = props;
  return (
    <div className="popular-car-card">
      {/* Tên, loại xe */}
      <div className="car-name-type">
        <div>
          <p className="car-name">{car.name}</p>
          <p className="car-type">{car.type}</p>
        </div>
        <i className="fa-regular fa-heart" style={{ color: "#90A3BF", fontSize: "20px" }}></i>
      </div>

      {/* Hình ảnh xe */}
      <img src={car.image} alt="" className="car-image" />

      {/* Thông tin chi tiết xe */}
      <div className="car-details">
        <div>
          <img src="/assets/gas-station.png" alt="tank" />
          <span>{car.tank} L</span>
        </div>
        <div>
          <img src="/assets/car.png" alt="gearbox" />
          <span>{car.gearbox}</span>
        </div>
        <div>
          <img src="/assets/profile-2user.png" alt="gearbox" />
          <span>{car.seats} People</span>
        </div>
      </div>

      {/* Giá thuê xe */}
      <div className="car-price">
        <p>
          {FormatDollar(car.price)}/ <span>day</span>{" "}
        </p>
        <ButtonUI content="Rent Now" />
      </div>
    </div>
  );
}
