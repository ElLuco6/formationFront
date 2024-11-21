import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateClassesPage() {
    const [formData, setFormData] = useState({
        psw: '',
        type: '',
        title: '',
        duration: '',
        description: '',
        price: '',
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
                <label htmlFor="psw">Mot de passe Admin:</label>
                <input
                    type="password"
                    id="psw"
                    name="psw"
                    value={formData.psw}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="title">Titre:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="duration">Durée:</label>
                <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">Prix:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={formData.psw !== '1234'}>
                Soumettre
            </button>
        </form>
    );
}

export default CreateClassesPage;
