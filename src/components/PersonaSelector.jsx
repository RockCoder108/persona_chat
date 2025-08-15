import React from "react";
import Image from "next/image";

/**
 * Renders buttons for the user to select an AI persona.
 * @param {{
 * personas: object,
 * selectedPersonaId: string,
 * onSelectPersona: (id: string) => void
 * }} props
 */
const PersonaSelector = ({ personas, selectedPersonaId, onSelectPersona }) => {
  return (
    <div className="flex justify-center items-center gap-4 p-4 bg-gray-100 rounded-t-lg">
      <h3 className="text-lg font-semibold text-gray-700 mr-4">
        Choose a Persona:
      </h3>
      {Object.entries(personas).map(([id, persona]) => (
        <button
          key={id}
          onClick={() => onSelectPersona(id)}
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selectedPersonaId === id
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
        >
          <Image
            src={persona.avatar}
            alt={`${persona.name}'s avatar`}
            width={32}
            height={32}
            className="rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/32x32/E2E8F0/4A5568?text=AI";
            }}
          />
          <span className="font-medium">{persona.name}</span>
        </button>
      ))}
    </div>
  );
};

export default PersonaSelector;
