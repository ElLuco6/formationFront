import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import CreateFormationPage from "./pages/CreateFormationPage";
import CreateClassesPage from "./pages/CreateClassesPage";
import ListFormationsPage from "./pages/ListFormationsPage";
import InscriptionPage from "./pages/InscriptionPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const navigate = useNavigate();
  const userLocalString = localStorage.getItem("user");
  let userLocal: any = null;

  if (userLocalString) {
    userLocal = JSON.parse(userLocalString);
  }
  return (
    <div className="App">
      {/* Navbar */}
      <div className="navbar">
        <h1 onClick={() => navigate("/")}>Plateforme de Formation</h1>
        {userLocal?.isAdmin ? (
          <button onClick={() => navigate("/createformationpage")}>
            Créer une Formation
          </button>
        ) : null}
        <button onClick={() => navigate(!userLocal ? "/login" : "/disconnect")}>
          {!userLocal ? "Login" : "Disconnect"}
        </button>

        {/* <button onClick={() => navigate('/createclassespage')}>Créer une Classe</button> */}
      </div>

      {/* Home Content */}
      <Routes>
        <Route path="/" element={<ListFormationsPage />} />
        {userLocal?.isAdmin ? (
          <>
            <Route
              path="/createformationpage"
              element={<CreateFormationPage />}
            />
            <Route
              path="/createclassespage/:formationId"
              element={<CreateClassesPage />}
            />
          </>
        ) : null}
        <Route path="/inscription/:formationId" element={<InscriptionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/disconnect" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
