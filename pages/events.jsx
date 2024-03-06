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
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 rounded-xl"
        >
          Create Event
        </button>
      </div>
      <FilterTab />
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
                members={event.members}
                usersLimit={event.usersLimit}
                category={event.category}
                profileCheck={true}
                location={event.city}
                modality={event.modality}
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
