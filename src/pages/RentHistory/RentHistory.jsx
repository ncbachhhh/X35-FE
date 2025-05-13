import React, { useEffect, useState } from "react";
import { Table, Button, message, Spin, Tag, Modal, Rate, Input } from "antd";
import UserAPI from "../../APIs/user.api";
import FeedbackAPI from "../../APIs/feedback.api"; // Đảm bảo bạn đã có file API này
import moment from "moment";
import { useNotification } from "../../contexts/notification.context";
import './RentHistory.css';

const { TextArea } = Input;

export default function RentHistory() {
  const { api } = useNotification();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);

  const fetchRentedCars = async () => {
    setLoading(true);
    const response = await UserAPI.getRentHistory();
    if (response.isSuccess) {
      setCars(response.data);
    } else {
      message.error("Failed to fetch rented cars.");
    }
    setLoading(false);
  };

  const handleReturnCar = async (billId) => {
    try {
      const response = await UserAPI.returnCar(billId);
      if (response.isSuccess) {
        const returnedBill = cars.find((b) => b._id === billId);
        setSelectedBill(returnedBill);
        setModalVisible(true);
        api.success({
          message: "Car returned successfully!",
          description: response.message,
          duration: 1.5,
        });
        fetchRentedCars();
      } else {
        api.error({
          message: "Failed to return car",
          description: response.message,
          duration: 1.5,
        });
      }
    } catch {
      message.error("Failed to return car.");
    }
  };

  const handleRateSubmit = async () => {
    try {
      if (!selectedBill) return;
      const feedbackData = {
        carId: selectedBill.car._id,
        rate: rating,
        comment: comment.trim(),
      };

      const res = await FeedbackAPI.addFeedback(feedbackData);

      if (res.isSuccess) {
        api.success({ message: "Feedback submitted!", duration: 1.5 });
      } else {
        api.error({ message: "Failed to submit feedback", description: res.message });
      }
    } catch (err) {
      api.error({ message: "Error submitting feedback" });
    }

    setModalVisible(false);
    setRating(0);
    setComment("");
    setSelectedBill(null);
  };

  const isOverdue = (dropDateStr, beingRented) => {
    const dropDate = moment(dropDateStr, "DD/MM/YYYY");
    return beingRented && moment().isAfter(dropDate, "day");
  };

  const columns = [
    {
      title: "Car Name",
      dataIndex: "car",
      key: "car",
      render: (car) => `${car?.brand?.name || ""} ${car?.name || ""}`,
    },
    {
      title: "Pick Date",
      dataIndex: "pickDate",
      key: "pickDate",
    },
    {
      title: "Drop Date",
      dataIndex: "dropDate",
      key: "dropDate",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const overdue = isOverdue(record.dropDate, record.car?.beingRented);
        if (overdue) return <Tag color="red">Overdue</Tag>;
        return record.car?.beingRented ? <Tag color="blue">Being Rented</Tag> : <Tag color="green">Returned</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.car?.beingRented ? (
          <Button type="primary" onClick={() => handleReturnCar(record._id)}>
            Return Car
          </Button>
        ) : (
          <span style={{ color: "gray" }}>Returned</span>
        ),
    },
  ];

  useEffect(() => {
    fetchRentedCars();
  }, []);

  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 20  }} >
      <h2 style={{color: '#3563e9'}}>My Rented Cars</h2>
      {loading ? <Spin /> : <Table dataSource={cars} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />}

      <Modal title="Rate the Car" open={modalVisible} onOk={handleRateSubmit} onCancel={() => setModalVisible(false)} okText="Submit">
        <p>How was your experience with this car?</p>
        <Rate value={rating} onChange={setRating} allowHalf allowClear />
        <TextArea rows={4} placeholder="Leave a comment..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ marginTop: 16 }} />
      </Modal>
    </div>
  );
}
