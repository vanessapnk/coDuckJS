import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChatCard from "@/components/chat/ChatCard";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <ChatCard />
            {/* Pass chat state as prop to ChatMessageBubble */}
            <ChatMessageBubble chat={chat} />
          </div>
        )}
      </div>
    </>
  );
}
