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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(16, 8, 43, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 50,
        transition: 'opacity 0.3s',
      }}
    >
      <div
        style={{
          background: 'var(--color-card)',
          padding: '2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          width: '100%',
          maxWidth: '24rem',
          transform: 'scale(1)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text)' }}>{title}</h3>
        <div style={{ color: 'var(--color-text)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{message}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
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
