import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';
import CreateClassesPage from './pages/CreateClassesPage';

const App: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="App">
            {/* Navbar */}
            <div className="navbar">
                <h1>Plateforme de Formation</h1>
                <button onClick={() => navigate('/createformationpage')}>Créer une Formation</button>
                <button onClick={() => navigate('/createclassespage')}>Créer une Classes</button>
            </div>

            {/* Home Content */}
            <Routes>
                <Route path="/" element={<ListFormationsPage />} />
                <Route path="/createformationpage" element={<CreateFormationPage />} />
                <Route path="/createclassespage" element={<CreateClassesPage formationId={"1"} />} />
            </Routes>
        </div>
    );
};

export default App;
