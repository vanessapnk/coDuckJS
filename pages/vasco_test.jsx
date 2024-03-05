import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChatCard from "@/components/chat/ChatCard";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";
import { Textarea } from "@/components/ui/textarea";

export default function Chat_Test() {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/chat");
      if (!res.ok) {
        throw new Error("Failed to fetch chat data");
      }
      const data = await res.json();
      setChat(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chat:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const content = document.getElementById("messageTextarea").value;
    const senderId = generateRandomId();
    const groupId = generateRandomId();

    try {
      const res = await fetch("/api/chat/sendmsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, groupId, content }),
      });
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      // Refresh chat after sending message
      fetchData();
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <>
      <div className="fixed bottom-0 w-full bg-gray-100 p-4 flex items-center">
        <Textarea id="messageTextarea" className="mr-2 flex-grow" />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      <div className="pt-20">
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <div className="mb-24">
                <ChatCard />
              </div>
              <ChatMessageBubble chat={chat} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
