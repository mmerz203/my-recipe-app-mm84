// src/components/RecipeList.jsx
import React, { useState, useContext } from 'react';
import { RecipeContext } from '../contexts/RecipeContext'; // Import RecipeContext
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import LoadingSpinner from './LoadingSpinner'; // Import LoadingSpinner (from same folder)
import Modal from './Modal'; // Import Modal (from same folder)

const RecipeList = ({ onSelectRecipe, onAddRecipe, onBackToHome }) => {
    const { recipes, loading, error, deleteRecipe } = useContext(RecipeContext);
    const { userId } = useContext(AuthContext);
    const [filterCategory, setFilterCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [modal, setModal] = useState({ show: false, title: '', message: '', onConfirm: null, showConfirm: false });
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Appetizer', 'Main Course', 'Side Dish', 'Dessert', 'Breakfast', 'Soup', 'Salad', 'Drink', 'Baking', 'Other'];

    const filteredAndSortedRecipes = recipes
        .filter(recipe => {
            const matchesCategory = filterCategory === 'All' || recipe.category === filterCategory;
            const matchesSearch = searchTerm.trim() === '' ||
                                    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())));
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === 'category') {
                return a.category.localeCompare(b.category);
            }
            if (sortBy === 'newest') {
                return (b.createdAt || 0) - (a.createdAt || 0);
            }
            return 0;
        });

    const handleDeleteClick = (recipe) => {
        setRecipeToDelete(recipe);
        setModal({
            show: true,
            title: "Confirm Delete",
            message: `Are you sure you want to delete "${recipe.name}"? This action cannot be undone.`,
            onClose: () => setModal({ ...modal, show: false, showConfirm: false }),
            onConfirm: () => {
                deleteRecipe(recipe.id, recipe.type === 'public');
                setModal({ ...modal, show: false, showConfirm: false });
            },
            showConfirm: true
        });
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg shadow-md">Error: {error}</div>;

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl min-h-[80vh] flex flex-col">
            <Modal
                show={modal.show}
                title={modal.title}
                message={modal.message}
                onClose={modal.onClose}
                onConfirm={modal.onConfirm}
                showConfirm={modal.showConfirm}
            />

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <button
                    onClick={onBackToHome}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition ease-in-out duration-150 shadow-md font-semibold flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Home
                </button>
                <h2 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight flex-grow ml-4">All Recipes</h2>
                <button
                    onClick={onAddRecipe}
                    className="px-7 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md font-semibold flex-shrink-0 flex items-center justify-center w-full md:w-auto ml-4"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Add New Recipe
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search recipes by name or ingredient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-150 w-full md:max-w-sm"
                />

                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <label htmlFor="filterCategory" className="text-gray-700 font-medium whitespace-nowrap">Category:</label>
                    <select
                        id="filterCategory"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm flex-grow bg-white"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <label htmlFor="sortBy" className="text-gray-700 font-medium whitespace-nowrap">Sort By:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm flex-grow bg-white"
                    >
                        <option value="newest">Newest</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="category">Category</option>
                    </select>
                </div>
            </div>

            {filteredAndSortedRecipes.length === 0 ? (
                <p className="text-center text-gray-600 text-lg mt-10 p-6 bg-gray-50 rounded-lg shadow-inner">
                    No recipes found matching your criteria. Start by adding a new one or adjust your filters!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 flex-grow">
                    {filteredAndSortedRecipes.map(recipe => (
                        <div
                            key={recipe.id}
                            className="bg-gray-50 border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                        >
                            <div className="relative w-full h-52 bg-gray-200 overflow-hidden cursor-pointer" onClick={() => onSelectRecipe(recipe.id)}>
                                <img
                                    src={recipe.imageUrl || `https://placehold.co/600x400/D4EDDA/3C8A4B?text=Recipe+Image`}
                                    alt={recipe.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/D4EDDA/3C8A4B?text=Recipe+Image`; }}
                                />
                                {recipe.isPublic && (
                                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md z-10">Public</span>
                                )}
                                {recipe.userId && recipe.userId === userId && (
                                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md z-10">My Recipe</span>
                                )}
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-green-700 transition duration-150" onClick={() => onSelectRecipe(recipe.id)}>{recipe.name}</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Category: <span className="font-semibold text-gray-700">{recipe.category}</span></p>
                                <div className="flex justify-end gap-3 mt-auto">
                                    {recipe.userId && recipe.userId === userId && (
                                        <>
                                            <button
                                                onClick={() => onSelectRecipe(recipe.id, true)}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md text-sm flex items-center justify-center"
                                                title="Edit Recipe"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L15.232 5.232z"></path></svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(recipe)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md text-sm flex items-center justify-center"
                                                title="Delete Recipe"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList; // Add this line