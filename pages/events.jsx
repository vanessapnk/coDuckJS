import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link from Next.js
import { Navbar } from "@/components/custom/navbar";
import { CardItem } from "@/components/custom/cardItem";
import { FilterTab } from "@/components/custom/filterTab";
import { Location } from "iconsax-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Toggles the visibility of filter options
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center gap-6 pb-6">
        <h1 className="text-2xl font-medium">My Events</h1>
        <button
          onClick={() => router.push("/createevent")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Event
        </button>
        <FilterTab />
      </div>

      {showFilters && (
        <div className="bg-gray-100 p-4 mb-4 rounded-md shadow">
          {/* Implement your filter options component here */}
          {/* Example: */}
          <p>Filter options go here...</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {events.length > 0 &&
          events.map((event) => (
            <Link key={event._id} href={`/events/${event._id}`}>
              <CardItem
                category="Event"
                profileCheck={true}
                profileImage={
                  event.photo_url ||
                  "https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                title={event.name}
                description={event.description}
                stacks={event.stacks}
              />
            </Link>
          ))}
      </div>

      <Navbar homeActive={false} groupsActive={false} eventsActive={true} />
    </div>
  );
}
