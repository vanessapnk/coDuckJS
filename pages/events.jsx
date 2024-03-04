import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/custom/navbar";
import { CardProfile } from "@/components/profile/cardProfile";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
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

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Toggles the visibility of filter options
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4 pb-12">
        <h1 className="text-2xl font-medium">Explore All Events</h1>
        <button
          onClick={toggleFilters}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow"
        >
          Filter
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-100 p-4 mb-4 rounded-md shadow">
          {/* Implement your filter options component here */}
          {/* Example: */}
          <p>Filter options go here...</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <CardProfile
            key={event.id}
            category="Event"
            profileCheck={true}
            profileImage={
              event.photo_url ||
              "https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            title={event.name}
            description={event.description}
            likes={event.likes}
            stacks={event.stacks}
          />
        ))}
      </div>

      <Navbar homeActive={false} groupsActive={false} eventsActive={true} />
    </>
  );
}
