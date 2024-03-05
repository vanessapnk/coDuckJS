import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Chat_Test() {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/chat/23");
      if (!res.ok) {
        throw new Error("Failed to fetch chat data");
      }
      const data = await res.json();
      setChat(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching chat:", error);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {Array.isArray(chat) && chat.length > 0 ? (
              chat.map((message, index) => (
                <div key={index}>
                  <p>{message.senderId}</p>
                  <p>{message.content}</p>
                </div>
              ))
            ) : (
              <p>No chat messages found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
