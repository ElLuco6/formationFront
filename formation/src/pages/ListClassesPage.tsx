import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const API_URL = "http://10.31.34.188:3001/sessions"; // Remplacez par l'URL de votre API

interface DataSession {
  id: number;
  type: string;
  date: Date;
  formationId: number;
  nbEleves: number; // En heures
}

const ListClassesPage: React.FC = () => {

    const navigate = useNavigate();

    const [data, setData] = useState<DataSession[]>([]);
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
          <div className="sessionsList">
            <h1>Liste des sessions</h1>
            <div id="sessionList">
              {data.map((item) => (
                <div className="card no-image">
                    <div className="card-content">
                    <h3 className="card-title">{item.type}</h3>
                    <p className="card-description">Nombre d'élèves : {item.nbEleves}</p>
                    </div>
                </div>
                ))}
            </div>
          </div>
        </div>
    );
};

export default ListClassesPage;
