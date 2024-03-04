import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/custom/navbar";
import { CardProfile } from "@/components/profile/cardProfile";
import { FilterTab } from "@/components/custom/filterTab";
import { Location } from "iconsax-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/events");
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


      <div className="flex flex-col gap-6 pb-6">
        <h1 className="text-2xl font-medium">Explore All Events</h1>
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
            stacks={event.stacks}
          />
        ))}
      </div>

      <Navbar homeActive={false} groupsActive={false} eventsActive={true} />
    </>
  );
}
