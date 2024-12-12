import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const API_URL = "http://10.31.34.188:3001/formations"; // Base de l'URL de votre API
const SEARCH_URL = "http://10.31.34.188:3001/formations/search"; // URL pour la recherche

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

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

  const searchUsers = async (query: string) => {
    if (query.trim().length < 3) {
      setFilteredData(data); // Réinitialise les résultats si moins de 3 caractères
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${SEARCH_URL}/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Erreur API : ${response.statusText}`);
      }
      const result = await response.json();
      setFilteredData(result); // Mettre à jour les résultats avec ceux de l'API
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  // Débounce pour attendre que l'utilisateur ait fini de taper
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Délai de 500ms avant d'exécuter la recherche

    return () => {
      clearTimeout(handler); // Efface le délai si l'utilisateur continue de taper
    };
  }, [searchQuery]);

  // Effect pour déclencher la recherche API lorsque le debounce est mis à jour
  useEffect(() => {
    searchUsers(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="container">
        <h1 className="title">Liste des formations</h1>

        {/* Barre de recherche */}
        <div className="searchbar-container">
          <input
              type="text"
              placeholder="Rechercher un utilisateur inscrit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="formationsList">
          {loading ? (
              <p>Chargement...</p>
          ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
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
                Désolé, aucun résultat ne correspond à votre recherche. Essayez un autre mot-clé !
              </p>
          )}
        </div>
      </div>
  );
};

export default ListFormationsPage;