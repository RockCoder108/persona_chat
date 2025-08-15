import React from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import { personas } from "../config/personas"; // Assuming personas are here for avatar

/**
 * A full chat box component including the message window and the input form.
 * This is a UI-only component for now. State and handlers will be passed as props.
 *
 * @param {{
 * messages: Array<{ role: 'user' | 'model', text: string }>,
 * isLoading: boolean,
 * inputValue: string,
 * onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
 * onSendMessage: (e: React.FormEvent<HTMLFormElement>) => void,
 * persona: object
 * }} props
 */
const ChatBox = ({
  messages,
  isLoading,
  inputValue,
  onInputChange,
  onSendMessage,
  persona,
}) => {
  // A dummy persona for fallback if none is provided
  const currentPersona = persona || personas.hitesh;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl">
      {/* Message Display Area */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            personaAvatar={currentPersona.avatar}
          />
        ))}
        {isLoading && <TypingIndicator personaAvatar={currentPersona.avatar} />}
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-gray-100 border-t border-gray-200">
        <form onSubmit={onSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
