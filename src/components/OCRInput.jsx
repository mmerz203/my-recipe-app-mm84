// src/components/OCRInput.jsx
import React, { useState, useRef } from "react";
import Button from "./ui/Button";

const OCRInput = ({ onRecipeParsed }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };

  const extractRecipe = async () => {
    if (!image) {
      setMessage("Please upload an image first.");
      return;
    }

    setLoading(true);
    setMessage("Extracting recipe...");

    const base64ImageData = image.split(",")[1];

    // Updated prompt to include description, prepTime, cookTime
    const prompt = `Extract the recipe details from this image. Provide the output as a JSON object with the following structure:
{
  "name": "Recipe Name",
  "description": "Short description of the recipe (optional)",
  "prepTime": "Preparation time (e.g., 15 min, 1 hour)",
  "cookTime": "Cooking time (e.g., 30 min, 2 hours)",
  "servings": "Number of servings (e.g., 4, 6-8)",
  "ingredients": [
    "Ingredient 1",
    "Ingredient 2"
  ],
  "instructions": [
    "Step 1",
    "Step 2"
  ]
}
If a field is not found, use an empty string for any string field, and empty arrays for "ingredients" or "instructions".`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/png", // Assuming image is PNG or JPEG
                data: base64ImageData,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            description: { type: "STRING" },
            prepTime: { type: "STRING" },
            cookTime: { type: "STRING" },
            servings: { type: "STRING" },
            ingredients: { type: "ARRAY", items: { type: "STRING" } },
            instructions: { type: "ARRAY", items: { type: "STRING" } },
          },
          propertyOrdering: [
            "name",
            "description",
            "prepTime",
            "cookTime",
            "servings",
            "ingredients",
            "instructions",
          ],
        },
      },
    };

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // This line uses your API key from .env
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const jsonText = result.candidates[0].content.parts[0].text;
        const parsedRecipe = JSON.parse(jsonText);
        onRecipeParsed(parsedRecipe);
        setMessage("Recipe extracted successfully!");
        setImage(null); // Clear image after successful extraction
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear file input
        }
        setMessage(""); // Instantly remove the OCR prompt/message
      } else {
        setMessage("Could not extract recipe. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessage("Error extracting recipe. Please try again.");
    } finally {
      // <--- This 'finally' block is correctly closed with its own brace
      setLoading(false);
    } // <--- This is the closing brace for the extractRecipe function
  }; // <--- This is the closing brace for the extractRecipe function

  return (
    <div className="w-full space-y-4">
      {/* File Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-dark font-sans">
          Upload Recipe Image
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            disabled={loading}
            className="w-full text-sm text-text-dark file:mr-3 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-brand file:text-white hover:file:bg-primary-brand/90 file:cursor-pointer cursor-pointer border border-neutral-subtle rounded-lg p-3 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors min-h-[48px] flex items-center"
          />
        </div>
      </div>

      {/* Image Preview Section */}
      {image && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-text-dark font-sans">
              Preview
            </label>
            <button
              type="button"
              onClick={() => {
                setImage(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="text-xs text-neutral-subtle hover:text-error transition-colors"
            >
              Remove
            </button>
          </div>
          <div className="relative rounded-lg overflow-hidden border border-neutral-subtle bg-white/50">
            <img
              src={image}
              alt="Recipe preview"
              className="w-full h-auto max-h-40 sm:max-h-48 lg:max-h-64 object-contain bg-white"
            />
          </div>
        </div>
      )}

      {/* Extract Button */}
      <Button
        onClick={extractRecipe}
        disabled={loading || !image}
        variant="primary"
        size="md"
        className="w-full min-h-[48px]"
      >
        {loading ? "Extracting..." : "Extract Recipe"}
      </Button>

      {/* Message Display */}
      {message && (
        <div className="p-3 rounded-lg bg-primary-brand/10 border border-primary-brand/20 text-text-dark text-sm font-sans">
          {message}
        </div>
      )}
    </div>
  );
};

export default OCRInput;
