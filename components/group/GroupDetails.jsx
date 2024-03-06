import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../custom/navbar";

export default function GroupDetails(userData) {
  const router = useRouter();
  const { groupId } = router.query; // Get the group ID from the URL query params
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await fetch(`/api/groups/${groupId}`); // Use the dynamic event ID from the URL
        const data = await res.json();
        setGroup(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      <p>{group.category}</p>
      <Link href={`/chat/${groupId}`}>
        <button>Group Chat</button>
      </Link>
      <Navbar />
    </div>
  );
}
