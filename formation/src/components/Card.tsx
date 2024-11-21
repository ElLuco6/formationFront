import React from "react";
import "../assets/Card.css";
import "../assets/formationList.css";
interface CardProps {
  title: string;
  description: string;
  price: number;
  duration: number; // En heures
}

const Card: React.FC<CardProps> = ({ title, description, price, duration }) => {
  return (
    <div className="card no-image">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-info">
          <span className="card-price">{price} €</span>
          <span className="card-duration">{duration} heures</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
