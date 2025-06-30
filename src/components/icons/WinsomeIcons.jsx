// Sophisticated culinary-themed icons for Winsome Designs
import React from "react";

// Cookbook logo icon
export const CookbookLogoIcon = ({
  className = "w-8 h-8",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M9 6h6M9 10h6M9 14h4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="7" cy="6" r="0.5" fill={color} />
    <circle cx="7" cy="10" r="0.5" fill={color} />
    <circle cx="7" cy="14" r="0.5" fill={color} />
    <path d="M12 2v20" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
);

// Large cookbook icon for action cards
export const ViewAllRecipesIcon = ({
  className = "w-12 h-12",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="6"
      width="32"
      height="36"
      rx="4"
      strokeWidth="2.5"
      fill="none"
    />
    <path d="M24 6v36" strokeWidth="1.5" opacity="0.4" />
    <path
      d="M14 14h20M14 20h20M14 26h16M14 32h18"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="14" r="1" fill={color} />
    <circle cx="12" cy="20" r="1" fill={color} />
    <circle cx="12" cy="26" r="1" fill={color} />
    <circle cx="12" cy="32" r="1" fill={color} />
  </svg>
);

// Plus icon with culinary elements
export const AddRecipeIcon = ({
  className = "w-12 h-12",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="18" strokeWidth="2.5" fill="none" />
    <path d="M24 12v24M12 24h24" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M16 16l4 4M32 16l-4 4M16 32l4-4M32 32l-4-4"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

// Settings icon with chef elements
export const CustomizeIcon = ({
  className = "w-12 h-12",
  color = "currentColor",
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 30a6 6 0 100-12 6 6 0 000 12z" strokeWidth="2.5" />
    <path
      d="M20.5 7.9A2 2 0 0122.4 6h3.2a2 2 0 011.9 1.9l.5 2.4a12 12 0 012.1 1.2l2.3-.8a2 2 0 012.4.7L36.6 14a2 2 0 01-.2 2.6L35 18a12 12 0 010 2.4l1.4 1.4a2 2 0 01.2 2.6l-1.8 2.6a2 2 0 01-2.4.7l-2.3-.8a12 12 0 01-2.1 1.2l-.5 2.4a2 2 0 01-1.9 1.9h-3.2a2 2 0 01-1.9-1.9l-.5-2.4a12 12 0 01-2.1-1.2l-2.3.8a2 2 0 01-2.4-.7L11.4 30a2 2 0 01.2-2.6L13 26a12 12 0 010-2.4l-1.4-1.4a2 2 0 01-.2-2.6l1.8-2.6a2 2 0 012.4-.7l2.3.8a12 12 0 012.1-1.2l.5-2.4z"
      strokeWidth="2"
    />
    <path
      d="M24 16c0-2 0-4 2-4s2 2 2 4"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Simple back arrow
export const BackIcon = ({ className = "w-5 h-5", color = "currentColor" }) => (
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
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

// Search icon
export const SearchIcon = ({
  className = "w-5 h-5",
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
  </svg>
);

// Filter icon
export const FilterIcon = ({
  className = "w-5 h-5",
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
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

// Settings gear icon
export const SettingsIcon = ({
  className = "w-5 h-5",
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
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default {
  CookbookLogoIcon,
  ViewAllRecipesIcon,
  AddRecipeIcon,
  CustomizeIcon,
  BackIcon,
  SearchIcon,
  FilterIcon,
  SettingsIcon,
};
