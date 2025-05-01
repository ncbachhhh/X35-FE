import React, { use, useEffect, useState } from "react";
import "./FilterSidebar.css";
import { Checkbox, Select, Slider } from "antd";
import formatDollar from "../../../helpers/FormatDollar";
import axios from "axios";
import CarAPI from "../../../APIs/car.api";

// Tùy chỉnh danh sách tùy chọn cho TYPE
const typeOptions = [
  { label: "Sport", value: "Sport" },
  { label: "SUV", value: "SUV" },
  { label: "MPV", value: "MPV" },
  { label: "Sedan", value: "Sedan" },
  { label: "Coupe", value: "Coupe" },
  { label: "Hatchback", value: "Hatchback" },
];

// Tùy chỉnh danh sách tùy chọn cho CAPACITY
const capacityOptions = [
  { label: "2 Person", value: "2" },
  { label: "4 Person", value: "4" },
  { label: "6 Person", value: "6" },
  { label: "8 or More", value: "8plus" },
];

export default function FilterSidebar({ sortBy, setSortBy, sortOrder, setSortOrder, selectedType, setSelectedType, selectedCapacity, setSelectedCapacity, selectedGearbox, setSelectedGearbox, price, setPrice }) {
  const handleTypeChange = (checkedValues) => {
    setSelectedType(checkedValues);
  };

  const handleCapacityChange = (checkedValues) => {
    setSelectedCapacity(checkedValues);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  const handleGearboxChange = (checkedValues) => {
    setSelectedGearbox(checkedValues);
  };

  const [gearboxOptions, setGearboxOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const getGearboxOptions = async () => {
    const response = await CarAPI.getGearbox();
    if (response.isSuccess) {
      const options = response.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setGearboxOptions(options);
    }
  };

  const getTypeOptions = async () => {
    const response = await CarAPI.getType();
    if (response.isSuccess) {
      const options = response.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setTypeOptions(options);
    }
  };

  useEffect(() => {
    getGearboxOptions();
    getTypeOptions();
  }, []);

  return (
    <div className="side-bar-container">
      {/* SORT BY */}
      <div className="side-bar-item">
        <h4>SORT BY</h4>
        <div style={{ display: "flex", gap: "8px" }}>
          <Select
            style={{ flex: 1 }}
            value={sortBy}
            onChange={handleSortByChange}
            options={[
              { label: "Price", value: "price" },
              { label: "Created At", value: "createdAt" },
            ]}
          />
          <Select
            style={{ width: 120 }}
            value={sortOrder}
            onChange={handleSortOrderChange}
            options={[
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "desc" },
            ]}
          />
        </div>
      </div>
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

      {/* GEARBOX */}
      <div className="side-bar-item">
        <h4>GEARBOX</h4>
        <Checkbox.Group className="filter" options={gearboxOptions} value={selectedGearbox} onChange={handleGearboxChange} />
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
