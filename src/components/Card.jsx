import React from "react";
import cardImg from "../assets/images/card.jpg";
import barCode from "../assets/images/qr.jpg";

const Card = () => {
  return (
    <div>
      <div class="admit-card">
        <img src={cardImg} class="card-img" />
        <div class="admit-card-info">
          <h3>ID no.: 123456</h3>
          <h3>Name: John Doe</h3>
          <h3>Comp: Test Company</h3>
          <h3>City: Test City</h3>
        </div>
        <img src={barCode} class="qr" />
      </div>
    </div>
  );
};

export default Card;
