import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/custom/navbar";
import { CardProfile } from "@/components/profile/cardProfile";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/groups");
      const data = await res.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
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
        <h1 className="text-2xl font-medium">Explore All Groups</h1>
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
        {groups.map((group) => (
          <CardProfile
            key={group.id}
            category="Group"
            profileCheck={true}
            location={group.location}
            profileImage={
              group.photo_url ||
              "https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            title={group.name}
            description={group.description}
            likes={group.likes}
            stacks={group.stacks}
          />
        ))}
      </div>

      <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
    </>
  );
}
