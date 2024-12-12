import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
}

interface CreateFormationPageProps {
    onAddFormation: (formation: {
        id: number;
        title: string;
        type: string;
        duration: number;
        description: string;
        price: number;
        users: User[]; // Tableau contenant des objets User
    }) => void;
}


const CreateFormationPage: React.FC<CreateFormationPageProps> = ({ onAddFormation }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Technique');
    const [duration, setDuration] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== '1234') {
            setError('Mot de passe incorrect.');
            return;
        }
        const newFormation = {
            id: Math.random(),
            title,
            type,
            duration: Number(duration),
            description,
            price: Number(price),
            users: [],
        };
        onAddFormation(newFormation);
        navigate('/');
    };

    return (
        <div className="form-container">
            <h1>Créer une Nouvelle Formation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre de la Formation</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="type">Type de Formation</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="Technique">Technique</option>
                        <option value="Soft Skills">Soft Skills</option>
                        <option value="Management">Management</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duration">Durée (heures)</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Prix (€)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="password-container">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default CreateFormationPage;