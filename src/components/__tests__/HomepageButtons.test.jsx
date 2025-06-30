import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExactHomepage from '../ExactHomepage';

describe('Homepage Action Buttons', () => {
  it('calls onViewAllRecipes when View All Recipes card/button is clicked', () => {
    const onViewAllRecipes = jest.fn();
    render(
      <ExactHomepage
        onViewAllRecipes={onViewAllRecipes}
        onAddRecipe={() => {}}
        onCustomize={() => {}}
      />
    );
    // Find by aria-label (card)
    const viewAllCard = screen.getByLabelText(/view all recipes/i);
    fireEvent.click(viewAllCard);
    expect(onViewAllRecipes).toHaveBeenCalled();
  });

  it('calls onAddRecipe when Add New Recipe button is clicked', () => {
    const onAddRecipe = jest.fn();
    render(
      <ExactHomepage
        onViewAllRecipes={() => {}}
        onAddRecipe={onAddRecipe}
        onCustomize={() => {}}
      />
    );
    const addBtn = screen.getByText(/create recipe/i);
    fireEvent.click(addBtn);
    expect(onAddRecipe).toHaveBeenCalled();
  });

  it('calls onCustomize when Customize button is clicked', () => {
    const onCustomize = jest.fn();
    render(
      <ExactHomepage
        onViewAllRecipes={() => {}}
        onAddRecipe={() => {}}
        onCustomize={onCustomize}
      />
    );
    // Find by aria-label for the customize card button
    const customizeBtn = screen.getByLabelText(/customize settings/i);
    fireEvent.click(customizeBtn);
    expect(onCustomize).toHaveBeenCalled();
  });
});
