import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link from Next.js
import { Navbar } from "@/components/custom/navbar";
import { CardItem } from "@/components/custom/cardItem";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DarkModeSwitch } from "@/components/custom/darkModeSwitch";
import { useUserAuth } from "./_app";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to manage filter options visibility
  const router = useRouter();
  const { user } = useUserAuth((state) => state);

  //Quando a pagina abre
  //Pega o id do usuario
  //Se existir, carrega os grupos do id
  //Caso contrário, reencaminha para o login
  useEffect(() => {
    if (user && user.userData && user.userData._id) {
      const fetchData = async (id) => {
        try {
          console.log(`Getting groups for user with ID: ${id}`); // Log the user ID
          const res = await fetch(`/api/users/${id}/mygroups`); //aqui vai o [id]
          const data = await res.json();
          setGroups(data.userGroups); // Set groups to data.userGroups
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      };

      fetchData(user.userData._id); // Pass the user ID
    }
  }, [user]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="pb-12 p-4">
      <div className="flex gap-2 justify-between  items-center pb-6">
        <h1 className="text-xl font-medium">My Groups</h1>
        <Button onClick={() => router.push("/creategroup")}>
          Create Group
        </Button>
      </div>

      {showFilters && (
        <div className="bg-gray-100 p-4 mb-4 rounded-md shadow">
          <p>Filter options go here...</p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <Link key={group._id} href={`/groups/${group._id}`}>
            <CardItem
              members={group.members}
              languege={group.languagesSpoken[0]}
              usersMin={group.members.length}
              usersLimit={group.usersLimit}
              category={group.category}
              profileCheck={true}
              location={group.city}
              modality={group.modality}
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
      <div></div>
      <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
    </div>
  );
}
