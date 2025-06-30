// Header component for Winsome Designs
import React from "react";
import { CookbookLogoIcon, SettingsIcon } from "./icons/WinsomeIcons";

const Header = ({ onSettings }) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-winsome-neutral-subtle shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-winsome-primary-brand rounded-full flex items-center justify-center shadow-md">
              <CookbookLogoIcon className="w-6 h-6" color="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-winsome-text-dark">
                Winsome Designs
              </h1>
              <p className="text-sm text-winsome-text-dark/60">
                Digital Cookbook
              </p>
            </div>
          </div>

          {/* Settings Button */}
          <button
            onClick={onSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-winsome-tertiary-brand/10 hover:bg-winsome-tertiary-brand/20 text-winsome-tertiary-brand rounded-xl transition-all duration-300 hover:scale-105"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
