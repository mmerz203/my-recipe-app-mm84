// src/components/AddEditRecipeForm.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Modal from './Modal'; // Import Modal component from the same 'components' folder
import OCRInput from './OCRInput'; // Import OCRInput component from the same 'components' folder

const AddEditRecipeForm = ({ initialRecipe, onSave, onCancel }) => {
    const [recipe, setRecipe] = useState(initialRecipe || {
        name: '',
        servings: '',
        ingredients: [],
        instructions: [],
        imageUrl: '',
        category: 'Main Course',
        isPublic: false
    });
    const [ingredientInput, setIngredientInput] = useState('');
    const [instructionInput, setInstructionInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialRecipe?.imageUrl || '');
    const [modal, setModal] = useState({ show: false, title: '', message: '', onConfirm: null, showConfirm: false });

    // Update state when initialRecipe changes (for editing)
    useEffect(() => {
        if (initialRecipe) {
            setRecipe({
                ...initialRecipe,
                ingredients: initialRecipe.ingredients || [],
                instructions: initialRecipe.instructions || []
            });
            setIngredientInput(initialRecipe.ingredients ? initialRecipe.ingredients.join('\n') : '');
            setInstructionInput(initialRecipe.instructions ? initialRecipe.instructions.join('\n') : '');
            setImagePreview(initialRecipe.imageUrl || '');
            setImageFile(null);
        } else {
            setRecipe({
                name: '',
                servings: '',
                ingredients: [],
                instructions: [],
                imageUrl: '',
                category: 'Main Course',
                isPublic: false
            });
            setIngredientInput('');
            setInstructionInput('');
            setImagePreview('');
            setImageFile(null);
        }
    }, [initialRecipe]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(recipe.imageUrl || ''); // Revert to existing image if no new file
        }
    };

    const handleIngredientInput = (e) => {
        setIngredientInput(e.target.value);
        setRecipe(prev => ({ ...prev, ingredients: e.target.value.split('\n').filter(line => line.trim() !== '') }));
    };

    const handleInstructionInput = (e) => {
        setInstructionInput(e.target.value);
        setRecipe(prev => ({ ...prev, instructions: e.target.value.split('\n').filter(line => line.trim() !== '') }));
    };

    const handleRecipeParsedFromOCR = (parsedRecipe) => {
        setRecipe(prev => ({
            ...prev,
            name: parsedRecipe.name || prev.name,
            servings: parsedRecipe.servings || prev.servings,
            ingredients: parsedRecipe.ingredients || prev.ingredients,
            instructions: parsedRecipe.instructions || prev.instructions
        }));
        setIngredientInput(parsedRecipe.ingredients ? parsedRecipe.ingredients.join('\n') : ingredientInput);
        setInstructionInput(parsedRecipe.instructions ? parsedRecipe.instructions.join('\n') : instructionInput);

        setModal({
            show: true,
            title: "OCR Successful",
            message: "Recipe details have been extracted. Please review and edit if necessary.",
            onClose: () => setModal({ ...modal, show: false })
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // In a real app, image upload to storage (e.g., Firebase Storage) would happen here
        // For this demo, if a new image file is selected, we'll store its Data URL directly
        let finalImageUrl = recipe.imageUrl;
        if (imageFile) {
            finalImageUrl = imagePreview; // Data URL from preview
        }

        const recipeToSave = {
            ...recipe,
            servings: parseFloat(recipe.servings) || 1, // Ensure servings is a number
            imageUrl: finalImageUrl,
            ingredients: ingredientInput.split('\n').filter(line => line.trim() !== ''),
            instructions: instructionInput.split('\n').filter(line => line.trim() !== '')
        };
        onSave(recipeToSave);
    };

    const categories = ['Appetizer', 'Main Course', 'Side Dish', 'Dessert', 'Breakfast', 'Soup', 'Salad', 'Drink', 'Baking', 'Other'];

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl mb-6 border border-gray-200">
            <Modal
                show={modal.show}
                title={modal.title}
                message={modal.message}
                onClose={modal.onClose}
                onConfirm={modal.onConfirm}
                showConfirm={modal.showConfirm}
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{initialRecipe ? 'Edit Recipe' : 'Add New Recipe'} (Recipe Input)</h2>

            <OCRInput onRecipeParsed={handleRecipeParsedFromOCR} />

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 text-base font-bold mb-2">Recipe Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={recipe.name}
                        onChange={handleChange}
                        required
                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                        placeholder="e.g., Classic Spaghetti Carbonara"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-gray-700 text-base font-bold mb-2">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={recipe.category}
                        onChange={handleChange}
                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="servings" className="block text-gray-700 text-base font-bold mb-2">Servings (Original):</label>
                    <input
                        type="text"
                        id="servings"
                        name="servings"
                        value={recipe.servings}
                        onChange={handleChange}
                        placeholder="e.g., 4, 6-8, 12"
                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                </div>

                <div>
                    <label htmlFor="ingredients" className="block text-gray-700 text-base font-bold mb-2">Ingredients (one per line):</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={ingredientInput}
                        onChange={handleIngredientInput}
                        rows="8"
                        required
                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                        placeholder="e.g.,
1 cup all-purpose flour
2 large eggs
1/2 teaspoon salt"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="instructions" className="block text-gray-700 text-base font-bold mb-2">Instructions (one step per line):</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={instructionInput}
                        onChange={handleInstructionInput}
                        rows="8"
                        required
                        className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                        placeholder="e.g.,
Preheat oven to 375°F (190°C).
In a large bowl, whisk together flour and sugar."
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-gray-700 text-base font-bold mb-2">Recipe Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-700
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-100 file:text-green-700
                                    hover:file:bg-green-200 cursor-pointer mb-2"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Recipe Preview" className="mt-4 max-w-full h-48 object-cover rounded-lg shadow-md border border-gray-200" />
                    )}
                    <p className="text-xs text-gray-500 mt-1">If no image uploaded, a default placeholder will be used.</p>
                </div>

                <div className="flex items-center pt-4">
                    <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        checked={recipe.isPublic}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-green-600 rounded-md border-gray-300 focus:ring-green-500"
                    />
                    <label htmlFor="isPublic" className="ml-3 text-gray-700 text-base font-bold">Make Public (Shareable with other users)</label>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-7 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-7 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md font-semibold"
                    >
                        Save Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditRecipeForm; // Add this line