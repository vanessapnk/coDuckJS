import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../custom/navbar";
import { NavEditGroup } from "./NavEditGroup";
import { Message, ProfileAdd, FilterSearch } from "iconsax-react";
import { useAuth } from "@/context/authContext";
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function GroupDetails() {
  const router = useRouter();
  const { groupId } = router.query;
  const [group, setGroup] = useState(null);
  const [navBarVisible, setNavBarVisible] = useState(true);

  const { authenticatedUser } = useAuth() || {};
  const userId2 = authenticatedUser ? authenticatedUser.userId : "teste";

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await fetch(`/api/groups/${groupId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch group details");
        }
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
    setNavBarVisible(false);
  };

  const handleEnterGroup = async () => {
    try {
      if (true) {
        const response = await fetch(`/api/groups/${groupId}/members`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ member: "api" }),
        });

        if (response.ok) {
          console.log("User entered the group successfully");
          // You may want to update the UI to reflect the user joining the group
        } else {
          console.error("Failed to enter the group");
        }
      } else {
        console.error("Authenticated user or group id is missing");
      }
    } catch (error) {
      console.error("Error entering group:", error);
    }
  };

  if (!group) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9aea342094811.57c019c4f089a.gif"
          alt="Loading"
        />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <AspectRatio ratio={16 / 12} className="bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
        />
      </AspectRatio>
      <div>

      </div>

      <div className="mx-auto max-w-md mt-4">
        <Link href={`/chat/${groupId}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-3 rounded items-center justify-center">
            <div className="flex flex-row  items-center justify-center m-2">
              <div className="mr-2">
                <Message size="32" color="#D9E3F0" variant="Bold" />
              </div>
              Group Chat
            </div>
          </button>
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-3 rounded items-center justify-center"
          onClick={handleEnterGroup}
        >
          <div className="flex flex-row  items-center justify-center m-2">
            <div className="mr-2">
              <ProfileAdd size="32" color="#d9e3f0" />
            </div>
            Enter Group
          </div>
        </button>
      </div>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 pb-10 dark:bg-gray-800 dark:border-gray-700 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Members
          </h5>
        </div>
        {/*         <div>{JSON.stringify(group.members)}</div>
         */}
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {group.members
              .filter((m) => m != null)
              .map((member, index) => (
                <Link key={member._id} href={`/profile2/${member._id}`}>
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`https://github.com/${member.githubUsername}.png`}
                          alt={`${member} image`}
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
