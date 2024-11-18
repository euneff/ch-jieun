import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // 모달이 열리지 않았을 경우 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ✖
                </button>
                <h2 className="modal-title">{title}</h2>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;