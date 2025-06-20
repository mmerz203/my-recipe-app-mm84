// src/utils/helpers.js

// Function to parse a fraction string (e.g., "1/2", "3 1/4") into a number
export const parseFraction = (fractionStr) => {
    fractionStr = fractionStr.trim();
    if (!fractionStr) return 0;

    // Handle mixed numbers like "1 1/2"
    if (fractionStr.includes(' ')) {
        const parts = fractionStr.split(' ');
        const whole = parseFloat(parts[0]);
        // Safely parse the fraction part (e.g., "1/2")
        const fractionParts = parts[1].split('/');
        const fraction = (fractionParts.length === 2) ? (parseFloat(fractionParts[0]) / parseFloat(fractionParts[1])) : parseFloat(parts[1]);
        return whole + fraction;
    }
    // Handle simple fractions like "1/2" or whole numbers "2"
    if (fractionStr.includes('/')) {
        const parts = fractionStr.split('/');
        if (parts.length === 2) {
            return parseFloat(parts[0]) / parseFloat(parts[1]);
        }
    }
    return parseFloat(fractionStr); // Assume it's a whole number or decimal
};

// Function to format a number into a fraction string (e.g., 0.5 -> "1/2", 1.5 -> "1 1/2")
export const formatFraction = (num) => {
    if (num === null || isNaN(num)) return '';
    if (num === 0) return '0';

    const tolerance = 1.0E-6; // Tolerance for floating point comparisons

    // Check for whole number
    if (Math.abs(num - Math.round(num)) < tolerance) {
        return Math.round(num).toString();
    }

    const sign = num < 0 ? '-' : '';
    num = Math.abs(num);

    const wholePart = Math.floor(num);
    const fractionalPart = num - wholePart;

    if (fractionalPart < tolerance) { // If it's effectively a whole number
        return sign + wholePart.toString();
    }

    // Common denominators to try
    const denominators = [2, 3, 4, 5, 6, 8, 10, 12, 16, 24, 32];
    let bestNumerator = 1;
    let bestDenominator = 1;
    let minDiff = Infinity;

    for (let d of denominators) {
        const n = Math.round(fractionalPart * d);
        const diff = Math.abs(fractionalPart - n / d);
        if (diff < minDiff) {
            minDiff = diff;
            bestNumerator = n;
            bestDenominator = d;
        }
    }

    // Simplify the fraction
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(bestNumerator, bestDenominator);
    bestNumerator /= commonDivisor;
    bestDenominator /= commonDivisor;

    let formattedFraction = `<span class="math-inline">\{bestNumerator\}/</span>{bestDenominator}`;

    if (wholePart > 0) {
        formattedFraction = `${wholePart} ${formattedFraction}`;
    }

    return sign + formattedFraction;
};


// Regex for parsing ingredients (Quantity, Unit, Item)
export const INGREDIENT_REGEX = /(\d*\s*\d*\/\d+|\d*\.?\d+)\s*([a-zA-Z]+\.?)\s*(.*)/;
// Improved regex to handle cases where unit might be part of the item (e.g. "cups flour") or missing
export const INGREDIENT_PARSER_REGEX = /^(?:(\d+\s*\d*\/\d+|\d*\.?\d+)\s*)?([a-zA-Z\s.-]*?)(.*)$/;

export const parseIngredient = (line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;

    let quantity = '';
    let unit = '';
    let item = trimmedLine;

    // Try to extract quantity and unit from the beginning of the line
    const match = trimmedLine.match(INGREDIENT_PARSER_REGEX);

    if (match) {
        const rawQuantity = match[1] || '';
        const rawUnit = match[2] ? match[2].trim() : ''; // Unit or first part of item
        const rawItem = match[3] ? match[3].trim() : '';

        // Determine if rawUnit is a likely unit or part of the item
        // This is a heuristic and can be improved with a more comprehensive unit list
        const commonUnits = ['cup', 'cups', 'tbsp', 'tablespoon', 'tablespoons', 'tsp', 'teaspoon', 'teaspoons', 'g', 'gram', 'grams', 'kg', 'kilogram', 'kilograms', 'ml', 'milliliter', 'milliliters', 'l', 'liter', 'liters', 'oz', 'ounce', 'ounces', 'lb', 'pound', 'pounds', 'pinch', 'dashes', 'clove', 'cloves', 'can', 'cans', 'package', 'packages', 'loaf', 'loaves', 'box', 'boxes', 'bag', 'bags', 'head', 'heads', 'piece', 'pieces', 'sprig', 'sprigs', 'slice', 'slices', 'sheet', 'sheets', 'bottle', 'bottles', 'container', 'containers', 'carton', 'cartons', 'jar', 'jars'];
        const unitFound = commonUnits.some(u => rawUnit.toLowerCase() === u || rawUnit.toLowerCase().startsWith(u + ' '));

        if (rawQuantity) {
            quantity = rawQuantity;
            if (unitFound) {
                unit = rawUnit;
                item = rawItem;
            } else {
                // If rawUnit isn't a common unit, it's likely part of the item description
                unit = ''; // No clear unit
                item = `${rawUnit} ${rawItem}`.trim(); // Combine with item
            }
        } else {
            // No quantity, so the whole line is the item
            quantity = '';
            unit = '';
            item = trimmedLine;
        }
    }

    return {
        original: trimmedLine,
        quantity: quantity,
        unit: unit,
        item: item
    };
};