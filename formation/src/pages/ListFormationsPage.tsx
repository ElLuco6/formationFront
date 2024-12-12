import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';

interface User {
    id: number;
    name: string;
}

interface Formation {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    users: User[];
}

interface ListFormationsPageProps {
    mockedData: Formation[];
    onRegister: (formationId: number, isRegistered: boolean) => void;
    onDelete: (formationId: number) => void;
    onViewUsers: (formationId: number) => void; // Ajout de cette ligne
    pseudo: string;
}

const ListFormationsPage: React.FC<ListFormationsPageProps> = ({
                                                                   mockedData,
                                                                   onRegister,
                                                                   onDelete,
                                                                   pseudo,
                                                               }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFormationId, setSelectedFormationId] = useState<number | null>(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(''); // État pour la barre de recherche

    const handleOpenModal = (formationId: number) => {
        setSelectedFormationId(formationId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFormationId(null);
        setPassword('');
        setError(null);
    };

    const handleConfirmDelete = () => {
        if (password === '1234') {
            if (selectedFormationId !== null) {
                onDelete(selectedFormationId);
                handleCloseModal();
            }
        } else {
            setError('Mot de passe incorrect.');
        }
    };

    // Filtrer les formations en fonction du terme de recherche
    const filteredFormations = mockedData.filter((formation) => {
        // Si la barre de recherche est vide, afficher toutes les formations
        if (searchTerm === '') return true;

        // Sinon, filtrez les formations par nom d'utilisateur inscrit ou titre de la formation
        return (
            formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formation.users.some((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    });

    return (
        <div className="container">
            {/* Barre de recherche */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher une formation ou un utilisateur inscrit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Liste des formations */}
            {filteredFormations.map((formation) => {
                const isRegistered = formation.users.some((user) => user.name === pseudo);

                return (
                    <Card
                        key={formation.id}
                        id={formation.id}
                        title={formation.title}
                        description={formation.description}
                        price={formation.price}
                        duration={formation.duration}
                        users={formation.users}
                        onRegister={() => onRegister(formation.id, isRegistered)}
                        onDelete={() => handleOpenModal(formation.id)}
                        isRegistered={isRegistered}
                    />
                );
            })}

            {/* Modale pour la suppression */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                error={error}
                setPassword={setPassword}
            />
        </div>
    );
};

export default ListFormationsPage;