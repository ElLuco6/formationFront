import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const API_URL = "http://10.31.34.188:3001"; // Remplacez par l'URL de votre API

interface DataSession {
    id: number;
    type: string;
    date: Date;
    formationId: number;
    eleves: string[];
    nbEleves: number;
}
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

const ListClassesPage: React.FC = () => {

    const navigate = useNavigate();

    const [sessions, setSessions] = useState<DataSession[]>([]);
    const [formations, setFormations] = useState<DataFormation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  
    
    useEffect(() => {
        const fetchSessions = async () => {
          try {
            setLoading(true);
            const response = await fetch(API_URL+"/sessions");
            if (!response.ok) {
              throw new Error(`Erreur API : ${response.statusText}`);
            }
            const result = await response.json();
            console.log(result)
            setSessions(result);
          } catch (err: any) {
            setError(err.message || "Une erreur s'est produite");
          } finally {
            setLoading(false);
          }
        };
        const fetchFormations = async () => {
          try {
            setLoading(true);
            const response = await fetch(API_URL+"/formations");
            if (!response.ok) {
              throw new Error(`Erreur API : ${response.statusText}`);
            }
            const result = await response.json();
            setFormations(result);
          } catch (err: any) {
            setError(err.message || "Une erreur s'est produite");
          } finally {
            setLoading(false);
          }
        };
  
        fetchSessions();
        fetchFormations();
    }, []);
    

    return (
        <div className="container">
          <div className="sessionsList">
            <h1>Liste des sessions</h1>
            <div id="sessionList">
              {sessions.map((session) => {
                const formation = formations.find(formation => formation.id === session.formationId);
                console.log(session)
                return (
                <div className="card no-image">
                    <div className="card-content">
                    {formation &&
                        <h3 className="card-title">{formation.title}</h3>
                    }
                    <p className="card-description">Nombre d'élèves : {session.nbEleves}</p>
                    
                    <p className="card-description">{session.type}</p>
                    <div>
                        <p>Liste des participants :</p>
                        {session.eleves.length > 0 ? (
                            <ul className='usersSessionList'>                                        
                                {session.eleves.map(user => (
                                    <li>{user}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun participant inscrit</p>
                        )}
                    </div>
                    </div>
                </div>
                )})}
            </div>
          </div>
        </div>
    );
};

export default ListClassesPage;
