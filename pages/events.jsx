import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/custom/navbar";
import { CardProfile } from "@/components/profile/cardProfile";

export default function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/events/getAllEvents");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="text-2xl font-medium">Explore All Events</h1>
        <div>
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <CardProfile
                key={event.id}
                category="Event"
                profileCheck={true}
                profileImage="https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title={event.title}
                location={event.location}
                description={event.description}
              />
            ))}
          </div>
        </div>
      </div>

      <Navbar homeActive={false} groupsActive={false} eventsActive={true} />
    </>
  );
}
