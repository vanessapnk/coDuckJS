import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link from Next.js
import { Navbar } from "@/components/custom/navbar";
import { CardItem } from "@/components/custom/cardItem";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/groups");
        const data = await res.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Toggles the visibility of filter options
  };

  return (
    <div className="pb-16">
      <div className="flex flex-col gap-6 pb-6">
        <h1 className="text-2xl font-medium">Explore All Groups</h1>
        {/* <FilterTab /> */}
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
          <Link key={group._id} href={`/groups/${group._id}`}>
            <CardItem
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
          </Link>
        ))}
      </div>

      <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
    </div>
  );
}
