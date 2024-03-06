// GroupDetails.js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../custom/navbar";
import { NavEditGroup } from "./NavEditGroup";

export default function GroupDetails(userData) {
  const router = useRouter();
  const { groupId } = router.query; // Get the group ID from the URL query params
  const [group, setGroup] = useState(null);
  const [navBarVisible, setNavBarVisible] = useState(true);

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
  }, [groupId, navBarVisible]);

  const handleNavBarHide = () => {
    setNavBarVisible(false); // When NavBar is hidden, setNavBarVisible to false
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavEditGroup
        backLink={`/groups/`}
        editLink={`/group/edit/${groupId}`}
        onNavBarHide={handleNavBarHide}
      />
      {navBarVisible && <Navbar />} {/* Render NavBar only if it's visible */}
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      <p>{group.modality}</p>
      <p>{group.category}</p>
      <p>{group.usersLimit}</p>
      <p>{group.members.length}</p>
      <Link href={`/chat/${groupId}`}>
        <button>Group Chat</button>
      </Link>
    </div>
  );
}
