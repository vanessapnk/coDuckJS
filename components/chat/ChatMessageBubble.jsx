import { useUserAuth } from "@/pages/_app";
import React, { useState } from "react";

const ChatMessageBubble = ({ chat }) => {
  // State to track the current user
  const { user, login } = useUserAuth((state) => state);

  const [currentUser, setCurrentUser] = useState(user.userData._id);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.toLocaleDateString(undefined, { weekday: "short" }); // Get short weekday name
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${day}, ${hour}:${minute}`;
  };

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
            ? "bg-custom-blue text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none";

          return (
            <li key={index} className={bubbleClass}>
              <div className="max-w-xs">
                <div
                  className={`inline-block rounded-lg p-4 shadow-sm ${bubbleContentClass}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-screen ">
          <p>No chat messages found</p>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/9beea042094811.57c019c567886.gif"
            alt="Loading"
          />
        </div>
      )}
    </ul>
  );
};

export default ChatMessageBubble;
