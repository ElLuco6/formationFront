import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const ListFormationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formationData = { title, description };

        try {
            const response = await fetch('/createformation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formationData),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la création de la formation.');
            }

            // Rediriger vers la page d'accueil après un succès
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Formations fictives
    const fakeFormations = [
      { id: 1, title: 'React pour les Débutants', description: 'Apprenez les bases de React.' },
      { id: 2, title: 'TypeScript Avancé', description: 'Approfondissez vos connaissances de TypeScript.' },
      { id: 3, title: 'Design UI/UX', description: 'Créer des interfaces attrayantes et ergonomiques.' },
  ];

    return (
        <div className="container">
          <div className="formationsList">
            <h1>Liste des formations</h1>
            <div>
              <div className="card-section">
                {fakeFormations.map((formation) => (
                  <Card
                    key={formation.id}
                    title={formation.title}
                    description={formation.description}
                    price={20}
                    duration={1.5}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
    );
};

export default ListFormationsPage;
