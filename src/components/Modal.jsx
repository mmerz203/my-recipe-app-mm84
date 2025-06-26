// src/components/Modal.jsx
import React from 'react';
import Button from './Button';

const Modal = ({ show, title, message, onClose, onConfirm, showConfirm = false }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm transform scale-100 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
                <div className="flex justify-end space-x-3">
                    {showConfirm && (
                        <Button
                            onClick={onConfirm}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        >
                            Confirm
                        </Button>
                    )}
                    <Button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-300"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
