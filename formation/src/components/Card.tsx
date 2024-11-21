import React from "react";
import "../assets/Card.css";
import "../assets/formationList.css";
import { useNavigate } from "react-router-dom";
interface CardProps {
  title: string;
  description: string;
  price: number;
  duration: number; // En heures
  id: number; 
}

const Card: React.FC<CardProps> = ({ title, description, price, duration, id }) => {
  
  const navigate = useNavigate();

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
      <button onClick={() => navigate('/createclassespage/' + id)}>Créer une Session</button>
      <button onClick={() => navigate('/inscription/' + id)}>S'inscrire</button>
    </div>
  );
};

export default Card;
