import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';
import ListFormationsPage from './pages/ListFormationsPage';

const App: React.FC = () => {
    const navigate = useNavigate();
    const [formations, setFormations] = useState([
        {
            id: 1,
            title: 'Formation React',
            description: 'Apprenez les bases de React.',
            price: 100,
            duration: 8,
        },
    ]);

    const handleAddFormation = (newFormation: any) => {
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
