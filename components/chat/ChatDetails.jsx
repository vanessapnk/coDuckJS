import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "../custom/navbar";
import Link from "next/link";
import { Back, Send2 } from "iconsax-react";
import { Card } from "../ui/card";

export default function ChatDetails() {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupId, setGroupId] = useState(null); // State to store groupId
  const [messageContent, setMessageContent] = useState(""); // State to store message content
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/chat/${groupId}`);
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
    try {
      const senderId = "hxyu3n";

      const res = await fetch("/api/chat/sendmsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, groupId, content: messageContent }),
      });
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      // Refresh chat after sending message
      await fetchData();
      setMessageContent(""); // Clear message content after sending
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  useEffect(() => {
    // Set groupId from router.query
    if (router.query.groupId) {
      setGroupId(router.query.groupId);
    }
  }, [router.query.groupId]); // Run useEffect whenever groupId changes

  useEffect(() => {
    // Fetch chat data when groupId changes
    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <div className="pt-20">
          <div className="pl-4 pr-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <Link href={`/groups/${groupId}`}>
                  <div className="flex flex-row">
                    <Back size="32" color="#2ccce4" />
                    <button>Go back to Group</button>
                  </div>
                </Link>
                <ChatMessageBubble chat={chat} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-gray-100 p-5 flex items-center">
        <Textarea
          id="messageTextarea"
          className="mr-2 flex-grow"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button className="px-2 py-2 text-white rounded" onClick={sendMessage}>
          <Send2 size="32" color="#2ccce4" variant="Bold" />
        </button>
      </div>
    </div>
  );
}
