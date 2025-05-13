import React, { useEffect, useState } from "react";
import { Row, Col, Spin, message } from "antd";
import UserAPI from "../../APIs/user.api.js";
import CarCard from "../../components/ui/CarCard/CarCard.jsx";
import { useNotification } from "../../contexts/notification.context.js";

export default function LikedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { api } = useNotification();

  // Lấy danh sách xe
  const fetchCars = async () => {
    setLoading(true);
    const response = await UserAPI.getLikeCars(); // API lấy danh sách xe
    if (response.isSuccess) {
      setCars(response.data); // Set dữ liệu xe vào state
    } else {
      message.error("Failed to fetch cars.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars(); // Gọi API khi component mount
  }, []);

  return (
    <div style={{ padding: "40px", backgroundColor: "#f6f7f9", display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ color: "#3563e9" }}>Liked Cars</h2>
      {loading ? (
        <Spin />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
          }}
        >
          {/* Lặp qua từng xe và hiển thị bằng CarCard */}
          {cars.map((car) => (
            <div key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
