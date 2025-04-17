import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";
import { Checkbox, Slider } from "antd";
import formatDollar from "../../../helpers/FormatDollar";

// Tùy chỉnh danh sách tùy chọn cho TYPE
const typeOptions = [
  { label: "Sport (10)", value: "Sport" },
  { label: "SUV (12)", value: "SUV" },
  { label: "MPV (16)", value: "MPV" },
  { label: "Sedan (20)", value: "Sedan" },
  { label: "Coupe (14)", value: "Coupe" },
  { label: "Hatchback (14)", value: "Hatchback" },
];

// Tùy chỉnh danh sách tùy chọn cho CAPACITY
const capacityOptions = [
  { label: "2 Person (10)", value: "2" },
  { label: "4 Person (14)", value: "4" },
  { label: "6 Person (12)", value: "6" },
  { label: "8 or More (16)", value: "8plus" },
];

export default function FilterSidebar() {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState([]);
  const [price, setPrice] = useState(100);

  useEffect(() => { 
    console.log("Selected Type:", selectedType);
    console.log("Selected Capacity:", selectedCapacity);
    console.log("Selected Price:", price);
  }, [selectedType, selectedCapacity, price]);

  const handleTypeChange = (checkedValues) => {
    setSelectedType(checkedValues);
  };

  const handleCapacityChange = (checkedValues) => {
    setSelectedCapacity(checkedValues);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  return (
    <div className="side-bar-container">
      {/* TYPE */}
      <div className="side-bar-item">
        <h4>TYPE</h4>
        <Checkbox.Group className="filter" options={typeOptions} value={selectedType} onChange={handleTypeChange} />
      </div>

      {/* CAPACITY */}
      <div className="side-bar-item">
        <h4>CAPACITY</h4>
        <Checkbox.Group className="filter" options={capacityOptions} value={selectedCapacity} onChange={handleCapacityChange} />
      </div>

      {/* PRICE */}
      <div className="side-bar-item">
        <h4>PRICE</h4>
        <Slider
          min={0}
          max={200} // tùy chỉnh max nếu muốn
          value={price}
          onChange={handlePriceChange}
        />
        <p>Max. {formatDollar(price)}</p>
      </div>
    </div>
  );
}
