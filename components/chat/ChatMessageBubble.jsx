import React, { useState } from "react";

const ChatMessageBubble = ({ chat }) => {
  // State to track the current user
  const [currentUser, setCurrentUser] = useState("hxyu3n");

  return (
    <ul className="space-y-5">
      {Array.isArray(chat) && chat.length > 0 ? (
        chat.map((message, index) => {
          // Determine if the message is sent by the current user
          const isCurrentUser = message.senderId === currentUser;

          // Apply different CSS classes based on whether the message is from the current user or not
          const bubbleClass = isCurrentUser
            ? "flex justify-end"
            : "flex justify-start";

          const bubbleContentClass = isCurrentUser
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black";

          return (
            <li key={index} className={bubbleClass}>
              <div className="max-w-xs">
                <div
                  className={`inline-block rounded-lg p-4 shadow-sm ${bubbleContentClass}`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <p>No chat messages found</p>
      )}
    </ul>
  );
};

export default ChatMessageBubble;
