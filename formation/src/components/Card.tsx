import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Card.css";
import "../assets/formationList.css";

interface CardProps {
  title: string;
  description: string;
  price: number;
  duration: number; // En heures
  id: number;
  fetchData?: () => void; // La propriété est maintenant optionnelle
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  price,
  duration,
  id,
  fetchData,
}) => {
  const navigate = useNavigate();
  const [isFalling, setIsFalling] = useState(false);

  const userLocalString = localStorage.getItem("user");
  let userLocal: any = null;

  if (userLocalString) {
    userLocal = JSON.parse(userLocalString);
  }
  const handleDeleteFormation = async () => {
    setIsFalling(true);

    // Attendre la fin de l'animation avant de supprimer
    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://10.31.34.188:3001/formations/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de la suppression de la formation."
          );
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        if (fetchData) {
          fetchData(); // Appeler fetchData uniquement si elle est définie
        }
      }
    }, 1000); // Délai correspondant à la durée de l'animation
  };

  return (
    <div className={`card no-image ${isFalling ? "fall-animation" : ""}`}>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-info">
          <span className="card-price">{price} €</span>
          <span className="card-duration">{duration} heures</span>
        </div>
      </div>

      {/* Conteneur pour l'explosion */}
      {userLocal?.isAdmin ? (
        <button onClick={() => navigate("/createclassespage/" + id)}>
          Créer une classe
        </button>
      ) : null}
      {!userLocal?.isAdmin ? (
        <button
          onClick={() => navigate(userLocal ? "/inscription/" + id : "/login")}
        >
          S'inscrire
        </button>
      ) : null}
      {userLocal?.isAdmin ? (
        <button onClick={handleDeleteFormation}>Supprimer</button>
      ) : null}
    </div>
  );
};

export default Card;
