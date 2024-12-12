import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CreateFormationPage.css';
import confetti from 'canvas-confetti';

const CreateFormationPage: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Technique');
    const [durationValue, setDurationValue] = useState<number | ''>('');
    const [durationUnit, setDurationUnit] = useState('heures');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#004080', '#3498db', '#2ecc71', '#f1c40f']
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const duration = `${durationValue} ${durationUnit}`;
        const formationData = { title, type, duration, description, price };

        try {
            const response = await fetch('http://10.31.34.188:3001/formations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formationData),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la création de la formation.');
            }

            triggerConfetti(); // Déclenche les confettis
            setTimeout(() => {
                navigate('/');
            }, 1500); // Attend 1.5 secondes avant la redirection

        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-formation-container">
            <h1 className="create-formation-title">Créer une Formation</h1>
            <p className="create-formation-subtitle">Remplissez le formulaire ci-dessous pour ajouter une nouvelle formation à votre catalogue.</p>
            
            {error && <div className="error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-field">
                    <label htmlFor="title">Titre de la Formation</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Développement React avancé"
                        required
                    />
                </div>

                <div className="form-field">
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

                <div className="form-field">
                    <label htmlFor="duration">Durée</label>
                    <div className="duration-container">
                        <input
                            type="number"
                            id="durationValue"
                            value={durationValue}
                            onChange={(e) => setDurationValue(Number(e.target.value) || '')}
                            placeholder="Durée"
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
                        </select>
                    </div>
                </div>

                <div className="form-field">
                    <label htmlFor="price">Prix (€)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value) || '')}
                        placeholder="Ex: 999"
                        required
                    />
                </div>

                <div className="form-field textarea-field">
                    <label htmlFor="description">Description détaillée</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Décrivez le contenu et les objectifs de la formation..."
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Création en cours...' : 'Créer la formation'}
                </button>
            </form>
        </div>
    );
};

export default CreateFormationPage;