import React from 'react';
import './formationList.css';
import Card from './Card';


function FormationList() {
  return (
    <div className="formationsList">
      <h1>Liste des formations</h1>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <Card
          title="Cours de Yoga"
          description="Un moment de relaxation et de bien-être pour tous les niveaux."
          price={20}
          duration={1.5}
        />
      </div>
    </div>
  );
}

export default FormationList;
