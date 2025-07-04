// src/components/KebabMenu.jsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { CookbookLogoIcon } from "./icons/WinsomeIcons";
// If you use a classnames utility, import it. Otherwise, use a simple join.
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Kebab (three dots) icon
const KebabIcon = ({ className = "", ...props }) => (
  <svg
    className={cn("w-5 h-5 text-text-dark", className)}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
    {...props}
  >
    <circle cx="10" cy="4" r="1.5" />
    <circle cx="10" cy="10" r="1.5" />
    <circle cx="10" cy="16" r="1.5" />
  </svg>
);

const KebabMenu = ({
  items = [],
  onSelect = () => {},
  className = "",
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "w-10 h-10 bg-primary-brand rounded-xl flex items-center justify-center shadow-md",
            "hover:scale-105 transition-transform",
            "focus:outline-none focus:ring-2 focus:ring-primary-brand focus:ring-offset-2",
            className
          )}
          aria-label="Open menu"
          type="button"
        >
          <CookbookLogoIcon className="w-6 h-6 text-white" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            // Top layer, solid background
            "bg-card border border-neutral-subtle shadow-lg",
            "p-2 rounded-md min-w-[160px] z-[9999]",
            "animate-fade-in",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand",
            "!bg-[color:var(--color-card)] !backdrop-blur-none !bg-opacity-100",
            className
          )}
          sideOffset={8}
        >
          {items.map((item, idx) =>
            item.type === "separator" ? (
              <DropdownMenu.Separator
                key={idx}
                className="my-2 h-px bg-neutral-subtle"
              />
            ) : (
              <DropdownMenu.Item
                key={item.key || idx}
                onSelect={() => onSelect(item)}
                className={cn(
                  "flex items-center gap-2 w-full cursor-pointer select-none",
                  "text-sm p-2 rounded-sm transition-colors",
                  // Highlight with theme color when focused/hovered
                  "focus:outline-none data-[highlighted]:bg-primary-brand data-[highlighted]:text-white",
                  item.destructive
                    ? "text-error hover:bg-error/10 data-[highlighted]:bg-error data-[highlighted]:text-white"
                    : "text-text-dark hover:bg-primary-brand/10"
                )}
              >
                {item.icon && (
                  <span className="w-4 h-4 text-inherit">{item.icon}</span>
                )}
                {item.label}
              </DropdownMenu.Item>
            )
          )}
          <DropdownMenu.Arrow className="fill-card" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default KebabMenu;
