import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/CreateSessionPage.css";

const API_URL = "http://10.31.34.188:3001"; // Remplacez par l'URL de votre API

interface DataFormation {
  id: number;
  createdAt: Date;
  description: string;
  duration: string;
  price: string;
  registeredNames: string[];
  title: string;
  type: string;
}

function CreateClassesPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "Présentiel",
    date: "",
    nbEleves: 0,
    eleves: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formation, setFormation] = useState<DataFormation | null>(null);

  const { formationId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: handleFormData(prevFormData, name, value),
    }));
  };

  const handleFormData = (data: any, name: string, value: string) => {
    switch (name) {
      case "nbEleves":
        return parseInt(value, 10) || 0;

      case "eleves":
        return invertUser(data.eleves, value);

      default:
        return value;
    }
  };

  const invertUser = (tab: string[], user: string) => {
    const index = tab.indexOf(user);
    if (index === -1) {
      tab.push(user);
    } else {
      tab.splice(index, 1);
    }
    return tab;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Ajouter le fuseau horaire pour générer un ISO 8601 complet
    const dateISO = formData.date
      ? new Date(formData.date).toISOString()
      : null;

    const dataToSubmit = {
      ...formData,
      date: dateISO, // Remplace la date saisie par le format ISO 8601
      formationId: Number(formationId), // Inclure formationId dans la requête
    };

    try {
      const response = await fetch("http://localhost:3001/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la création de la session."
        );
      }

      const result = await response.json();
      setSuccessMessage("Session créée avec succès!");
      console.log("Session créée :", result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL + "/formations/" + formationId);
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.statusText}`);
        }
        const result = await response.json();
        setFormation(result);
      } catch (err: any) {
        setError(err.message || "Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };
    fetchFormation();
  }, []);

  return (
    <div className="create-session-page">
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-control">
          <label htmlFor="type">Type:</label>
          {/* <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                /> */}
          <select
            id="type"
            name="type"
            // onChange={handleChange}
            required
          >
            <option value="Présentiel">Présentiel</option>
            <option value="Conférence">Conférence</option>
            <option value="Distanciel">Distanciel</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="date">Date:</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eleves">Élèves:</label>
          {formation && formation.registeredNames.length > 0 ? (
            <div className="usersSessionList">
              {formation.registeredNames.map((user, i) => (
                <div key={i}>
                  <input
                    onChange={handleChange}
                    id={"check" + i}
                    name="eleves"
                    type="checkbox"
                    value={user}
                  />
                  <label htmlFor={"check" + i}>{user}</label>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun participant inscrit</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? "Envoi en cours..." : "Créer la Session"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default CreateClassesPage;
