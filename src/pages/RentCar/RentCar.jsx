import React, { useEffect, useState } from "react";
import "./RentCar.css";
import FilterSidebar from "../../components/utils/FilterSidebar/FilterSidebar.jsx";
import CarCard from "../../components/ui/CarCard/CarCard.jsx";
import { Pagination } from "antd";
import CarAPI from "../../APIs/car.api.js";
import { useLocation } from "react-router-dom";

export default function RentCar() {
  const urlParams = new URLSearchParams(window.location.search);
  const [current, setCurrent] = useState(1);
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState(urlParams.get("keyword") || "");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState([]);
  const [selectedGearbox, setSelectedGearbox] = useState([]);
  const [price, setPrice] = useState(1000);
  const [total, setTotal] = useState(0);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const onChange = (page) => {
    setCurrent(page);
  };

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newKeyword = params.get("keyword") || "";
    setKeyword(newKeyword);
  }, [location.search]);

  // Debounce keyword
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(keyword);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [keyword]);

  // Gọi API khi có thay đổi
  useEffect(() => {
    getCars();
  }, [debouncedQuery, selectedType, selectedCapacity, price, sortBy, sortOrder, selectedGearbox, current]);

  // Gọi API function
  const getCars = async () => {
    const query = {
      keyword: debouncedQuery,
      type: selectedType,
      capacity: selectedCapacity,
      gearbox: selectedGearbox,
      price: price,
      sortBy: `${sortBy}:${sortOrder}`,
      page: current,
      limit: 12,
    };

    const response = await CarAPI.getCarListing(query);

    setCars(response.data.cars);
    setTotal(response.data.total);
  };

  return (
    <div className="rent-container">
      <FilterSidebar sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} selectedType={selectedType} setSelectedType={setSelectedType} selectedCapacity={selectedCapacity} setSelectedCapacity={setSelectedCapacity} selectedGearbox={selectedGearbox} setSelectedGearbox={setSelectedGearbox} price={price} setPrice={setPrice} />
      <div className="rent-listing-container">
        <div className="car-listing" style={cars.length === 0 ? { display: "flex", justifyContent: "center" } : {}}>
          {cars.length > 0 ? (
            cars.map((car) => {
              return <CarCard car={car} key={car._id} />;
            })
          ) : (
            <div className="no-car-found">
              <p>Sorry, we couldn't find any cars matching your criteria.</p>
            </div>
          )}
        </div>
        {cars.length > 0 && (
          <div>
            <Pagination current={current} onChange={onChange} total={total} pageSize={12} showSizeChanger={false} style={{ margin: "0 0 40px 0" }} />
          </div>
        )}
      </div>
    </div>
  );
}
