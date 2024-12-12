import React from 'react';
import Card from '../components/Card';

interface DataItem {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
}

interface ListFormationsPageProps {
    mockedData: DataItem[];
}

const ListFormationsPage: React.FC<ListFormationsPageProps> = ({ mockedData }) => {
    return (
        <div className="container">
            <div className="formationsList">
                <h1>Liste des formations</h1>
                <div>
                    {mockedData.map((formation) => (
                        <Card
                            key={formation.id}
                            title={formation.title}
                            description={formation.description}
                            price={formation.price}
                            duration={formation.duration}
                            id={formation.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListFormationsPage;