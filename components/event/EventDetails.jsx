import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../custom/navbar";
import { NavEditEvent } from "./NavEditEvent";

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
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavEditEvent backLink={`/events/`} editLink={`/event/edit/${eventId}`} />
      <div className="bg-white rounded-lg shadow-md mx-auto max-w-md mt-8 p-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Event Cover"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-4">{event.name}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
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
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-3 rounded items-center justify-center"
          /*   onClick={handleEnterGroup} */
        >
          <div className="flex flex-row  items-center justify-center m-2">
            <div className="mr-2">
              <ProfileAdd size="32" color="#d9e3f0" />
            </div>
            Enter Group
          </div>
        </button>
      </div>
      <Navbar />
    </div>
  );
}
