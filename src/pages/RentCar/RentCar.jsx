import React, { useState } from "react";
import "./RentCar.css";
import FilterSidebar from "../../components/utils/FilterSidebar/FilterSidebar.jsx";
import CarCard from "../../components/ui/CarCard/CarCard.jsx";
import { Pagination } from "antd";

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
  {
    id: 9,
    name: "Civic",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 90,
    image: "/assets/image 8.png",
  },
  {
    id: 10,
    name: "CR-V",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 40,
    image: "/assets/image 7.png",
  },
  {
    id: 11,
    name: "Civic",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 90,
    image: "/assets/image 8.png",
  },
  {
    id: 12,
    name: "Civic",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 90,
    image: "/assets/image 8.png",
  },
];

export default function RentCar() {
  const [current, setCurrent] = useState(1);
  const onChange = (page, pageSize) => {
    setCurrent(page);
    console.log("Current page:", page, "Page size:", pageSize);
  };

  return (
    <div className="rent-container">
      <FilterSidebar />
      <div className="rent-listing-container">
        <div className="car-listing">
          {data.map((car) => {
            return <CarCard car={car} key={car.id} />;
          })}
        </div>
        <div>
          <Pagination
            current={current}
            total={100}
            pageSize={10}
            onChange={onChange}
            showSizeChanger={false} // Ẩn tùy chọn thay đổi kích thước trang
            style={{ margin: "0 0 40px 0" }}
          />
        </div>
      </div>
    </div>
  );
}
