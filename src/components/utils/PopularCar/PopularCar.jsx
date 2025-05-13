import React, { useEffect, useState } from "react";
import "./PopularCar.css";
import CarCard from "../../ui/CarCard/CarCard.jsx";
import { useNavigate } from "react-router-dom";
import CarAPI from "../../../APIs/car.api.js";

export default function PopularCar() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getPopularCar = async () => {
    const response = await CarAPI.getCarPopular();
    if (response.isSuccess) {
      setData(response.data);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getPopularCar();
  }, []);
  
  return (
    <div className="popular-car-container">
      {/* Tiêu đề */}
      <div className="popular-car-head">
        <p className="head-title">Popular Car</p>
        <p className="view-all" onClick={() => navigate("/category")}>
          View All
        </p>
      </div>

      {/* Danh sách xe */}
      <div className="popular-car-listing">
        {data.map((car) => {
          return <CarCard car={car} key={car._id} />;
        })}
      </div>
    </div>
  );
}
