import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';

}
const App: React.FC = () => {
    const navigate = useNavigate();

    // Formations fictives
    const fakeFormations = [
        { id: 1, title: 'React pour les Débutants', description: 'Apprenez les bases de React.' },
        { id: 2, title: 'TypeScript Avancé', description: 'Approfondissez vos connaissances de TypeScript.' },
        { id: 3, title: 'Design UI/UX', description: 'Créer des interfaces attrayantes et ergonomiques.' },
    ];

    return (
        <div className="App">
            {/* Navbar */}
            <div className="navbar">
                <h1>Plateforme de Formation</h1>
                <button onClick={() => navigate('/createformationpage')}>Créer une Formation</button>
            </div>

            {/* Home Content */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Bienvenue</h1>
                            <p>Explorez nos formations disponibles ci-dessous :</p>
                            {/* Fake Formations Section */}
                            <div className="card-section">
                                {fakeFormations.map((formation) => (
                                    <div key={formation.id} className="card">
                                        <h3>{formation.title}</h3>
                                        <p>{formation.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                />
                <Route path="/createformationpage" element={<CreateFormationPage />} />
            </Routes>
        </div>
    );
};

export default App;
