import React from 'react';
import '../assets/Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    error: string | null;
    setPassword: (value: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, error, setPassword }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Supprimer la formation</h2>
                <p>Veuillez entrer le mot de passe pour confirmer la suppression :</p>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>
                        Annuler
                    </button>
                    <button className="confirm-button" onClick={onConfirm}>
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
