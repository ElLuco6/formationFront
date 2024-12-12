import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';
import ListFormationsPage from './pages/ListFormationsPage';

interface Formation {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number; // C'est un nombre
}

const App: React.FC = () => {
    const navigate = useNavigate();
    const [formations, setFormations] = useState<Formation[]>(() => {
        const savedFormations = localStorage.getItem('formations');
        return savedFormations
            ? JSON.parse(savedFormations)
            : [
                {
                    id: 1,
                    title: 'Formation React',
                    description: 'Apprenez les bases de React.',
                    price: 100,
                    duration: 8,
                },
            ];
    });

    useEffect(() => {
        localStorage.setItem('formations', JSON.stringify(formations));
    }, [formations]);

    const handleAddFormation = (newFormation: Formation) => {
        setFormations((prevFormations) => [...prevFormations, newFormation]);
    };

    return (
        <div className="App">
            <div className="navbar">
                <h1 onClick={() => navigate('/')}>Plateforme de Formation</h1>
                <button onClick={() => navigate('/createformationpage')}>Créer une Formation</button>
            </div>
            <Routes>
                <Route path="/" element={<ListFormationsPage mockedData={formations} />} />
                <Route path="/createformationpage" element={<CreateFormationPage onAddFormation={handleAddFormation} />} />
            </Routes>
        </div>
    );
};

export default App;
