import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUserAuth } from "./_app";

export default function CreateEvent() {
  const { user } = useUserAuth((state) => state);

  const [eventData, setEventData] = useState({
    name: "",
    creator: user && user.userData ? user.userData._id : "", // Initialize with user ID if available
    description: "",
    category: "",
    stacks: [],
    stackLevel: "",
    languagesSpoken: [],
    modality: "",
    city: "",
    usersLimit: 0,
    members: [], // Include members field
    exactLocation: "",
    date: "",
    endDate: ""
  });

  const [eventCreated, setEventCreated] = useState(false); // State to track event creation
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // For checkboxes, handle multiple selections
      setEventData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      // For other inputs, update state normally
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert date strings to Date objects
      const formattedEventData = {
        ...eventData,
        date: new Date(eventData.date),
        endDate: new Date(eventData.endDate),
      };

      const response = await fetch("/api/events/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedEventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      setEventCreated(true);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event 🐤</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Event Name:</span>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label>
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Description:</span>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="border rounded p-2 h-10" // Set the height here
          />
        </label>
        <div className="flex flex-row">
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="border rounded p-2 w-30  "
          >
            <option value="" disabled hidden>
              Select Category
            </option>{" "}
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="modality"
            value={eventData.modality}
            onChange={handleChange}
            className="border rounded p-2 w-60"
          >
            <option value="" disabled hidden>
              Select Modality
            </option>
            <option value="Flexible">Presential</option>
            <option value="Online">Hybrid</option>
            <option value="Presential">Online</option>
          </select>
        </div>
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">City:</span>
          <input
            type="text"
            name="city"
            value={eventData.city}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label>
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Exact Location:</span>
          <input
            type="text"
            name="exactLocation"
            value={eventData.exactLocation}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label>
        <div className="flex flex-row space-x-4">
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-semibold">Start Date:</span>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="border rounded p-2 w-24" // Adjust the width here
            />
          </label>
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-semibold">End Date:</span>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              className="border rounded p-2 w-24" // Adjust the width here
            />
          </label>
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-semibold">Users Limit:</span>
            <input
              type="number"
              name="usersLimit"
              value={eventData.usersLimit}
              onChange={handleChange}
              className="border rounded p-2 w-24"
            />
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Stacks:</span>
          <div className="grid grid-cols-3 gap-2">
            {stacksList.map((stack) => (
              <div key={stack} className="flex items-center">
                <input
                  type="checkbox"
                  name="stacks"
                  value={stack}
                  checked={eventData.stacks.includes(stack)}
                  onChange={handleChange}
                  className="mr-1"
                />
                <span>{stack}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Languages Spoken:</span>
          <div className="grid grid-cols-3 gap-2">
            {languageList.map((language) => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  name="languagesSpoken"
                  value={language}
                  checked={eventData.languagesSpoken.includes(language)}
                  onChange={handleChange}
                  className="mr-1"
                />
                <span>{language}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/events")}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-10 px-4 py-2 rounded-xl"
          >
            Go Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 rounded-xl"
          >
            Create Event
          </button>
        </div>
      </form>
      {eventCreated && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Event created successfully!</p>
          {/* Display event data */}
        </div>
      )}
    </div>
  );
}

const stacksList = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "React",
  "NextJs",
  "MongoDB",
  "Design",
];
const languageList = [
  "English",
  "Mandarin",
  "Spanish",
  "Arabic",
  "Portuguese",
  "German",
  "Russian",
  "French",
  "Other",
];
