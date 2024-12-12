import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';
import CreateClassesPage from './pages/CreateClassesPage';
import ListFormationsPage from './pages/ListFormationsPage';
import InscriptionPage from './pages/InscriptionPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ListClassesPage from './pages/ListClassesPage';

const App: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="App">
            {/* Navbar */}
            <div className="navbar">
                <h1 onClick={() => navigate('/')}>Plateforme de Formation</h1>
                <button onClick={() => navigate('/classes')}>Liste des classes</button>
                <button onClick={() => navigate('/createformationpage')}>Créer une Formation</button>
                {/* <button onClick={() => navigate('/createclassespage')}>Créer une Classe</button> */}
            </div>

            {/* Home Content */}
            <Routes>
                <Route path="/" element={<ListFormationsPage />} />
                <Route path="/createformationpage" element={<CreateFormationPage />} />
                <Route path="/createclassespage/:formationId" element={<CreateClassesPage />} />
                <Route path="/inscription/:formationId" element={<InscriptionPage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/classes" element={<ListClassesPage />} />
            </Routes>
        </div>
    );
};

export default App;
