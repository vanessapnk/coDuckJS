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
    <div>
      <h1>Create Event</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Creator:
          <input
            type="text"
            name="creator"
            value={eventData.creator}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={eventData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Modality:
          <input
            type="text"
            name="modality"
            value={eventData.modality}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={eventData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Users Limit:
          <input
            type="number"
            name="usersLimit"
            value={eventData.usersLimit}
            onChange={handleChange}
          />
        </label>
        <label>
          Exact Location:
          <input
            type="text"
            name="exactLocation"
            value={eventData.exactLocation}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
          />
        </label>
        {/* Add label and checkboxes for stacks */}
        <label>
          Stacks:
          {stacksList.map((stack) => (
            <div key={stack}>
              <input
                type="checkbox"
                name="stacks"
                value={stack}
                checked={eventData.stacks.includes(stack)}
                onChange={handleChange}
              />
              {stack}
            </div>
          ))}
        </label>
        {/* Add label and checkboxes for languagesSpoken */}
        <label>
          Languages Spoken:
          {languageList.map((language) => (
            <div key={language}>
              <input
                type="checkbox"
                name="languagesSpoken"
                value={language}
                checked={eventData.languagesSpoken.includes(language)}
                onChange={handleChange}
              />
              {language}
            </div>
          ))}
        </label>
        <button type="submit">Create Event</button>
      </form>
      {eventCreated && (
        <div>
          <p>Name: {eventData.name}</p>
          <p>Creator: {eventData.creator}</p>
          <p>Description: {eventData.description}</p>
          <p>Category: {eventData.category}</p>
          <p>Modality: {eventData.modality}</p>
          <p>City: {eventData.city}</p>
          <p>Users Limit: {eventData.usersLimit}</p>
          <p>Exact Location: {eventData.exactLocation}</p>
          <p>Date: {eventData.date}</p>
          <p>End Date: {eventData.endDate}</p>
          <p>Event created successfully!</p>
        </div>
      )}
      <div>
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
  "HTML & CSS",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "React",
  "NextJs",
  "MongoDB",
  "UI/UX Design",
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
