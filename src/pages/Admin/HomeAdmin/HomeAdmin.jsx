import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import "./HomeAdmin.css";
import UserAPI from "../../../APIs/user.api";

export default function HomeAdmin() {
  const [userData, setUserData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Lấy thống kê người dùng mới
    const fetchUserStats = async () => {
      try {
        const res = await UserAPI.getNewUsersByDate();
        if (res.isSuccess) {
          setUserData(res.data);
        }
      } catch (error) {
        console.error("Failed to load user stats", error);
      }
    };

    // Lấy doanh thu theo tháng
    const fetchRevenueStats = async () => {
      try {
        const res = await UserAPI.getRevenueByMonth();
        if (res.isSuccess) {
          // API trả về dạng [{ month: '2023-05', revenue: 12345 }, ...]
          // Có thể cần format tháng nếu muốn hiển thị khác
          setRevenueData(res.data);
        }
      } catch (error) {
        console.error("Failed to load revenue stats", error);
      }
    };

    fetchUserStats();
    fetchRevenueStats();
  }, []);

  const userChartConfig = {
    data: userData,
    xField: "date",
    yField: "count",
    xAxis: {
      tickCount: 5,
      title: { text: "Ngày", style: { fontSize: 14 } },
    },
    yAxis: {
      title: { text: "Số người dùng mới", style: { fontSize: 14 } },
      min: 0,
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      count: { alias: "Số người dùng mới" },
      date: { alias: "Ngày" },
    },
  };

  const revenueChartConfig = {
    data: revenueData,
    xField: "month",
    yField: "revenue",
    label: { position: "top" },
    xAxis: { title: { text: "Tháng", style: { fontSize: 14 } } },
    yAxis: { title: { text: "Doanh thu (USD)", style: { fontSize: 14 } }, min: 0 },
    meta: {
      revenue: { alias: "Doanh thu" },
      month: { alias: "Tháng" },
    },
  };

  return (
    <div className="outlet-admin home-admin-container">
      <div className="chart-row">
        <div className="chart-wrapper">
          <div className="chart-title">Thống kê người dùng mới theo thời gian</div>
          <Column {...userChartConfig} />
        </div>
        <div className="chart-wrapper">
          <div className="chart-title">Doanh thu theo tháng</div>
          <Column {...revenueChartConfig} />
        </div>
      </div>
    </div>
  );
}
