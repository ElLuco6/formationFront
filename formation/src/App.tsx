import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';
import ListFormationsPage from './pages/ListFormationsPage';

const App: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="App">
            {/* Navbar */}
            <div className="navbar">
                <h1>Plateforme de Formation</h1>
                <button onClick={() => navigate('/createformationpage')}>Créer une Formation</button>
            </div>

            {/* Home Content */}
            <Routes>
                <Route path="/" element={<ListFormationsPage />} />
                <Route path="/createformationpage" element={<CreateFormationPage />} />
            </Routes>
        </div>
    );
};

export default App;
