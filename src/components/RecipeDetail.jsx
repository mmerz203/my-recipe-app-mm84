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
      <main
        style={{
          maxWidth: "1152px",
          margin: "auto",
          padding: "64px 16px",
          minHeight: "calc(100vh - 64px)",
          background: "var(--color-background)",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(4px)",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "rgba(var(--color-text-rgb), 0.7)",
              margin: "0 0 24px 0",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Recipe not found.
          </p>
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
    <main
      style={{
        maxWidth: "1152px",
        margin: "auto",
        padding: "64px 16px",
        minHeight: "calc(100vh - 64px)",
        background: "var(--color-background)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(4px)",
          borderRadius: "12px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "32px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Button
            onClick={onBack}
            variant="outline"
            size="md"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              style={{ width: "20px", height: "20px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "var(--color-text)",
                  opacity: 0.7,
                  marginBottom: "16px",
                  fontSize: "16px",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                }}
              >
                You can share this recipe using the ID below:
              </p>
              <input
                type="text"
                ref={shareLinkRef}
                readOnly
                value={generateShareLink()}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  background: "rgba(0, 0, 0, 0.05)",
                  fontFamily: "ui-monospace, monospace",
                }}
              />
              <Button
                onClick={handleCopyLink}
                variant="primary"
                size="sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2.5a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-10A2.5 2.5 0 016 17.5v-10A2.5 2.5 0 018.5 5h-2z"
                  />
                </svg>
                {copyMessage || "Copy Link"}
              </Button>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--color-text)",
                  opacity: 0.5,
                  marginTop: "8px",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                }}
              >
                Note: For a fully functional shareable link on a live website,
                this would be a direct URL.
              </p>
            </div>
          }
          onClose={() => setShowShareModal(false)}
        />

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "var(--color-text)",
            marginBottom: "16px",
            textAlign: "center",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {recipe.name}
        </h1>
        <p
          style={{
            color: "var(--color-text)",
            opacity: 0.7,
            textAlign: "center",
            marginBottom: "32px",
            fontSize: "16px",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Category: <span style={{ fontWeight: "600" }}>{recipe.category}</span>
        </p>

        {recipe.imageUrl && (
          <div
            style={{
              marginBottom: "32px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              style={{
                width: "100%",
                height: "384px",
                objectFit: "cover",
              }}
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

        <div
          style={{
            marginBottom: "32px",
            background: "rgba(255, 255, 255, 0.3)",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "var(--color-text)",
              marginBottom: "16px",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Ingredients:
          </h3>
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "20px",
              color: "var(--color-text)",
              lineHeight: "1.6",
            }}
          >
            {recipe.ingredients &&
              recipe.ingredients.map((ing, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "4px",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {ing}
                </li>
              ))}
          </ul>
        </div>

        <div
          style={{
            marginBottom: "32px",
            background: "rgba(255, 255, 255, 0.3)",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "var(--color-text)",
              marginBottom: "16px",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Instructions:
          </h3>
          <ol
            style={{
              listStyleType: "decimal",
              paddingLeft: "20px",
              color: "var(--color-text)",
              lineHeight: "1.6",
            }}
          >
            {recipe.instructions &&
              recipe.instructions.map((inst, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {inst}
                </li>
              ))}
          </ol>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Button
            onClick={() => setShowShareModal(true)}
            variant="outline"
            size="md"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              style={{ width: "20px", height: "20px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "var(--color-text)",
            opacity: 0.5,
            marginTop: "24px",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          Recipe created by User ID:{" "}
          <span style={{ wordBreak: "break-all" }}>{recipe.userId}</span>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail; // Add this line
