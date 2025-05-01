import React, { useEffect, useState } from "react";
import "./CreateRent.css";
import { Form, Input, InputNumber, Select, Upload, Button, Card, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CarAPI from "../../../APIs/car.api.js";
import { useNotification } from "../../../contexts/notification.context.js";
import Loading from "../../../components/ui/Loading/Loading.jsx";

const { Option } = Select;

export default function CreateRent() {
  const { api } = useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Hàm xử lý trim khi người dùng rời khỏi input
  const handleTrim = (e, fieldName) => {
    const value = e.target.value;
    form.setFieldsValue({
      [fieldName]: value.trim(),
    });
  };

  const [carBrands, setCarBrands] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [carGearboxes, setCarGearboxes] = useState([]);

  const getCreatRentData = async () => {
    const brandResponse = await CarAPI.getBrand();
    if (brandResponse.isSuccess) {
      setCarBrands(brandResponse.data);
    } else {
      api.error({ message: "Error!", description: brandResponse.message, duration: 1.5 });
    }

    const typeResponse = await CarAPI.getType();
    if (typeResponse.isSuccess) {
      setCarTypes(typeResponse.data);
    } else {
      api.error({ message: "Error!", description: typeResponse.message, duration: 1.5 });
    }

    const gearboxResponse = await CarAPI.getGearbox();
    if (gearboxResponse.isSuccess) {
      setCarGearboxes(gearboxResponse.data);
    } else {
      api.error({ message: "Error!", description: gearboxResponse.message, duration: 1.5 });
    }
  };

  useEffect(() => {
    getCreatRentData();
  }, []);

  const handleFinish = async (values) => {
    setLoading(true);
    const response = await CarAPI.createCar(values);
    if (response.isSuccess) {
      api.success({ message: "Car added successfully!", description: "The car has been added to the system.", duration: 1.5 });
      form.resetFields();
    } else {
      api.error({ message: "Error!", description: response.message, duration: 1.5 });
    }
    setLoading(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="outlet-admin create-rent-container">
      <div className="create-rent-form">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={24}>
        {/* Left Column */}
        <Col span={12}>
          <Form.Item
            label="Car Name"
            name="name"
            rules={[{ required: true, message: "Please enter the car name!" }]}
          >
            <Input
              size="large"
              placeholder="e.g. Camry, Ranger, etc."
              onBlur={(e) => handleTrim(e, "name")} // Trim khi rời khỏi input
            />
          </Form.Item>

          <Form.Item
            label="Car Brand"
            name="brand"
            rules={[{ required: true, message: "Please select the car brand!" }]}
          >
            <Select size="large" placeholder="Select brand">
              {carBrands.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Car Type"
            name="type"
            rules={[{ required: true, message: "Please select car type!" }]}
          >
            <Select size="large" placeholder="Select car type">
              {carTypes.map((type) => (
                <Option key={type._id} value={type._id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Fuel Tank Capacity (Liters)"
            name="tank"
            rules={[{ required: true, message: "Please enter tank capacity!" }]}
          >
            <InputNumber size="large" min={1} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <TextArea
              size="large"
              placeholder="Enter car description..."
              autoSize={{ minRows: 4, maxRows: 6 }}
              onBlur={(e) => handleTrim(e, "description")} // Trim khi rời khỏi input
            />
          </Form.Item>
        </Col>

        {/* Right Column */}
        <Col span={12}>
          <Form.Item
            label="Gearbox"
            name="gearbox"
            rules={[{ required: true, message: "Please select gearbox type!" }]}
          >
            <Select size="large">
              {carGearboxes.map((gearbox) => (
                <Option key={gearbox._id} value={gearbox._id}>
                  {gearbox.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Number of Seats"
            name="seat"
            rules={[{ required: true, message: "Please enter seat count!" }]}
          >
            <InputNumber size="large" min={2} max={50} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Daily Rental Price (Dollar)"
            name="price"
            rules={[{ required: true, message: "Please enter rental price!" }]}
          >
            <InputNumber
              size="large"
              min={1}
              step={10}
              style={{ width: "100%" }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            />
          </Form.Item>

          <Form.Item
            label="Car Images (up to 3)"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload images!" }]}
          >
            <Upload name="image" listType="picture" beforeUpload={() => false} maxCount={3}>
              <Button size="large" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">
          Save Car Info {loading && <Loading />}
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
}
