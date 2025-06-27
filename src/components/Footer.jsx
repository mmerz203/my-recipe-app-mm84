import React from "react";

// The version will be replaced at build time
const version = import.meta.env.VITE_APP_VERSION || "dev";

export default function Footer() {
  return (
    <footer className="w-full text-center py-6 text-gray-500 text-sm bg-transparent">
      <span>Recipe App &copy; {new Date().getFullYear()} &mdash; Version {version}</span>
    </footer>
  );
}
