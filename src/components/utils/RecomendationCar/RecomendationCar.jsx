import React, { useEffect, useState } from "react";
import "./RecomendationCar.css";
import CarCard from "../../ui/CarCard/CarCard.jsx";
import ButtonUI from "../../ui/ButtonUI/ButtonUI.jsx";
import CarAPI from "../../../APIs/car.api.js";

export default function RecomendationCar() {
  const totalCar = 120;

  const [cars, setCars] = useState([]);

  const getCarRecommend = async () => {
    const response = await CarAPI.getCarRecommend(8);
    if (response.isSuccess) {
      setCars(response.data);
    } else {
      console.error("Error fetching recommended cars:", response.message);
    }
  };

  useEffect(() => {
    getCarRecommend();
  }, []);

  return (
    <div className="recomendation-car-container">
      {/* Tiêu đề */}
      <div className="recomendation-car-head">
        <p className="head-title">Recomendation Car</p>
      </div>

      {/* Danh sách xe */}
      <div className="recomendation-car-listing">
        {cars.map((car) => {
          return <CarCard car={car} key={car.id} />;
        })}
      </div>
      <div className="show-more">
        <ButtonUI content="Show more car" navigate="/category" />
        <p className="total-car">{totalCar} Car</p>
      </div>
    </div>
  );
}
