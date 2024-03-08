import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../custom/navbar";
import { NavEditEvent } from "./NavEditEvent";
import { ProfileAdd } from "iconsax-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function EventDetails() {
  const router = useRouter();
  const { eventId } = router.query; // Get the event ID from the URL query params
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

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
          body: JSON.stringify({ participant: "api" }),
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
    <div className="min-h-screen flex flex-col justify-between">
      <NavEditEvent backLink={`/events/`} editLink={`/event/edit/${eventId}`} />
      <div className="bg-white rounded-lg shadow-md mx-auto max-w-md p-4 ">
        <div className="relative mb-4 lg:mb-6">
          <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Event Cover"
            className="w-full h-48 lg:h-64 object-cover rounded-lg"
          />
        </div>
        <h1 className="text-2xl lg:text-3xl font-semibold mb-2 lg:mb-4">
          {event.name}
        </h1>
        <p className="text-gray-600 mb-2 lg:mb-4">{event.description}</p>
        <div className="flex flex-wrap items-center mb-4">
          <div className="mr-4">
            <span className="font-semibold">Category:</span> {event.category}
          </div>
          <div className="mr-4">
            <span className="font-semibold">Stack Level:</span>{" "}
            {event.stackLevel}
          </div>
          <div className="mr-4">
            <span className="font-semibold">Modality:</span> {event.modality}
          </div>
          <div className="mr-4">
            <span className="font-semibold">City:</span> {event.city}
          </div>
          <div className="mr-4">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(event.date).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Languages Spoken:</span>
          {/* <ul className="flex">
            {event.languagesSpoken.map((language, index) => (
              <li key={index} className="mr-2">
                {language}
              </li>
            ))}
          </ul> */}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Users Limit:</span> {event.usersLimit}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Exact Location:</span>{" "}
          {event.exactLocation}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-7 rounded-lg flex items-center"
          onClick={handleEnterEvent}
        >
          <div className="mr-2 mt-2">
            <ProfileAdd size="32" color="#d9e3f0" />
          </div>
          Enter Event
        </button>
      </div>
      <div className="w-full max-w-md pl-4 pt-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Participants
          </h5>
        </div>
        <div>{event.participants.name}</div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {participants.map((participant, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <Link
                    key={participant._id}
                    href={`/profile2/${participant._id}`}
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`https://github.com/${participant.githubUsername}.png`}
                        alt={`${participant.name} image`}
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {participant.name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
