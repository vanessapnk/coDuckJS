import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../custom/navbar";
import { NavEditEvent } from "./NavEditEvent";
import { ProfileAdd } from "iconsax-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetails() {
  const router = useRouter();
  const { eventId } = router.query; // Get the event ID from the URL query params
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`); // Use the dynamic event ID from the URL
        const data = await res.json();
        setEvent(data);
        await loadEventMembers(data.participants); // Load participant details
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const loadEventMembers = async (participantIds) => {
    try {
      const participantsData = await Promise.all(
        participantIds.map(async (id) => {
          const res = await fetch(`/api/users/${id}`); // Assuming the API endpoint to fetch user details
          if (!res.ok) {
            throw new Error("Failed to fetch user details");
          }
          return await res.json();
        })
      );
      setEvent((prevState) => ({
        ...prevState,
        participants: participantsData,
      }));
    } catch (error) {
      console.error("Error loading event members:", error);
    }
  };

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
    return <div></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
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
          <ul className="flex">
            {event.languagesSpoken.map((language, index) => (
              <li key={index} className="mr-2">
                {language}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Users Limit:</span> {event.usersLimit}
        </div>
        <div className="mt-4">
          <span className="font-semibold">Exact Location:</span>{" "}
          {event.exactLocation}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded flex items-center"
          onClick={handleEnterEvent}
        >
          <div className="mr-2">
            <ProfileAdd size="32" color="#d9e3f0" />
          </div>
          Enter Group
        </button>
      </div>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Members
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {event.participants
              .filter((m) => m != null)
              .map((participant, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*RZc0lk7gkMGXv6nEOwc7Ng.jpeg"
                        alt={`${participant.name} image`}
                      />
                    </div>
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
