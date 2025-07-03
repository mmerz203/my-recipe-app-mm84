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
    <div className="fixed inset-0 bg-winsome-text-dark bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-winsome-background p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-winsome-border-subtle">
        <h3 className="text-lg font-bold mb-4 text-winsome-text-dark">
          Duplicate Recipe Name
        </h3>
        <p className="mb-6 text-winsome-text-dark">
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
