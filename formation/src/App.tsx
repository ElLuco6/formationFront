import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CreateFormationPage from './pages/CreateFormationPage';
import ListFormationsPage from './pages/ListFormationsPage';
import Modal from './components/Modal';

interface User {
    id: number;
    name: string;
}

interface Formation {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    users: User[];
}

const App: React.FC = () => {
    const navigate = useNavigate();

    const [pseudo, setPseudo] = useState('Invité');
    const [formations, setFormations] = useState<Formation[]>(() => {
        const savedFormations = localStorage.getItem('formations');
        return savedFormations
            ? JSON.parse(savedFormations).map((formation: Formation) => ({
                ...formation,
                users: formation.users || [],
            }))
            : [
                {
                    id: 1,
                    title: 'Gestion de projet',
                    description: 'La meilleure formation sur Toulouse.',
                    price: 100,
                    duration: 8,
                    users: [{ id: 1, name: 'M2 Dev web b' }],
                },
            ];
    });

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedFormationId, setSelectedFormationId] = useState<number | null>(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('formations', JSON.stringify(formations));
    }, [formations]);

    const handleAddFormation = (newFormation: Formation) => {
        setFormations((prevFormations) => [...prevFormations, newFormation]);
    };

    const handleRegister = (formationId: number, isRegistered: boolean) => {
        setFormations((prevFormations) =>
            prevFormations.map((formation) =>
                formation.id === formationId
                    ? {
                        ...formation,
                        users: isRegistered
                            ? formation.users.filter((user) => user.name !== pseudo)
                            : [...formation.users, { id: Date.now(), name: pseudo }],
                    }
                    : formation
            )
        );
    };

    const handleDeleteFormation = (formationId: number) => {
        setFormations((prevFormations) =>
            prevFormations.filter((formation) => formation.id !== formationId)
        );
    };

    const handleOpenUserModal = (formationId: number) => {
        setSelectedFormationId(formationId);
        setIsUserModalOpen(true);
    };

    const handlePasswordConfirm = () => {
        if (password === '1234') {
            setPasswordError(null);
            setIsUserModalOpen(false);
        } else {
            setPasswordError('Mot de passe incorrect');
        }
    };

    const handleRemoveUser = (formationId: number, userId: number) => {
        setFormations((prevFormations) =>
            prevFormations.map((formation) =>
                formation.id === formationId
                    ? {
                        ...formation,
                        users: formation.users.filter((user) => user.id !== userId),
                    }
                    : formation
            )
        );
    };

    return (
        <div className="App">
            <div className="navbar">
                <h1 onClick={() => navigate('/')}>Plateforme de Formation</h1>
                <button onClick={() => navigate('/createformationpage')}>Créer une Formation</button>
                <div className="pseudo-container">
                    <label htmlFor="pseudo">Votre pseudo :</label>
                    <input
                        type="text"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        placeholder="Entrez votre pseudo"
                    />
                </div>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={<ListFormationsPage
                        mockedData={formations}
                        onRegister={handleRegister}
                        onDelete={handleDeleteFormation}
                        onViewUsers={handleOpenUserModal}
                        pseudo={pseudo}
                    />}
                />
                <Route path="/createformationpage"
                       element={<CreateFormationPage onAddFormation={handleAddFormation} />} />
            </Routes>
            <Modal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onConfirm={handlePasswordConfirm}
                error={passwordError}
                setPassword={setPassword}
            />
            {selectedFormationId && formations
                .find((formation) => formation.id === selectedFormationId)
                ?.users.map((user) => (
                    <div key={user.id}>
                        {user.name}
                        <button
                            onClick={() => handleRemoveUser(selectedFormationId, user.id)}
                            style={{ marginLeft: '10px', background: '#dc3545', color: 'white' }}
                        >
                            Expulser
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default App;