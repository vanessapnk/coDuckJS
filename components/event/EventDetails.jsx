import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../custom/navbar";
import { NavEditEvent } from "./NavEditEvent";
import { ProfileAdd } from "iconsax-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "iconsax-react";

import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "../ui/badge";
import { NavAction } from "../custom/navAction";
import { NavEvent } from "../custom/navEvent";
import { useUserAuth } from "@/pages/_app";
import { Button } from "../ui/button";

export default function EventDetails() {
  const router = useRouter();
  const { eventId } = router.query; // Get the event ID from the URL query params
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { user } = useUserAuth((state) => state);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`); // Use the dynamic event ID from the URL
        const data = await res.json();
        setEvent(data);
        // Assuming the event object contains participant IDs
        if (data && data.participants) {
          // Fetch participant details based on participant IDs
          const participantDetails = await Promise.all(
            data.participants.map(async (participantId) => {
              const participantRes = await fetch(`/api/users/${participantId}`); // Adjust the API endpoint as needed
              return participantRes.json();
            })
          );
          setParticipants(participantDetails);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const handleEnterEvent = async () => {
    try {
      if (true) {
        const response = await fetch(`/api/events/${eventId}/participants`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ participant: user.userData._id }),
        });

        if (response.ok) {
          console.log("User entered the event successfully");
          // You may want to update the UI to reflect the user joining the group
        } else {
          console.error("Failed to enter the event");
        }
      } else {
        console.error("Authenticated user or group id is missing");
      }
    } catch (error) {
      console.error("Error entering group:", error);
    }
  };

  if (!event) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen ">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9aea342094811.57c019c4f089a.gif"
            alt="Loading"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* <NavEditEvent backLink={`/events/`} editLink={`/event/edit/${eventId}`} /> */}
        <AspectRatio ratio={16 / 12} className="bg-muted mb-7 relative">
          <Image
            src={event.photo_url}
            alt="Photo by Drew Beamer"
            fill
            className="object-cover"
          />
          {/* <Link href={"/events"}> */}
          <div className="absolute top-2 left-2 ">
            <ArrowLeft
              size="32"
              className="dark:text-slate-950"
              variant="Bold"
            />
          </div>
          {/* </Link> */}
        </AspectRatio>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col content-normal justify-between gap-5">
            <div className="flex gap-2">
              <Badge variant="outline">{event.category} </Badge>
              <Badge variant="outline">{event.stackLevel} </Badge>
              <Badge variant="outline">{event.modality} </Badge>
              <Badge variant="outline">{event.city} </Badge>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl"> {event.name} </h1>
            </div>
            <p> {event.description}</p>
            <div className="flex items-center justify-between">
              <p>{event.exactLocation}</p>
              <p>{" "}{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl">Covered stacks</h1>
            <div className="flex gap-2">
              {event.stacks.map((index, item) => (
                <Badge key={item} variant="profile">
                  {index}
                </Badge>
              ))}
            </div>
          </div>

          {/* <p> {event.exactLocation}</p> */}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl">Languages Spoken</h1>
            <div className="flex gap-2">
              {event.languagesSpoken.map((index, item) => (
                <Badge key={item} variant="profile">
                  {index}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-semibold">
                {event.participants.length}/{event.usersLimit}
              </p>
              <p className="text-lg ">Participants</p>
            </div>
            <Button>
              {event.participants &&
                event.participants.some((e) => e._id === user.userData._id)
                ? "Leave Event"
                : "Join Event"}
            </Button>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between flex-wrap mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Participants
              </h5>
            </div>


            <div>{event.participants.name}</div>

            <div className=" items-center pr-2 flex-wrap flex gap-2">
              {participants.map((participant, index) => (
                <Link href={`/profile/${participant._id}`}>
                  <Avatar key={index} className="h-10 w-10 ">
                    <AvatarImage
                      src={`https://github.com/${participant.githubUsername}.png`}
                    />
                    <AvatarFallback>0</AvatarFallback>
                  </Avatar>
                </Link>
              ))}
            </div>


          </div>
          <NavEvent title="Join on Event" onClick={handleEnterEvent} />
        </div>
      </div>
    </>
  );
}
