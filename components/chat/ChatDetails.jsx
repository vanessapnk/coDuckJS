import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "../custom/navbar";
import Link from "next/link";
import { Back, Send2 } from "iconsax-react";
import { Card } from "../ui/card";
import { useUserAuth } from "@/pages/_app";

export default function ChatDetails() {
  const { user } = useUserAuth((state) => state);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupId, setGroupId] = useState(null); // State to store groupId
  const [messageContent, setMessageContent] = useState(""); // State to store message content
  const router = useRouter();
  const [groupDetails, setGroupDetails] = useState(null); // State to store group details

  const fetchGroupDetails = async () => {
    try {
      const res = await fetch(`/api/groups/${groupId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch group details");
      }
      const data = await res.json();
      setGroupDetails(data);
    } catch (error) {
      console.error("Error fetching group details:", error);
      setGroupDetails(null);
    }
  };

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
      console.log(user);
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
      fetchGroupDetails();
    }
  }, [groupId]);

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
                <section className="fixed top-0 left-0 w-full flex flex-col justify-center antialiased bg-gray-50 text-gray-600 p-4">
                  <div className="h-full">
                    <Link href={`/groups/${groupId}`}>
                      <div className="flex flex-row">
                        <Back size="32" color="#2ccce4" />
                        <button>Go back to Group</button>
                      </div>
                    </Link>
                    {groupDetails && (
                      <div className="relative mx-auto bg-white shadow-lg rounded-lg">
                        {/* Card header */}
                        <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            {/* Image + name */}
                            <div className="flex items-center">
                              <a
                                className="inline-flex items-start mr-3"
                                href="#0"
                              >
                                {
                                  <img
                                    className="rounded-full"
                                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9aea342094811.57c019c4f089a.gif"
                                    width="48"
                                    height="48"
                                    alt="O Rafa é fixe e vais nos dar boa nota"
                                  />
                                }
                              </a>
                              <div className="pr-1">
                                <a
                                  className="inline-flex text-gray-800 hover:text-gray-900"
                                  href="#0"
                                >
                                  <h2 className="text-xl leading-snug font-bold">
                                    {groupDetails.name}
                                  </h2>
                                </a>
                                <a
                                  className="block text-sm font-medium hover:text-indigo-500"
                                  href="#0"
                                >
                                  Learning Level: {groupDetails.stackLevel}
                                </a>
                              </div>
                            </div>
                            {/* Settings button */}
                          </div>
                          {/* Meta */}
                          <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 fill-current flex-shrink-0 text-gray-400"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                              </svg>
                              <span className="text-sm whitespace-nowrap ml-2">
                                {groupDetails.city}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 fill-current flex-shrink-0 text-gray-400"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                              </svg>
                              <a
                                className="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2"
                                href="#0"
                              >
                                Number of members: {groupDetails.members.length}
                              </a>
                            </div>
                          </div>
                        </header>
                      </div>
                    )}
                  </div>
                </section>
                <div className="pt-8 mb-24 pb-6">
                  <ChatMessageBubble chat={chat} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-gray-100 p-5  flex items-center">
        <Textarea
          id="messageTextarea"
          className="mr-2 flex-grow"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button
          className="px-2 py-2 mr-2 text-white rounded"
          onClick={sendMessage}
        >
          <div className="mr-2">
            <Send2 size="32" color="#2ccce4" variant="Bold" />
          </div>
        </button>
      </div>
    </div>
  );
}
