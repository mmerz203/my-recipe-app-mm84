// IconButton component for consistent icon button styling across the app
import React from "react";
import {
  getIconClasses,
  getIconProps,
  ICON_SIZES,
} from "../../utils/iconUtils";

const IconButton = ({
  icon: Icon,
  label,
  size = "md",
  variant = "ghost",
  disabled = false,
  className = "",
  iconClassName = "",
  iconColor = "currentColor",
  children,
  ...props
}) => {
  // Size configurations for the button container
  const buttonSizes = {
    xs: "p-1.5 min-w-[28px] min-h-[28px]",
    sm: "p-2 min-w-[32px] min-h-[32px]",
    md: "p-2.5 min-w-[40px] min-h-[40px]",
    lg: "p-3 min-w-[48px] min-h-[48px]",
    xl: "p-4 min-w-[56px] min-h-[56px]",
  };

  // Icon sizes that correspond to button sizes
  const iconSizes = {
    xs: ICON_SIZES.XS,
    sm: ICON_SIZES.SM,
    md: ICON_SIZES.MD,
    lg: ICON_SIZES.LG,
    xl: ICON_SIZES.XL,
  };

  // Variant styles using CSS variables for theme awareness
  const variantStyles = {
    primary:
      "bg-primary-brand text-white hover:bg-opacity-90 focus:ring-primary-brand",
    secondary:
      "bg-secondary-brand text-white hover:bg-opacity-90 focus:ring-secondary-brand",
    tertiary:
      "bg-tertiary-purple text-white hover:bg-opacity-90 focus:ring-tertiary-purple",
    ghost:
      "bg-transparent text-text-text-dark hover:bg-neutral-subtle hover:bg-opacity-10 focus:ring-primary-brand",
    outline:
      "border border-primary-brand text-primary-brand hover:bg-primary-brand hover:text-white focus:ring-primary-brand",
  };

  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-xl",
    "font-medium",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "hover:scale-105",
    "active:scale-95",
  ].join(" ");

  const iconProps = getIconProps(label, !label);
  const iconClasses = getIconClasses(iconSizes[size], "button", iconClassName);

  return (
    <button
      className={`${baseClasses} ${buttonSizes[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      aria-label={label}
      {...props}
    >
      {Icon && (
        <Icon className={iconClasses} color={iconColor} {...iconProps} />
      )}
      {children && <span className={Icon ? "ml-2" : ""}>{children}</span>}
    </button>
  );
};

export default IconButton;
