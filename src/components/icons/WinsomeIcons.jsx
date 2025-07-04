// Custom culinary-themed icons for Winsome Designs
// Inspired by Fire & Hammer aesthetic - clean lines, minimalist, sophisticated
import React from "react";

// Cookbook Logo Icon - For branding/header use
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

// 1. View All Recipes - Stylized open cookbook with recipe cards
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
    {/* Open cookbook base */}
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="2"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Cookbook spine/binding */}
    <path d="M12 6v12" strokeWidth="1" opacity="0.4" />
    {/* Recipe lines - left page */}
    <path d="M6 9h5M6 11h5M6 13h4" strokeWidth="1.5" strokeLinecap="round" />
    {/* Recipe lines - right page */}
    <path d="M13 9h5M13 11h5M13 13h4" strokeWidth="1.5" strokeLinecap="round" />
    {/* Small chef's hat accent */}
    <path
      d="M8.5 4.5c0-.5.5-1 1-1s1 .5 1 1"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// 2. Add New Recipe - Plus sign integrated with recipe card outline
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
    {/* Recipe card outline */}
    <rect
      x="6"
      y="4"
      width="12"
      height="16"
      rx="2"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Plus sign */}
    <path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" />
    {/* Subtle fork accent in corner */}
    <path
      d="M15.5 5.5v1.5M15 5.5v1.5M16 5.5v1.5"
      strokeWidth="0.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// 3. Customize (Settings) - Minimalist gear with spoon handle
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
    {/* Main gear */}
    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    <path
      d="M12 1v6m0 8v6m11-7h-6m-8 0H1m15.5-6.5l-4.5 4.5m-8 0L8.5 6.5m0 11L4 22m11-4.5l4.5 4.5"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Spoon handle detail */}
    <path
      d="M12 8c0-1 0-2 .5-2.5"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

// 4. Edit Recipe - Sleek pencil crossing recipe paper
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
    {/* Recipe paper */}
    <rect
      x="3"
      y="5"
      width="12"
      height="16"
      rx="1"
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Paper lines */}
    <path
      d="M5 8h8M5 10h8M5 12h6"
      strokeWidth="0.5"
      strokeLinecap="round"
      opacity="0.3"
    />
    {/* Pencil */}
    <path
      d="M14.5 4.5l4 4m-1.5-1.5l-8 8H6v-3l8-8z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Pencil tip */}
    <path d="M17 7l1-1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 5. Delete Recipe - Minimalist broken plate icon
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
    {/* Plate base */}
    <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
    {/* Inner plate rim */}
    <circle cx="12" cy="12" r="6" strokeWidth="1" opacity="0.4" />
    {/* Crack/break lines */}
    <path d="M8 8l8 8M16 8l-8 8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Small break fragments */}
    <path
      d="M7 11l2-1M15 13l2 1"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// 6. Share Recipe - Share arrow with subtle plate element
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
    {/* Share nodes */}
    <circle cx="18" cy="5" r="3" strokeWidth="1.5" />
    <circle cx="6" cy="12" r="3" strokeWidth="1.5" />
    <circle cx="18" cy="19" r="3" strokeWidth="1.5" />
    {/* Connection lines */}
    <path
      d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Subtle fork accent on center node */}
    <path
      d="M5.5 10.5v1M6 10.5v1M6.5 10.5v1"
      strokeWidth="0.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// 7. Back/Home - Left arrow with subtle cookbook spine
export const BackIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Back arrow */}
    <path
      d="M19 12H5m7-7l-7 7 7 7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Subtle cookbook spine accent */}
    <path d="M20 6v12" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

// Alternative Home icon with cookbook house
export const HomeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* House outline */}
    <path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0V11a1 1 0 011-1h2a1 1 0 011 1v10m3 0a1 1 0 001-1V10m0 0l2 2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cookbook on doorway */}
    <path d="M10 16h4" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16v3" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Additional utility icons

// Search with cooking element
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
    <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
    <path d="m21 21-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
    {/* Subtle spoon in magnifying glass */}
    <path d="M8 11h6" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// Filter with cooking strainer motif
export const FilterIcon = ({
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
    {/* Filter funnel */}
    <path
      d="M4 4h16v2.586a1 1 0 01-.293.707L14 13v6l-4-2v-4l-5.707-5.707A1 1 0 014 6.586V4z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Strainer holes */}
    <circle cx="8" cy="7" r="0.5" fill={color} opacity="0.5" />
    <circle cx="12" cy="7" r="0.5" fill={color} opacity="0.5" />
    <circle cx="16" cy="7" r="0.5" fill={color} opacity="0.5" />
  </svg>
);

// Timer with clock and steam
export const TimerIcon = ({
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
    <circle cx="12" cy="13" r="8" strokeWidth="1.5" />
    <path d="M12 7v6l3 3" strokeWidth="1.5" strokeLinecap="round" />
    {/* Steam lines */}
    <path
      d="M8 3v1M12 2v2M16 3v1"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Heart for favorites with subtle food accent
export const HeartIcon = ({
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
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small accent dot */}
    <circle cx="12" cy="12" r="1" fill={color} opacity="0.3" />
  </svg>
);

// Settings Icon - Alternative to CustomizeIcon for backward compatibility
export const SettingsIcon = ({
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
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default {
  CookbookLogoIcon,
  ViewAllRecipesIcon,
  AddRecipeIcon,
  CustomizeIcon,
  EditRecipeIcon,
  DeleteRecipeIcon,
  ShareRecipeIcon,
  BackIcon,
  HomeIcon,
  SearchIcon,
  FilterIcon,
  TimerIcon,
  HeartIcon,
  SettingsIcon,
};
