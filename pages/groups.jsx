import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/custom/navbar";
import { CardProfile } from "@/components/profile/cardProfile";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/groups/groups");
      const data = await res.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="text-2xl font-medium">Explore All Groups</h1>
        <div>
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <CardProfile
                key={group.id}
                category="Group"
                profileCheck={true}
                profileImage={
                  group.photo_url ||
                  "https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                title={group.name}
                description={group.description}
                likes={group.likes}
              />
            ))}
          </div>
        </div>
      </div>

      <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
    </>
  );
}
