import React from "react";
import Image from "next/image";

/**
 * Renders a single message bubble in the chat.
 * @param {{
 * message: { role: 'user' | 'model', text: string },
 * personaAvatar: string
 * }} props
 */
const Message = ({ message, personaAvatar }) => {
  const isUser = message.role === "user";

  // Base classes for all message bubbles
  const bubbleBaseClasses =
    "max-w-md md:max-w-2xl break-words rounded-2xl px-4 py-3";

  // Classes specific to the user's messages
  const userBubbleClasses = "bg-blue-600 text-white self-end";

  // Classes specific to the AI's messages
  const modelBubbleClasses = "bg-gray-200 text-gray-800 self-start";

  if (isUser) {
    return (
      <div className="flex justify-end w-full">
        <div className={`${bubbleBaseClasses} ${userBubbleClasses}`}>
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 w-full">
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
      <div className={`${bubbleBaseClasses} ${modelBubbleClasses}`}>
        {/* We can use a library like react-markdown here in the future to render markdown */}
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
