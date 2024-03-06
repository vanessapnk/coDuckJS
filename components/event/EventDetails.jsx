import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../custom/navbar";

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
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <Navbar />
    </div>
  );
}
