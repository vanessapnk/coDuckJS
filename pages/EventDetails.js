import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EventDetails() {
    const router = useRouter();
    const { eventId } = '65df0d4f90bbe259f94bec01'; // Get the event ID from the URL query params
    const [event, setEvent] = useState();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const res = await fetch(`/api/events/65df0d4f90bbe259f94bec01`); // Assuming your API supports fetching events by ID
                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };


        fetchEventData();

    }, []);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            {/* Display other event details */}
        </div>
    );
}   