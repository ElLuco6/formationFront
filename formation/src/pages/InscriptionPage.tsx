import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
}

function InscriptionPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const {formationId} = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`http://10.31.34.188:3001/formations/${formationId}/registeredNames`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    registeredName: formData.name
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'inscription");
            }

            // Redirection vers la page d'accueil après succès
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nom:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
        </form>
    );
}

export default InscriptionPage;
