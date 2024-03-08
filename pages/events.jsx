import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link from Next.js
import { Navbar } from "@/components/custom/navbar";
import { CardItem } from "@/components/custom/cardItem";
import { FilterTab } from "@/components/custom/filterTab";
import { Location } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { useUserAuth } from "./_app";

export default function Events() {
  const { user } = useUserAuth((state) => state);
  const [events, setEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const res = await fetch(`/api/users/${id}/myevents`);
        const data = await res.json();
        setEvents(data.userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user && user.userData && user.userData._id) {
      fetchData(user.userData._id); // Pass the user ID
    } else {
      router.push("/login");
    }
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Toggles the visibility of filter options
  };

  return (
    <div className="pb-16 p-4">
      <div className="flex justify-between items-center gap-6 pb-6">
        <h1 className="text-xl font-medium">My Events</h1>
        <Button onClick={() => router.push("/createevent")}>
          Create Event
        </Button>
      </div>
      {/*       <FilterTab />
       */}{" "}
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
                members={event.participants}
                usersMin={event.participants.length}
                usersLimit={event.usersLimit}
                category={event.category}
                profileCheck={true}
                location={event.city}
                modality={event.modality}
                languege={event.languagesSpoken[0]}
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
