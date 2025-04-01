import React from "react";
import "./RecomendationCar.css";
import CarCard from "../../ui/CarCard/CarCard.jsx";
import ButtonUI from "../../ui/ButtonUI/ButtonUI.jsx";

export default function RecomendationCar() {
  const totalCar = 120; 
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
      image: "/assets/image 7.png",
    },
    {
      id: 2,
      name: "Civic",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 20,
      image: "/assets/image 8.png",
    },
    {
      id: 3,
      name: "CR-V",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 40,
      image: "/assets/image 7.png",
    },
    {
      id: 4,
      name: "Civic",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 90,
      image: "/assets/image 8.png",
    },
    {
      id: 5,
      name: "CR-V",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 80,
      image: "/assets/image 7.png",
    },
    {
      id: 6,
      name: "Civic",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 20,
      image: "/assets/image 8.png",
    },
    {
      id: 7,
      name: "CR-V",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 40,
      image: "/assets/image 7.png",
    },
    {
      id: 8,
      name: "Civic",
      type: "SUV",
      tank: "80",
      gearbox: "Automatic",
      seats: 4,
      price: 90,
      image: "/assets/image 8.png",
    },
  ];
  return (
    <div className="recomendation-car-container">
      {/* Tiêu đề */}
      <div className="recomendation-car-head">
        <p className="head-title">Recomendation Car</p>
        
      </div>

      {/* Danh sách xe */}
      <div className="recomendation-car-listing">
        {data.map((car) => {
          return <CarCard car={car} key={car.id} />;
        })}
      </div>
      <div className="show-more">
        <ButtonUI content="Show more car" />
        <p className="total-car">{totalCar} Car</p>
      </div>
    </div>
  );
}
