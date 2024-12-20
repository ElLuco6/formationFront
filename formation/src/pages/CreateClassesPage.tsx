import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/CreateSessionPage.css";
import confetti from 'canvas-confetti';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [name]: handleFormData(prevFormData, name, value),
      };

      // Mise à jour automatique de nbEleves quand les élèves changent
      if (name === 'eleves') {
        const newEleves = handleFormData(prevFormData, 'eleves', value) as string[];
        newFormData.nbEleves = newEleves.length;
      }

      return newFormData;
    });
  };

  const handleFormData = (data: any, name: string, value: string) => {
    switch (name) {
      case "type":
        return value;
      case "eleves":
        return invertUser(data.eleves || [], value);
      default:
        return value;
    }
  };

  const invertUser = (tab: string[], user: string) => {
    const newTab = [...tab];
    const index = newTab.indexOf(user);
    if (index === -1) {
      newTab.push(user);
    } else {
      newTab.splice(index, 1);
    }
    return newTab;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f']
    });
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

    dataToSubmit.nbEleves = dataToSubmit.eleves.length

    try {
      const response = await fetch(API_URL+"/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la création de la classe."
        );
      }

      const result = await response.json();
      setSuccessMessage("Classe créée avec succès!");
      triggerConfetti(); // Déclenche les confettis
      
      // Attendre 1.5 secondes avant de rediriger
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }

    // navigate('/classes');
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
          <select
            id="type"
            name="type"
            onChange={handleChange}
            value={formData.type}
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
          {isSubmitting ? "Envoi en cours..." : "Créer la classe"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default CreateClassesPage;
