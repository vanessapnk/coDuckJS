import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../custom/navbar";
import { NavEditGroup } from "./NavEditGroup";

export default function GroupDetails() {
  const router = useRouter();
  const { groupId } = router.query; // Get the group ID from the URL query params
  const [group, setGroup] = useState(null);
  const [navBarVisible, setNavBarVisible] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await fetch(`/api/groups/${groupId}`); // Use the dynamic group ID from the URL
        const data = await res.json();
        setGroup(data);
      } catch (error) {
        console.error("Error fetching group details:", error);
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
    <div className="bg-gray-100 min-h-screen">
      <NavEditGroup
        backLink={`/groups/`}
        editLink={`/group/edit/${groupId}`}
        onNavBarHide={handleNavBarHide}
      />
      {navBarVisible && <Navbar />} {/* Render NavBar only if it's visible */}
      <div className="bg-white rounded-lg shadow-md mx-auto max-w-md mt-8 p-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Event Cover"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-4">{group.name}</h1>
        <p className="text-gray-600 mb-4">{group.description}</p>
        <div className="flex flex-wrap items-center mb-4">
          <div className="mr-4">
            <span className="font-semibold">Category:</span> {group.category}
          </div>
          <div className="mr-4">
            <span className="font-semibold">Stack Level:</span>{" "}
            {group.stackLevel}
          </div>
          <div className="mr-4">
            <span className="font-semibold">Modality:</span> {group.modality}
          </div>
          <div className="mr-4">
            <span className="font-semibold">City:</span> {group.city}
          </div>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Users Limit:</span> {group.usersLimit}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Members:</span> {group.members.length}
        </div>
      </div>
      <div className="mx-auto max-w-md mt-4">
        <Link href={`/chat/${groupId}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded items-center justify-center">
            Group Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
