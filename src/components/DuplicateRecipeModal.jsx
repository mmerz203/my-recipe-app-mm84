import React from "react";
import Button from "./ui/Button";

const DuplicateRecipeModal = ({
  show,
  recipeName,
  onClose,
  onRename,
  onOverwrite,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-text-dark/75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-card p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-border-theme animate-scale-in">
        <h3 className="text-xl font-bold mb-4 text-text-dark font-sans">
          Duplicate Recipe Name
        </h3>
        <p className="mb-6 text-text-dark font-sans">
          A recipe named <strong>{recipeName}</strong> already exists. What
          would you like to do?
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={onRename} className="w-full">
            Rename New Recipe
          </Button>

          <Button variant="secondary" onClick={onOverwrite} className="w-full">
            Overwrite Existing
          </Button>

          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateRecipeModal;
