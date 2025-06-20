// src/components/ServingSizeConverter.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { parseFraction, formatFraction, parseIngredient } from '../utils/helpers';

const ServingSizeConverter = ({ ingredients, originalServings }) => {
    const [currentServings, setCurrentServings] = useState(originalServings || 1);
    const [convertedIngredients, setConvertedIngredients] = useState([]);

    // IMPORTANT: Added `convertIngredients` to the dependency array of this useEffect
    useEffect(() => {
        const safeOriginalServings = parseFloat(originalServings) || 1;
        if (ingredients) {
            setCurrentServings(safeOriginalServings);
            convertIngredients(safeOriginalServings, safeOriginalServings);
        }
    }, [ingredients, originalServings, convertIngredients]);

    // IMPORTANT: Added `parseFraction`, `formatFraction`, `parseIngredient` to the dependency array of this useCallback
    const convertIngredients = useCallback((newServings, initialServings) => {
        const safeInitialServings = parseFloat(initialServings) || 1;
        if (!ingredients || newServings <= 0) {
            setConvertedIngredients(ingredients ? ingredients.map(ing => parseIngredient(ing)) : []);
            return;
        }

        const conversionFactor = newServings / safeInitialServings;

        const newConverted = ingredients.map(line => {
            const parsed = parseIngredient(line);
            if (!parsed || !parsed.quantity) return parsed;

            try {
                const numericalQuantity = parseFraction(parsed.quantity);
                const newNumericalQuantity = numericalQuantity * conversionFactor;
                const newFormattedQuantity = formatFraction(newNumericalQuantity);

                return {
                    ...parsed,
                    quantity: newFormattedQuantity,
                    original: `${newFormattedQuantity} ${parsed.unit} ${parsed.item}`.trim()
                };
            } catch (e) {
                console.warn(`Could not parse/convert ingredient: "${line}"`, e);
                return parsed;
            }
        });
        setConvertedIngredients(newConverted);
    }, [ingredients, parseFraction, formatFraction, parseIngredient]);

    const handleServingsChange = (e) => {
        const value = e.target.value;
        const newServings = parseFloat(value);
        if (!isNaN(newServings) && newServings >= 0) {
            setCurrentServings(newServings);
            convertIngredients(newServings, parseFloat(originalServings) || 1);
        } else if (value === '') {
            setCurrentServings('');
            setConvertedIngredients(ingredients ? ingredients.map(ing => parseIngredient(ing)) : []);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg mb-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Adjust Serving Size
            </h3>
            <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="servings" className="text-gray-700 font-medium whitespace-nowrap">Current Servings:</label>
                <input
                    type="number"
                    id="servings"
                    value={currentServings}
                    onChange={handleServingsChange}
                    min="1"
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-150"
                />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner max-h-60 overflow-y-auto">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Ingredients for {formatFraction(currentServings)} servings:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1.5">
                    {convertedIngredients.length > 0 ? (
                        convertedIngredients.map((ing, index) => (
                            <li key={index} className="text-base">
                                {ing.quantity && ing.quantity !== '0' ? (
                                    <>
                                        <span className="font-bold text-green-800">{ing.quantity}</span>{' '}
                                        {ing.unit && <span className="text-green-700">{ing.unit} </span>}
                                        {ing.item}
                                    </>
                                ) : (
                                    ing.item || ing.original
                                )}
                            </li>
                        ))
                    ) : (
                        <p className="italic text-gray-500">No ingredients to display or convert. Please ensure the recipe has ingredients listed.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ServingSizeConverter; // Add this line
