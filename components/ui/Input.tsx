"use client";

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, id, type, className, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-primary font-poppins">
          {label}
        </label>
      )}
      <div className="relative w-full flex items-center">
        <input
          id={id}
          type={inputType}
          {...props}
          className={`w-full border-2 border-border-default rounded-lg px-4 py-3 font-poppins text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-secondary-500 transition-colors ${
            isPasswordType ? "pr-11" : ""
          } ${className || ""}`}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="absolute right-3 p-1 text-text-tertiary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px] leading-none select-none">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}