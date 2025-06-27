// src/components/OCRInput.jsx
import React, { useState, useRef } from 'react';
import Button from './Button';

const OCRInput = ({ onRecipeParsed }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            setMessage('');
        }
    };

    const extractRecipe = async () => {
        if (!image) {
            setMessage('Please upload an image first.');
            return;
        }

        setLoading(true);
        setMessage('Extracting recipe...');

        const base64ImageData = image.split(',')[1];

        // This is the corrected prompt string with proper backtick termination
        const prompt = `Extract the recipe details from this image. Provide the output as a JSON object with the following structure:
{
  "name": "Recipe Name",
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
If a field is not found, use an empty string for "name" or "servings", and empty arrays for "ingredients" or "instructions".`;

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
                                data: base64ImageData
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "name": { "type": "STRING" },
                        "servings": { "type": "STRING" },
                        "ingredients": { "type": "ARRAY", "items": { "type": "STRING" } },
                        "instructions": { "type": "ARRAY", "items": { "type": "STRING" } }
                    },
                    "propertyOrdering": ["name", "servings", "ingredients", "instructions"]
                }
            }
        };

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // This line uses your API key from .env
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const jsonText = result.candidates[0].content.parts[0].text;
                const parsedRecipe = JSON.parse(jsonText);
                onRecipeParsed(parsedRecipe);
                setMessage('Recipe extracted successfully!');
                setImage(null); // Clear image after successful extraction
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Clear file input
                }
                setMessage(''); // Instantly remove the OCR prompt/message
            } else {
                setMessage('Could not extract recipe. Please try again.');
                console.error("Gemini API response structure unexpected:", result);
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setMessage('Error extracting recipe. Please try again.');
        } finally { // <--- This 'finally' block is correctly closed with its own brace
            setLoading(false);
        } // <--- This is the closing brace for the extractRecipe function
        }; // <--- This is the closing brace for the extractRecipe function
    
        return (
            <div className="ocr-input">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    disabled={loading}
                />
                {image && (
                    <div>
                        <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
                    </div>
                )}
                <Button onClick={extractRecipe} disabled={loading || !image} className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 w-full mt-4">
                    {loading ? 'Extracting...' : 'Extract Recipe'}
                </Button>
                {message && <div className="ocr-message">{message}</div>}
            </div>
        );
    };
    
    export default OCRInput;