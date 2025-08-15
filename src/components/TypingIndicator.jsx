import React from "react";
import Image from "next/image";

/**
 * Displays an animated "is typing" indicator for the AI.
 * @param {{ personaAvatar: string }} props
 */
const TypingIndicator = ({ personaAvatar }) => {
  return (
    <div className="flex items-center gap-3 self-start">
      <div className="flex-shrink-0">
        <Image
          src={personaAvatar}
          alt="AI Persona Avatar"
          width={40}
          height={40}
          className="rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/40x40/E2E8F0/4A5568?text=AI";
          }}
        />
      </div>
      <div className="bg-gray-200 rounded-2xl px-4 py-3 flex items-center space-x-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
