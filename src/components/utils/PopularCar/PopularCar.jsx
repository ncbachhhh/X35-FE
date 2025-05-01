import React from "react";
import "./PopularCar.css";
import CarCard from "../../ui/CarCard/CarCard.jsx";
import { useNavigate } from "react-router-dom";

export default function PopularCar() {
  const navigate = useNavigate();

  // Fake data
  const data = [
    {
      id: 1,
      name: "CR-V",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 80,
      image: ["/assets/image 7.png"],
    },
    {
      id: 2,
      name: "Civic",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 20,
      image: ["/assets/image 8.png"],
    },
    {
      id: 3,
      name: "CR-V",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 40,
      image: ["/assets/image 7.png"],
    },
    {
      id: 4,
      name: "Civic",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 90,
      image: ["/assets/image 8.png"],
    },
  ];

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
          return <CarCard car={car} key={car.id} />;
        })}
      </div>
    </div>
  );
}
