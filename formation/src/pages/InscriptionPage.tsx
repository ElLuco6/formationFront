import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/InscriptionPage.css';
import confetti from 'canvas-confetti';

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

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f']
        });
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

            triggerConfetti(); // Déclenche les confettis
            setTimeout(() => {
                navigate('/');
            }, 1500); // Attend 1.5 secondes avant la redirection

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="inscription-container">
            <h2 className="inscription-title">Inscription à la formation</h2>
            <form onSubmit={handleSubmit} className="inscription-form">
                <div className="form-group">
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
                {error && <p className="error-message">{error}</p>}
                <button 
                    type="submit" 
                    className="submit-button" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
            </form>
        </div>
    );
}

export default InscriptionPage;
