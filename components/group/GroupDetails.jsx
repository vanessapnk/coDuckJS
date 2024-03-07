import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../custom/navbar";
import { NavEditGroup } from "./NavEditGroup";
import { Message } from "iconsax-react";

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
    <div class="bg-gray-100 h-screen w-screen">
      <NavEditGroup
        backLink={`/groups/`}
        editLink={`/group/edit/${groupId}`}
        onNavBarHide={handleNavBarHide}
      />
      {navBarVisible && <Navbar />} {/* Render NavBar only if it's visible */}
      <div className="bg-white rounded-lg shadow-md  mt-8 p-8">
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
          <div className="flex items-center justify-center mt-4">
            <Message size="32" color="#2CCCE4" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded items-center justify-center">
              Group Chat
            </button>
          </div>
        </Link>
      </div>
      {/* Render members */}
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Members
          </h5>
          {/* You can add a link to view all members if needed */}
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {group.members.map((member, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src=/* {member.profilePicture} */ "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*RZc0lk7gkMGXv6nEOwc7Ng.jpeg"
                      alt={`${member.name} image`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {member}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
