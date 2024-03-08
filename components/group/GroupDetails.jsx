import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../custom/navbar";
import { NavEditGroup } from "./NavEditGroup";
import {
  Message,
  ProfileAdd,
  FilterSearch,
  ArrowLeft,
  Message2,
} from "iconsax-react";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { NavAction } from "../custom/navAction";
import { useUserAuth } from "@/pages/_app";
import { Button } from "../ui/button";

export default function GroupDetails() {
  const router = useRouter();
  const { groupId } = router.query;
  const [group, setGroup] = useState(null);
  const [navBarVisible, setNavBarVisible] = useState(true);
  const { user } = useUserAuth((state) => state);

  const fetchGroupData = async () => {
    try {
      console.log(groupId, user.userData._id);
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
  useEffect(() => {
    console.log(user);
    if (user && user.userData && user.userData._id) {
      if (groupId) {
        fetchGroupData();
      }
    }
  }, [groupId, navBarVisible, user]);

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
          body: JSON.stringify({ member: user.userData._id }),
        });

        if (response.ok) {
          fetchGroupData();
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
    <>
      <AspectRatio ratio={16 / 12} className="bg-muted mb-7 relative">
        <Image
          src={group.photo_url}
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
        />
        <Link href={"/groups"}>
          <div className="absolute top-2 left-2 ">
            <ArrowLeft
              size="32"
              className="dark:text-slate-950"
              variant="Bold"
            />
          </div>
        </Link>
      </AspectRatio>
      <div className="px-4 flex flex-col gap-4 pb-12">
        <div className="flex flex-col content-normal justify-between gap-5">
          <div className="flex gap-2">
            <Badge variant="outline">{group.category} </Badge>
            <Badge variant="outline">{group.stackLevel} </Badge>
            <Badge variant="outline">{group.modality} </Badge>
          </div>
          <div></div>
          <h1 className="text-3xl"> {group.name} </h1>
          <p> {group.description}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Covered stacks</h1>
          <div className="flex gap-2">
            {group.stacks.map((index, item) => (
              <Badge key={item} variant="profile">
                {index}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Languages Spoken</h1>
          <div className="flex gap-2">
            {group.languagesSpoken.map((index, item) => (
              <Badge key={item} variant="profile">
                {index}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2 items-center">
            <p className="text-lg font-semibold">
              {group.members.length}/{group.usersLimit}
            </p>
            <p className="text-lg ">Participants</p>
          </div>
        </div>
        <div className=" items-center pr-2 pt-4  flex gap-1">
          {group.members
            .filter((m) => m != null)
            .map((member, index) => (
              <Link key={member._id} href={`/profile2/${member._id}`}>
                <Avatar className="h-10 w-10 ">
                  <AvatarImage
                    src={`https://github.com/${member.githubUsername}.png`}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </Link>
            ))}
        </div>
      </div>
      {/* <NavAction
        title={
          group.members &&
          group.members.some((e) => e._id === user.userData._id)
            ? "Leave Group"
            : "Join on Group"
        } */}
      {/* onClick={handleEnterGroup}
        url={`/chat/${groupId}`}
      /> */}
      <div className="p-4">
        <div className="bg-zinc-100 dark:bg-slate-900 p-2 text-center  fixed bottom-0 left-0 right-0 ">
          <div className="h-full flex gap-2 items-center justify-evenly align-center">
            <Button
              onClick={handleEnterGroup}
              className="text-slate-800 w-full"
            >
              {group.members &&
              group.members.some((e) => e._id === user.userData._id)
                ? "Leave Group"
                : "Join on Group"}
            </Button>

            <Link href={`/chat/${groupId}`}>
              <Button className="text-slate-800 w-full">
                <div className="flex items-center justify-center gap-2">
                  Chat
                  <Message2 size="16" variant="Bold" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
