import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateClassesPage() {
    const [formData, setFormData] = useState({
        type: '',
        date: Date.now(),
        nbEleves: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {formationId} = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'nbEleves' ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        // Ajouter le fuseau horaire pour générer un ISO 8601 complet
        const dateISO = formData.date ? new Date(formData.date).toISOString() : null;

        const dataToSubmit = {
            ...formData,
            date: dateISO, // Remplace la date saisie par le format ISO 8601
            formationId: Number(formationId), // Inclure formationId dans la requête
        };

        try {
            const response = await fetch('http://localhost:3001/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la création de la session.');
            }

            const result = await response.json();
            setSuccessMessage('Session créée avec succès!');
            console.log('Session créée :', result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="nbEleves">Nombre d'Élèves:</label>
                <input
                    type="number"
                    id="nbEleves"
                    name="nbEleves"
                    value={formData.nbEleves}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Créer la Session'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
    );
}

export default CreateClassesPage;