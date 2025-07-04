// src/components/RecipeDetail.jsx
import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Modal from "./Modal";
import ServingSizeConverter from "./ServingSizeConverter";
import { formatFraction } from "../utils/helpers";
import Button from "./ui/Button";

const RecipeDetail = ({ recipe, onBack, onEdit, currentTheme }) => {
  const { userId } = useContext(AuthContext);
  const [showShareModal, setShowShareModal] = useState(false);
  const shareLinkRef = useRef(null);
  const [copyMessage, setCopyMessage] = useState("");

  if (!recipe) {
    return (
      <main className="max-w-5xl mx-auto py-16 px-4 min-h-[calc(100vh-64px)] bg-background">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-black/10 p-8 text-center shadow-sm">
          <p className="text-lg text-text-dark/70 mb-6 font-sans">Recipe not found.</p>
          <Button onClick={onBack} variant="secondary" size="md">
            ← Back to List
          </Button>
        </div>
      </main>
    );
  }

  // Use the actual appId from your environment.
  const appId = import.meta.env.VITE_APP_ID; // Assuming appId is consistently accessible

  const generateShareLink = () => {
    return `Recipe ID: ${recipe.id} (App ID: <span class="math-inline">\{appId\}</span>{recipe.isPublic ? ', Public' : ', Private: ' + userId})`;
  };

  const handleCopyLink = () => {
    if (shareLinkRef.current) {
      shareLinkRef.current.select();
      document.execCommand("copy");
      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-16 px-4 min-h-[calc(100vh-64px)] bg-background font-sans">
      <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-black/10 p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/10 flex-wrap gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="md"
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Recipes
          </Button>
          {recipe.userId === userId && (
            <Button
              onClick={onEdit}
              variant="primary"
              size="md"
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L15.232 5.232z"
                />
              </svg>
              Edit Recipe
            </Button>
          )}
        </div>

        <Modal
          show={showShareModal}
          title="Share Recipe"
          message={
            <div className="flex flex-col items-center">
              <p className="text-base text-text-dark/70 mb-4 font-sans">You can share this recipe using the ID below:</p>
              <input
                type="text"
                ref={shareLinkRef}
                readOnly
                value={generateShareLink()}
                className="w-full px-3 py-2 border border-black/20 rounded-lg mb-3 text-sm bg-black/5 font-mono"
              />
              <Button
                onClick={handleCopyLink}
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2.5a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-10A2.5 2.5 0 016 17.5v-10A2.5 2.5 0 018.5 5h-2z"
                  />
                </svg>
                {copyMessage || "Copy Link"}
              </Button>
              <p className="text-xs text-text-dark/50 mt-2 font-sans">
                Note: For a fully functional shareable link on a live website, this would be a direct URL.
              </p>
            </div>
          }
          onClose={() => setShowShareModal(false)}
        />

        <h1 className="text-3xl font-bold text-text-dark mb-4 text-center font-sans">{recipe.name}</h1>
        <p className="text-base text-text-dark/70 text-center mb-8 font-sans">
          Category: <span className="font-semibold">{recipe.category}</span>
        </p>

        {recipe.imageUrl && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/800x600/D4EDDA/3C8A4B?text=Recipe+Image`;
              }}
            />
          </div>
        )}

        <ServingSizeConverter
          ingredients={recipe.ingredients}
          originalServings={parseFloat(recipe.servings)}
          isBakingRecipe={
            recipe.isBakingRecipe !== undefined ? recipe.isBakingRecipe : true
          }
        />

        <div className="mb-8 bg-white/30 p-6 rounded-xl border border-black/10 shadow-inner">
          <h3 className="text-xl font-semibold text-text-dark mb-4 font-sans">Ingredients:</h3>
          <ul className="list-disc pl-5 text-text-dark leading-relaxed">
            {recipe.ingredients &&
              recipe.ingredients.map((ing, index) => (
                <li key={index} className="mb-1 font-sans">{ing}</li>
              ))}
          </ul>
        </div>

        <div className="mb-8 bg-white/30 p-6 rounded-xl border border-black/10 shadow-inner">
          <h3 className="text-xl font-semibold text-text-dark mb-4 font-sans">Instructions:</h3>
          <ol className="list-decimal pl-5 text-text-dark leading-relaxed">
            {recipe.instructions &&
              recipe.instructions.map((inst, index) => (
                <li key={index} className="mb-2 font-sans">{inst}</li>
              ))}
          </ol>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setShowShareModal(true)}
            variant="outline"
            size="md"
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 115.367 2.684 3 3 0 01-5.367-2.684zm-7.316 2.684c0 .482.114.938.316 1.342m-.316-1.342a3 3 0 100 2.684m0-2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 115.367 2.684 3 3 0 01-5.367-2.684z"
              />
            </svg>
            Share Recipe
          </Button>
        </div>
        <div className="text-center text-sm text-text-dark/50 mt-6 font-mono">
          Recipe created by User ID: <span className="break-all">{recipe.userId}</span>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail; // Add this line
