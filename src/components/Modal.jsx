// src/components/Modal.jsx
import React from 'react';

const Modal = ({ show, title, message, onClose, onConfirm, showConfirm = false }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm transform scale-100 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
                <div className="flex justify-end space-x-3">
                    {showConfirm && (
                        <button
                            onClick={onConfirm}
                            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md font-semibold"
                        >
                            Confirm
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal; // Add this line
