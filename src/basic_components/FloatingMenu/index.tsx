import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";

interface MenuProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  buttonClassName?: string;
}

export const Menu: React.FC<MenuProps> = ({
  label,
  children,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center justify-center", // Added these classes for vertical centering
          buttonClassName,
          "self-center"
        )}
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 right-0 bg-white/80 backdrop-blur-md p-1 rounded-md shadow-md border border-black/10 min-w-[150px]">
          {children}
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 rounded-sm cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

// For submenus
export const SubMenu: React.FC<MenuProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="w-full text-left flex justify-between items-center px-3 py-1.5 text-sm hover:bg-gray-100 rounded-sm">
        {label}
        <span className="ml-2 text-xs">▶</span>
      </button>

      {isOpen && (
        <div className="absolute left-full top-0 bg-white/80 backdrop-blur-md p-1 rounded-md shadow-md border border-black/10 min-w-[150px]">
          {children}
        </div>
      )}
    </div>
  );
};
