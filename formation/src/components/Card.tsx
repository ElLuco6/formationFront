import React from 'react';

interface User {
    id: number;
    name: string;
}

interface CardProps {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    users: User[];
    onRegister: () => void;
    onDelete: () => void;
    isRegistered: boolean;
}

const Card: React.FC<CardProps> = ({
                                       id,
                                       title,
                                       description,
                                       price,
                                       duration,
                                       users,
                                       onRegister,
                                       onDelete,
                                       isRegistered,
                                   }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p><strong>Prix :</strong> {price} €</p>
            <p><strong>Durée :</strong> {duration} heures</p>
            <h3>Utilisateurs inscrits :</h3>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Aucun utilisateur inscrit.</p>
            )}
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                    onClick={onRegister}
                    className={isRegistered ? 'desinscrire' : 'inscrire'}
                >
                    {isRegistered ? 'Se désinscrire' : "S'inscrire"}
                </button>
                <button
                    onClick={onDelete}
                    style={{ background: '#dc3545', color: 'white' }}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default Card;