import React from "react";
import "./CreateRent.css";
import { Form, Input, InputNumber, Select, Upload, Button, message, Card, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

export default function CreateRent() {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form data:", values);
    message.success("Submitted successfully!");
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="outlet-admin create-rent-container">
      <Card title="Add New Car" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            seat: 4,
            type: "Sedan",
            gearbox: "AT",
          }}
        >
          <Row gutter={24}>
            {/* Left Column */}
            <Col span={12}>
              <Form.Item label="Car Name" name="name" rules={[{ required: true, message: "Please enter the car name!" }]}>
                <Input size="large" placeholder="e.g. Camry, Ranger, etc." />
              </Form.Item>

              <Form.Item label="Car Brand" name="brand" rules={[{ required: true, message: "Please select the car brand!" }]}>
                <Select size="large" placeholder="Select brand">
                  <Option value="Toyota">Toyota</Option>
                  <Option value="Ford">Ford</Option>
                  <Option value="Mercedes">Mercedes</Option>
                  <Option value="Honda">Honda</Option>
                  <Option value="BMW">BMW</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Car Type" name="type" rules={[{ required: true, message: "Please select car type!" }]}>
                <Select size="large" placeholder="Select car type">
                  <Option value="Sedan">Sedan</Option>
                  <Option value="SUV">SUV</Option>
                  <Option value="Truck">Truck</Option>
                  <Option value="Hatchback">Hatchback</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Fuel Tank Capacity (Liters)" name="tank" rules={[{ required: true, message: "Please enter tank capacity!" }]}>
                <InputNumber size="large" min={1} max={100} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            {/* Right Column */}
            <Col span={12}>
              <Form.Item label="Gearbox" name="gearbox" rules={[{ required: true, message: "Please select gearbox type!" }]}>
                <Select size="large">
                  <Option value="AT">Automatic (AT)</Option>
                  <Option value="MT">Manual (MT)</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Number of Seats" name="seat" rules={[{ required: true, message: "Please enter seat count!" }]}>
                <InputNumber size="large" min={2} max={50} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Daily Rental Price (Dollar)" name="price" rules={[{ required: true, message: "Please enter rental price!" }]}>
                <InputNumber size="large" min={100000} step={10000} style={{ width: "100%" }} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
              </Form.Item>

              <Form.Item label="Car Images (up to 3)" name="image" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: "Please upload images!" }]}>
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
              Save Car Info
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
