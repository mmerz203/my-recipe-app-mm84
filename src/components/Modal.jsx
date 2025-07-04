// src/components/Modal.jsx
import React from "react";
import Button from "./ui/Button";

const Modal = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
  showConfirm = false,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-text-dark/75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 backdrop-blur-sm">
      <div className="bg-card p-8 rounded-3xl shadow-2xl w-full max-w-md transform scale-100 border border-border-theme animate-scale-in">
        <h3 className="text-2xl font-bold mb-4 text-text-dark font-sans">
          {title}
        </h3>
        <div className="text-text-dark mb-6 leading-relaxed font-sans">
          {message}
        </div>
        <div className="flex justify-end gap-3">
          {showConfirm && (
            <Button onClick={onConfirm} variant="secondary">
              Confirm
            </Button>
          )}
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
