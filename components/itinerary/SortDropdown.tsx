"use client";

import { useState } from "react";
import { SortType } from "./useJourneyFilterSort";
import Icon from "../ui/Icon";

const sortConfig = {
  co2: {
    label: "Moins de CO2",
    icon: <Icon name="plante-ecologie" className="w-4 h-4 bg-secondary-600 flex-shrink-0" />
  },
  time: {
    label: "Plus rapide",
    icon: <Icon name="timer" className="w-4 h-4 bg-secondary-600 flex-shrink-0" />
  },
  price: {
    label: "Moins cher",
    icon: <Icon name="price" className="w-4 h-4 bg-secondary-600 flex-shrink-0" />
  }
};

interface SortDropdownProps {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
}

export default function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex justify-end items-center px-1 mb-1 relative">
      <span className="text-xs text-text-tertiary mr-2 font-lato">Trier par :</span>
      
      <div className="relative">
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-2 bg-white border border-quinary-200 text-secondary-600 text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm focus:outline-none focus:border-secondary-500 cursor-pointer transition-colors"
        >
          {sortConfig[sortBy].icon}
          <span>{sortConfig[sortBy].label}</span>
          <svg className="w-3 h-3 ml-1 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {isSortOpen && (
          <div className="absolute right-0 mt-1 w-44 bg-white border border-quinary-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
            {(Object.keys(sortConfig) as SortType[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  onSortChange(key);
                  setIsSortOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-left transition-colors ${
                  sortBy === key 
                    ? "bg-page text-secondary-600 font-bold" 
                    : "text-text-primary hover:bg-gray-50"
                }`}
              >
                {sortConfig[key].icon}
                <span>{sortConfig[key].label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}