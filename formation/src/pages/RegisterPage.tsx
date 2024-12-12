import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/RegisterPage.css';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://10.31.34.188:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password, admin }),
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            // Show snackbar and redirect to login page
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
                navigate('/login');
            }, 3000);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Register</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="inputGroup">
                    <label htmlFor="nom" className="label">Nom:</label>
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
                    <label htmlFor="password" className="label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="adminCode"  className="label">Admin Code:</label>
                    <input
                        type="password"
                        id="adminCode"
                        onChange={(e) => setAdmin(e.target.value === '1234')}
                        className="input"
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="admin">Admin:</label>
                    <input
                        type="checkbox"
                        id="admin"
                        checked={admin}
                        onChange={(e) => setAdmin(e.target.checked)}
                        disabled
                        className="input"
                    />
                </div>
                
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={isSubmitting} className="button">
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
                <button type="button" onClick={() => navigate('/login')} className="button login-button">
                    Se connecter
                </button>
            </form>
            {showSnackbar && <div className="snackbar">Registration successful!</div>}

        </div>
    );
};

export default RegisterPage;