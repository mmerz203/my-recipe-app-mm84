// Custom culinary-themed icons for Winsome Designs
// Inspired by Fire & Hammer aesthetic - clean lines, minimalist, sophisticated
import React from "react";

// Cookbook Logo Icon - For branding/header use, now accepts className for flexible styling
export const CookbookLogoIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cookbook menu"
      role="img"
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="rgba(255, 255, 255, 0.1)"
        className="transition-colors duration-200"
      />
      <path
        d="M8 7h8M8 11h8M8 15h6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-colors duration-200"
      />
      <circle
        cx="7"
        cy="7"
        r="0.5"
        fill={color}
        className="transition-colors duration-200"
      />
      <circle
        cx="7"
        cy="11"
        r="0.5"
        fill={color}
        className="transition-colors duration-200"
      />
      <circle
        cx="7"
        cy="15"
        r="0.5"
        fill={color}
        className="transition-colors duration-200"
      />
      <path
        d="M12 4v16"
        stroke={color}
        strokeWidth="1"
        opacity="0.3"
        className="transition-colors duration-200"
      />
    </svg>
  );
};

// 1. View All Recipes - Stylized open cookbook with recipe cards
export const ViewAllRecipesIcon = ({ className = "w-6 h-6", color = "currentColor", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 463 463"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="View all recipes"
    role="img"
    {...props}
  >
    <g>
      <g>
        <g>
          <path d="M391.848,16H175v-0.5C175,6.953,168.047,0,159.5,0h-32C118.953,0,112,6.953,112,15.5V16H71.152C58.386,16,48,26.542,48,39.5v400c0,12.958,10.386,23.5,23.152,23.5h320.696C404.614,463,415,452.458,415,439.5v-400C415,26.542,404.614,16,391.848,16z M127,15.5c0-0.275,0.224-0.5,0.5-0.5h32c0.276,0,0.5,0.225,0.5,0.5v81.986l-12.34-8.227c-1.26-0.84-2.71-1.26-4.16-1.26s-2.9,0.42-4.16,1.26L127,97.486V15.5z M400.001,439.5H400c0,4.687-3.657,8.5-8.152,8.5H71.152c-4.495,0-8.152-3.813-8.152-8.5v-400c0-4.687,3.657-8.5,8.152-8.5H112v80.5c0,2.766,1.522,5.308,3.961,6.612c2.438,1.306,5.398,1.163,7.699-0.372l19.84-13.227l19.84,13.227c1.255,0.837,2.706,1.26,4.161,1.26c1.213,0,2.43-0.294,3.539-0.888c2.438-1.305,3.961-3.847,3.961-6.612V31h216.848c4.495,0,8.152,3.813,8.152,8.5V439.5z" fill={color}/>
          <path d="M87.5,48c-4.142,0-7.5,3.357-7.5,7.5v368c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5v-368C95,51.357,91.642,48,87.5,48z" fill={color}/>
          <path d="M239.5,104c-4.142,0-7.5,3.357-7.5,7.5V168h-9v-56.5c0-4.143-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.357-7.5,7.5V168h-9v-56.5c0-4.143-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.357-7.5,7.5v72c0,12.958,10.542,23.5,23.5,23.5h0.5v168.5c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5V207h0.5c12.958,0,23.5-10.542,23.5-23.5v-72C247,107.357,243.642,104,239.5,104z M232,183.5c0,4.687-3.813,8.5-8.5,8.5h-16c-4.687,0-8.5-3.813-8.5-8.5V183h33V183.5z" fill={color}/>
          <path d="M295.719,118.317c-0.816-8.162-7.617-14.317-15.82-14.317c-8.767,0-15.899,7.133-15.899,15.899V375.5c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5V295h6.987c6.585,0,12.909-2.788,17.35-7.649c4.441-4.861,6.647-11.411,6.054-17.969L295.719,118.317z M292.262,277.233c-1.63,1.784-3.858,2.767-6.275,2.767H279V119.899c0-0.496,0.403-0.899,0.899-0.899c0.464,0,0.849,0.348,0.888,0.739l13.665,150.994C294.67,273.141,293.892,275.449,292.262,277.233z" fill={color}/>
        </g>
      </g>
    </g>
  </svg>
);

// 2. Add New Recipe - Clean, balanced plus sign
export const AddRecipeIcon = ({ className = "w-6 h-6", color = "currentColor", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Add new recipe"
    role="img"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// 3. Customize (Settings) - Minimalist gear with spoon handle
export const CustomizeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
  ...props
}) => (
  <svg
    className={`${className} transition-colors duration-200`}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Customize settings"
    role="img"
    {...props}
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
export const BackIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
  ...props
}) => (
  <svg
    className={`${className} transition-colors duration-200`}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Go back"
    role="img"
    {...props}
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
export const HomeIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
  ...props
}) => (
  <svg
    className={`${className} transition-colors duration-200`}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Home"
    role="img"
    {...props}
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
  ...props
}) => (
  <svg
    className={`${className} transition-colors duration-200`}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Search"
    role="img"
    {...props}
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
  ...props
}) => (
  <svg
    className={`${className} transition-colors duration-200`}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Filter"
    role="img"
    {...props}
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
// SettingsIcon from Test/settings.svg
export const SettingsIcon = ({ className = "w-6 h-6", color = "currentColor", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Settings"
    role="img"
    {...props}
  >
    {/* Gear from original SVG, coordinates adapted for 30x30 viewBox */}
    <path d="M28.52,21.134 L27.528,22.866 C27.254,23.345 26.648,23.508 26.173,23.232 L23.418,21.628 C22.02,23.219 20.129,24.359 17.983,24.799 L17.983,27 C17.983,27.553 17.54,28 16.992,28 L15.008,28 C14.46,28 14.017,27.553 14.017,27 L14.017,24.799 C11.871,24.359 9.98,23.219 8.582,21.628 L5.827,23.232 C5.352,23.508 4.746,23.345 4.472,22.866 L3.48,21.134 C3.206,20.656 3.369,20.044 3.843,19.769 L6.609,18.157 C6.28,17.163 6.083,16.106 6.083,15 C6.083,13.894 6.28,12.838 6.609,11.843 L3.843,10.232 C3.369,9.956 3.206,9.345 3.48,8.866 L4.472,7.134 C4.746,6.656 5.352,6.492 5.827,6.768 L8.582,8.372 C9.98,6.781 11.871,5.641 14.017,5.201 L14.017,3 C14.017,2.447 14.46,2 15.008,2 L16.992,2 C17.54,2 17.983,2.447 17.983,3 L17.983,5.201 C20.129,5.641 22.02,6.781 23.418,8.372 L26.173,6.768 C26.648,6.492 27.254,6.656 27.528,7.134 L28.52,8.866 C28.794,9.345 28.631,9.956 28.157,10.232 L25.391,11.843 C25.72,12.838 25.917,13.894 25.917,15 C25.917,16.106 25.72,17.163 25.391,18.157 L28.157,19.769 C28.631,20.044 28.794,20.656 28.52,21.134 Z" fill={color}/>
    {/* Center hub outline (optional, for visual clarity) */}
    <circle cx="15" cy="15" r="5" fill="none" stroke={color} strokeWidth="1.5" />
    {/* Center hole (transparent, for true cutout effect) */}
    <circle cx="15" cy="15" r="2.5" fill="none" />
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
