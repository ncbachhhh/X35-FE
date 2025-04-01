import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top-left">
            <div className="footer-logo">
              <img src="/assets/Logo.svg" alt="" />
            </div>
            <div className="footer-description">
              <span>Our vision is to provide convenience and help increase your sales business.</span>
            </div>
          </div>
          <div className="footer-top-right">
            <div className="footer-top-right-item">
              <h4>About</h4>
              <ul>
                <li>How it works</li>
                <li>Featured</li>
                <li>Partnership</li>
                <li>Bussiness Relation</li>
              </ul>
            </div>
            <div className="footer-top-right-item">
              <h4>Community</h4>
              <ul>
                <li>How it works</li>
                <li>Featured</li>
                <li>Partnership</li>
                <li>Bussiness Relation</li>
              </ul>
            </div>
            <div className="footer-top-right-item">
              <h4>Social</h4>
              <ul>
                <li>How it works</li>
                <li>Featured</li>
                <li>Partnership</li>
                <li>Bussiness Relation</li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>©2022 MORENT. All rights reserved</p>
          <div>
            <p>Privacy & Policy</p>
            <p>Terms & Condition</p>
          </div>
        </div>
      </div>
    </div>
  );
}
