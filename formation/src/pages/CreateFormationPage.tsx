import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFormationPage: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formationData = { title, type, duration, description, price };

        try {
            const response = await fetch('http://localhost:3001/formations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formationData),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la création de la formation.');
            }

            navigate('/');
        } catch (error: any) {
            setError(error.message);
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
                    <input
                        type="text"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Ex: Technique, Soft Skills, etc."
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Durée</label>
                    <input
                        type="text"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Ex: 10 heures, 3 jours, etc."
                        required
                    />
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