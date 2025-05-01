import React, { useContext } from "react";
import ButtonUI from "../ButtonUI/ButtonUI";
import FormatDollar from "../../../helpers/FormatDollar.js";
import "./CarCard.css";
import { useAuth } from "../../../contexts/auth.context.js";
import CarAPI from "../../../APIs/car.api.js";
import { useNotification } from "../../../contexts/notification.context.js";

export default function CarCard(props) {
  const { user, getProfile } = useAuth();
  const { api } = useNotification();
  const { car } = props;
  const url = `/category/${car._id}`; // Đường dẫn đến trang chi tiết xe

  const likeCar = async () => {
    if (user) {
      const response = await CarAPI.likeCar({ userId: user.id, carId: car._id });
      if (response.isSuccess) {
        api.success({
          message: "Success",
          description: response.message,
        });
        getProfile();
      } else {
        api.error({
          message: "Error",
          description: response.message,
        });
      }
    }
  };

  return (
    <div className="popular-car-card">
      {/* Tên, loại xe */}
      <div className="car-name-type">
        <div>
          <p className="car-name">{car.name}</p>
          <p className="car-type">{car.type}</p>
        </div>
        {user?.likedCars.includes(car._id) ? <i class="fa-solid fa-heart" onClick={() => likeCar()} style={{ color: "#90A3BF", fontSize: "20px" }}></i> : <i className="fa-regular fa-heart" onClick={() => likeCar()} style={{ color: "#90A3BF", fontSize: "20px" }}></i>}
      </div>

      {/* Hình ảnh xe */}
      <img src={car.image[0]} alt="" className="car-image" />

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
          <span>{car.seat} People</span>
        </div>
      </div>

      {/* Giá thuê xe */}
      <div className="car-price">
        <p>
          {FormatDollar(car.price)}/ <span>day</span>{" "}
        </p>
        <ButtonUI content="Rent Now" navigate={url} />
      </div>
    </div>
  );
}
