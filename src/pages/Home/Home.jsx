import React from "react";
import "./Home.css";
import HeroHome from "../../components/utils/HeroHome/HeroHome.jsx";
import PopularCar from "../../components/utils/PopularCar/PopularCar.jsx";
import RecomendationCar from "../../components/utils/RecomendationCar/RecomendationCar.jsx";
import { useAuth } from "../../contexts/auth.context.js";

export default function Home() {
  const {user} = useAuth();
  return (
    <div className="main-container home-container">
      <HeroHome />
      <PopularCar />
      {user && (<RecomendationCar />)}
    </div>
  );
}
