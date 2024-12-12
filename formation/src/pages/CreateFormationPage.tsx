import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CreateFormationPageProps {
    onAddFormation: (formation: {
        id: number;
        title: string;
        type: string;
        duration: string;
        description: string;
        price: number;
    }) => void;
}

const CreateFormationPage: React.FC<CreateFormationPageProps> = ({ onAddFormation }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Technique');
    const [durationValue, setDurationValue] = useState<number | ''>('');
    const [durationUnit, setDurationUnit] = useState('heures');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const duration = `${durationValue} ${durationUnit}`;
        const newFormation = {
            id: Math.random(), // ID unique fictif
            title,
            type,
            duration,
            description,
            price: price || 0,
        };

        try {
            onAddFormation(newFormation); // Passe la nouvelle formation à la liste
            navigate('/'); // Retourne à la liste
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1>Créer une Nouvelle Formation</h1>
            <p>Remplissez le formulaire ci-dessous pour ajouter une nouvelle formation à votre catalogue.</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre de la Formation</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Entrez le titre de la formation"
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
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duration">Durée</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="number"
                            id="durationValue"
                            value={durationValue}
                            onChange={(e) => setDurationValue(Number(e.target.value) || '')}
                            placeholder="Entrez un chiffre"
                            required
                        />
                        <select
                            id="durationUnit"
                            value={durationUnit}
                            onChange={(e) => setDurationUnit(e.target.value)}
                            required
                        >
                            <option value="minutes">Minutes</option>
                            <option value="heures">Heures</option>
                            <option value="jours">Jours</option>
                            <option value="semaines">Semaines</option>
                            <option value="années">Années</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="price">Prix</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value) || '')}
                        placeholder="Entrez le prix (en €)"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Entrez une description détaillée"
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
};

export default CreateFormationPage;
