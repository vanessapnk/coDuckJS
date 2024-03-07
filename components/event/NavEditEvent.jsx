import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft2, Edit } from "iconsax-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { UserEdit } from "../profile/userEdit";
import { DarkModeSwitch } from "../custom/darkModeSwitch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const category = ["Frontend", "Backend", "Design", "Data Analysis", "Other"];
const levels = ["Beginner", "Junior", "Intermediate", "Senior"];
const modality = ["presential", "hybrid", "online"];

export function NavEditEvent({ backLink, editLink }) {
  const router = useRouter();
  const { eventId } = router.query; // Get the event ID from the URL query params
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    modality: "",
    city: "",
    stackLevel: "",
    usersLimit: 0,
    exactLocation: "",
    date: "",
    endDate: "",
  });

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      // Refresh the data after update
      fetchData();
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  return (
    <>
      <Drawer>
        <div className="px-4 py-6 flex flex-row gap-2 justify-between items-center border-b-2 dark:border-zinc-900 h-10">
          <Link href={backLink}>
            <div className="cursor-pointer">
              <ArrowLeft2
                size="18"
                className="dark:text-zinc-200"
                variant="Linear"
              />
            </div>
          </Link>
          <DarkModeSwitch />
          <DrawerTrigger>
            <div className="cursor-pointer">
              <Edit
                className="dark:text-zinc-200 "
                size="18"
                variant="Linear"
              />
            </div>
          </DrawerTrigger>
        </div>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Your Event</DrawerTitle>
            <DrawerDescription>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="name">New Event Name</Label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                    type="text"
                    placeholder="Write your new name"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="description">New Event Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                    placeholder="Write your new description"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="category">New Category</Label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                  >
                    {category.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="modality">New Modality</Label>
                  <select
                    name="modality"
                    value={formData.modality}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                  >
                    {modality.map((mod, index) => (
                      <option key={index} value={mod}>
                        {mod}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="city">New City</Label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                    type="text"
                    placeholder="Write your new city"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="stackLevel">New Stack Level</Label>
                  <select
                    name="stackLevel"
                    value={formData.stackLevel}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                  >
                    {levels.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* New Inputs for exactLocation, date, and endDate */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="exactLocation">New Exact Location</Label>
                  <input
                    name="exactLocation"
                    value={formData.exactLocation}
                    onChange={handleChange}
                    className="py-2 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm placeholder-text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder-text-zinc-400 dark:focus-visible:ring-zinc-300"
                    type="text"
                    placeholder="Enter the new exact location"
                  />
                </div>
                <div className="flex flex-row space-x-4">
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Start Date:</span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="border rounded p-2 w-24" // Adjust the width here
                    />
                  </label>
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">End Date:</span>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="border rounded p-2 w-24" // Adjust the width here
                    />
                  </label>
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Users Limit:</span>
                    <input
                      type="number"
                      name="usersLimit"
                      value={formData.usersLimit}
                      onChange={handleChange}
                      className="border rounded p-2 w-24"
                    />
                  </label>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose className="flex items-center gap-2 content-center justify-center">
              <Button className="w-full" onClick={handleSubmit}>
                Update
              </Button>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
