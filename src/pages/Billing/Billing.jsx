import React from "react";
import "./Billing.css";
import { Form, Radio, Select, DatePicker, TimePicker, Row, Col, Button, Input, Checkbox } from "antd";
import { CITY } from "../../CONSTANTS";

const { Option } = Select;

export default function Billing() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Xử lý submit ở đây
  };

  return (
    <div className="billing-container">
      <Form form={form} layout="vertical" onFinish={onFinish} className="billing-wrapper">
        <div className="billing-info">
          <div className="billing-header">
            <h4>Billing Info</h4>
            <div>
              <p>Please enter your billing info</p>
              <p>Step 1 of 4</p>
            </div>
          </div>
          <div className="billing-form">
            <div>
              {/* Name */}
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Enter your full name" size="large" />
              </Form.Item>

              {/* Address */}
              <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter your address" }]}>
                <Input rows={2} placeholder="Enter your address" size="large" />
              </Form.Item>
            </div>
            <div>
              {/* Phone Number */}
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^\d{9,12}$/,
                    message: "Phone must be 9–12 digits",
                  },
                ]}
              >
                <Input placeholder="e.g. 0912345678" size="large" />
              </Form.Item>

              {/* City */}
              <Form.Item name="city" label="City" rules={[{ required: true, message: "Please select your city" }]}>
                <Select placeholder="Select a city" showSearch optionFilterProp="children" size="large">
                  {CITY.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="billing-info">
          <div className="billing-header">
            <h4>Rental Info</h4>
            <div>
              <p>Please select your rental date</p>
              <p>Step 2 of 4</p>
            </div>
          </div>
          <div className="pick-up-form">
            <Radio value="pickup" checked>
              Pick‑Up
            </Radio>

            <div className="pick-up-form-row">
              <div>
                <Form.Item name={"pick-location"} label="Locations" rules={[{ required: true, message: "Please select your city" }]}>
                  <Select placeholder="Select your city" showSearch optionFilterProp="children" size="large">
                    {CITY.map((city) => (
                      <Option key={city} value={city}>
                        {city}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name={"pick-time"} label="Time" rules={[{ required: true, message: "Please select your time" }]}>
                  <TimePicker style={{ width: "100%" }} placeholder="Select your time" size="large" />
                </Form.Item>
              </div>

              <div>
                <Form.Item name={"pick-date"} label="Date" rules={[{ required: true, message: "Please select your date" }]}>
                  <DatePicker style={{ width: "100%" }} placeholder="Select your date" size="large" />
                </Form.Item>
              </div>
            </div>

            {/* --- Drop‑Off Section --- */}

            <Radio value="dropoff" checked>
              Drop‑Off
            </Radio>

            <div className="pick-up-form-row">
              <div>
                <Form.Item name={"drop-location"} label="Locations" rules={[{ required: true, message: "Please select your city" }]}>
                  <Select placeholder="Select your city" showSearch optionFilterProp="children" size="large">
                    {CITY.map((city) => (
                      <Option key={city} value={city}>
                        {city}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name={"drop-time"} label="Time" rules={[{ required: true, message: "Please select your time" }]}>
                  <TimePicker style={{ width: "100%" }} placeholder="Select your time" size="large" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name={"drop-date"} label="Date" rules={[{ required: true, message: "Please select your date" }]}>
                  <DatePicker style={{ width: "100%" }} placeholder="Select your date" size="large" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CHƯA XONG */}
        <div className="billing-info">
          <div className="billing-header">
            <h4>Payment Method</h4>
            <div>
              <p>Please enter your payment method</p>
              <p>Step 3 of 4</p>
            </div>
          </div>
        </div>
        {/* ======================================================================= */}

        <div className="billing-info">
          <div className="billing-header">
            <h4>Confirmation</h4>
            <div>
              <p>We are getting to the end. Just few clicks and your rental is ready!</p>
              <p>Step 4 of 4</p>
            </div>
          </div>
          <div className="confirm-form">
            {/* Marketing opt‑in (không bắt buộc) */}
            <Form.Item name="marketing" valuePropName="checked" className="confirm-item">
              <Checkbox>I agree with sending Marketing and newsletter emails. No spam, promised!</Checkbox>
            </Form.Item>

            {/* Terms & Privacy (bắt buộc) */}
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("You must agree to our terms and privacy policy"))),
                },
              ]}
              className="confirm-item"
            >
              <Checkbox>I agree with our terms and conditions and privacy policy.</Checkbox>
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" className="confirm-button">
                Rent Now
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      <div className="car-card-detail"></div>
    </div>
  );
}
