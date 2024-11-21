import React from "react";
import "./Card.css";
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
        <h2 className="card-title">{title}</h2>
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
