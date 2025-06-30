// Custom culinary-themed icons for Winsome Designs
import React from "react";

// View All Recipes - Open cookbook with pages
export const ViewAllRecipesIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 2v20M9 7h6M9 11h6M9 15h6"
    />
    <circle cx="8" cy="7" r="0.5" fill={color} />
    <circle cx="8" cy="11" r="0.5" fill={color} />
    <circle cx="8" cy="15" r="0.5" fill={color} />
  </svg>
);

// Add New Recipe - Plus with cooking utensils
export const AddRecipeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v8M8 12h8"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2-2"
    />
  </svg>
);

// Customize/Settings - Chef's hat with gear
export const CustomizeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M12 6c0-1 0-2 1-2s1 1 1 2"
    />
  </svg>
);

// Edit Recipe - Pencil with recipe card
export const EditRecipeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L15.232 5.232z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M3 17h4l1-1"
    />
  </svg>
);

// Delete Recipe - Broken plate
export const DeleteRecipeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M9 10l6 6M15 10l-6 6"
    />
  </svg>
);

// Share Recipe - Dish with arrow
export const ShareRecipeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
    />
    <circle cx="18" cy="8" r="1" fill={color} />
    <circle cx="6" cy="12" r="1" fill={color} />
    <circle cx="18" cy="16" r="1" fill={color} />
  </svg>
);

// Back/Home - Home with cookbook
export const BackHomeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0V11a1 1 0 011-1h2a1 1 0 011 1v10m3 0a1 1 0 001-1V10m0 0l2 2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M9 21h6"
    />
  </svg>
);

// Search - Magnifying glass with spoon
export const SearchIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8" strokeWidth="2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m21 21-4.35-4.35"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M8 11h6"
    />
  </svg>
);

export default {
  ViewAllRecipesIcon,
  AddRecipeIcon,
  CustomizeIcon,
  EditRecipeIcon,
  DeleteRecipeIcon,
  ShareRecipeIcon,
  BackHomeIcon,
  SearchIcon,
};
