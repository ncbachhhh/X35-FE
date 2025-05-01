import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CarDetails.css";
import { Typography, Rate } from "antd";
import formatDollar from "../../helpers/FormatDollar";
import ButtonUI from "../../components/ui/ButtonUI/ButtonUI";
import CarCard from "../../components/ui/CarCard/CarCard";
import CarAPI from "../../APIs/car.api";
import Loading from "../../components/ui/Loading/Loading";


const { Paragraph } = Typography;

// // Note: Tạo lại data
// const car = {
//   id: 12,
//   brand: "Honda",
//   name: "Civic",
//   type: "SUV",
//   tank: "80",
//   gearbox: "Automatic",
//   seats: 4,
//   price: 90,
//   image: "/assets/image 8.png",
//   rate: 4.5,
//   description: "The Honda Civic is a compact car that has been popular for decades. It is known for its reliability, fuel efficiency, and sporty design. ",
// };

// const images = [
//   {
//     id: 1,
//     url: "/assets/View 1.svg",
//   },
//   {
//     id: 2,
//     url: "/assets/View 2.svg",
//   },
//   {
//     id: 3,
//     url: "/assets/View 3.svg",
//   },
// ];

const comments = [
  {
    id: 1,
    name: "John Doe",
    rate: 4.5,
    content: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    date: "2023-10-01",
    image: "/assets/Profill.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    rate: 4.0,
    content: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    date: "2023-10-02",
    image: "/assets/Profill.svg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rate: 5.0,
    content: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    date: "2023-10-03",
    image: "/assets/Profill.svg",
  },
  {
    id: 4,
    name: "Bob Brown",
    rate: 3.5,
    content: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    date: "2023-10-04",
    image: "/assets/Profill.svg",
  },
];

const carRecommend = [
  {
    id: 1,
    name: "CR-V",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 80,
    image: "/assets/image 7.png",
  },
  {
    id: 2,
    name: "Civic",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 20,
    image: "/assets/image 8.png",
  },
  {
    id: 3,
    name: "CR-V",
    type: "SUV",
    tank: "80",
    gearbox: "Automatic",
    seats: 4,
    price: 40,
    image: "/assets/image 7.png",
  },
];

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState({image: []});
  const [mainImage, setMainImage] = useState();
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [comment, setComment] = useState(comments.slice(0, 2));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCarDetails = async () => {
    try {
      setLoading(true);
      const response = await CarAPI.getCar(id);
      if (response.isSuccess) {
        setCar(response.data);
        setImages(response.data.image.slice(1));
        setMainImage(response.data.image[1]);
        console.log(response.data);
        setLoading(false);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    getCarDetails();
  }, []);

  return (
    <div className="car-detail-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="car-detail-image">
            <div className="car-image-container">
              <div className="car-main-image">
                <img
                  src={mainImage}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "35px",
                  }}
                />
                <div className="car-slogan-text">
                  <h4>Sports car with the best design and acceleration</h4>
                  <p>Safety and comfort while driving a futuristic and elegant sports car</p>
                </div>
              </div>
              <div className="car-mini-image">
                {(images).map((image) => (
                  <img key={image} src={image} onClick={() => setMainImage(image)} style={{ border: mainImage === image ? "2px solid #3563E9" : "1px solid transparent", borderRadius: "15px", objectFit: "cover", width: "calc(100% / 3)" }} />
                ))}
              </div>
            </div>
            <div className="car-info-container">
              <div className="car-info-1">
                <div className="car-detail-header">
                  <div className="car-name-rate">
                    <h1>
                      {car.brand} {car.name}
                    </h1>
                    <div className="car-rate">
                      <Rate allowHalf disabled defaultValue={car.rate} />
                    </div>
                  </div>
                  <i className="fa-regular fa-heart" style={{ color: "#90A3BF", fontSize: "25px", marginTop: "10px" }}></i>
                </div>
                <div className="car-detail-description">
                  <Paragraph>{car.description}</Paragraph>
                </div>
                <div className="car-type-info">
                  <div className="car-type-info-item">
                    <h4 className="info-title">Type Car</h4>
                    <p className="info-content">{car.type}</p>
                  </div>
                  <div className="car-type-info-item">
                    <h4 className="info-title">Capacity</h4>
                    <p className="info-content">{car.seats} Person</p>
                  </div>
                  <div className="car-type-info-item">
                    <h4 className="info-title">Steering</h4>
                    <p className="info-content">{car.gearbox}</p>
                  </div>
                  <div className="car-type-info-item">
                    <h4 className="info-title">Gasoline</h4>
                    <p className="info-content">{car.tank}L</p>
                  </div>
                </div>
              </div>
              <div className="car-info-2">
                <div className="car-rent-price">
                  <p>
                    {formatDollar(car.price)}/ <span>days</span>
                  </p>
                  <p>{formatDollar(car.price * 1.1)}</p>
                </div>
                <ButtonUI content="Rent Now" style={{ height: "100%", width: "200px" }} navigate={`/payment/${car.id}`} />
              </div>
            </div>
          </div>
          <div className="car-feedback">
            <div className="feedback-header">
              Reviews <span>{comments.length}</span>
            </div>
            {comment.map((comment) => (
              <div key={comment.id} className="car-feedback-item">
                <div className="car-feedback-image">
                  <img src={comment.image} alt="" height={48} />
                </div>
                <div className="car-feedback-content">
                  <div>
                    <div>
                      <p className="comment-user-name">{comment.name}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "end" }}>
                      <p style={{ fontSize: "14px", color: "#A0A3BD" }}>{comment.date}</p>
                      <Rate allowHalf disabled defaultValue={comment.rate} />
                    </div>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              </div>
            ))}
            <div className="show-btn">
              {showAll ? (
                <button
                  onClick={() => {
                    setShowAll(false);
                    setComment(comments.slice(0, 2));
                  }}
                  style={{ height: "100%", width: "200px" }}
                >
                  Show less <i className="fa-solid fa-chevron-up"></i>
                </button>
              ) : (
                <button
                  content="Show all"
                  onClick={() => {
                    setShowAll(true);
                    setComment(comments);
                  }}
                  style={{ height: "100%", width: "200px" }}
                >
                  Show more <i className="fa-solid fa-chevron-down"></i>
                </button>
              )}
            </div>
          </div>
          <div className="car-recent">
            <div className="popular-car-head">
              <p className="head-title">Recent Car</p>
              <p className="view-all" onClick={() => navigate("/category")}>
                View All
              </p>
            </div>

            {/* Danh sách xe */}
            <div className="recent-car-listing">
              {carRecommend.map((car) => {
                return <CarCard car={car} key={car.id} />;
              })}
            </div>
          </div>
          <div className="car-recommendation">
            <div className="popular-car-head">
              <p className="head-title">Recommendation Car</p>
              <p className="view-all" onClick={() => navigate("/category")}>
                View All
              </p>
            </div>

            {/* Danh sách xe */}
            <div className="recent-car-listing">
              {carRecommend.map((car) => {
                return <CarCard car={car} key={car.id} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
