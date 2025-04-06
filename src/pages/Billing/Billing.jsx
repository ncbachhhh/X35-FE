import React from "react";
import "./Billing.css";
import { Form, Radio, Select, DatePicker, TimePicker, Row, Col, Button, Input, Checkbox, Rate } from "antd";
import { CITY } from "../../CONSTANTS";
import moment from "moment";
import { useWatch } from "antd/es/form/Form";
import formatDollar from "../../helpers/FormatDollar";

const { Option } = Select;

const car = {
  id: 12,
  brand: "Honda",
  name: "Civic",
  type: "SUV",
  tank: "80",
  gearbox: "Automatic",
  seats: 4,
  price: 90,
  image: "/assets/image 8.png",
  rate: 4.5,
  description: "The Honda Civic is a compact car that has been popular for decades. It is known for its reliability, fuel efficiency, and sporty design. ",
};

export default function Billing() {
  const [form] = Form.useForm();
  const pickDate = useWatch("pick-date", form);
  const dropDate = useWatch("drop-date", form);

  // Số ngày thuê xe
  const numDays = pickDate && dropDate ? dropDate.diff(pickDate, "days") : 0;

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
                <Form.Item name="pick-date" label="Date" rules={[{ required: true, message: "Please select your date" }]}>
                  <DatePicker
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Select your date"
                    // không cho chọn ngày trước hôm nay
                    disabledDate={(current) => current && current.isBefore(moment(), "day")}
                  />
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
                <Form.Item
                  name="drop-date"
                  label="Date"
                  // mỗi khi pick-date thay đổi, re-validate drop-date
                  dependencies={["pick-date"]}
                  rules={[
                    { required: true, message: "Please select your date" },
                    // custom validator: phải sau pick-date
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const pickupDate = getFieldValue("pick-date");
                        if (!value || !pickupDate) {
                          return Promise.resolve();
                        }
                        if (value.isAfter(pickupDate, "day")) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Drop‑Off date must be after Pick‑Up date"));
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Select your date"
                    // không cho chọn ngày trước hôm nay, và cũng không <= pick-date
                    disabledDate={(current) => {
                      const pickupDate = form.getFieldValue("pick-date");
                      // trước hôm nay thì luôn disable
                      if (!current || current.isBefore(moment(), "day")) {
                        return true;
                      }
                      // nếu đã có pick-up, thì disable luôn <= pick-up
                      if (pickupDate && !current.isAfter(pickupDate, "day")) {
                        return true;
                      }
                      return false;
                    }}
                  />
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
      <div className="car-card-detail">
        <div className="car-card-detail-header">
          <h4>Rental Summary</h4>
          <p>Prices may change depending on the length of the rental and the price of your rental car.</p>
        </div>
        <div className="car-card-detail-body">
          <div className="car-card-detail-image">
            <img src={car.image} alt="" />
          </div>
          <div className="car-card-detail-info">
            <h4 className="car-card-detail-name">
              {car.brand} {car.name}
            </h4>
            <Rate allowHalf disabled defaultValue={car.rate} style={{ fontSize: "14px" }} />
          </div>
        </div>
        <hr />
        <div className="car-card-detail-price">
          <div>
            <p>Price</p>
            <p>{formatDollar(car.price)}</p>
          </div>
          <div>
            <p>Rental Days</p>
            <p>{numDays} days</p>
          </div>
          <div>
            <p>Tax</p>
            <p>10%</p>
          </div>
        </div>
        <div className="car-card-detail-total">
          <div className="car-card-detail-total-header">
            <h4>Total Rental Price</h4>
            <p>Overall price and includes rental discount</p>
          </div>
          <p>{formatDollar(numDays * car.price * 1.1)}</p>
        </div>
      </div>
    </div>
  );
}
