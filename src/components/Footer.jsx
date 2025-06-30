import React from "react";

// The version will be replaced at build time
const version = import.meta.env.VITE_APP_VERSION || "1.0";

export default function Footer() {
  return (
    <footer className="w-full text-center py-8 bg-winsome-background-light border-t border-winsome-neutral-subtle/50">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-winsome-text-dark/60 text-sm font-medium">
          © 2024 Winsome Designs Cookbook • Version {version}
        </p>
        <p className="text-winsome-tertiary-brand text-xs mt-2">
          Built with love for preserving family recipes
        </p>
      </div>
    </footer>
  );
}
