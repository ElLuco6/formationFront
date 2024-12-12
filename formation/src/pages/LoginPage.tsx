import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/LoginPage.css";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://10.31.34.188:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const userLocalString = localStorage.getItem("user");
  let userLocal = null;

  if (userLocalString) {
    userLocal = JSON.parse(userLocalString);
  }
  const Disconnect = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      {!userLocal ? (
        <>
          <div className="container">
            <h1 className="title">Connexion</h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="inputGroup">
                <label htmlFor="name" className="label">
                  Nom:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input"
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="password" className="label">
                  Mot de passe:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
              </div>
              {error && <div className="error">{error}</div>}
              <button type="submit" disabled={isSubmitting} className="button">
                {isSubmitting ? "Connexion ..." : "Connexion"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="button register-button"
              >
                Créer un compte
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="container" style={{ gap: "30px" }}>
          <button type="submit" className="button" onClick={() => Disconnect()}>
            Voulez vous vraiment vous deconnecter ?
          </button>

          <button
            type="submit"
            className="button"
            onClick={() => navigate("/")}
          >
            Retour à la page d'accueil
          </button>
        </div>
      )}
    </>
  );
};

export default LoginPage;
