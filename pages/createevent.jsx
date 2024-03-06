import React, { useState } from "react";
import { useRouter } from "next/router";

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    name: "",
    creator: "",
    description: "",
    category: "",
    stacks: [],
    stackLevel: "",
    languagesSpoken: [],
    modality: "",
    city: "",
    usersLimit: 0,
    members: [],
    exactLocation: "",
    date: "",
    endDate: "",
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
      const response = await fetch("/api/events/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
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
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
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

        {/*         <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Creator:</span>
          <input
            type="text"
            name="creator"
            value={eventData.creator}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label> */}

        <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Description:</span>
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label>

        <label className="text-sm font-semibold mr-3">Category</label>
        <select
          name="category"
          value={eventData.category}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="Other">Other</option>
        </select>

        <label className="text-sm font-semibold mr-3">Modality</label>
        <select
          name="modality"
          value={eventData.modality}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Modality</option>
          <option value="presential">Presential</option>
          <option value="hybrid">Hybrid</option>
          <option value="online">Online</option>
          <option value="Other">Other</option>
        </select>

        {/* <label className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Modality:</span>
          <input
            type="text"
            name="modality"
            value={eventData.modality}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label> */}

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
          <span className="text-sm font-semibold">Users Limit:</span>
          <input
            type="number"
            name="usersLimit"
            value={eventData.usersLimit}
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
            <span className="text-sm font-semibold">Date:</span>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="border rounded p-2 w-32" // Adjust the width here
            />
          </label>
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-semibold">End Date:</span>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              className="border rounded p-2 w-32" // Adjust the width here
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Event
        </button>
      </form>
      {eventCreated && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Event created successfully!</p>
          {/* Display event data */}
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={() => router.push("/events")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
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
  "Hindi",
  "Arabic",
  "Portuguese",
  "Bengali",
  "Russian",
  "French",
];
