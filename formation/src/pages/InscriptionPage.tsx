import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function InscriptionPage() {
    const [formData, setFormData] = useState({
        name: '',
    });

    const {formationId} = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const dataToSubmit = {
            ...formData,
            formationId,
        };

        console.log('Données soumises :', dataToSubmit);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="type">Nom:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">
                Soumettre
            </button>
        </form>
    );
}

export default InscriptionPage;
