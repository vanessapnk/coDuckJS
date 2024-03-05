import React from "react";

const ChatMessageBubble = ({ chat }) => {
  return (
    <div className="pl-4 pr-4">
      <ul className="space-y-5">
        {/* Render chat messages here based on the `chat` prop */}
        {Array.isArray(chat) && chat.length > 0 ? (
          chat.map((message, index) => (
            <li key={index} className="flex ms-auto gap-x-2 sm:gap-x-4">
              <div className="grow text-end space-y-3">
                <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                  <p className="text-sm text-white">{message.content}</p>
                </div>
              </div>
              <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                <span className="text-sm font-medium text-white leading-none">
                  {message.senderId}
                </span>
              </span>
            </li>
          ))
        ) : (
          <p>No chat messages found</p>
        )}
      </ul>
    </div>
  );
};

export default ChatMessageBubble;
