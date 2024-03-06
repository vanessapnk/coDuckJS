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
} from "@/components/ui/select"
import { DarkModeSwitch } from "@/components/custom/darkModeSwitch";



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
    setShowFilters(!showFilters);
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center gap-6 pb-6">
        <h1 className="text-2xl font-medium">My Groups</h1>
        <button
          onClick={() => router.push("/creategroup")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Group
        </button>
        <DarkModeSwitch />
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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
      <div>

      </div>
      <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
    </div>
  );
}
