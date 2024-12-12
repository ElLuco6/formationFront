import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const API_URL = "http://10.31.34.188:3001/formations"; // Remplacez par l'URL de votre API

interface DataItem {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number; // En heures
}

const ListFormationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erreur API : ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
      setFilteredData(result); // Mettre à jour les données filtrées initialement
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, data]);

  return (
    <div className="container list-formation-page">
      <h1 className="title">Liste des formations</h1>

      {/* Barre de recherche */}
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="formationsList">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filteredData.length > 0 ? (
          filteredData.map((formation) => (
            <Card
              key={formation.id}
              title={formation.title}
              description={formation.description}
              price={formation.price}
              duration={formation.duration}
              id={formation.id}
              fetchData={fetchData} // Passez fetchData au composant Card
            />
          ))
        ) : (
          <p className="no-results">
            Désolé, aucune formation ne correspond à votre recherche. Essayez un
            autre mot-clé !
          </p>
        )}
      </div>
    </div>
  );
};

export default ListFormationsPage;
