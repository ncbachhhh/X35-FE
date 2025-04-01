import React from "react";
import "./HeroHome.css";
import ButtonUI from "../../ui/ButtonUI/ButtonUI.jsx";

export default function HeroHome() {
  return (
    <div className="hero-container">
      <div className="hero-1 hero">
        <div className="hero-text">
          <h1>The Best Platform for Car Rental</h1>
          <p>This is a simple hero section with a title and some text.</p>
        </div>
        <ButtonUI content="Rental Car" />
        <img src="/assets/image 7.png" className="hero-img" />
      </div>
      <div className="hero-2 hero">
        <div className="hero-text">
          <h1>Easy way to rent a car at a low price</h1>
          <p>Providing cheap car rental services and safe and comfortable facilities.</p>
        </div>
        <ButtonUI content="Rental Car" bgColor="#54A6FF" />
        <img src="/assets/image 8.png" className="hero-img" />
      </div>
    </div>
  );
}
