import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const API_URL = "http://localhost:3001/formations"; // Remplacez par l'URL de votre API

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`Erreur API : ${response.statusText}`);
          }
          const result = await response.json();
          setData(result);
        } catch (err: any) {
          setError(err.message || "Une erreur s'est produite");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    

    return (
        <div className="container">
          <div className="formationsList">
            <h1>Liste des formations</h1>
            <div>
              {data.map((formation) => (
                <Card
                  key={formation.id}
                  title={formation.title}
                  description={formation.description}
                  price={formation.price}
                  duration={formation.duration}
                  id={formation.id}
                />
              ))}
            </div>
          </div>
        </div>
    );
};

export default ListFormationsPage;
